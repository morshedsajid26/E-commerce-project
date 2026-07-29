"use client";

import { useEffect, useState } from "react";
import {
  ShoppingBag,
  Clock,
  CheckCircle,
  CreditCard,
  MapPin,
  TrendingUp,
  Package,
  AlertTriangle,
  Loader2,
  ArrowRight
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getCustomerOrdersAction } from "@/lib/actions/online-customer.actions";
import Link from "next/link";

const SummaryCard = ({
  title,
  value,
  icon: IconComponent,
  gradientFrom,
  gradientTo,
  iconColor,
  isCurrency = false,
}) => (
  <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:shadow-slate-200/50 hover:translate-y-[-4px] transition-all duration-300 group flex items-center justify-between">
    <div className="space-y-2">
      <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
        {title}
      </p>
      <h3 className="text-2xl font-black text-slate-900 font-mono tracking-tight">
        {isCurrency
          ? `৳${Number(value || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
          : Number(value || 0).toLocaleString()}
      </h3>
    </div>
    <div
      className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${gradientFrom} ${gradientTo} flex items-center justify-center shrink-0 shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
    >
      <IconComponent size={22} className={iconColor || "text-white"} />
    </div>
  </div>
);

export default function CustomerOverviewPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const result = await getCustomerOrdersAction();
        if (Array.isArray(result)) {
          setOrders(result);
        }
      } catch (error) {
        console.error("Failed to load customer orders:", error);
      } finally {
        setLoading(false);
      }
    }
    
    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="h-96 w-full flex flex-col items-center justify-center gap-4 text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin text-medical-blue-600" />
        <p className="font-medium animate-pulse">
          Loading your dashboard...
        </p>
      </div>
    );
  }

  // Calculate stats
  const totalOrders = orders.length;
  const activeOrders = orders.filter(
    (o) => o.status === "PENDING" || o.status === "PROCESSING" || o.status === "CONFIRMED" || o.status === "SHIPPED"
  ).length;
  const totalSpent = orders
    .filter((o) => o.status === "DELIVERED")
    .reduce((acc, order) => acc + (order.totalAmount || 0), 0);
    
  let savedAddressesCount = 0;
  if (user?.address) {
    try {
      const parsed = JSON.parse(user.address);
      savedAddressesCount = Array.isArray(parsed) ? parsed.length : 1;
    } catch {
      savedAddressesCount = 1;
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Welcome back, {user?.name?.split(" ")[0] || "User"}! 👋
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Here is an overview of your account activity.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          gradientFrom="from-sky-400"
          gradientTo="to-medical-blue-600"
        />
        <SummaryCard
          title="Active Orders"
          value={activeOrders}
          icon={Clock}
          gradientFrom="from-amber-400"
          gradientTo="to-orange-500"
        />
        <SummaryCard
          title="Total Spent"
          value={totalSpent}
          icon={CreditCard}
          isCurrency={true}
          gradientFrom="from-emerald-400"
          gradientTo="to-teal-600"
        />
        <SummaryCard
          title="Saved Addresses"
          value={savedAddressesCount}
          icon={MapPin}
          gradientFrom="from-indigo-400"
          gradientTo="to-violet-600"
        />
      </div>

      {/* Recent Orders Mini Table */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xl shadow-slate-100/50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600">
              <Package size={20} />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Recent Orders</h2>
              <p className="text-xs text-slate-500">Your most recent purchases</p>
            </div>
          </div>
          <Link
            href="/profile/orders"
            className="text-xs font-bold text-medical-blue-600 hover:text-medical-blue-700 flex items-center gap-1 bg-medical-blue-50 px-3 py-1.5 rounded-lg transition-colors"
          >
            View All
            <ArrowRight size={14} />
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-600">No orders yet</p>
            <p className="text-xs text-slate-400 mt-1 max-w-[250px] mx-auto">
              When you make a purchase, your orders will appear here.
            </p>
            <Link 
              href="/shop"
              className="mt-4 inline-flex items-center justify-center px-4 py-2 bg-medical-blue-600 text-white rounded-lg text-xs font-bold hover:bg-medical-blue-700 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-bold rounded-l-xl">Order ID</th>
                  <th className="px-4 py-3 font-bold">Date</th>
                  <th className="px-4 py-3 font-bold">Status</th>
                  <th className="px-4 py-3 font-bold text-right rounded-r-xl">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-slate-700">
                      #{order.id.slice(0, 8)}
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-xs">
                      {new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          order.status === "DELIVERED"
                            ? "bg-emerald-100 text-emerald-700"
                            : order.status === "CANCELLED"
                            ? "bg-rose-100 text-rose-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-black text-slate-900">
                      ৳{Number(order.totalAmount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
