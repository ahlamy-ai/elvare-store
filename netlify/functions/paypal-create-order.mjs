// ÉLVARÉ PayPal order endpoint — deliberately fail-closed.
// Do not enable until legal seller, merchant eligibility, approved SKU catalogue,
// server-side pricing, durable order storage and webhook verification are ready.
export default async () => {
  return new Response(JSON.stringify({
    error: "CHECKOUT_DISABLED",
    message: "ÉLVARÉ is not accepting orders or payments yet."
  }), {
    status: 503,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
};
