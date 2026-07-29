import { Navbar } from "@/components/organisms/navbar";
import { Sidebar } from "@/components/organisms/sidebar";
import { CartDrawer } from "@/components/organisms/cart-drawer";
import { WishlistDrawer } from "@/components/organisms/wishlist-drawer";
import { SearchModal } from "@/components/organisms/search-modal";
import { BackToTop } from "@/components/molecules/back-to-top";
import dynamic from 'next/dynamic';
import { ArrowRight, Calendar, User, Clock } from "lucide-react";

const Footer = dynamic(() => import('@/components/organisms/footer').then(mod => mod.Footer), { ssr: true });

const placeholderBlogs = [
  {
    id: 1,
    title: "The Ultimate Guide to Choosing the Right MacBook in 2026",
    excerpt: "With so many options from the Air to the Studio, find out which MacBook perfectly fits your workflow and budget.",
    author: "Sajid Hasan",
    date: "Oct 24, 2026",
    readTime: "5 min read",
    category: "Laptops",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Top 5 Noise-Cancelling Headphones for Focus",
    excerpt: "Block out the world and dive into your work with our top picks for the best active noise-cancelling headphones this year.",
    author: "Tech Reviewer",
    date: "Oct 20, 2026",
    readTime: "7 min read",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Smart Home Starter Kit: What You Actually Need",
    excerpt: "Thinking of automating your home? Here are the essential smart gadgets you need to get started without overspending.",
    author: "Jane Doe",
    date: "Oct 15, 2026",
    readTime: "6 min read",
    category: "Smart Home",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "Mechanical vs Membrane Keyboards: A Deep Dive",
    excerpt: "Discover the tactile differences, typing speeds, and sound profiles of mechanical versus traditional membrane keyboards.",
    author: "Sajid Hasan",
    date: "Oct 10, 2026",
    readTime: "8 min read",
    category: "Peripherals",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    title: "Next-Gen Gaming Consoles: Worth the Upgrade?",
    excerpt: "An in-depth comparison of the latest gaming consoles. Find out if the performance leap justifies the premium price tag.",
    author: "Gamer Elite",
    date: "Oct 05, 2026",
    readTime: "10 min read",
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    title: "How to Maximize Your Smartphone Battery Life",
    excerpt: "Simple tweaks and habits that can significantly extend your smartphone's daily battery life and overall battery health.",
    author: "Tech Tips",
    date: "Sep 28, 2026",
    readTime: "4 min read",
    category: "Smartphones",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800",
  }
];

export const metadata = {
  title: "Blog | GADGETS BD",
  description: "Latest tech news, reviews, and buying guides from GADGETS BD.",
};

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <Sidebar />
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <BackToTop />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-12 text-center max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">
              Our <span className="text-primary">Blog</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Discover the latest tech news, in-depth reviews, and expert buying guides.
            </p>
          </div>

          {/* Featured Post */}
          <div className="mb-16 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
            <div className="relative overflow-hidden rounded-3xl bg-muted group cursor-pointer border border-border hover:border-primary/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200" 
                alt="Featured Post" 
                className="w-full h-[400px] md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20">
                <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                  Featured
                </span>
                <h2 className="text-2xl md:text-4xl font-black text-white leading-tight mb-4 max-w-3xl">
                  The Future of AI in Consumer Electronics: What to Expect Next
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-zinc-300 text-sm font-medium">
                  <div className="flex items-center gap-1.5"><User size={16} /> Admin</div>
                  <div className="flex items-center gap-1.5"><Calendar size={16} /> Oct 25, 2026</div>
                  <div className="flex items-center gap-1.5"><Clock size={16} /> 12 min read</div>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            {placeholderBlogs.map((blog) => (
              <article key={blog.id} className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col">
                <div className="relative h-56 overflow-hidden bg-muted">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 bg-background/90 backdrop-blur-sm text-foreground text-xs font-bold uppercase tracking-wider rounded-md">
                      {blog.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium mb-3">
                    <div className="flex items-center gap-1"><Calendar size={14} /> {blog.date}</div>
                    <span>•</span>
                    <div className="flex items-center gap-1"><Clock size={14} /> {blog.readTime}</div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                        {blog.author.charAt(0)}
                      </div>
                      <span className="text-sm font-semibold text-foreground">{blog.author}</span>
                    </div>
                    <button className="text-primary hover:text-primary/80 transition-colors p-2 -mr-2">
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors shadow-md hover:shadow-xl hover:shadow-primary/20">
              Load More Articles
            </button>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
