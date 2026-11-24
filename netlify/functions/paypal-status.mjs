// ÉLVARÉ PayPal readiness endpoint.
// Reports configuration presence only. Never returns credentials or activates checkout.
export default async () => {
  const configured = {
    clientId: Boolean(process.env.PAYPAL_CLIENT_ID),
    clientSecret: Boolean(process.env.PAYPAL_CLIENT_SECRET),
    webhookId: Boolean(process.env.PAYPAL_WEBHOOK_ID),
    environment: process.env.PAYPAL_ENV === "live" ? "live" :
      process.env.PAYPAL_ENV === "sandbox" ? "sandbox" : "unset",
    checkoutEnabled: process.env.PAYPAL_CHECKOUT_ENABLED === "true"
  };

  return new Response(JSON.stringify({
    service: "elvare-paypal",
    mode: "prelaunch",
    checkoutAvailable: false,
    configuration: configured,
    note: "Checkout remains disabled until seller eligibility, approved products, order storage, webhook verification and end-to-end tests are complete."
  }), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
};
