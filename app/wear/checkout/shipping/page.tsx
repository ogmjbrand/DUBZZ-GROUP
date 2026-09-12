import type { Metadata } from "next";
import CheckoutShell from "@/components/wear/CheckoutShell";
import { ShippingForm } from "@/components/wear/CheckoutForms";

export const metadata: Metadata = {
  title: "Checkout — Shipping",
  description: "Dubbz Wear checkout — shipping details.",
};

export default function CheckoutShippingPage() {
  return (
    <CheckoutShell step={1}>
      <ShippingForm />
    </CheckoutShell>
  );
}
