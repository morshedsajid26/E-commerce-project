'use client';

import { useState, useEffect } from "react";
import { Navbar } from "@/components/organisms/navbar";
import { Sidebar } from "@/components/organisms/sidebar";
import { CartDrawer } from "@/components/organisms/cart-drawer";
import { WishlistDrawer } from "@/components/organisms/wishlist-drawer";
import { SearchModal } from "@/components/organisms/search-modal";
import { BackToTop } from "@/components/molecules/back-to-top";
import dynamic from 'next/dynamic';
import { Plus, X, Search, Smartphone, ShieldCheck, Check, Minus, Loader2 } from "lucide-react";
import { useAppStore } from "@/store";
import { getProductsByIds } from "@/lib/actions/product.actions";
import Link from "next/link";

const Footer = dynamic(() => import('@/components/organisms/footer').then(mod => mod.Footer), { ssr: false });

const specKeys = [
  { label: "Brand", key: "brand" },
  { label: "Company", key: "company" },
  { label: "Category", key: "category" },
  { label: "Stock Status", key: "status" },
  { label: "Stock Quantity", key: "stock" },
  { label: "Warranty", key: "warranty" },
  { label: "Discount", key: "discount" },
];

export default function ComparePage() {
  const compareIds = useAppStore(state => state.compare);
  const toggleCompare = useAppStore(state => state.toggleCompare);
  
  const [comparedProducts, setComparedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      if (compareIds.length > 0) {
        try {
          const products = await getProductsByIds(compareIds);
          setComparedProducts(products);
        } catch (error) {
          console.error("Failed to load compared products", error);
        }
      } else {
        setComparedProducts([]);
      }
      setIsLoading(false);
    }
    loadProducts();
  }, [compareIds]);
  
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <Sidebar />
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <BackToTop />

      <main className="flex-1 pt-24 md:pt-36 pb-20">
        
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
            {isLoading ? (
              <div className="flex flex-col items-center justify-center p-20 min-h-[400px]">
                <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                <p className="text-muted-foreground">Loading products for comparison...</p>
              </div>
            ) : comparedProducts.length > 0 ? (
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
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                            onClick={() => toggleCompare(product.id)}
                            title="Remove from comparison"
                          >
                            <X size={14} />
                          </button>
                          
                          <div className="flex flex-col items-center text-center">
                            <div className="w-32 h-32 mb-6 rounded-2xl overflow-hidden bg-white border p-2">
                              <img src={product.image || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80"} alt={product.name} className="w-full h-full object-contain" />
                            </div>
                            <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2">{product.brand || product.company}</span>
                            <h4 className="text-lg font-black text-foreground mb-1 line-clamp-2 min-h-[56px]">{product.name}</h4>
                            <span className="text-lg font-bold text-foreground mb-6">৳{product.sellingPrice.toLocaleString()}</span>
                            <Link href={`/product/${product.id}`} className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors shadow-sm block text-center">
                              View Details
                            </Link>
                          </div>
                        </th>
                      ))}
                      
                      {comparedProducts.length < 4 && (
                        <th className="p-8 w-1/4 min-w-[250px] bg-muted/10 border-b border-border border-r border-dashed">
                          <div className="flex flex-col items-center justify-center h-full text-center min-h-[300px]">
                            <Link href="/shop" className="w-16 h-16 rounded-full bg-card border-2 border-dashed border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors mb-4 shadow-sm group">
                              <Plus size={24} className="group-hover:scale-125 transition-transform" />
                            </Link>
                            <span className="font-bold text-foreground">Add a product</span>
                            <span className="text-xs text-muted-foreground mt-1">Search catalogue</span>
                          </div>
                        </th>
                      )}
                    </tr>
                  </thead>

                  {/* Specs Body */}
                  <tbody className="divide-y divide-border">
                    {specKeys.map((spec) => (
                      <tr key={spec.key} className="hover:bg-muted/20 transition-colors">
                        <td className="p-6 font-bold text-sm text-foreground bg-muted/10 border-r border-border">
                          {spec.label}
                        </td>
                        {comparedProducts.map((product) => (
                          <td key={product.id} className="p-6 text-sm text-muted-foreground font-medium border-r border-border text-center">
                            {product[spec.key] ? (
                              spec.key === 'discount' && product[spec.key] > 0 
                                ? `${product[spec.key]}%` 
                                : String(product[spec.key])
                            ) : (
                              <Minus size={16} className="mx-auto text-zinc-300" />
                            )}
                          </td>
                        ))}
                        {comparedProducts.length < 4 && (
                          <td className="p-6 bg-muted/5 border-r border-border border-dashed"></td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-20 text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-6">
                  <Search size={32} />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">No products selected</h3>
                <p className="text-muted-foreground mb-6">Add some products to compare their specs side-by-side.</p>
                <Link href="/shop" className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
                  Browse Products
                </Link>
              </div>
            )}
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
