import prisma from "@/lib/prisma";
import { Navbar } from "@/components/organisms/navbar";
import { Sidebar } from "@/components/organisms/sidebar";
import { CartDrawer } from "@/components/organisms/cart-drawer";
import { WishlistDrawer } from "@/components/organisms/wishlist-drawer";
import { SearchModal } from "@/components/organisms/search-modal";
import { BackToTop } from "@/components/molecules/back-to-top";
import { CategoryFilterClient } from "@/components/organisms/category-filter-client";
import dynamicNext from 'next/dynamic';

const Footer = dynamicNext(() => import('@/components/organisms/footer').then(mod => mod.Footer), { ssr: true });

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const categoryName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return {
    title: `${categoryName} | GADGETS BD`,
    description: `Shop the best ${categoryName} at GADGETS BD.`,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const searchTerm = slug.replace(/-/g, ' ');
  const categoryName = searchTerm.replace(/\b\w/g, l => l.toUpperCase());

  // Search products where category, brand, or name contains the search term
  const dbProducts = await prisma.product.findMany({
    where: {
      OR: [
        { category: { contains: searchTerm, mode: 'insensitive' } },
        { brand: { contains: searchTerm, mode: 'insensitive' } },
        { name: { contains: searchTerm, mode: 'insensitive' } },
      ],
    },
    orderBy: { createdAt: 'desc' },
  });

  const products = dbProducts.map(p => ({
    id: p.id,
    title: p.name,
    description: `${p.category} product from ${p.company}`,
    price: p.sellingPrice,
    oldPrice: p.sellingPrice * 1.1,
    discount: p.discount || 0,
    rating: "4.5",
    reviews: 10,
    image: p.image || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
    category: p.category,
    brand: p.brand || p.company,
    isNew: p.isNew ?? false,
    stock: p.stock,
    delivery: "Free Delivery in Bangladesh",
  }));

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <Sidebar />
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <BackToTop />

      <main className="flex-1 pt-24 md:pt-36 pb-16">
        <div className="max-w-[95%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryFilterClient 
            initialProducts={products} 
            categoryName={categoryName} 
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
