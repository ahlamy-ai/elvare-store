// ÉLVARÉ PayPal webhook receiver — verification scaffold, not yet production-ready.
// It verifies each delivery with PayPal but deliberately does not acknowledge it as
// processed until durable order/event storage and idempotent handlers are implemented.
// Do NOT register this URL in PayPal yet; otherwise PayPal will retry unprocessed events.

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  }
});

export default async (request) => {
  if (request.method !== "POST") {
    return json({ error: "METHOD_NOT_ALLOWED" }, 405);
  }

  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const env = process.env.PAYPAL_ENV === "sandbox" ? "sandbox" : "live";

  if (!webhookId || !clientId || !clientSecret) {
    return json({ error: "WEBHOOK_CONFIGURATION_INCOMPLETE" }, 503);
  }

  const rawBody = await request.text();
  if (!rawBody || rawBody.length > 1_000_000) {
    return json({ error: "INVALID_OR_OVERSIZED_BODY" }, 400);
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return json({ error: "INVALID_JSON" }, 400);
  }

  const headers = request.headers;
  const transmissionId = headers.get("paypal-transmission-id");
  const transmissionTime = headers.get("paypal-transmission-time");
  const transmissionSig = headers.get("paypal-transmission-sig");
  const certUrl = headers.get("paypal-cert-url");
  const authAlgo = headers.get("paypal-auth-algo");

  if (!transmissionId || !transmissionTime || !transmissionSig || !certUrl || !authAlgo) {
    return json({ error: "MISSING_PAYPAL_SIGNATURE_HEADERS" }, 400);
  }

  // Do not fetch arbitrary certificate URLs; the PayPal verification API validates
  // the certificate and signature using the original delivery headers and event.
  const apiBase = env === "sandbox"
    ? "https://api-m.sandbox.paypal.com"
    : "https://api-m.paypal.com";

  try {
    const tokenResponse = await fetch(`${apiBase}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        "authorization": `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        "content-type": "application/x-www-form-urlencoded"
      },
      body: "grant_type=client_credentials"
    });

    if (!tokenResponse.ok) {
      return json({ error: "PAYPAL_AUTHENTICATION_FAILED" }, 502);
    }

    const tokenData = await tokenResponse.json();
    const verifyResponse = await fetch(`${apiBase}/v1/notifications/verify-webhook-signature`, {
      method: "POST",
      headers: {
        "authorization": `Bearer ${tokenData.access_token}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        auth_algo: authAlgo,
        cert_url: certUrl,
        transmission_id: transmissionId,
        transmission_sig: transmissionSig,
        transmission_time: transmissionTime,
        webhook_id: webhookId,
        webhook_event: event
      })
    });

    if (!verifyResponse.ok) {
      return json({ error: "PAYPAL_SIGNATURE_VERIFICATION_UNAVAILABLE" }, 502);
    }

    const verification = await verifyResponse.json();
    if (verification.verification_status !== "SUCCESS") {
      return json({ error: "INVALID_PAYPAL_SIGNATURE" }, 400);
    }

    // Verified, but intentionally not acknowledged: there is no durable event store
    // or idempotent order/payment processor in this pre-launch project yet.
    return json({
      error: "WEBHOOK_PROCESSING_NOT_CONFIGURED",
      verified: true,
      eventType: typeof event.event_type === "string" ? event.event_type : "unknown",
      message: "Signature verified; event was not processed. Configure durable storage before registering this webhook."
    }, 503);
  } catch {
    return json({ error: "WEBHOOK_VERIFICATION_ERROR" }, 502);
  }
};
