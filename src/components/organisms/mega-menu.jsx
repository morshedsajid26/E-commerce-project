"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/atoms/navigation-menu";

const categories = [
  { name: "Apple Products", items: ["iPhone", "iPad", "MacBook", "Mac mini", "Apple Watch", "AirPods", "Accessories"] },
  { name: "Phones", items: ["iPhone", "Samsung", "Google", "Motorola", "Xiaomi", "Phone Cover", "Screen Protector", "Camera Protector", "Honor", "OnePlus"] },
  { name: "Tablets & Accessories", items: ["iPad", "Samsung Tab", "Xiaomi Pad", "Smart Pen", "Cover & Cases"] },
  { name: "Desktop", items: ["iMac", "Mac Studio", "Custom PC", "Monitors", "Components"] },
  { name: "Laptops", items: ["MacBook", "Gaming Laptops", "Ultrabooks", "Business Class"] },
  { name: "Gadgets & Accessories", items: ["Smartwatches", "Headphones", "Speakers", "Power Banks", "Cables & Adapters"] },
  { name: "Appliances", items: ["Smart Home", "Air Purifiers", "Robot Vacuums"] },
  { name: "Lifestyle", items: ["Bags & Backpacks", "Travel Accessories", "Fitness Tracking"] },
  { name: "Camera & Networking", items: ["Action Cameras", "Security Cameras", "Routers", "Mesh Systems"] },
];

export function MegaMenu() {
  return (
    <nav className="w-full">
      <ul className="flex items-center justify-center gap-2">
        {categories.map((category) => (
          <li key={category.name} className="relative group">
            <button className="flex items-center text-sm font-medium h-12 px-3 text-foreground hover:text-primary transition-colors cursor-pointer group-hover:text-primary">
              {category.name}
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute left-0 top-full hidden group-hover:block w-[220px] pt-1 z-50">
              <ul className="bg-background shadow-xl rounded-md border border-border p-2 flex flex-col gap-1">
                {category.items.map((item) => (
                  <li key={item}>
                    <Link 
                      href={`/category/${item.toLowerCase().replace(/ /g, '-')}`}
                      className="block select-none rounded-md px-4 py-2.5 text-sm font-medium leading-none text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
}
