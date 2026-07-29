import { Navbar } from "@/components/organisms/navbar";
import { Sidebar } from "@/components/organisms/sidebar";
import { CartDrawer } from "@/components/organisms/cart-drawer";
import { WishlistDrawer } from "@/components/organisms/wishlist-drawer";
import { SearchModal } from "@/components/organisms/search-modal";
import { BackToTop } from "@/components/molecules/back-to-top";
import dynamic from 'next/dynamic';
import { ShieldCheck, Truck, Clock, Sparkles } from "lucide-react";

const Footer = dynamic(() => import('@/components/organisms/footer').then(mod => mod.Footer), { ssr: true });

const preorderItems = [
  {
    id: 1,
    title: "PlayStation 6 Pro",
    brand: "Sony",
    description: "Experience 8K gaming with 120fps capability and advanced ray tracing. Pre-order now to guarantee delivery on launch day.",
    price: 115000,
    deposit: 15000,
    releaseDate: "Dec 15, 2026",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=800",
    tags: ["Hot", "Limited Stock"]
  },
  {
    id: 2,
    title: "Galaxy S27 Ultra",
    brand: "Samsung",
    description: "The ultimate AI smartphone. Featuring a seamless 100% display, quantum battery tech, and 300MP quad-camera system.",
    price: 165000,
    deposit: 20000,
    releaseDate: "Feb 05, 2027",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=800",
    tags: ["Upcoming"]
  },
  {
    id: 3,
    title: "MacBook Studio M5",
    brand: "Apple",
    description: "Desktop power in a portable chassis. The M5 Max chip redefines professional creative workflows on the go.",
    price: 420000,
    deposit: 50000,
    releaseDate: "Nov 30, 2026",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800",
    tags: ["Professional"]
  }
];

export const metadata = {
  title: "Pre-Order | GADGETS BD",
  description: "Pre-order the latest upcoming gadgets and tech from GADGETS BD.",
};

export default function PreOrderPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <Sidebar />
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <BackToTop />

      <main className="flex-1 pt-24 pb-16">
        
        {/* Hero Section */}
        <div className="relative py-16 md:py-24 bg-muted/30 border-y border-border mb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5 dark:from-primary/5 dark:to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20">
              <Sparkles size={16} /> Be the first to own the future
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground mb-6">
              Exclusive <span className="text-primary">Pre-Orders</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Secure your unit of the most anticipated tech releases before they hit the shelves. 
              Pay a small deposit today and guarantee your launch day delivery.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
            <div className="flex items-center gap-4 p-6 bg-card rounded-2xl border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Guaranteed Stock</h3>
                <p className="text-sm text-muted-foreground">Your unit is reserved globally</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-card rounded-2xl border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Truck size={24} />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Launch Day Delivery</h3>
                <p className="text-sm text-muted-foreground">Delivered straight to your door</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-card rounded-2xl border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Cancel Anytime</h3>
                <p className="text-sm text-muted-foreground">100% refund on deposits</p>
              </div>
            </div>
          </div>

          {/* Preorder Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            {preorderItems.map((item) => (
              <div key={item.id} className="group bg-card rounded-3xl overflow-hidden border border-border hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col">
                <div className="relative h-64 bg-muted overflow-hidden flex items-center justify-center p-8">
                  <div className="absolute top-4 left-4 flex gap-2 z-10">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-background/80 backdrop-blur-md text-foreground text-xs font-bold rounded-lg border border-border">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                    {item.brand}
                  </div>
                  <h3 className="text-2xl font-black text-foreground mb-3 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6 flex-1">
                    {item.description}
                  </p>
                  
                  <div className="bg-muted/50 rounded-2xl p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground font-medium">Full Price:</span>
                      <span className="text-sm font-bold text-foreground line-through opacity-70">
                        ৳{item.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-primary">Pre-order Deposit:</span>
                      <span className="text-xl font-black text-primary">
                        ৳{item.deposit.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-center gap-2 text-sm font-semibold text-foreground bg-secondary py-2.5 rounded-xl border border-border">
                      <Calendar size={16} className="text-muted-foreground" /> 
                      Est. Release: {item.releaseDate}
                    </div>
                    <button className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-black hover:bg-primary/90 transition-all active:scale-95 shadow-md shadow-primary/20">
                      Pre-Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
