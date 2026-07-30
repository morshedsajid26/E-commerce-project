"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

function generateOrderNo() {
  const prefix = "ORD-";
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  const timestamp = Date.now().toString().slice(-4);
  return `${prefix}${randomStr}${timestamp}`;
}

export async function placeOrder(formData, cartItems) {
  try {
    const { name, phone, address, city, notes } = formData;
    const deliveryCharge = 60; // Assuming fixed delivery charge

    if (!cartItems || cartItems.length === 0) {
        throw new Error("Your cart is empty.");
    }

    // 1. Fetch real prices from database to prevent tampering
    const productIds = cartItems.map(item => item.product.id);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds } }
    });

    if (dbProducts.length !== cartItems.length) {
      throw new Error("Some products in your cart are invalid or no longer available.");
    }

    let subtotal = 0;
    const orderItemsData = [];

    for (const cartItem of cartItems) {
      const dbProduct = dbProducts.find(p => p.id === cartItem.product.id);
      
      if (!dbProduct) {
        throw new Error(`Product ${cartItem.product.title} not found.`);
      }
      
      if (dbProduct.stock < cartItem.quantity) {
        throw new Error(`Not enough stock for ${dbProduct.name}. Only ${dbProduct.stock} left.`);
      }

      const unitPrice = dbProduct.sellingPrice;
      const totalPrice = unitPrice * cartItem.quantity;
      subtotal += totalPrice;

      orderItemsData.push({
        productId: dbProduct.id,
        quantity: cartItem.quantity,
        unitPrice: unitPrice,
        totalPrice: totalPrice,
      });
    }

    const totalAmount = subtotal + deliveryCharge;
    const orderNo = generateOrderNo();

    // 2. Database Transaction
    const order = await prisma.$transaction(async (tx) => {
      // Find or create customer
      let customer = await tx.onlineCustomer.findUnique({
        where: { phone }
      });

      if (!customer) {
        customer = await tx.onlineCustomer.create({
          data: {
            name,
            phone,
            password: Math.random().toString(36).slice(-10), // Random temporary password
            address: `${address}, ${city}`,
          }
        });
      }

      const fullAddress = city ? `${address}, ${city}` : address;

      // Create Order
      const newOrder = await tx.onlineOrder.create({
        data: {
          orderNo,
          customerId: customer.id,
          customerName: name,
          customerPhone: phone,
          address: fullAddress,
          notes: notes || "",
          subtotal,
          deliveryCharge,
          totalAmount,
          status: "PENDING",
          items: {
            create: orderItemsData
          }
        }
      });

      // Update Stock
      for (const item of orderItemsData) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        });
      }

      return newOrder;
    });

    revalidatePath("/product");
    revalidatePath("/shop");
    revalidatePath("/(dashboard)/online-orders");
    
    return { success: true, orderNo: order.orderNo };
  } catch (error) {
    console.error("Order placement failed:", error);
    return { success: false, message: error.message || "Failed to place order." };
  }
}
