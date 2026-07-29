"use client";

import * as React from "react";
import { Container } from "@/components/atoms/container";
import { Section } from "@/components/organisms/section";
import { Typography } from "@/components/atoms/typography";
import { TestimonialCard } from "@/components/molecules/testimonial-card";
import { TESTIMONIALS } from "@/data/dummy/homepage-data";

export function Testimonials() {
  return (
    <Section className="bg-muted/30 border-y overflow-hidden">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Typography variant="h2">Loved by Thousands</Typography>
          <Typography variant="muted" className="mt-4 text-lg">
            Don't just take our word for it. Here's what our community has to say.
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
