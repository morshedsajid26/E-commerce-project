"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, ShoppingCart, Check, ShieldCheck, Truck, ChevronRight, ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/atoms/button';
import { useAppStore } from '@/store';
import { ProductCard } from '@/components/molecules/product-card';

export function ProductDetailsClient({ product, relatedProducts }) {
  const allImages = [product.image, ...(product.gallery || [])].filter(Boolean);
  const fallbackImage = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80";
  
  const [activeImage, setActiveImage] = useState(allImages[0] || fallbackImage);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specification');
  const [activeColor, setActiveColor] = useState('Black');

  const addToCart = useAppStore(state => state.addToCart);
  const setCartOpen = useAppStore(state => state.setCartOpen);
  const toggleCompare = useAppStore(state => state.toggleCompare);
  const compareIds = useAppStore(state => state.compare);
  const isCompared = compareIds.includes(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setCartOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setCartOpen(true);
    // In a real app, you would redirect to checkout here: window.location.href = '/checkout';
  };

  // Pricing logic
  const hasDiscount = (product.discount || 0) > 0;
  const displayOldPrice = hasDiscount 
    ? (product.price / (1 - product.discount / 100))
    : product.oldPrice;

  return (
    <div className="flex flex-col space-y-12 pb-16">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-slate-500 gap-2 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href={`/category/${product.category}`} className="hover:text-blue-600 transition-colors">{product.category}</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-800 font-medium">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Images (col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative w-full aspect-square bg-white rounded-2xl border border-slate-100 p-8 flex items-center justify-center">
            <Image 
              src={activeImage}
              fill
              alt={product.title}
              className="object-contain p-4 drop-shadow-xl"
            />
          </div>
          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {allImages.map((img, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative aspect-square bg-white border ${activeImage === img ? 'border-orange-500 shadow-md shadow-orange-500/20' : 'border-slate-100'} rounded-xl cursor-pointer hover:border-orange-500 transition-all p-2`}
                >
                  <Image 
                    src={img}
                    fill
                    alt={`Thumbnail ${idx + 1}`}
                    className="object-contain p-2"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Middle: Info & Actions (col-span-5) */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 leading-snug mb-2">{product.title}</h1>
            <div className="flex items-center gap-4 text-sm mb-4">
              <span className="flex items-center gap-1.5 font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">
                Availability: {product.stock > 0 ? <span className="text-emerald-600">In Stock</span> : <span className="text-red-500">Out of Stock</span>}
              </span>
              <span className="text-slate-500">Code: {product.id.substring(0, 8).toUpperCase()}</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-black text-slate-900">
                ৳{product.price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
              </span>
              {hasDiscount && (
                <span className="text-lg text-slate-400 line-through font-medium">
                  ৳{displayOldPrice.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                </span>
              )}
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <span className="block text-sm font-semibold text-slate-700 mb-3">Color: <span className="text-slate-500 font-normal">{activeColor}</span></span>
              <div className="flex items-center gap-3">
                {['Black', 'White', 'Silver'].map(color => (
                  <button 
                    key={color} 
                    onClick={() => setActiveColor(color)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium transition-all ${
                      activeColor === color ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full border border-slate-200 shadow-inner ${color === 'Black' ? 'bg-slate-900' : color === 'White' ? 'bg-white' : 'bg-slate-300'}`} />
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <span className="block text-sm font-semibold text-slate-700 mb-3">Quantity</span>
              <div className="flex items-center w-32 bg-white border border-slate-200 rounded-lg overflow-hidden">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="flex-1 text-center font-semibold text-slate-800">{quantity}</div>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4 mb-8">
              <Button onClick={handleBuyNow} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 text-base rounded-xl shadow-lg shadow-orange-500/30">
                Buy Now
              </Button>
              <Button onClick={handleAddToCart} variant="outline" className="flex-1 border-emerald-500 text-emerald-600 hover:bg-emerald-50 font-bold h-12 text-base rounded-xl">
                Add to Cart
              </Button>
              <Button 
                onClick={() => toggleCompare(product.id)}
                variant="outline" 
                className={`w-12 h-12 p-0 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors shrink-0 ${
                  isCompared ? 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 hover:text-blue-700' : ''
                }`}
                title={isCompared ? "Remove from Compare" : "Add to Compare"}
              >
                <ArrowLeftRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Info Cards */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-100 text-emerald-700 text-sm font-medium">
                <Truck className="w-5 h-5" /> Delivery Time: 2-4 Days
              </div>
              {product.warranty && (
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100 text-blue-700 text-sm font-medium">
                  <ShieldCheck className="w-5 h-5" /> Warranty: {product.warranty}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Recently Viewed (col-span-3) */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-slate-100 rounded-2xl p-5 sticky top-28">
            <h3 className="font-bold text-slate-900 mb-4 text-lg">Recently Viewed</h3>
            <div className="flex flex-col gap-4">
              {relatedProducts.slice(0, 4).map(rp => (
                <Link key={rp.id} href={`/product/${rp.id}`} className="flex items-center gap-4 group">
                  <div className="w-16 h-16 relative bg-slate-50 rounded-lg border border-slate-100 p-1 flex-shrink-0">
                    <Image src={rp.image} fill alt={rp.title} className="object-contain" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-slate-800 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight mb-1">{rp.title}</h4>
                    <span className="font-bold text-slate-900 text-sm">৳{rp.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Details Tabs Section */}
      <div className="mt-12 bg-white border border-slate-100 rounded-2xl overflow-hidden">
        <div className="flex items-center border-b border-slate-100">
          {['specification', 'description', 'warranty'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 font-semibold text-sm uppercase tracking-wider transition-colors ${
                activeTab === tab ? 'text-orange-500 border-b-2 border-orange-500 bg-orange-50/30' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="p-8 lg:p-12">
          {activeTab === 'specification' && (
            <div className="max-w-4xl">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Specifications</h3>
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-sm text-left">
                  <tbody>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <td className="w-1/3 px-6 py-4 font-semibold text-slate-700 border-r border-slate-200">Brand</td>
                      <td className="px-6 py-4 text-slate-600">{product.brand}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="w-1/3 px-6 py-4 font-semibold text-slate-700 border-r border-slate-200">Category</td>
                      <td className="px-6 py-4 text-slate-600">{product.category}</td>
                    </tr>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <td className="w-1/3 px-6 py-4 font-semibold text-slate-700 border-r border-slate-200">Model Name</td>
                      <td className="px-6 py-4 text-slate-600">{product.title}</td>
                    </tr>
                    <tr>
                      <td className="w-1/3 px-6 py-4 font-semibold text-slate-700 border-r border-slate-200">Stock Status</td>
                      <td className="px-6 py-4 text-slate-600">{product.stock > 0 ? "In Stock" : "Out of Stock"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'description' && (
            <div className="prose prose-slate max-w-4xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{product.title} - Overview</h3>
              <p className="text-slate-600 leading-relaxed mb-8">
                {product.description}. Discover the perfect blend of innovation and elegance with the new {product.title}. Designed to meet all your professional and personal needs, this {product.category} from {product.company} delivers unmatched performance, brilliant display quality, and exceptional battery life. Whether you're working on complex projects, streaming your favorite shows, or staying connected with loved ones, it ensures a seamless experience.
              </p>
              
              <div className="w-full h-80 relative rounded-2xl overflow-hidden mb-8 bg-slate-100 flex items-center justify-center">
                 <Image src={product.image} fill alt="Product highlight" className="object-cover opacity-90" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                    <h4 className="text-3xl font-black text-white">{product.brand} Excellence</h4>
                 </div>
              </div>

              <h4 className="text-lg font-bold text-slate-900 mb-3">Key Highlights</h4>
              <ul className="space-y-2 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-slate-600">Premium build quality designed by {product.company}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-slate-600">High performance guaranteed for all your {product.category} tasks</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-slate-600">Long-lasting durability with {product.warranty || 'standard warranty'}</span>
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'warranty' && (
            <div className="max-w-4xl">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Warranty Information</h3>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-blue-900">
                <p className="mb-4">
                  This product comes with a <strong>{product.warranty || "standard manufacturer warranty"}</strong>. 
                </p>
                <p>
                  Please keep your invoice safe, as it will be required to claim warranty services. Physical damage, liquid damage, and unauthorized tampering are not covered under standard warranty policies.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Carousel */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {relatedProducts.slice(0, 6).map(rp => (
            <ProductCard key={rp.id} product={rp} />
          ))}
        </div>
      </div>

    </div>
  );
}
