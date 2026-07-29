"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function OtpInput({ length = 6, value, onChange }) {
  const [otp, setOtp] = React.useState(Array(length).fill(""));
  const inputRefs = React.useRef([]);

  React.useEffect(() => {
    if (value) {
      setOtp(value.split("").slice(0, length).concat(Array(length - value.length).fill("")));
    }
  }, [value, length]);

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (isNaN(Number(val))) return;

    const newOtp = [...otp];
    newOtp[index] = val.substring(val.length - 1);
    setOtp(newOtp);
    onChange?.(newOtp.join(""));

    // Auto focus next
    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, length).split("");
    if (pastedData.some(char => isNaN(Number(char)))) return;

    const newOtp = [...otp];
    pastedData.forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
    onChange?.(newOtp.join(""));
    
    const focusIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className="flex gap-2 sm:gap-4 justify-between w-full">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className={cn(
            "w-10 h-12 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-bold bg-muted/30 border-2 rounded-xl transition-all outline-none",
            "focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/20",
            digit ? "border-primary/50 text-foreground" : "border-muted text-transparent"
          )}
        />
      ))}
    </div>
  );
}
