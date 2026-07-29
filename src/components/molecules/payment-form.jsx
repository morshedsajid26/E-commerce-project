"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/atoms/input";
import { Typography } from "@/components/atoms/typography";
import { Button } from "@/components/atoms/button";
import { CreditCard, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

export function PaymentForm({ onComplete }) {
  const [paymentMethod, setPaymentMethod] = React.useState("card"); // card, applepay, paypal
  const [cardNumber, setCardNumber] = React.useState("");
  const [cardName, setCardName] = React.useState("");
  const [expiry, setExpiry] = React.useState("");
  const [cvc, setCvc] = React.useState("");
  const [isFlipped, setIsFlipped] = React.useState(false);

  // Simple formatting
  const handleCardNumber = (e) => {
    const val = e.target.value.replace(/\D/g, '').substring(0, 16);
    setCardNumber(val.replace(/(\d{4})(?=\d)/g, '$1 '));
  };
  
  const handleExpiry = (e) => {
    const val = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (val.length >= 3) {
      setExpiry(`${val.substring(0, 2)}/${val.substring(2, 4)}`);
    } else {
      setExpiry(val);
    }
  };

  const isFormValid = cardNumber.length === 19 && cardName.length > 2 && expiry.length === 5 && cvc.length >= 3;

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      
      {/* Payment Method Selector */}
      <div className="grid grid-cols-3 gap-4">
        <button 
          onClick={() => setPaymentMethod("card")}
          className={cn("flex flex-col items-center justify-center p-4 border-2 rounded-2xl transition-all", paymentMethod === "card" ? "border-primary bg-primary/5" : "border-muted hover:border-primary/50")}
        >
          <CreditCard className="h-6 w-6 mb-2" />
          <span className="text-sm font-medium">Credit Card</span>
        </button>
        <button 
          onClick={() => setPaymentMethod("applepay")}
          className={cn("flex flex-col items-center justify-center p-4 border-2 rounded-2xl transition-all", paymentMethod === "applepay" ? "border-primary bg-primary/5" : "border-muted hover:border-primary/50")}
        >
          <Smartphone className="h-6 w-6 mb-2" />
          <span className="text-sm font-medium">Apple Pay</span>
        </button>
        <button 
          onClick={() => setPaymentMethod("paypal")}
          className={cn("flex flex-col items-center justify-center p-4 border-2 rounded-2xl transition-all", paymentMethod === "paypal" ? "border-primary bg-primary/5" : "border-muted hover:border-primary/50")}
        >
          <div className="font-bold text-xl mb-1 text-blue-600">P</div>
          <span className="text-sm font-medium">PayPal</span>
        </button>
      </div>

      {paymentMethod === "card" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Animated Card Visualizer */}
          <div className="perspective-1000 hidden md:block">
            <motion.div 
              className="w-full aspect-[1.586/1] relative preserve-3d"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              {/* Front of Card */}
              <div className="absolute inset-0 backface-hidden bg-gradient-to-tr from-slate-900 to-slate-700 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-10 translate-x-10"></div>
                <div className="flex justify-between items-start z-10">
                  <div className="w-12 h-8 bg-yellow-400/80 rounded-md"></div> {/* Chip */}
                  <div className="text-xl italic font-bold">Premium</div>
                </div>
                <div className="z-10">
                  <div className="text-2xl font-mono tracking-widest mb-2">{cardNumber || "•••• •••• •••• ••••"}</div>
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase opacity-70">Card Holder</span>
                      <span className="font-medium tracking-wider truncate max-w-[150px]">{cardName.toUpperCase() || "NAME SURNAME"}</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[10px] uppercase opacity-70">Expires</span>
                      <span className="font-medium font-mono">{expiry || "MM/YY"}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Back of Card */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-800 rounded-2xl shadow-xl overflow-hidden flex flex-col">
                <div className="w-full h-12 bg-black mt-6"></div>
                <div className="px-6 mt-4">
                  <div className="w-full h-10 bg-white rounded flex justify-end items-center pr-4">
                    <span className="text-black font-mono font-bold">{cvc || "•••"}</span>
                  </div>
                </div>
                <div className="flex-1"></div>
              </div>
            </motion.div>
          </div>

          {/* Input Form */}
          <div className="space-y-4">
            <div>
              <Typography variant="small" className="font-medium mb-1.5 block">Card Number</Typography>
              <Input 
                placeholder="0000 0000 0000 0000" 
                value={cardNumber} 
                onChange={handleCardNumber}
                onFocus={() => setIsFlipped(false)}
                className="h-12 text-lg font-mono rounded-xl"
              />
            </div>
            <div>
              <Typography variant="small" className="font-medium mb-1.5 block">Cardholder Name</Typography>
              <Input 
                placeholder="John Doe" 
                value={cardName} 
                onChange={(e) => setCardName(e.target.value)}
                onFocus={() => setIsFlipped(false)}
                className="h-12 rounded-xl"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Typography variant="small" className="font-medium mb-1.5 block">Expiry Date</Typography>
                <Input 
                  placeholder="MM/YY" 
                  value={expiry} 
                  onChange={handleExpiry}
                  onFocus={() => setIsFlipped(false)}
                  className="h-12 rounded-xl"
                />
              </div>
              <div>
                <Typography variant="small" className="font-medium mb-1.5 block">CVC</Typography>
                <Input 
                  placeholder="123" 
                  type="password"
                  maxLength={4}
                  value={cvc} 
                  onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
                  onFocus={() => setIsFlipped(true)}
                  onBlur={() => setIsFlipped(false)}
                  className="h-12 rounded-xl"
                />
              </div>
            </div>

            <Button 
              size="lg" 
              className="w-full h-14 rounded-full mt-8 shadow-premium text-lg"
              disabled={!isFormValid}
              onClick={onComplete}
            >
              Confirm Payment
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-3xl bg-muted/5">
          <Typography variant="h3" className="mb-2">Redirecting to {paymentMethod === "applepay" ? "Apple Pay" : "PayPal"}...</Typography>
          <Typography variant="muted" className="text-center max-w-md mb-8">
            Click the button below to simulate completing the payment through the external provider.
          </Typography>
          <Button size="lg" className="rounded-full shadow-premium px-8" onClick={onComplete}>
            Simulate Successful Payment
          </Button>
        </div>
      )}
    </div>
  );
}
