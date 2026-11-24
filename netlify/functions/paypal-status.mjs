// ÉLVARÉ PayPal readiness endpoint.
// Reports configuration presence and safely tests OAuth authentication.
// Never returns credentials or the access token; never activates checkout.
const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  }
});

export default async () => {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  const environment = process.env.PAYPAL_ENV === "live" ? "live" :
    process.env.PAYPAL_ENV === "sandbox" ? "sandbox" : "unset";
  const checkoutEnabled = process.env.PAYPAL_CHECKOUT_ENABLED === "true";

  const configuration = {
    clientId: Boolean(clientId),
    clientSecret: Boolean(clientSecret),
    webhookId: Boolean(webhookId),
    environment,
    checkoutEnabled
  };

  let paypalAuth = "not_tested";
  if (clientId && clientSecret && environment !== "unset") {
    const apiBase = environment === "sandbox"
      ? "https://api-m.sandbox.paypal.com"
      : "https://api-m.paypal.com";
    try {
      const response = await fetch(`${apiBase}/v1/oauth2/token`, {
        method: "POST",
        headers: {
          "authorization": `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
          "content-type": "application/x-www-form-urlencoded",
          "accept": "application/json"
        },
        body: "grant_type=client_credentials"
      });
      if (response.ok) {
        const token = await response.json();
        paypalAuth = token?.access_token ? "success" : "unexpected_response";
      } else if (response.status === 401 || response.status === 403) {
        paypalAuth = "credentials_rejected";
      } else {
        paypalAuth = "paypal_api_error";
      }
    } catch {
      paypalAuth = "connection_error";
    }
  }

  return json({
    service: "elvare-paypal",
    mode: "prelaunch",
    checkoutAvailable: false,
    configuration,
    paypalAuth,
    note: "OAuth check only confirms API authentication. It does not confirm merchant eligibility, order storage, webhook processing, product approval or end-to-end checkout."
  });
};
