"use client";

import * as React from "react";
import { Container } from "@/components/atoms/container";
import { Section } from "@/components/organisms/section";
import { Typography } from "@/components/atoms/typography";
import { TestimonialCard } from "@/components/molecules/testimonial-card";
import { TESTIMONIALS } from "@/data/dummy/homepage-data";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function Testimonials() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <Section className="bg-muted/30 border-y overflow-hidden">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Typography variant="h2">Loved by Thousands</Typography>
          <Typography variant="muted" className="mt-4 text-lg">
            Don't just take our word for it. Here's what our community has to say.
          </Typography>
        </div>

        <div className="pb-12">
          <Slider {...settings}>
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.id} className="px-3 pb-10">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </Slider>
        </div>
      </Container>
    </Section>
  );
}
