'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  User, 
  MapPin, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  ShoppingBag,
  ArrowLeft,
  PlusCircle,
  LogOut,
  FileText,
  Package,
  Calendar,
  CreditCard,
  Eye,
  X
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { 
  getCustomerOrdersAction
} from "@/lib/actions/online-customer.actions";
import { useAuth } from "@/context/AuthContext";

// Order Details Modal Component
function OrderDetailsModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h3 className="font-extrabold text-slate-800 text-lg flex items-center gap-2">
              <Package size={20} className="text-medical-blue-600" />
              Order Details
            </h3>
            <p className="text-sm font-semibold text-slate-500 font-mono mt-1">{order.orderNo}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-500 rounded-xl transition-all shadow-sm"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto bg-slate-50 flex-1 space-y-6">
          
          {/* Status & Dates */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2">
              {order.status === "PENDING" ? (
                <span className="inline-flex items-center gap-1.5 font-black text-xs text-yellow-600 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-200">
                  <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                  <span>Pending Approval</span>
                </span>
              ) : order.status === "APPROVED" ? (
                <span className="inline-flex items-center gap-1.5 font-black text-xs text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                  <CheckCircle size={14} className="text-emerald-500" />
                  <span>Approved</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 font-black text-xs text-red-600 bg-red-50 px-3 py-1.5 rounded-full border border-red-200">
                  <XCircle size={14} className="text-red-500" />
                  <span>Rejected</span>
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Calendar size={14} />
              <span>{new Date(order.createdAt).toLocaleString()}</span>
            </div>
          </div>

          {/* Items Table */}
          <div className="space-y-2">
            <span className="block text-[11px] font-black text-slate-400 uppercase tracking-wider">
              Ordered Items
            </span>
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden text-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-xs">
                    <th className="p-4">Product Name</th>
                    <th className="p-4 text-center">Qty</th>
                    <th className="p-4 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                  {order.items?.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="p-4 text-sm">{item.product?.name || "Unknown Product"}</td>
                      <td className="p-4 text-center text-slate-500 text-xs">{item.quantity}</td>
                      <td className="p-4 text-right text-xs">৳{(item.unitPrice * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-500 mb-2">
                <MapPin size={16} className="text-medical-blue-500" />
                <span className="font-bold text-sm">Delivery Address</span>
              </div>
              <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                {order.address}
              </p>
              {order.notes && (
                <div className="border-t border-slate-100 pt-2 mt-2">
                  <p className="text-xs text-slate-500"><span className="font-bold">Notes:</span> {order.notes}</p>
                </div>
              )}
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-500 text-sm">
                <span className="flex items-center gap-2">
                  <CreditCard size={16} className="text-emerald-500" />
                  <span className="font-bold">Payment Method</span>
                </span>
                <span className="font-bold text-slate-700">COD</span>
              </div>
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
                <span className="font-black text-slate-500">Total Invoice</span>
                <span className="font-black text-slate-900 text-xl tracking-tight">৳{Number(order.totalAmount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function CustomerOrdersPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [customer, setCustomer] = useState(null);
  const [loadingCustomer, setLoadingCustomer] = useState(true);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  
  // Modal State
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Load customer details
  const loadCustomerData = () => {
    try {
      if (!user) {
        toast.error("Please sign in to view your orders");
        router.push("/login");
        return;
      }
      setCustomer(user);
    } catch (e) {
      toast.error("Failed to load customer profile details");
    } finally {
      setLoadingCustomer(false);
    }
  };

  // Load customer orders
  const loadOrdersData = async () => {
    try {
      const data = await getCustomerOrdersAction();
      if (Array.isArray(data)) {
        setOrders(data);
      }
    } catch (e) {
      toast.error("Failed to load orders history");
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadCustomerData();
    } else {
      const timeout = setTimeout(() => {
        if (!user) {
          toast.error("Please sign in to view your orders");
          router.push("/login");
        }
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [user]);

  useEffect(() => {
    if (customer) {
      loadOrdersData();
    }
  }, [customer]);

  if (loadingCustomer) {
    return (
      <div className="h-96 flex flex-col items-center justify-center font-sans">
        <Loader2 className="w-10 h-10 animate-spin text-medical-blue-600 mb-2" />
        <span className="text-slate-500 font-bold text-sm">Loading your orders portal...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Toaster position="top-center" />
      
      <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-xl shadow-slate-100/50">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-6 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-medical-blue-50 text-medical-blue-600 flex items-center justify-center">
            <ShoppingBag size={24} />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 leading-tight">Order History</h2>
            <p className="text-xs text-slate-400 mt-0.5">Track your pending shipments and view full receipt details.</p>
          </div>
        </div>

        {loadingOrders ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-medical-blue-600 mb-2" />
            <span className="text-slate-400 text-xs font-bold">Retrieving order database...</span>
          </div>
        ) : orders.length > 0 ? (
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-right">Total</th>
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-bold text-slate-700">
                      {order.orderNo || `#${order.id.slice(0, 8)}`}
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-xs font-semibold">
                      {new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          order.status === "DELIVERED"
                            ? "bg-emerald-100 text-emerald-700"
                            : order.status === "CANCELLED"
                            ? "bg-rose-100 text-rose-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-black text-slate-900">
                      ৳{Number(order.totalAmount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-medical-blue-50 hover:bg-medical-blue-100 text-medical-blue-700 text-xs font-bold rounded-lg transition-colors border border-medical-blue-100"
                      >
                        <Eye size={14} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20 border border-dashed border-slate-200 rounded-3xl">
            <ShoppingBag className="w-12 h-12 text-slate-200 mb-4" />
            <h3 className="font-extrabold text-slate-700 text-sm">No order history found</h3>
            <p className="text-slate-400 text-xs mt-1 max-w-[240px]">
              You haven't placed any online orders yet. Visit the catalog and build your cart!
            </p>
            <Link 
              href="/shop"
              className="mt-6 px-6 py-2.5 rounded-xl bg-medical-blue-600 hover:bg-medical-blue-700 text-white font-bold text-xs transition-all shadow-md"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>

      {/* Render Modal if an order is selected */}
      <OrderDetailsModal 
        order={selectedOrder} 
        onClose={() => setSelectedOrder(null)} 
      />
      
    </div>
  );
}
