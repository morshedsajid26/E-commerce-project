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
import { Checkbox } from "@/components/atoms/checkbox";
import { toast } from "sonner";
import { Mail, Globe } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const loginSchema = z.object({
  identifier: z.string().min(1, "Please enter a valid email or phone number"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();

  const onSubmit = async (data) => {
    toast.loading("Signing in...");
    const user = await login(data.identifier, data.password);
    toast.dismiss();
    if (user) {
      if (user.type === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/profile");
      }
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8 text-center lg:text-left">
        <Typography variant="h2" className="mb-2">Welcome back</Typography>
        <Typography variant="muted">Sign in to your account to continue</Typography>
      </div>


      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input 
            placeholder="Email or Phone Number" 
            type="text"
            {...register("identifier")}
            className="h-12 rounded-xl bg-background/50"
          />
          {errors.identifier && <span className="text-xs text-destructive mt-1 block">{errors.identifier.message}</span>}
        </div>
        
        <div>
          <Input 
            placeholder="Password" 
            type="password"
            {...register("password")}
            className="h-12 rounded-xl bg-background/50"
          />
          {errors.password && <span className="text-xs text-destructive mt-1 block">{errors.password.message}</span>}
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <label htmlFor="remember" className="text-sm font-medium leading-none">Remember me</label>
          </div>
          <Link href="/forgot-password" className="text-sm font-semibold text-primary hover:underline">Forgot password?</Link>
        </div>

        <Button type="submit" className="w-full h-12 rounded-xl shadow-premium mt-6" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        Don't have an account? <Link href="/register" className="font-semibold text-foreground hover:text-primary transition-colors">Sign up</Link>
      </div>
    </div>
  );
}
