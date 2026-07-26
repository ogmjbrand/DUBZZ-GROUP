import type { Metadata } from "next";
import { BookingShell, SanctuaryStep } from "@/components/resort/BookingFlow";

export const metadata: Metadata = {
  title: "Select Your Sanctuary — Wines Resort Booking",
  description: "Choose your residence on the estate and set your dates.",
};

export default function BookingSanctuaryPage() {
  return (
    <BookingShell step={0}>
      <SanctuaryStep />
    </BookingShell>
  );
}
