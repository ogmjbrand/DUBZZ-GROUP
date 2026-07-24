import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const { name, email, subject, message, division } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json(
      { message: "name, email, and message are required" },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("contact_messages")
    .insert({ name, email, subject, message, division });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: "Message sent" }, { status: 201 });
}
