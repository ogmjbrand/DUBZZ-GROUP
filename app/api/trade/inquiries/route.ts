import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const { company_name, contact_name, email, phone, message, commodity_id } =
    await request.json();

  if (!company_name || !contact_name || !email || !message) {
    return NextResponse.json(
      { message: "company_name, contact_name, email, and message are required" },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("inquiries")
    .insert({ company_name, contact_name, email, phone, message, commodity_id });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: "Inquiry submitted" }, { status: 201 });
}
