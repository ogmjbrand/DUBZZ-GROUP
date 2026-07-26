import type { Metadata } from "next";
import { BookingShell, ReviewStep } from "@/components/resort/BookingFlow";

export const metadata: Metadata = {
  title: "Review Your Stay — Wines Resort Booking",
  description: "Review dates, sanctuary, and experiences before requesting your booking.",
};

export default function BookingReviewPage() {
  return (
    <BookingShell step={2}>
      <ReviewStep />
    </BookingShell>
  );
}
