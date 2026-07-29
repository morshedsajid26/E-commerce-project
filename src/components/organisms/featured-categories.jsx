"use client";

import * as React from "react";
import { Container } from "@/components/atoms/container";
import { Section } from "@/components/organisms/section";
import { Typography } from "@/components/atoms/typography";
import { CategoryCard } from "@/components/molecules/category-card";
import { FEATURED_CATEGORIES } from "@/data/dummy/homepage-data";

export function FeaturedCategories() {
  return (
    <Section className="bg-muted/30 border-y">
      <Container>
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <Typography variant="h2">Shop by Category</Typography>
          <Typography variant="muted" className="mt-2 text-lg">
            Explore our wide range of premium collections tailored for your needs.
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
