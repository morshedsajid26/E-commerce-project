"use server";

import prisma from "@/lib/prisma";

export async function getDashboardSummary() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [todaySales, todayPurchase, products, totalDeliveryChargeAgg] = await Promise.all([
      prisma.sale.aggregate({
        where: { date: { gte: today } },
        _sum: { totalAmount: true, profit: true },
      }),
      prisma.purchase.aggregate({
        where: { date: { gte: today } },
        _sum: { totalAmount: true },
      }),
      prisma.product.findMany({
        select: { stock: true, purchasePrice: true, status: true },
      }),
      prisma.onlineOrder.aggregate({
        where: { status: "APPROVED" },
        _sum: { deliveryCharge: true },
      }),
    ]);

    const totalStockValue = products.reduce(
      (acc, prod) => acc + prod.stock * prod.purchasePrice,
      0,
    );
    const lowStockCount = products.filter(
      (m) => m.stock > 0 && m.stock <= 10,
    ).length;
    const stockOutCount = products.filter((m) => m.stock === 0).length;

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    const [
      monthlyOnlineSalesAgg,
      monthlyShopSalesAgg,
      yearlyOnlineSalesAgg,
      yearlyShopSalesAgg
    ] = await Promise.all([
      prisma.sale.aggregate({
        where: { date: { gte: startOfMonth }, isOnline: true },
        _sum: { totalAmount: true }
      }),
      prisma.sale.aggregate({
        where: { date: { gte: startOfMonth }, isOnline: false },
        _sum: { totalAmount: true }
      }),
      prisma.sale.aggregate({
        where: { date: { gte: startOfYear }, isOnline: true },
        _sum: { totalAmount: true }
      }),
      prisma.sale.aggregate({
        where: { date: { gte: startOfYear }, isOnline: false },
        _sum: { totalAmount: true }
      })
    ]);

    const mOnlineSales = monthlyOnlineSalesAgg._sum.totalAmount || 0;
    const mShopSales = monthlyShopSalesAgg._sum.totalAmount || 0;
    const yOnlineSales = yearlyOnlineSalesAgg._sum.totalAmount || 0;
    const yShopSales = yearlyShopSalesAgg._sum.totalAmount || 0;

    return {
      todaySales: todaySales._sum.totalAmount || 0,
      todayProfit: todaySales._sum.profit || 0,
      todayPurchase: todayPurchase._sum.totalAmount || 0,
      monthlySales: mOnlineSales + mShopSales,
      monthlyOnlineSales: mOnlineSales,
      monthlyShopSales: mShopSales,
      yearlySales: yOnlineSales + yShopSales,
      yearlyOnlineSales: yOnlineSales,
      yearlyShopSales: yShopSales,
      totalStockValue,
      lowStockCount,
      stockOutCount,
      totalProducts: products.length,
      totalTransactions: await prisma.sale.count(),
      totalDeliveryCharge: totalDeliveryChargeAgg._sum.deliveryCharge || 0,
    };
  } catch (error) {
    console.error("Dashboard summary error:", error);
    throw new Error("Failed to fetch dashboard summary");
  }
}

export async function getChartData(range = "month") {
  try {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const chartData = [];
    const now = new Date();

    if (range === "day") {
      // Last 7 Days (Per Day)
      for (let i = 6; i >= 0; i--) {
        const dayDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - i,
        );
        dayDate.setHours(0, 0, 0, 0);
        const nextDayDate = new Date(dayDate);
        nextDayDate.setDate(dayDate.getDate() + 1);

        const [dailyOnlineSales, dailyShopSales, dailyPurchase] = await Promise.all([
          prisma.sale.aggregate({
            where: { date: { gte: dayDate, lt: nextDayDate }, isOnline: true },
            _sum: { totalAmount: true, profit: true },
          }),
          prisma.sale.aggregate({
            where: { date: { gte: dayDate, lt: nextDayDate }, isOnline: false },
            _sum: { totalAmount: true, profit: true },
          }),
          prisma.purchase.aggregate({
            where: { date: { gte: dayDate, lt: nextDayDate } },
            _sum: { totalAmount: true },
          }),
        ]);

        const label = dayDate.toLocaleDateString("en-US", {
          weekday: "short",
          day: "numeric",
        });

        const onlineAmt = dailyOnlineSales._sum.totalAmount || 0;
        const shopAmt = dailyShopSales._sum.totalAmount || 0;

        chartData.push({
          name: label,
          sales: onlineAmt + shopAmt,
          onlineSales: onlineAmt,
          shopSales: shopAmt,
          purchase: dailyPurchase._sum.totalAmount || 0,
          profit: (dailyOnlineSales._sum.profit || 0) + (dailyShopSales._sum.profit || 0),
        });
      }
    } else if (range === "year") {
      // Last 5 Years
      const currentYear = now.getFullYear();
      for (let i = 4; i >= 0; i--) {
        const year = currentYear - i;
        const yearDate = new Date(year, 0, 1);
        const nextYearDate = new Date(year + 1, 0, 1);

        const [yearlyOnlineSales, yearlyShopSales, yearlyPurchase] = await Promise.all([
          prisma.sale.aggregate({
            where: { date: { gte: yearDate, lt: nextYearDate }, isOnline: true },
            _sum: { totalAmount: true, profit: true },
          }),
          prisma.sale.aggregate({
            where: { date: { gte: yearDate, lt: nextYearDate }, isOnline: false },
            _sum: { totalAmount: true, profit: true },
          }),
          prisma.purchase.aggregate({
            where: { date: { gte: yearDate, lt: nextYearDate } },
            _sum: { totalAmount: true },
          }),
        ]);

        const onlineAmt = yearlyOnlineSales._sum.totalAmount || 0;
        const shopAmt = yearlyShopSales._sum.totalAmount || 0;

        chartData.push({
          name: String(year),
          sales: onlineAmt + shopAmt,
          onlineSales: onlineAmt,
          shopSales: shopAmt,
          purchase: yearlyPurchase._sum.totalAmount || 0,
          profit: (yearlyOnlineSales._sum.profit || 0) + (yearlyShopSales._sum.profit || 0),
        });
      }
    } else {
      // Default: Last 12 Months
      for (let i = 11; i >= 0; i--) {
        const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const nextMonthDate = new Date(
          now.getFullYear(),
          now.getMonth() - i + 1,
          1,
        );

        const [monthlyOnlineSales, monthlyShopSales, monthlyPurchase] = await Promise.all([
          prisma.sale.aggregate({
            where: { date: { gte: monthDate, lt: nextMonthDate }, isOnline: true },
            _sum: { totalAmount: true, profit: true },
          }),
          prisma.sale.aggregate({
            where: { date: { gte: monthDate, lt: nextMonthDate }, isOnline: false },
            _sum: { totalAmount: true, profit: true },
          }),
          prisma.purchase.aggregate({
            where: { date: { gte: monthDate, lt: nextMonthDate } },
            _sum: { totalAmount: true },
          }),
        ]);

        const onlineAmt = monthlyOnlineSales._sum.totalAmount || 0;
        const shopAmt = monthlyShopSales._sum.totalAmount || 0;

        chartData.push({
          name: months[monthDate.getMonth()],
          sales: onlineAmt + shopAmt,
          onlineSales: onlineAmt,
          shopSales: shopAmt,
          purchase: monthlyPurchase._sum.totalAmount || 0,
          profit: (monthlyOnlineSales._sum.profit || 0) + (monthlyShopSales._sum.profit || 0),
        });
      }
    }

    // Category distribution
    const categoryCounts = await prisma.product.groupBy({
      by: ["category"],
      _count: {
        id: true,
      },
    });

    const categoryData = categoryCounts.map((c) => ({
      name: c.category,
      value: c._count.id,
    }));

    return {
      monthlyData: chartData,
      categoryData:
        categoryData.length > 0
          ? categoryData
          : [
              { name: "Electronics", value: 0 },
              { name: "Accessories", value: 0 },
              { name: "Gadgets", value: 0 },
            ],
    };
  } catch (error) {
    console.error("Chart data error:", error);
    throw new Error("Failed to fetch chart data");
  }
}

export async function getTopSellingProducts() {
  try {
    const topSales = await prisma.saleItem.groupBy({
      by: ["productId"],
      _sum: {
        quantity: true,
        totalPrice: true,
      },
      orderBy: {
        _sum: {
          quantity: "desc",
        },
      },
      take: 5,
    });

    const topSelling = await Promise.all(
      topSales.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
          select: { name: true, category: true, company: true },
        });
        return {
          id: item.productId,
          name: product?.name || "Unknown",
          category: product?.category || "Unknown",
          company: product?.company || "Unknown",
          quantitySold: item._sum.quantity || 0,
          totalRevenue: item._sum.totalPrice || 0,
        };
      })
    );

    return topSelling;
  } catch (error) {
    console.error("Error fetching top selling products:", error);
    return [];
  }
}

export async function getExpiringProducts() {
  // Products don't expire in this context, returning empty array
  return [];
}

export async function getTopProfitableProducts() {
  try {
    const saleItems = await prisma.saleItem.findMany({
      select: {
        productId: true,
        quantity: true,
        totalPrice: true,
        product: {
          select: {
            name: true,
            category: true,
            company: true,
            purchasePrice: true,
          }
        }
      }
    });

    const profitMap = {};
    for (const item of saleItems) {
      if (!item.product) continue;
      const profit = item.totalPrice - (item.product.purchasePrice * item.quantity);
      if (!profitMap[item.productId]) {
        profitMap[item.productId] = {
          id: item.productId,
          name: item.product.name,
          category: item.product.category,
          company: item.product.company,
          quantitySold: 0,
          totalRevenue: 0,
          totalProfit: 0,
        };
      }
      profitMap[item.productId].quantitySold += item.quantity;
      profitMap[item.productId].totalRevenue += item.totalPrice;
      profitMap[item.productId].totalProfit += profit;
    }

    const result = Object.values(profitMap)
      .sort((a, b) => b.totalProfit - a.totalProfit)
      .slice(0, 5);

    return result;
  } catch (error) {
    console.error("Error in getTopProfitableProducts:", error);
    return [];
  }
}

export async function getUnsoldProducts() {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // 1. Get all productIds that HAVE been sold in the last 30 days
    const soldRecent = await prisma.saleItem.findMany({
      where: {
        createdAt: {
          gte: thirtyDaysAgo
        }
      },
      select: {
        productId: true
      },
      distinct: ['productId']
    });

    const soldIds = soldRecent.map(item => item.productId);

    // 2. Get products whose ID is NOT in soldIds and stock > 0 (only active unsold stock)
    const unsold = await prisma.product.findMany({
      where: {
        id: {
          notIn: soldIds
        },
        stock: {
          gt: 0
        }
      },
      orderBy: {
        stock: 'desc'
      },
      take: 5
    });

    return unsold;
  } catch (error) {
    console.error("Error in getUnsoldProducts:", error);
    return [];
  }
}

export async function getLedgerYears() {
  try {
    const [earliestSale, earliestPurchase] = await Promise.all([
      prisma.sale.findFirst({
        orderBy: { date: 'asc' },
        select: { date: true }
      }),
      prisma.purchase.findFirst({
        orderBy: { date: 'asc' },
        select: { date: true }
      })
    ]);

    const currentYear = new Date().getFullYear();
    let startYear = currentYear;

    if (earliestSale?.date) {
      startYear = Math.min(startYear, new Date(earliestSale.date).getFullYear());
    }
    if (earliestPurchase?.date) {
      startYear = Math.min(startYear, new Date(earliestPurchase.date).getFullYear());
    }

    if (startYear > currentYear || startYear < 2000) {
      startYear = 2024;
    }

    const years = [];
    for (let y = currentYear; y >= startYear; y--) {
      years.push(y);
    }
    return years;
  } catch (error) {
    console.error("Error in getLedgerYears:", error);
    return [new Date().getFullYear()];
  }
}

export async function getDailyLedger(year, month) {
  try {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 1);

    const [sales, purchases] = await Promise.all([
      prisma.sale.findMany({
        where: {
          date: {
            gte: startDate,
            lt: endDate
          }
        },
        select: {
          date: true,
          totalAmount: true,
          profit: true,
          isOnline: true
        }
      }),
      prisma.purchase.findMany({
        where: {
          date: {
            gte: startDate,
            lt: endDate
          }
        },
        select: {
          date: true,
          totalAmount: true
        }
      })
    ]);

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const ledger = Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;
      return {
        day,
        sales: 0,
        onlineSales: 0,
        shopSales: 0,
        purchases: 0,
        profit: 0,
        transactions: 0
      };
    });

    sales.forEach(sale => {
      const day = new Date(sale.date).getDate();
      if (day >= 1 && day <= daysInMonth) {
        ledger[day - 1].sales += sale.totalAmount;
        if (sale.isOnline) {
          ledger[day - 1].onlineSales += sale.totalAmount;
        } else {
          ledger[day - 1].shopSales += sale.totalAmount;
        }
        ledger[day - 1].profit += sale.profit;
        ledger[day - 1].transactions += 1;
      }
    });

    purchases.forEach(purchase => {
      const day = new Date(purchase.date).getDate();
      if (day >= 1 && day <= daysInMonth) {
        ledger[day - 1].purchases += purchase.totalAmount;
      }
    });

    return ledger;
  } catch (error) {
    console.error("Error in getDailyLedger:", error);
    throw new Error("Failed to fetch daily ledger");
  }
}
