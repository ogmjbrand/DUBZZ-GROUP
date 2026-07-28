import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { jobPostingId } from "@/lib/ids";

export async function POST(request: Request) {
  const { job_slug, name, email, resume_url, cover_letter } = await request.json();

  if (!job_slug || !name || !email) {
    return NextResponse.json(
      { message: "job_slug, name, and email are required" },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.from("job_applications").insert({
    job_posting_id: jobPostingId(job_slug),
    name,
    email,
    resume_url,
    cover_letter,
  });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: "Application submitted" }, { status: 201 });
}
