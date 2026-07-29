"use client";

import * as React from "react";
import { Container } from "@/components/atoms/container";
import { Section } from "@/components/organisms/section";
import { Typography } from "@/components/atoms/typography";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import { Send } from "lucide-react";
import { toast } from "sonner";

export function Newsletter() {
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Successfully subscribed to the newsletter!");
    setEmail("");
  };

  return (
    <Section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20 -z-10" />
      
      <Container className="relative z-10 text-center max-w-3xl mx-auto">
        <Typography variant="h2" className="text-4xl md:text-5xl mb-6">
          Stay Ahead of the Curve
        </Typography>
        <Typography variant="muted" className="text-lg mb-10">
          Subscribe to our newsletter for exclusive offers, early access to new products, and tech insights.
        </Typography>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <Input 
            type="email" 
            placeholder="Enter your email address" 
            className="flex-1 h-12 rounded-full px-6 bg-background/50 backdrop-blur-sm border-primary/20 focus-visible:border-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" size="lg" className="h-12 rounded-full px-8 shadow-premium">
            Subscribe
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </Container>
    </Section>
  );
}
