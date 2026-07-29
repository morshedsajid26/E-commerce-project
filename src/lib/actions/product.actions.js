'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getProducts(params = {}) {
  try {
    const { search } = params;
    
    const products = await prisma.product.findMany({
      where: search ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { brand: { contains: search, mode: 'insensitive' } },
          { company: { contains: search, mode: 'insensitive' } },
          { category: { contains: search, mode: 'insensitive' } },
        ]
      } : {},
      orderBy: { createdAt: 'desc' }
    });
    
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
}

export async function getLowStockProducts() {
  try {
    return await prisma.product.findMany({
      where: {
        stock: { lte: 10 }
      }
    });
  } catch (error) {
    throw new Error("Failed to fetch low stock products");
  }
}

export async function addProduct(data) {
  try {
    // ensure numeric fields
    const parsedData = {
      ...data,
      purchasePrice: parseFloat(data.purchasePrice),
      sellingPrice: parseFloat(data.sellingPrice),
      stock: parseInt(data.stock, 10),
    };
    
    const product = await prisma.product.create({
      data: {
        ...parsedData,
        status: parsedData.stock === 0 ? "Out of Stock" : parsedData.stock <= 10 ? "Low" : "In Stock"
      }
    });
    revalidatePath("/products");
    revalidatePath("/dashboard");
    return product;
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error("Failed to add product");
  }
}

export async function updateProduct(id, data) {
  try {
    // ensure numeric fields
    const parsedData = {
      ...data,
      purchasePrice: parseFloat(data.purchasePrice),
      sellingPrice: parseFloat(data.sellingPrice),
      stock: parseInt(data.stock, 10),
    };

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...parsedData,
        status: parsedData.stock === 0 ? "Out of Stock" : parsedData.stock <= 10 ? "Low" : "In Stock"
      }
    });
    revalidatePath("/products");
    revalidatePath("/dashboard");
    return product;
  } catch (error) {
    throw new Error("Failed to update product");
  }
}

export async function deleteProduct(id) {
  try {
    const hasSales = await prisma.saleItem.count({ where: { productId: id } });
    const hasPurchases = await prisma.purchaseItem.count({ where: { productId: id } });
    
    if (hasSales > 0 || hasPurchases > 0) {
      throw new Error(`Cannot delete: Product is present in ${hasSales} sales and ${hasPurchases} purchases. Delete them first or update stock to 0.`);
    }

    await prisma.product.delete({
      where: { id }
    });
    revalidatePath("/products");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    throw new Error(error.message || "Failed to delete product");
  }
}
