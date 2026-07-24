"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/Field";
import { useStore } from "@/components/providers/StoreProvider";

/**
 * Checkout steps are UI-only for now: each step persists to sessionStorage and
 * the final step clears the bag locally. Swapping `placeOrder` below for a real
 * `fetch('/api/wear/checkout')` call is the single wiring point.
 */

const CHECKOUT_KEY = "dubzz-checkout-v1";

interface CheckoutDraft {
  identity?: { email: string; firstName: string; lastName: string; phone: string };
  shipping?: {
    address1: string;
    address2: string;
    city: string;
    postcode: string;
    country: string;
    method: string;
  };
}

function readDraft(): CheckoutDraft {
  try {
    return JSON.parse(sessionStorage.getItem(CHECKOUT_KEY) ?? "{}") as CheckoutDraft;
  } catch {
    return {};
  }
}

function writeDraft(patch: Partial<CheckoutDraft>) {
  sessionStorage.setItem(CHECKOUT_KEY, JSON.stringify({ ...readDraft(), ...patch }));
}

// TODO(backend): replace with fetch('/api/wear/checkout') once the endpoint
// accepts the cart payload; keep the signature so this stays the only change.
async function placeOrder(draft: CheckoutDraft, cart: unknown) {
  void draft;
  void cart;
  await new Promise((r) => setTimeout(r, 700));
}

export function IdentityForm() {
  const router = useRouter();
  const [draft, setDraft] = useState<CheckoutDraft["identity"]>();

  useEffect(() => {
    const raf = requestAnimationFrame(() => setDraft(readDraft().identity));
    return () => cancelAnimationFrame(raf);
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    writeDraft({
      identity: {
        email: String(data.get("email") ?? ""),
        firstName: String(data.get("firstName") ?? ""),
        lastName: String(data.get("lastName") ?? ""),
        phone: String(data.get("phone") ?? ""),
      },
    });
    router.push("/wear/checkout/shipping");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8" key={draft ? "loaded" : "empty"}>
      <div>
        <h1 className="font-display text-3xl text-white sm:text-4xl">Identity</h1>
        <p className="mt-3 text-sm text-neutral">
          Where the order confirmation — and the run number — goes.
        </p>
      </div>
      <Field label="Email" htmlFor="co-email">
        <Input id="co-email" name="email" type="email" required autoComplete="email" defaultValue={draft?.email} placeholder="your@email.com" />
      </Field>
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="First Name" htmlFor="co-first">
          <Input id="co-first" name="firstName" required autoComplete="given-name" defaultValue={draft?.firstName} placeholder="First name" />
        </Field>
        <Field label="Last Name" htmlFor="co-last">
          <Input id="co-last" name="lastName" required autoComplete="family-name" defaultValue={draft?.lastName} placeholder="Last name" />
        </Field>
      </div>
      <Field label="Phone (for delivery only)" htmlFor="co-phone">
        <Input id="co-phone" name="phone" type="tel" autoComplete="tel" defaultValue={draft?.phone} placeholder="+44…" />
      </Field>
      <Button type="submit" className="w-full sm:w-auto">
        Continue to Shipping
      </Button>
    </form>
  );
}

const shippingMethods = [
  { id: "standard", label: "Standard — Carbon-neutral courier", eta: "3–5 days", price: "Included" },
  { id: "express", label: "Express — Next-day, signed", eta: "1 day", price: "$30" },
  { id: "collect", label: "Atelier Collection — Porto", eta: "When you are", price: "Included" },
];

export function ShippingForm() {
  const router = useRouter();
  const [draft, setDraft] = useState<CheckoutDraft["shipping"]>();
  const [method, setMethod] = useState("standard");

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const d = readDraft();
      if (!d.identity) {
        router.replace("/wear/checkout/identity");
        return;
      }
      setDraft(d.shipping);
      if (d.shipping?.method) setMethod(d.shipping.method);
    });
    return () => cancelAnimationFrame(raf);
  }, [router]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    writeDraft({
      shipping: {
        address1: String(data.get("address1") ?? ""),
        address2: String(data.get("address2") ?? ""),
        city: String(data.get("city") ?? ""),
        postcode: String(data.get("postcode") ?? ""),
        country: String(data.get("country") ?? ""),
        method,
      },
    });
    router.push("/wear/checkout/payment");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8" key={draft ? "loaded" : "empty"}>
      <div>
        <h1 className="font-display text-3xl text-white sm:text-4xl">Shipping</h1>
        <p className="mt-3 text-sm text-neutral">Numbered pieces travel insured, always.</p>
      </div>
      <Field label="Address" htmlFor="co-address1">
        <Input id="co-address1" name="address1" required autoComplete="address-line1" defaultValue={draft?.address1} placeholder="Street address" />
      </Field>
      <Field label="Apartment, suite (optional)" htmlFor="co-address2">
        <Input id="co-address2" name="address2" autoComplete="address-line2" defaultValue={draft?.address2} placeholder="Apt, suite, floor" />
      </Field>
      <div className="grid gap-8 sm:grid-cols-3">
        <Field label="City" htmlFor="co-city" className="sm:col-span-1">
          <Input id="co-city" name="city" required autoComplete="address-level2" defaultValue={draft?.city} placeholder="City" />
        </Field>
        <Field label="Postcode" htmlFor="co-postcode">
          <Input id="co-postcode" name="postcode" required autoComplete="postal-code" defaultValue={draft?.postcode} placeholder="Postcode" />
        </Field>
        <Field label="Country" htmlFor="co-country">
          <Select id="co-country" name="country" defaultValue={draft?.country ?? "United Kingdom"}>
            {["United Kingdom", "United States", "Portugal", "Ghana", "France", "Germany", "United Arab Emirates"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Select>
        </Field>
      </div>

      <fieldset>
        <legend className="overline-label mb-4 text-[10px] text-white/45">Delivery Method</legend>
        <div className="space-y-3">
          {shippingMethods.map((m) => (
            <label
              key={m.id}
              className={[
                "flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors",
                method === m.id ? "border-gold bg-gold/5" : "border-white/12 hover:border-white/30",
              ].join(" ")}
            >
              <input
                type="radio"
                name="method"
                value={m.id}
                checked={method === m.id}
                onChange={() => setMethod(m.id)}
                className="sr-only"
              />
              <span
                aria-hidden
                className={`h-3.5 w-3.5 shrink-0 rounded-full border-2 ${method === m.id ? "border-gold bg-gold" : "border-white/30"}`}
              />
              <span className="flex-1">
                <span className="block text-sm text-white">{m.label}</span>
                <span className="mt-0.5 block text-xs text-white/40">{m.eta}</span>
              </span>
              <span className="text-sm text-gold">{m.price}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <Button type="submit" className="w-full sm:w-auto">
        Continue to Payment
      </Button>
    </form>
  );
}

export function PaymentForm() {
  const router = useRouter();
  const { cart, clearCart } = useStore();
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    const d = readDraft();
    if (!d.identity) router.replace("/wear/checkout/identity");
    else if (!d.shipping) router.replace("/wear/checkout/shipping");
  }, [router]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPlacing(true);
    await placeOrder(readDraft(), cart);
    sessionStorage.removeItem(CHECKOUT_KEY);
    clearCart();
    router.push("/wear/order-confirmed");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-white sm:text-4xl">Payment Terminal</h1>
        <p className="mt-3 text-sm text-neutral">
          Encrypted end-to-end. Card details never touch our servers.
        </p>
      </div>

      {/* Card visual */}
      <div className="relative overflow-hidden rounded-lg border border-gold/25 bg-[linear-gradient(135deg,#14110a_0%,#0a0906_60%,#050505_100%)] p-7">
        <div aria-hidden className="grain absolute inset-0" />
        <div className="relative flex h-36 flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label text-[10px] font-bold tracking-[0.3em] text-gold">DUBZZ PAY</span>
            <span aria-hidden className="h-7 w-10 rounded-sm bg-gradient-to-br from-gold/80 to-gold-deep" />
          </div>
          <p className="font-mono text-lg tracking-[0.2em] text-white/80">•••• •••• •••• ••••</p>
          <div className="flex justify-between font-label text-[9px] uppercase tracking-[0.2em] text-white/40">
            <span>Cardholder</span>
            <span>MM / YY</span>
          </div>
        </div>
      </div>

      <Field label="Name on Card" htmlFor="pay-name">
        <Input id="pay-name" name="cardName" required autoComplete="cc-name" placeholder="As it appears on the card" />
      </Field>
      <Field label="Card Number" htmlFor="pay-number">
        <Input
          id="pay-number"
          name="cardNumber"
          required
          inputMode="numeric"
          autoComplete="cc-number"
          placeholder="1234 5678 9012 3456"
          pattern="[0-9 ]{12,23}"
        />
      </Field>
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Expiry" htmlFor="pay-expiry">
          <Input id="pay-expiry" name="cardExpiry" required autoComplete="cc-exp" placeholder="MM / YY" pattern="[0-9/ ]{4,7}" />
        </Field>
        <Field label="Security Code" htmlFor="pay-cvc">
          <Input id="pay-cvc" name="cardCvc" required inputMode="numeric" autoComplete="cc-csc" placeholder="CVC" pattern="[0-9]{3,4}" />
        </Field>
      </div>

      <Button type="submit" disabled={placing || cart.length === 0} className="w-full">
        {placing ? "Securing the Run Number…" : "Place Order"}
      </Button>
      <p className="text-center text-xs text-white/30">
        By placing this order you agree to the terms of service.
      </p>
    </form>
  );
}
