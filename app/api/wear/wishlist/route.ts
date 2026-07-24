import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const { product_id } = await request.json();
  if (!product_id) {
    return NextResponse.json({ message: "product_id is required" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ message: "Authentication required" }, { status: 401 });
  }

  const { error } = await supabase.from("wishlists").insert({ profile_id: user.id, product_id });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: "Added to wishlist" }, { status: 201 });
}

export async function DELETE(request: Request) {
  const { product_id } = await request.json();
  if (!product_id) {
    return NextResponse.json({ message: "product_id is required" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ message: "Authentication required" }, { status: 401 });
  }

  const { error } = await supabase
    .from("wishlists")
    .delete()
    .eq("profile_id", user.id)
    .eq("product_id", product_id);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: "Removed from wishlist" }, { status: 200 });
}
