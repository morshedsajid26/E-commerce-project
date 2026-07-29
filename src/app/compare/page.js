'use client';

import { useState } from "react";
import { Navbar } from "@/components/organisms/navbar";
import { Sidebar } from "@/components/organisms/sidebar";
import { CartDrawer } from "@/components/organisms/cart-drawer";
import { WishlistDrawer } from "@/components/organisms/wishlist-drawer";
import { SearchModal } from "@/components/organisms/search-modal";
import { BackToTop } from "@/components/molecules/back-to-top";
import dynamic from 'next/dynamic';
import { Plus, X, Search, Smartphone, ShieldCheck, Check, Minus } from "lucide-react";

const Footer = dynamic(() => import('@/components/organisms/footer').then(mod => mod.Footer), { ssr: false });

const dummyProducts = [
  {
    id: 1,
    name: "Galaxy S24 Ultra",
    brand: "Samsung",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=400",
    price: "৳1,50,000",
    specs: {
      Display: "6.8\" Dynamic AMOLED 2X, 120Hz",
      Processor: "Snapdragon 8 Gen 3 for Galaxy",
      RAM: "12GB LPDDR5X",
      Storage: "256GB / 512GB / 1TB UFS 4.0",
      Camera: "200MP + 50MP + 12MP + 10MP",
      Battery: "5000 mAh, 45W Fast Charging",
      OS: "Android 14, One UI 6.1"
    }
  },
  {
    id: 2,
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=400",
    price: "৳1,65,000",
    specs: {
      Display: "6.7\" Super Retina XDR OLED, 120Hz",
      Processor: "A17 Pro (3 nm)",
      RAM: "8GB",
      Storage: "256GB / 512GB / 1TB NVMe",
      Camera: "48MP + 12MP + 12MP",
      Battery: "4422 mAh, 20W Fast Charging",
      OS: "iOS 17"
    }
  }
];

const specKeys = ["Display", "Processor", "RAM", "Storage", "Camera", "Battery", "OS"];

export default function ComparePage() {
  const [comparedProducts, setComparedProducts] = useState(dummyProducts);
  
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <Sidebar />
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <BackToTop />

      <main className="flex-1 pt-24 pb-20">
        
        <div className="max-w-[95%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12 text-center max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">
              Compare <span className="text-primary">Products</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Not sure which one to choose? Compare technical specifications side-by-side to find the perfect fit.
            </p>
          </div>

          <div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
            <div className="overflow-x-auto hide-scrollbar">
              <table className="w-full text-left min-w-[800px]">
                
                {/* Product Headers */}
                <thead>
                  <tr>
                    <th className="p-8 w-1/4 min-w-[200px] align-bottom bg-muted/30 border-b border-border border-r">
                      <div className="flex flex-col items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                          <Smartphone size={24} />
                        </div>
                        <h3 className="font-bold text-foreground text-xl">Technical Specs</h3>
                        <p className="text-xs text-muted-foreground font-medium">Side by side comparison</p>
                      </div>
                    </th>
                    
                    {comparedProducts.map((product) => (
                      <th key={product.id} className="p-8 w-1/4 min-w-[250px] bg-background border-b border-border border-r relative group">
                        <button 
                          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors opacity-0 group-hover:opacity-100"
                          onClick={() => setComparedProducts(comparedProducts.filter(p => p.id !== product.id))}
                          title="Remove from comparison"
                        >
                          <X size={14} />
                        </button>
                        
                        <div className="flex flex-col items-center text-center">
                          <div className="w-32 h-32 mb-6 rounded-2xl overflow-hidden bg-muted p-2">
                            <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                          </div>
                          <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2">{product.brand}</span>
                          <h4 className="text-lg font-black text-foreground mb-1">{product.name}</h4>
                          <span className="text-lg font-bold text-foreground mb-6">{product.price}</span>
                          <button className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors shadow-sm">
                            View Details
                          </button>
                        </div>
                      </th>
                    ))}
                    
                    {comparedProducts.length < 3 && (
                      <th className="p-8 w-1/4 min-w-[250px] bg-muted/10 border-b border-border border-r border-dashed">
                        <div className="flex flex-col items-center justify-center h-full text-center min-h-[300px]">
                          <button className="w-16 h-16 rounded-full bg-card border-2 border-dashed border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors mb-4 shadow-sm group">
                            <Plus size={24} className="group-hover:scale-125 transition-transform" />
                          </button>
                          <span className="font-bold text-foreground">Add a product</span>
                          <span className="text-xs text-muted-foreground mt-1">Search catalogue</span>
                        </div>
                      </th>
                    )}
                  </tr>
                </thead>

                {/* Specs Body */}
                <tbody className="divide-y divide-border">
                  {specKeys.map((key) => (
                    <tr key={key} className="hover:bg-muted/20 transition-colors">
                      <td className="p-6 font-bold text-sm text-foreground bg-muted/10 border-r border-border">
                        {key}
                      </td>
                      {comparedProducts.map((product) => (
                        <td key={product.id} className="p-6 text-sm text-muted-foreground font-medium border-r border-border text-center">
                          {product.specs[key] || <Minus size={16} className="mx-auto text-zinc-300" />}
                        </td>
                      ))}
                      {comparedProducts.length < 3 && (
                        <td className="p-6 bg-muted/5 border-r border-border border-dashed"></td>
                      )}
                    </tr>
                  ))}
                  
                  {/* Common Features (Dummy Row) */}
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="p-6 font-bold text-sm text-foreground bg-muted/10 border-r border-border">
                      Official Warranty
                    </td>
                    {comparedProducts.map((product) => (
                      <td key={product.id} className="p-6 border-r border-border">
                        <div className="flex items-center justify-center text-emerald-500">
                          <Check size={20} />
                        </div>
                      </td>
                    ))}
                    {comparedProducts.length < 3 && (
                      <td className="p-6 bg-muted/5 border-r border-border border-dashed"></td>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
            
            {comparedProducts.length === 0 && (
              <div className="p-20 text-center flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-6">
                  <Search size={32} />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">No products selected</h3>
                <p className="text-muted-foreground">Add some products to compare their specs side-by-side.</p>
              </div>
            )}
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
