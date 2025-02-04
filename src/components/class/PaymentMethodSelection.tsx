"use client";

import { Izipay, Paypal } from "@/assets/icons";
import { MethodPayment } from "@/types";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface PaymentMethodSelectionProps {
  value: MethodPayment;
  onChange: (value: MethodPayment) => void;
}
export function PaymentMethodSelection({
  value,
  onChange: setSelectedMethod,
}: PaymentMethodSelectionProps) {
  return (
    <div className="flex space-x-4">
      <Button
        variant="outline"
        type="button"
        onClick={() => setSelectedMethod(MethodPayment.PAYPAL)}
        className={cn(
          "flex h-20 w-40 flex-col items-center justify-center",

          { "border-emerald-500": value === MethodPayment.PAYPAL },
        )}
      >
        <Paypal className="h-8" />
        PayPal
      </Button>
      <Button
        variant="outline"
        type="button"
        onClick={() => setSelectedMethod(MethodPayment.IZIPAY)}
        className={cn(
          "flex h-20 w-40 flex-col items-center justify-center",

          { "border-emerald-500": value === MethodPayment.IZIPAY },
        )}
      >
        <Izipay className="h-8" />
        Izipay
      </Button>
    </div>
  );
}
