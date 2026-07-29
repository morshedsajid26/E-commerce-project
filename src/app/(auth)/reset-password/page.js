"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Typography } from "@/components/atoms/typography";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { toast } from "sonner";
import { LockKeyhole } from "lucide-react";

const schema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters").regex(/[A-Z]/, "Must contain an uppercase letter").regex(/[0-9]/, "Must contain a number"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function ResetPasswordPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    toast.loading("Resetting password...");
    await new Promise(r => setTimeout(r, 1500));
    toast.dismiss();
    toast.success("Password reset successfully! You can now log in.");
    router.push("/login");
  };

  return (
    <div className="w-full">
      <div className="mb-8 text-center lg:text-left flex flex-col lg:items-start items-center">
        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <LockKeyhole className="h-6 w-6 text-primary" />
        </div>
        <Typography variant="h2" className="mb-2">Set new password</Typography>
        <Typography variant="muted" className="max-w-xs mx-auto lg:mx-0">
          Your new password must be different from previous used passwords.
        </Typography>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Typography variant="small" className="font-semibold mb-2 block">New Password</Typography>
          <Input 
            placeholder="••••••••" 
            type="password"
            {...register("password")}
            className="h-12 rounded-xl bg-background/50"
          />
          {errors.password && <span className="text-xs text-destructive mt-1 block">{errors.password.message}</span>}
        </div>
        
        <div>
          <Typography variant="small" className="font-semibold mb-2 block">Confirm Password</Typography>
          <Input 
            placeholder="••••••••" 
            type="password"
            {...register("confirmPassword")}
            className="h-12 rounded-xl bg-background/50"
          />
          {errors.confirmPassword && <span className="text-xs text-destructive mt-1 block">{errors.confirmPassword.message}</span>}
        </div>

        <Button type="submit" className="w-full h-12 rounded-xl shadow-premium mt-6" disabled={isSubmitting}>
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
}
