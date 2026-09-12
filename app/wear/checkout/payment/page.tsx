import type { Metadata } from "next";
import CheckoutShell from "@/components/wear/CheckoutShell";
import { PaymentForm } from "@/components/wear/CheckoutForms";

export const metadata: Metadata = {
  title: "Checkout — Payment",
  description: "Dubbz Wear checkout — payment terminal.",
};

export default function CheckoutPaymentPage() {
  return (
    <CheckoutShell step={2}>
      <PaymentForm />
    </CheckoutShell>
  );
}
