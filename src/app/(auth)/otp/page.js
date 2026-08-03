"use client";

import * as React from "react";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Typography } from "@/components/atoms/typography";
import { Button } from "@/components/atoms/button";
import { OtpInput } from "@/components/molecules/otp-input";
import { toast } from "sonner";
import { MailCheck } from "lucide-react";

import { verifyResetOtpAction } from "@/lib/actions/auth.actions";

function OtpPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const context = searchParams.get("context"); // "reset" or undefined
  const email = searchParams.get("email");
  const [otp, setOtp] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }
    
    if (context === "reset") {
      if (!email) {
        toast.error("Email is missing. Please try again.");
        router.push("/forgot-password");
        return;
      }
      setIsSubmitting(true);
      toast.loading("Verifying code...");
      try {
        const result = await verifyResetOtpAction(email, otp);
        toast.dismiss();
        if (result.success) {
          toast.success("Code verified! Please set a new password.");
          router.push(`/reset-password?email=${encodeURIComponent(email)}&token=${encodeURIComponent(result.resetToken)}`);
        }
      } catch (error) {
        toast.dismiss();
        setIsSubmitting(false);
        toast.error(error.message || "Failed to verify code");
      }
    } else {
      setIsSubmitting(true);
      toast.loading("Verifying code...");
      // TODO: implement email verification logic here
      await new Promise(r => setTimeout(r, 1500));
      toast.dismiss();
      toast.success("Email verified successfully! Welcome to GADGETSBD.");
      router.push("/");
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8 text-center lg:text-left flex flex-col lg:items-start items-center">
        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <MailCheck className="h-6 w-6 text-primary" />
        </div>
        <Typography variant="h2" className="mb-2">Check your email</Typography>
        <Typography variant="muted" className="max-w-xs mx-auto lg:mx-0">
          We sent a verification code to your email. Enter the 6-digit code below.
        </Typography>
      </div>

      <div className="space-y-8">
        <div className="flex justify-center lg:justify-start">
          <OtpInput length={6} value={otp} onChange={setOtp} />
        </div>

        <Button 
          onClick={onSubmit} 
          className="w-full h-12 rounded-xl shadow-premium" 
          disabled={isSubmitting || otp.length !== 6}
        >
          {isSubmitting ? "Verifying..." : "Verify Email"}
        </Button>
      </div>

      <div className="mt-8 text-center text-sm">
        <span className="text-muted-foreground">Didn't receive the code?</span>{" "}
        <button className="font-semibold text-foreground hover:text-primary transition-colors" onClick={() => toast.success("Code resent!")}>
          Click to resend
        </button>
      </div>
    </div>
  );
}

export default function OtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtpPageContent />
    </Suspense>
  );
}
