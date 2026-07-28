import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { productId } from "@/lib/ids";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ message: "Authentication required" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("wishlists")
    .select("products(slug)")
    .eq("profile_id", user.id);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  const slugs = (data ?? [])
    .map((row) => (row as unknown as { products: { slug: string } | null }).products?.slug)
    .filter((slug): slug is string => Boolean(slug));

  return NextResponse.json({ slugs }, { status: 200 });
}

export async function POST(request: Request) {
  const { slug } = await request.json();
  if (!slug) {
    return NextResponse.json({ message: "slug is required" }, { status: 400 });
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
    .upsert({ profile_id: user.id, product_id: productId(slug) }, { onConflict: "profile_id,product_id" });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: "Added to wishlist" }, { status: 201 });
}

export async function DELETE(request: Request) {
  const { slug } = await request.json();
  if (!slug) {
    return NextResponse.json({ message: "slug is required" }, { status: 400 });
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
    .eq("product_id", productId(slug));

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: "Removed from wishlist" }, { status: 200 });
}
