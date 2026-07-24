import { NextResponse } from "next/server";
import { callEdgeFunction } from "@/lib/supabase/edge-function";

export async function POST(request: Request) {
  const body = await request.json();
  const { status, data } = await callEdgeFunction("create-order", body);
  return NextResponse.json(data, { status });
}
