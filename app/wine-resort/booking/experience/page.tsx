import type { Metadata } from "next";
import { BookingShell, ExperienceStep } from "@/components/resort/BookingFlow";

export const metadata: Metadata = {
  title: "Tailor Your Experience — Wine Resort Booking",
  description: "Add tastings, harvest days, spa rituals, and cellar dinners to your stay.",
};

export default function BookingExperiencePage() {
  return (
    <BookingShell step={1}>
      <ExperienceStep />
    </BookingShell>
  );
}
