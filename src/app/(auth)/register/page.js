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
import { CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^01[3-9]\d{8}$/, "Please enter a valid 11-digit mobile number (starts with 01)"),
  password: z.string().min(8, "Password must be at least 8 characters").regex(/[A-Z]/, "Must contain an uppercase letter").regex(/[0-9]/, "Must contain a number"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const { signup } = useAuth();
  
  const password = watch("password", "");

  const onSubmit = async (data) => {
    toast.loading("Creating account...");
    const success = await signup(data.name, data.phone, data.password);
    toast.dismiss();
    if (success) {
      router.push("/profile");
    }
  };

  // Simple password strength indicator
  const strength = Math.min((password.length > 7 ? 1 : 0) + (/[A-Z]/.test(password) ? 1 : 0) + (/[0-9]/.test(password) ? 1 : 0), 3);

  return (
    <div className="w-full">
      <div className="mb-8 text-center lg:text-left">
        <Typography variant="h2" className="mb-2">Create an account</Typography>
        <Typography variant="muted">Join us to experience premium shopping.</Typography>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input 
            placeholder="Full Name" 
            {...register("name")}
            className="h-12 rounded-xl bg-background/50"
          />
          {errors.name && <span className="text-xs text-destructive mt-1 block">{errors.name.message}</span>}
        </div>
        
        <div>
          <Input 
            placeholder="01XXXXXXXXX" 
            type="text"
            {...register("phone")}
            className="h-12 rounded-xl bg-background/50"
          />
          {errors.phone && <span className="text-xs text-destructive mt-1 block">{errors.phone.message}</span>}
        </div>
        
        <div>
          <Input 
            placeholder="Password" 
            type="password"
            {...register("password")}
            className="h-12 rounded-xl bg-background/50"
          />
          {password && (
            <div className="mt-2 flex gap-1">
              {[1, 2, 3].map(i => (
                <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${strength >= i ? (strength === 3 ? "bg-green-500" : strength === 2 ? "bg-yellow-500" : "bg-red-500") : "bg-muted"}`} />
              ))}
            </div>
          )}
          {errors.password && <span className="text-xs text-destructive mt-1 block">{errors.password.message}</span>}
        </div>

        <div>
          <Input 
            placeholder="Confirm Password" 
            type="password"
            {...register("confirmPassword")}
            className="h-12 rounded-xl bg-background/50"
          />
          {errors.confirmPassword && <span className="text-xs text-destructive mt-1 block">{errors.confirmPassword.message}</span>}
        </div>

        <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl flex gap-3 items-start mt-4">
          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            By creating an account, you agree to our Terms of Service and Privacy Policy. You'll also receive exclusive early access to new product drops.
          </p>
        </div>

        <Button type="submit" className="w-full h-12 rounded-xl shadow-premium mt-6" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Account"}
        </Button>
      </form>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account? <Link href="/login" className="font-semibold text-foreground hover:text-primary transition-colors">Sign in</Link>
      </div>
    </div>
  );
}
