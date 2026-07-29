'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSales() {
  try {
    return await prisma.sale.findMany({
      include: {
        customer: true,
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: { date: 'desc' }
    });
  } catch (error) {
    throw new Error("Failed to fetch sales");
  }
}

export async function recordSale(saleData) {
  const { items, totalAmount, customerId, paidAmount = 0, dueAmount = 0, walkingCustomerName } = saleData;
  
  try {
    return await prisma.$transaction(async (tx) => {
      // 1. Create Sale record
      const invoiceNo = `INV-${Date.now()}`;
      
      let totalProfit = 0;
      let subtotal = 0;
      
      // 2. Process items and update stock
      const saleItems = [];
      for (const item of items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId }
        });
        
        if (!product || product.stock < item.quantity) {
          throw new Error(`Insufficient stock for ${product?.name || 'unknown product'}`);
        }
        
        const profit = (product.sellingPrice - product.purchasePrice) * item.quantity;
        totalProfit += profit;
        subtotal += product.sellingPrice * item.quantity;
        
        // Update stock
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: { decrement: item.quantity },
            status: (product.stock - item.quantity) === 0 ? "Out of Stock" : (product.stock - item.quantity) <= 10 ? "Low" : "In Stock"
          }
        });
        
        saleItems.push({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: product.sellingPrice,
          totalPrice: product.sellingPrice * item.quantity
        });
      }

      const discountAndRoundOff = Math.max(0, subtotal - totalAmount);
      const finalProfit = totalProfit - discountAndRoundOff;

      // Update customer totalSpent and dueAmount if customerId is provided
      if (customerId) {
        await tx.customer.update({
          where: { id: customerId },
          data: {
            totalSpent: { increment: totalAmount },
            dueAmount: { increment: dueAmount }
          }
        });
      }
      
      const sale = await tx.sale.create({
        data: {
          invoiceNo,
          totalAmount,
          paidAmount,
          dueAmount,
          profit: finalProfit,
          itemsCount: items.length,
          customerId: customerId || null,
          walkingCustomerName: walkingCustomerName || null,
          items: {
            create: saleItems
          }
        },
        include: {
          items: {
            include: {
              product: true
            }
          },
          customer: true
        }
      });
      
      revalidatePath("/sales");
      revalidatePath("/products");
      revalidatePath("/dashboard");
      revalidatePath("/reports");
      revalidatePath("/customers");
      
      return sale;
    });
  } catch (error) {
    console.error("Sale record error:", error);
    throw new Error(error.message || "Failed to record sale");
  }
}
