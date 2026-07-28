import { NextResponse } from "next/server";
import { callEdgeFunction } from "@/lib/supabase/edge-function";
import { sanctuaryId, experienceId } from "@/lib/ids";

interface BookingRequestBody {
  sanctuary_slug: string;
  check_in: string;
  check_out: string;
  guests: number;
  experience_slugs?: string[];
}

export async function POST(request: Request) {
  const body = (await request.json()) as BookingRequestBody;
  const { sanctuary_slug, check_in, check_out, guests, experience_slugs } = body;

  if (!sanctuary_slug || !check_in || !check_out || !guests) {
    return NextResponse.json(
      { message: "sanctuary_slug, check_in, check_out, and guests are required" },
      { status: 400 }
    );
  }

  const { status, data } = await callEdgeFunction("create-booking", {
    sanctuary_id: sanctuaryId(sanctuary_slug),
    check_in,
    check_out,
    guests,
    experience_ids: (experience_slugs ?? []).map((slug) => ({ experience_id: experienceId(slug) })),
  });
  return NextResponse.json(data, { status });
}
