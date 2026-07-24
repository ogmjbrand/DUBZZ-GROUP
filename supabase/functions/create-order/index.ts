import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

interface CreateOrderBody {
  items: { product_variant_id: string; quantity: number }[];
  shipping_address_id: string;
}

export default {
  // Requires a real Supabase Auth session (anonymous sign-in covers guest checkout).
  fetch: withSupabase({ auth: "user" }, async (req, ctx) => {
    const body: CreateOrderBody = await req.json();

    const { data, error } = await ctx.supabase.rpc("create_order", {
      p_items: body.items,
      p_shipping_address_id: body.shipping_address_id,
    });

    if (error) {
      const status = error.code === "23514" ? 409 : 400;
      return Response.json({ message: error.message }, { status });
    }

    return Response.json({ order: data }, { status: 201 });
  }),
};

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Sign in a user and pass their access token as the Authorization bearer:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/create-order' \
    --header 'apiKey: <publishable key>' \
    --header 'Authorization: Bearer <user access token>' \
    --data '{"items":[{"product_variant_id":"...","quantity":1}],"shipping_address_id":"..."}'

*/
