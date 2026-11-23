# ÉLVARÉ — automation implementation plan

Status: pre-launch planning document. This file is not evidence that supplier, payments, API access, or automation are active.

## Target operating model

The goal is a low-touch store: routine catalogue, order-routing, fulfilment-status and customer-notification work should run automatically after the relevant supplier and payment integrations are approved and tested. The owner remains responsible for the legal business, money, customer obligations and exceptional decisions.

## Automation map

| Area | Intended automation | Required proof before activation |
|---|---|---|
| Product catalogue | Import approved products, descriptions, images, sizes and variants | Supplier permission to reuse content; stable product/variant identifiers |
| Pricing | Calculate retail price from supplier cost, destination shipping, payment/FX costs, tax assumptions and return-risk reserve | Verified supplier price and shipping data; accountant/legal tax review where needed |
| Availability | Scheduled stock sync plus a final live stock check before payment/order acceptance | API access, rate limits, variant mapping and successful sync tests |
| Checkout | Collect payment only for eligible destinations and products | Registered seller, approved merchant account, published legal/customer policies |
| Order routing | Send paid orders to supplier; store supplier order ID and response | API credentials, supplier acceptance, successful sandbox/test order |
| Fulfilment | Poll or receive supplier order status and tracking updates | Tracking/status API or documented feed/webhook |
| Notifications | Send order confirmation, dispatch and tracking emails automatically | Verified email sender/domain and tested templates |
| Customer support | Automated answers for order status, sizing and delivery FAQs; escalate exceptions | Accurate policy/FAQ content and human escalation path |
| Reconciliation | Daily comparison of customer payments, supplier charges, refunds and order status | Payment and supplier transaction references |
| Monitoring | Alert on failed sync, out-of-stock paid order, API errors, payment mismatch and delayed dispatch | Logs, alert destination and retry/dead-letter process |

## Required technical shape

1. **Public storefront:** the current static GitHub Pages site remains the presentation layer. It must never contain supplier API keys, payment secrets or private customer data.
2. **Private backend:** a separate ÉLVARÉ backend project (not the AHLAMY project) stores products, variants, orders, supplier references and audit events. A managed database plus server-side functions can be evaluated after supplier API documentation is received.
3. **Supplier adapter:** server-side integration handles catalogue import, stock checks, shipping quotes, order submission and status/tracking retrieval. Every operation must be idempotent where possible.
4. **Payment adapter:** use only a merchant processor that has explicitly approved the actual legal seller, fashion dropshipping model, target countries and settlement account. Never treat a personal wallet/bank account as automatic merchant approval.
5. **Job processing:** scheduled syncs, retry queues, duplicate-order protection, failure alerts and reconciliation. A failed supplier call must not silently mark an order fulfilled.
6. **Customer messaging:** transactional email for receipts, order status and tracking. Avoid marketing emails until consent and applicable rules are handled.

## Non-negotiable safety rules

- Keep checkout, payment capture and order acceptance disabled until seller identity, payment processing, supplier onboarding and destination rules are verified.
- Never publish a fictional registered office, company number, VAT number or “Made in France” claim.
- Never commit API keys, passwords, payment secrets or customer data to this public repository or browser code.
- Do not promise worldwide delivery. Enable countries individually after shipping, customs, tax, returns and payment checks.
- Supplier acceptance does not remove the retailer's customer-facing duties for refunds, complaints, faulty goods and delivery.
- Do not describe the store as fully automatic until end-to-end test orders pass, including payment, supplier payment, stock failure, cancellation, refund and tracking.
- Dropshipping reduces inventory handling; it does not eliminate the need for working capital. Supplier payment may be due before fulfilment begins or before customer funds settle.

## Supplier response checklist

When Matterhorn replies, verify in writing:

- Which legal entity signs the reseller agreement and issues invoices.
- Whether a newly incorporated French company is accepted, and required registration/tax documents.
- Whether direct-to-customer dropshipping is allowed for every target market.
- API authentication, endpoint documentation, rate limits, test credentials and production approval.
- Whether API supports product/variant import, image/description usage, live stock, destination shipping quote, order create/cancel, order status and tracking.
- Whether supplier charges are collected per order and when payment is due.
- Shipping exclusions, delivery estimates, customs handling and who pays duties/taxes.
- Damaged-item reporting deadlines, returns, refunds and end-customer complaint responsibilities.
- Whether neutral packaging/no supplier invoice or marketing inserts can be requested.

## Launch gates

- [ ] Written supplier onboarding approval for the actual company.
- [ ] Legal company and seller details verified and ready for publication.
- [ ] Merchant processor approval for the actual business and settlement route.
- [ ] Customer terms, privacy, delivery, returns/refunds and contact details reviewed for launch markets.
- [ ] SKU-level costs, shipping, tax/fees and contribution margin verified.
- [ ] Backend and secrets storage configured separately from the public website.
- [ ] Stock and shipping quote checks tested.
- [ ] Test order, supplier payment, cancellation, refund and tracking tested end-to-end.
- [ ] Monitoring and manual exception workflow tested.
- [ ] Only verified countries enabled; checkout switched on deliberately.

## Current state

The current repository is a pre-launch catalogue preview. The browser code reads the catalogue and provisional planning price map. It does not process checkout, collect payment, capture orders, connect to Matterhorn, synchronize live stock or automate fulfilment. No supplier credentials or approved merchant connection have been supplied. Keep the store in preview mode until all launch gates above are satisfied.
