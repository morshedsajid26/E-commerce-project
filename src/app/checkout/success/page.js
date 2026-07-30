"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Package, ArrowRight, ShoppingBag } from 'lucide-react';
import { Navbar } from '@/components/organisms/navbar';
import dynamicNext from 'next/dynamic';

const Footer = dynamicNext(() => import('@/components/organisms/footer').then(mod => mod.Footer), { ssr: true });

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const [orderNo, setOrderNo] = useState('');
  
  useEffect(() => {
    setOrderNo(searchParams.get('orderNo') || '');
  }, [searchParams]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center pt-32 md:pt-40 pb-20 px-4">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-emerald-500/10 border border-slate-100 max-w-lg w-full text-center relative overflow-hidden">
          
          {/* Decorative background circle */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-60"></div>
          
          <div className="relative z-10">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Order Confirmed!</h1>
            <p className="text-slate-500 mb-8">Thank you for your purchase. We have received your order and will start processing it shortly.</p>
            
            {orderNo && (
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8">
                <p className="text-sm font-medium text-slate-500 mb-1">Your Order Number</p>
                <div className="flex items-center justify-center gap-2">
                  <Package className="w-5 h-5 text-slate-400" />
                  <span className="text-xl font-bold text-slate-800 tracking-wider">{orderNo}</span>
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/shop" 
                className="flex items-center justify-center gap-2 h-12 px-6 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
