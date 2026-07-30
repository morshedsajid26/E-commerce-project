import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/organisms/navbar";
import { ProductDetailsClient } from "@/components/organisms/product-details-client";
import { Sidebar } from "@/components/organisms/sidebar";
import { CartDrawer } from "@/components/organisms/cart-drawer";
import { WishlistDrawer } from "@/components/organisms/wishlist-drawer";
import { SearchModal } from "@/components/organisms/search-modal";
import { BackToTop } from "@/components/molecules/back-to-top";
import dynamicNext from 'next/dynamic';

const Footer = dynamicNext(() => import('@/components/organisms/footer').then(mod => mod.Footer), { ssr: true });

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) return { title: 'Product Not Found | GADGETS BD' };

  return {
    title: `${product.name} | GADGETS BD`,
    description: `Buy ${product.name} from ${product.company} at the best price.`,
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

  // Fetch a few related products for the carousel based on category
  const relatedProducts = await prisma.product.findMany({
    where: {
      category: product.category,
      id: { not: product.id }
    },
    take: 6,
  });

  // Map product to frontend format
  const mappedProduct = {
    id: product.id,
    title: product.name,
    description: `${product.category} product from ${product.company}`,
    price: product.sellingPrice,
    discount: product.discount || 0,
    rating: "4.5",
    reviews: 10,
    image: product.image || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
    category: product.category,
    brand: product.brand || product.company,
    isNew: product.isNew ?? false,
    stock: product.stock,
    warranty: product.warranty || 'No warranty',
    gallery: product.gallery || [],
  };

  const mappedRelated = relatedProducts.map(p => ({
    id: p.id,
    title: p.name,
    description: `${p.category} product from ${p.company}`,
    price: p.sellingPrice,
    discount: p.discount || 0,
    image: p.image || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
    category: p.category,
    brand: p.brand || p.company,
  }));

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <Sidebar />
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <BackToTop />
      
      <main className="flex-1 pt-24 md:pt-36 pb-16">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <ProductDetailsClient product={mappedProduct} relatedProducts={mappedRelated} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
