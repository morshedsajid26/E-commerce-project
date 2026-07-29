"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Typography } from "@/components/atoms/typography";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { toast } from "sonner";
import { KeyRound } from "lucide-react";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    toast.loading("Sending recovery email...");
    await new Promise(r => setTimeout(r, 1200));
    toast.dismiss();
    toast.success("Recovery code sent to your email.");
    router.push("/otp?context=reset");
  };

  return (
    <div className="w-full">
      <div className="mb-8 text-center lg:text-left flex flex-col lg:items-start items-center">
        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <KeyRound className="h-6 w-6 text-primary" />
        </div>
        <Typography variant="h2" className="mb-2">Forgot Password?</Typography>
        <Typography variant="muted" className="max-w-xs mx-auto lg:mx-0">
          No worries, we'll send you reset instructions.
        </Typography>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Typography variant="small" className="font-semibold mb-2 block">Email</Typography>
          <Input 
            placeholder="Enter the email associated with your account" 
            type="email"
            {...register("email")}
            className="h-12 rounded-xl bg-background/50"
          />
          {errors.email && <span className="text-xs text-destructive mt-1 block">{errors.email.message}</span>}
        </div>

        <Button type="submit" className="w-full h-12 rounded-xl shadow-premium mt-6" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Reset Code"}
        </Button>
      </form>

      <div className="mt-8 text-center text-sm">
        <Link href="/login" className="font-semibold text-muted-foreground hover:text-primary transition-colors">&larr; Back to log in</Link>
      </div>
    </div>
  );
}
