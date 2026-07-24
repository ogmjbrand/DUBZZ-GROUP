import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const { name, email, company, project_type, message, preferred_date } =
    await request.json();

  if (!name || !email) {
    return NextResponse.json({ message: "name and email are required" }, { status: 400 });
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("media_bookings")
    .insert({ name, email, company, project_type, message, preferred_date });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: "Booking request submitted" }, { status: 201 });
}
