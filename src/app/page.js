import { HeroSection } from "@/components/organisms/hero/hero-section";
import { FeaturedCategories } from "@/components/organisms/featured-categories";
import { ProductGridSection } from "@/components/organisms/product-grid-section";
import prisma from "@/lib/prisma";
import dynamic from 'next/dynamic';

import { Navbar } from "@/components/organisms/navbar";
import { Sidebar } from "@/components/organisms/sidebar";
import { CartDrawer } from "@/components/organisms/cart-drawer";
import { WishlistDrawer } from "@/components/organisms/wishlist-drawer";
import { SearchModal } from "@/components/organisms/search-modal";
import { BackToTop } from "@/components/molecules/back-to-top";

const FlashSale = dynamic(() => import('@/components/organisms/flash-sale').then(mod => mod.FlashSale), { ssr: true });
const WhyChooseUs = dynamic(() => import('@/components/organisms/why-choose-us').then(mod => mod.WhyChooseUs), { ssr: true });
const Testimonials = dynamic(() => import('@/components/organisms/testimonials').then(mod => mod.Testimonials), { ssr: true });
const Newsletter = dynamic(() => import('@/components/organisms/newsletter').then(mod => mod.Newsletter), { ssr: true });
const Footer = dynamic(() => import('@/components/organisms/footer').then(mod => mod.Footer), { ssr: true });

export default async function Home() {
  const dbProducts = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50
  });

  const products = dbProducts.map(p => ({
    id: p.id,
    title: p.name,
    description: `${p.category} product from ${p.company}`,
    price: p.sellingPrice,
    oldPrice: p.sellingPrice * 1.1,
    discount: 10,
    rating: "4.5",
    reviews: 10,
    image: p.image || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
    category: p.category,
    brand: p.brand || p.company,
    isNew: true,
    stock: p.stock,
    delivery: "Free Delivery in Bangladesh",
  }));

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      {/* Global Navigation Overlays */}
      <Sidebar />
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <BackToTop />

      <main className="flex-1 pt-24">
        <HeroSection />
        
        <FeaturedCategories />
        
        {/* Reusing ProductGridSection for various categories */}
        <ProductGridSection 
          title="Featured Products" 
          subtitle="Handpicked premium selections."
          products={products} 
          viewAllLink="/shop"
        />
        
        <FlashSale products={products} />
        
        <ProductGridSection 
          title="Trending Now" 
          products={products.slice().reverse()} 
        />

        <ProductGridSection 
          title="Smartphone Collection" 
          products={products.filter(p => p.category === "Smartphone")} 
          viewAllLink="/category/smartphone"
        />

        {/* For brevity, passing subsets of real data to represent other collections */}
        <ProductGridSection 
          title="Laptops & Desktops" 
          products={products.filter(p => p.category === "Laptops" || p.category === "Desktops")} 
          viewAllLink="/category/computers"
        />

        <ProductGridSection 
          title="Accessories & Others" 
          products={products.filter(p => p.category !== "Smartphone" && p.category !== "Laptops")} 
          viewAllLink="/category/accessories"
        />

        <WhyChooseUs />
        <Testimonials />
        <Newsletter />
        <Footer />
      </main>
    </div>
  );
}
