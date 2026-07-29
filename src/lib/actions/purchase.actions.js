'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getPurchases() {
  return await prisma.purchase.findMany({
    include: { 
      items: {
        include: { product: true }
      } 
    },
    orderBy: { date: 'desc' }
  });
}

export async function recordPurchase(purchaseData) {
  const { company, items, totalAmount } = purchaseData;
  
  try {
    return await prisma.$transaction(async (tx) => {
      const invoiceNo = `PUR-${Date.now()}`;
      
      const purchase = await tx.purchase.create({
        data: {
          invoiceNo,
          supplier: company,
          totalAmount,
          items: {
            create: await Promise.all(items.map(async (item) => {
              let productId = item.productId;
              
              // If productId is missing but we have name/company/category, create it
              if (!productId && item.name) {
                const newProduct = await tx.product.create({
                  data: {
                    name: item.name,
                    brand: item.brand || "",
                    company: item.company || company,
                    category: item.category || "Gadget",
                    purchasePrice: item.unitPrice,
                    sellingPrice: item.sellingPrice || 0,
                    status: "In Stock",
                    stock: 0
                  }
                });
                productId = newProduct.id;
              }

              return {
                productId,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                totalPrice: item.quantity * item.unitPrice
              };
            }))
          }
        }
      });
      
      // Update stocks
      for (const item of items) {
        let pId = item.productId;
        if (!pId && item.name) {
          const p = await tx.product.findFirst({
            where: { name: item.name, company: item.company || company }
          });
          pId = p?.id;
        }

        if (pId) {
          await tx.product.update({
            where: { id: pId },
            data: {
              stock: { increment: item.quantity },
              purchasePrice: item.unitPrice,
              ...(item.sellingPrice > 0 ? { sellingPrice: item.sellingPrice } : {})
            }
          });
        }
      }
      
      revalidatePath("/purchases");
      revalidatePath("/products");
      revalidatePath("/dashboard");
      revalidatePath("/reports");
      
      return purchase;
    }, {
      maxWait: 5000,
      timeout: 15000
    });
  } catch (error) {
    console.error("Purchase record error:", error);
    throw new Error("Failed to record purchase");
  }
}

export async function updatePurchase(id, purchaseData) {
  const { company, items, totalAmount } = purchaseData;
  
  try {
    return await prisma.$transaction(async (tx) => {
      // 1. Fetch old purchase
      const oldPurchase = await tx.purchase.findUnique({
        where: { id },
        include: { items: true }
      });

      if (!oldPurchase) {
        throw new Error("Purchase not found");
      }

      // 2. Revert old stock
      for (const oldItem of oldPurchase.items) {
        if (oldItem.productId) {
          await tx.product.update({
            where: { id: oldItem.productId },
            data: { stock: { decrement: oldItem.quantity } }
          });
        }
      }

      // 3. Delete old items
      await tx.purchaseItem.deleteMany({
        where: { purchaseId: id }
      });

      // 4. Update purchase and create new items
      const purchase = await tx.purchase.update({
        where: { id },
        data: {
          supplier: company,
          totalAmount,
          items: {
            create: await Promise.all(items.map(async (item) => {
              let productId = item.productId;
              
              if (!productId && item.name) {
                const newProduct = await tx.product.create({
                  data: {
                    name: item.name,
                    brand: item.brand || "",
                    company: item.company || company,
                    category: item.category || "Gadget",
                    purchasePrice: item.unitPrice,
                    sellingPrice: item.sellingPrice || 0,
                    status: "In Stock",
                    stock: 0
                  }
                });
                productId = newProduct.id;
              }

              return {
                productId,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                totalPrice: item.quantity * item.unitPrice
              };
            }))
          }
        }
      });
      
      // 5. Apply new stock
      for (const item of items) {
        let pId = item.productId;
        if (!pId && item.name) {
          const p = await tx.product.findFirst({
            where: { name: item.name, company: item.company || company }
          });
          pId = p?.id;
        }

        if (pId) {
          await tx.product.update({
            where: { id: pId },
            data: {
              stock: { increment: item.quantity },
              purchasePrice: item.unitPrice,
              ...(item.sellingPrice > 0 ? { sellingPrice: item.sellingPrice } : {})
            }
          });
        }
      }
      
      revalidatePath("/purchases");
      revalidatePath("/products");
      revalidatePath("/dashboard");
      revalidatePath("/reports");
      
      return purchase;
    }, {
      maxWait: 5000,
      timeout: 15000
    });
  } catch (error) {
    console.error("Purchase update error:", error);
    throw new Error("Failed to update purchase");
  }
}

export async function deletePurchase(id) {
  try {
    return await prisma.$transaction(async (tx) => {
      const oldPurchase = await tx.purchase.findUnique({
        where: { id },
        include: { items: true }
      });

      if (!oldPurchase) {
        throw new Error("Purchase not found");
      }

      // Revert stock
      for (const item of oldPurchase.items) {
        if (item.productId) {
          await tx.product.update({
            where: { id: item.productId },
            data: { stock: { decrement: item.quantity } }
          });
        }
      }

      // Delete items
      await tx.purchaseItem.deleteMany({
        where: { purchaseId: id }
      });

      // Delete purchase
      await tx.purchase.delete({
        where: { id }
      });

      revalidatePath("/purchases");
      revalidatePath("/products");
      revalidatePath("/dashboard");
      revalidatePath("/reports");

      return { success: true };
    }, {
      maxWait: 5000,
      timeout: 15000
    });
  } catch (error) {
    console.error("Purchase delete error:", error);
    throw new Error("Failed to delete purchase");
  }
}
