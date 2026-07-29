"use client";

import * as React from "react";
import { Container } from "@/components/atoms/container";
import { Section } from "@/components/organisms/section";
import { Typography } from "@/components/atoms/typography";
import { FeatureCard } from "@/components/molecules/feature-card";
import { FEATURES } from "@/data/dummy/homepage-data";

export function WhyChooseUs() {
  return (
    <Section className="bg-background">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Typography variant="muted" className="font-bold tracking-widest uppercase text-primary mb-2">Our Promise</Typography>
          <Typography variant="h2">Why Choose PremiumStore</Typography>
          <Typography variant="muted" className="mt-4 text-lg">
            We deliver not just products, but a seamless, secure, and premium shopping experience from start to finish.
          </Typography>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
