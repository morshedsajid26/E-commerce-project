"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/organisms/navbar';
import { Sidebar } from '@/components/organisms/sidebar';
import { CartDrawer } from '@/components/organisms/cart-drawer';
import { WishlistDrawer } from '@/components/organisms/wishlist-drawer';
import { SearchModal } from '@/components/organisms/search-modal';
import { BackToTop } from '@/components/molecules/back-to-top';
import dynamicNext from 'next/dynamic';
import { placeOrder } from '@/lib/actions/checkout.actions';
import toast from 'react-hot-toast';
import { MapPin, Phone, User, Building, FileText, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const Footer = dynamicNext(() => import('@/components/organisms/footer').then(mod => mod.Footer), { ssr: true });

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useAppStore(state => state.cart);
  const clearCart = useAppStore(state => state.clearCart);

  const [isClient, setIsClient] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    notes: ''
  });
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const { user, loading } = useAuth();
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(-1); // -1 means "New Address"

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login?redirect=/checkout');
    } else if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        phone: user.phone || user.identifier || '',
        email: user.email || ''
      }));

      if (user.address) {
        try {
          const parsed = JSON.parse(user.address);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setSavedAddresses(parsed);
            setSelectedAddressIndex(0);
            setFormData(prev => ({ ...prev, address: parsed[0] }));
          } else if (typeof user.address === 'string' && user.address.trim() && user.address !== '[]') {
            setSavedAddresses([user.address]);
            setSelectedAddressIndex(0);
            setFormData(prev => ({ ...prev, address: user.address }));
          }
        } catch (e) {
          if (user.address && user.address !== '[]') {
            setSavedAddresses([user.address]);
            setSelectedAddressIndex(0);
            setFormData(prev => ({ ...prev, address: user.address }));
          }
        }
      }
    }
  }, [user, loading, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const deliveryCharge = 60; // Fixed for now
  const subtotal = calculateSubtotal();
  const total = subtotal + deliveryCharge - discount;

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }
    // Demo logic for UI
    if (couponCode.toUpperCase() === 'DISCOUNT10') {
      const discountAmount = calculateSubtotal() * 0.1;
      setDiscount(discountAmount);
      toast.success("Coupon applied successfully!");
    } else {
      toast.error("Invalid coupon code");
      setDiscount(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await placeOrder(formData, cart);
      
      if (result.success) {
        toast.success("Order placed successfully!");
        clearCart();
        router.push(`/checkout/success?orderNo=${result.orderNo}`);
      } else {
        toast.error(result.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isClient) {
    return null; // Or a loading skeleton
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <Sidebar />
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <BackToTop />
      
      <main className="flex-1 pt-24 md:pt-36 pb-16">
        <div className="max-w-[95%] xl:max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center text-sm text-slate-500 gap-2 mb-8 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/cart" className="hover:text-blue-600 transition-colors">Cart</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-800 font-medium">Checkout</span>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-8">Checkout</h1>

          {cart.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100">
              <h2 className="text-2xl font-semibold text-slate-700 mb-4">Your cart is empty</h2>
              <p className="text-slate-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
              <button 
                onClick={() => router.push('/shop')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Billing Details Form */}
              <div className="lg:w-2/3">
                <form id="checkout-form" onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100">
                  <h2 className="text-xl font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100">Billing & Shipping Details</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Full Name *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-slate-400" />
                        </div>
                        <input 
                          type="text" 
                          name="name" 
                          required 
                          value={formData.name} 
                          onChange={handleInputChange}
                          className="pl-10 w-full rounded-xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" 
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Phone Number *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-slate-400" />
                        </div>
                        <input 
                          type="tel" 
                          name="phone" 
                          required 
                          value={formData.phone} 
                          onChange={handleInputChange}
                          className="pl-10 w-full rounded-xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" 
                          placeholder="01XXXXXXXXX"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-slate-700">Email Address (Optional)</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" 
                        placeholder="john@example.com"
                      />
                    </div>
                    
                    {savedAddresses.length > 0 ? (
                      <>
                        <div className="space-y-2 md:col-span-2 mb-2">
                          <label className="text-sm font-medium text-slate-700">Select Delivery Address *</label>
                          <select 
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm focus:border-blue-500 outline-none"
                            value={selectedAddressIndex}
                            onChange={(e) => {
                              const idx = Number(e.target.value);
                              setSelectedAddressIndex(idx);
                              setFormData(prev => ({ ...prev, address: savedAddresses[idx] }));
                            }}
                          >
                            {savedAddresses.map((addr, idx) => (
                              <option key={idx} value={idx}>{addr}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium text-slate-700">Selected Address Details</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                              <MapPin className="h-5 w-5 text-slate-400" />
                            </div>
                            <textarea 
                              name="address" 
                              required 
                              rows={2}
                              value={formData.address} 
                              readOnly
                              disabled
                              className="pl-10 w-full rounded-xl border border-slate-200 py-3 px-4 text-sm bg-slate-100 text-slate-600 transition-all outline-none resize-none cursor-not-allowed" 
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium text-slate-700">Delivery Address *</label>
                        <div className="p-4 border border-amber-200 bg-amber-50 rounded-xl text-sm text-amber-800 flex flex-col items-center justify-center gap-3">
                          <p>You don't have any saved address.</p>
                          <Link href="/profile" className="bg-amber-100 hover:bg-amber-200 text-amber-900 px-4 py-2 rounded-lg font-medium transition-colors">
                            Add Address in Profile
                          </Link>
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-slate-700">City *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Building className="h-5 w-5 text-slate-400" />
                        </div>
                        <input 
                          type="text" 
                          name="city" 
                          required 
                          value={formData.city} 
                          onChange={handleInputChange}
                          className="pl-10 w-full rounded-xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" 
                          placeholder="Dhaka"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-slate-700">Order Notes (Optional)</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                          <FileText className="h-5 w-5 text-slate-400" />
                        </div>
                        <textarea 
                          name="notes" 
                          rows={3}
                          value={formData.notes} 
                          onChange={handleInputChange}
                          className="pl-10 w-full rounded-xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all outline-none resize-none" 
                          placeholder="Special instructions for delivery..."
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              {/* Order Summary */}
              <div className="lg:w-1/3">
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 sticky top-32">
                  <h2 className="text-xl font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    {cart.map((item, index) => (
                      <div key={`${item.product.id}-${index}`} className="flex gap-4 items-start">
                        <div className="w-16 h-16 bg-slate-50 rounded-lg border border-slate-100 flex-shrink-0 relative flex items-center justify-center p-1">
                          <span className="absolute -top-2 -right-2 w-5 h-5 bg-slate-800 text-white rounded-full flex items-center justify-center text-[10px] font-bold z-10">
                            {item.quantity}
                          </span>
                          <img src={item.product.image} alt={item.product.title} className="max-w-full max-h-full object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-slate-800 line-clamp-2 leading-snug">{item.product.title}</h4>
                          <p className="text-sm font-bold text-slate-900 mt-1">৳ {item.product.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Have a coupon code?</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        placeholder="Enter code (e.g. DISCOUNT10)"
                        className="flex-1 rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-sm focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-6 mt-6 border-t border-slate-100 text-sm">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span className="font-medium text-slate-900">৳ {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Delivery Charge</span>
                      <span className="font-medium text-slate-900">৳ {deliveryCharge.toLocaleString()}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-medium">
                        <span>Discount ({couponCode})</span>
                        <span>- ৳ {discount.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 mt-4 border-t border-slate-100">
                    <span className="text-base font-bold text-slate-900">Total</span>
                    <span className="text-2xl font-black text-slate-900">৳ {total.toLocaleString()}</span>
                  </div>
                  
                  <button 
                    type="submit"
                    form="checkout-form"
                    disabled={isSubmitting}
                    className="w-full mt-8 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white h-14 rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      "Place Order"
                    )}
                  </button>
                  
                  <div className="mt-4 text-center">
                    <p className="text-[12px] text-slate-500">By placing this order, you agree to our Terms & Conditions and Privacy Policy.</p>
                  </div>
                </div>
              </div>
              
            </div>
          )}

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
