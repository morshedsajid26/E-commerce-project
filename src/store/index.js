import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    (set, get) => ({
      // UI Navigation States
      theme: 'system',
      setTheme: (theme) => set({ theme }),
      isMobileNavOpen: false,
      setMobileNavOpen: (isOpen) => set({ isMobileNavOpen: isOpen }),
      isCartOpen: false,
      setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
      isWishlistOpen: false,
      setWishlistOpen: (isOpen) => set({ isWishlistOpen: isOpen }),
      isSearchOpen: false,
      setSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),
      isSidebarOpen: false,
      setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
      isSidebarCollapsed: false,
      toggleCollapse: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),

      // E-commerce Data States
      cart: [],
      wishlist: [],
      compare: [],
      coupon: null, // { code: string, discountPercentage: number }

      // Cart Actions
      addToCart: (product, quantity = 1, variant = null, color = null) => set((state) => {
        // Find if exact item already exists
        const existingItemIndex = state.cart.findIndex(
          (item) => item.product.id === product.id && item.variant === variant && item.color === color
        );
        
        if (existingItemIndex >= 0) {
          const newCart = [...state.cart];
          newCart[existingItemIndex].quantity += quantity;
          return { cart: newCart };
        }
        
        return { cart: [...state.cart, { product, quantity, variant, color }] };
      }),
      removeFromCart: (index) => set((state) => {
        const newCart = [...state.cart];
        newCart.splice(index, 1);
        return { cart: newCart };
      }),
      updateCartQuantity: (index, quantity) => set((state) => {
        const newCart = [...state.cart];
        if (quantity <= 0) {
          newCart.splice(index, 1);
        } else {
          newCart[index].quantity = quantity;
        }
        return { cart: newCart };
      }),
      clearCart: () => set({ cart: [], coupon: null }),
      applyCoupon: (couponCode) => {
        // Dummy coupon logic
        if (couponCode.toUpperCase() === 'PREMIUM20') {
          set({ coupon: { code: 'PREMIUM20', discountPercentage: 20 } });
          return true;
        }
        return false;
      },
      removeCoupon: () => set({ coupon: null }),

      // Wishlist Actions
      toggleWishlist: (productId) => set((state) => {
        const isWishlisted = state.wishlist.includes(productId);
        if (isWishlisted) {
          return { wishlist: state.wishlist.filter(id => id !== productId) };
        } else {
          return { wishlist: [...state.wishlist, productId] };
        }
      }),

      // Compare Actions
      toggleCompare: (productId) => set((state) => {
        const isCompared = state.compare.includes(productId);
        if (isCompared) {
          return { compare: state.compare.filter(id => id !== productId) };
        } else {
          // Limit to 4 items
          if (state.compare.length >= 4) {
            return { compare: [...state.compare.slice(1), productId] };
          }
          return { compare: [...state.compare, productId] };
        }
      }),
      clearCompare: () => set({ compare: [] }),

    }),
    {
      name: 'premium-store-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({ 
        theme: state.theme,
        cart: state.cart,
        wishlist: state.wishlist,
        compare: state.compare,
        coupon: state.coupon
      }), // Only persist these fields
    }
  )
);
