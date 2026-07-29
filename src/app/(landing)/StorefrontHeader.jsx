'use client';

import Link from "next/link";
import { PlusCircle, Clock, User, LogOut, ShoppingBag, Search, X, LayoutDashboard, Settings, UserCircle, Cpu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState, useRef, useEffect } from "react";

import { ThemeToggle } from "@/components/molecules/theme-toggle";

export default function StorefrontHeader({ 
  cartCount, 
  onOrdersClick, 
  onCartClick,
  searchQuery,
  setSearchQuery
}) {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/75 backdrop-blur-xl border-b border-slate-100/80 shadow-sm transition-all duration-300 dark:bg-slate-900/75 dark:border-slate-800">
      <div className="max-w-[95%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Logo Brand */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0 hover:opacity-90 transition-opacity">
          <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-medical-blue-600 to-medical-blue-500 flex items-center justify-center shadow-lg shadow-medical-blue-500/25">
            <Cpu className="text-white w-5 h-5 sm:w-7 sm:h-7" />
          </div>
          <div>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <h1 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none hidden sm:block">
                GADGETS <span className="text-medical-blue-600 dark:text-medical-blue-400">BD</span>
              </h1>
              <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 relative" title="Store Active Online">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500"></span>
              </span>
            </div>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-1 sm:mx-4">
          <div className="relative group w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 sm:w-5 sm:h-5 group-focus-within:text-medical-blue-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Search medicines, categories, brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 sm:h-12 pl-9 sm:pl-11 pr-9 sm:pr-11 rounded-xl sm:rounded-2xl bg-slate-50 text-slate-800 placeholder-slate-400 font-medium text-xs sm:text-sm border border-slate-200/60 focus:border-medical-blue-400 focus:bg-white focus:ring-2 focus:ring-medical-blue-500/10 transition-all outline-none shadow-inner dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:placeholder-slate-500 dark:focus:bg-slate-800"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                title="Clear Search"
              >
                <X size={16} className="sm:w-5 sm:h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Header Controls */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <ThemeToggle />
          
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-slate-600 hover:bg-slate-100 hover:text-medical-blue-600 font-bold text-xs sm:text-sm transition-all cursor-pointer dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-medical-blue-400"
            title="Shop Medicines"
          >
            <ShoppingBag size={16} className="w-4 h-4" />
            <span className="hidden lg:inline">Shop</span>
          </Link>

          <div className="relative" ref={dropdownRef}>
            {user ? (
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300"
                title="Account Menu"
              >
                <User size={20} />
              </button>
            ) : (
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300"
                title="Account Menu"
              >
                <User size={20} />
              </button>
            )}

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 py-2 z-50 overflow-hidden">
                {user ? (
                  <>
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email || user.phone || "user@example.com"}</p>
                    </div>

                    <Link 
                      href={user.type === "admin" ? "/dashboard" : "/profile"} 
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-medical-blue-600 transition-colors cursor-pointer dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-medical-blue-400" 
                      onClick={() => setDropdownOpen(false)}
                    >
                       Dashboard
                    </Link>
                    
                    <div className="border-t border-slate-100 dark:border-slate-800 mt-1 pt-1">
                      <button onClick={() => { logout(); setDropdownOpen(false); }} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer text-left">
                         Log out
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-medical-blue-600 transition-colors cursor-pointer dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-medical-blue-400" onClick={() => setDropdownOpen(false)}>
                       Log In
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
