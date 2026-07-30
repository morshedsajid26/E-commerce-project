import { Navbar } from "@/components/organisms/navbar";
import { Sidebar } from "@/components/organisms/sidebar";
import { CartDrawer } from "@/components/organisms/cart-drawer";
import { WishlistDrawer } from "@/components/organisms/wishlist-drawer";
import { SearchModal } from "@/components/organisms/search-modal";
import { BackToTop } from "@/components/molecules/back-to-top";
import dynamic from 'next/dynamic';
import { Tag, Copy, ArrowRight, Gift, Flame } from "lucide-react";

const Footer = dynamic(() => import('@/components/organisms/footer').then(mod => mod.Footer), { ssr: true });

const activeOffers = [
  {
    id: 1,
    title: "Diwali Mega Sale",
    description: "Get up to 40% off on all smart home appliances and lighting. Offer valid till end of the month.",
    code: "DIWALI40",
    color: "from-orange-500 to-rose-500",
    icon: Flame,
    expiry: "2 Days Left"
  },
  {
    id: 2,
    title: "First Purchase Discount",
    description: "Welcome to GADGETS BD! Enjoy a flat 10% discount on your first order. Minimum cart value ৳5,000.",
    code: "WELCOME10",
    color: "from-medical-blue-500 to-blue-700",
    icon: Gift,
    expiry: "Valid Forever"
  },
  {
    id: 3,
    title: "Student Discount",
    description: "Verify your student ID and get 15% off on all MacBooks, iPads, and selected accessories.",
    code: "STUDENT15",
    color: "from-emerald-500 to-teal-700",
    icon: Tag,
    expiry: "Requires Verification"
  }
];

export const metadata = {
  title: "Offers & Discounts | GADGETS BD",
  description: "Find the latest coupon codes, flash sales, and exclusive discounts at GADGETS BD.",
};

export default function OffersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <Sidebar />
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <BackToTop />

      <main className="flex-1 pt-24 md:pt-36 pb-20">
        
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
            <Gift size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">
            Exclusive <span className="text-primary">Offers</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Grab these limited-time deals and maximize your savings. Apply the promo codes at checkout.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
            {activeOffers.map((offer) => {
              const Icon = offer.icon;
              return (
                <div key={offer.id} className="relative group rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-border">
                  {/* Card Background Gradient */}
                  <div className={`absolute top-0 left-0 w-full h-32 bg-gradient-to-br ${offer.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
                  
                  <div className="relative p-8 bg-card h-full flex flex-col">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${offer.color} text-white flex items-center justify-center mb-6 shadow-lg shadow-black/5`}>
                      <Icon size={24} />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-foreground mb-3">{offer.title}</h3>
                    <p className="text-muted-foreground text-sm flex-1 mb-8">
                      {offer.description}
                    </p>
                    
                    <div className="mt-auto">
                      <div className="flex items-center justify-between bg-muted/50 border border-border rounded-xl p-2 pl-4 mb-4">
                        <span className="font-mono font-bold text-foreground tracking-wider">{offer.code}</span>
                        <button className="flex items-center gap-2 px-4 py-2 bg-background hover:bg-muted text-foreground text-xs font-bold rounded-lg border border-border transition-colors">
                          <Copy size={14} /> Copy
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-muted-foreground px-3 py-1 bg-secondary rounded-full">
                          {offer.expiry}
                        </span>
                        <button className="text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
                          Shop Now <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Flash Sale Banner */}
          <div className="mt-20 relative rounded-3xl overflow-hidden bg-zinc-950 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 border border-zinc-800 shadow-2xl animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20 mix-blend-overlay" />
            <div className="relative z-10 max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/20 text-rose-400 font-bold text-xs uppercase tracking-wider mb-6 border border-rose-500/30">
                <Flame size={14} className="animate-pulse" /> Flash Sale Ending Soon
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
                Up to 50% Off on Audio Gear
              </h2>
              <p className="text-zinc-400 text-lg mb-8">
                Premium headphones, soundbars, and TWS earbuds at unbelievable prices. Stock is highly limited.
              </p>
              <button className="px-8 py-4 rounded-xl bg-white text-zinc-950 font-black hover:bg-zinc-200 transition-colors">
                Browse Audio Deals
              </button>
            </div>
            
            <div className="relative z-10 w-full md:w-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { label: "Days", value: "02" },
                  { label: "Hours", value: "14" },
                  { label: "Mins", value: "45" },
                  { label: "Secs", value: "22" }
                ].map((time) => (
                  <div key={time.label} className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-700 rounded-2xl p-4 flex flex-col items-center justify-center min-w-[80px]">
                    <span className="text-3xl font-black text-white font-mono">{time.value}</span>
                    <span className="text-[10px] uppercase font-bold text-zinc-500 mt-1">{time.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
