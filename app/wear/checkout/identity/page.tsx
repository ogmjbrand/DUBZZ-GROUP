import type { Metadata } from "next";
import CheckoutShell from "@/components/wear/CheckoutShell";
import { IdentityForm } from "@/components/wear/CheckoutForms";

export const metadata: Metadata = {
  title: "Checkout — Identity",
  description: "Dubzz Wear checkout — identity and bag.",
};

export default function CheckoutIdentityPage() {
  return (
    <CheckoutShell step={0}>
      <IdentityForm />
    </CheckoutShell>
  );
}
