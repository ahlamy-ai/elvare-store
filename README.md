# ÉLVARÉ — independent storefront preview

A responsive editorial storefront for a premium-positioned mixed women's fashion concept.

## Current verified repository state
- Responsive editorial storefront and customer-information page.
- Catalogue renderer reads `catalog.json`, displays up to 60 products per batch and supports search/load more.
- The current imported catalogue contains approximately 11,900 supplier product records. These are discovery records, not approved sale listings.
- `price-map.json` contains provisional EUR planning prices for catalogue records. These are estimates only; they are not verified retail prices or guaranteed profit because destination shipping, tax, payment/FX fees, returns exposure and final supplier cost are not confirmed.
- Product images use supplier-hosted image URLs. The storefront has an image fallback, but successful loading of every supplier image has not been verified.
- No customer checkout, cart, payment collection, order capture, live stock sync, supplier API connection, fulfilment automation or tracking integration is active.
- No country is enabled for customer orders.

## Three launch blockers

### 1. Payments and order acceptance — CLOSED
The owner has not completed business registration or obtained written payment-provider approval for this seller, business model and settlement route. A personal bank account or personal wallet is not automatically a merchant checkout account. Do not collect payments, deposits or pre-orders.

Algerian Law 18-05 is relevant to an Algeria-resident seller. Its published requirements include commercial registration, a website hosted in Algeria with a `.com.dz` domain, supplier identity and tax/contact details, and detailed pre-contract disclosures. Confirm the current requirements and any cross-border/export treatment with the competent Algerian authorities or a qualified adviser before opening.

### 2. Supplier connection and fulfilment — CLOSED
Matterhorn's public documentation says its REST API can import products, update stock, check shipping costs, place orders and check order status. It also says the API is not a ready-made connector and requires a custom integration. The supplier begins processing only after it receives payment.

Still required:
- Written acceptance of the seller's actual Algerian legal/business details.
- A supplier account and private API key.
- A secure server-side backend to keep the API key private.
- Tested product/variant mapping, stock checks, order submission, payment reconciliation, failure handling and tracking updates.
- A funded method to pay Matterhorn before fulfilment starts.

Never put supplier API keys, payment secrets or customer payment-card data in this public repository or in browser JavaScript.

### 3. Shipping, stock and destination eligibility — CLOSED
"Worldwide shipping" is not proof that every destination is serviceable. No destination is enabled. For every launch country and SKU, obtain:
- Current supplier shipping method, price and weight limit.
- Delivery estimate and product picking time.
- Live size/variant stock immediately before accepting an order.
- VAT, import duty, customs responsibility and who pays them.
- Written confirmation that the seller may resell and dropship to that destination.
- A workable customer returns, refund and damaged-goods process.

Matterhorn's public terms describe wholesale-only sales to businesses/self-employed resellers and state restrictive return/complaint conditions. These terms must be reconciled with the consumer obligations in each market before ÉLVARÉ accepts orders.

## Supplier under review
Matterhorn Wholesale (Poland): https://matterhorn-wholesale.com/

Useful official pages:
- API guide: https://matterhorn.pl/?str=api-help
- Dropshipping guide: https://matterhorn-wholesale.com/?str=dropshipping-help
- Help centre: https://help.matterhorn-wholesale.com/CMS2/
- Contact: info@matterhorn-wholesale.com
- Technical support: tech@matterhorn-wholesale.com

## Safe launch rule
Keep checkout disabled until all three blockers are resolved with documentary evidence. Do not describe the store as fully automated or open worldwide until real test orders, supplier payments, shipping quotes, stock synchronization and tracking have passed in a private test environment.

## Deployment
The repository is configured as a static storefront. A repository commit does not prove that a GitHub Pages deployment is live; verify the published URL and latest deployment separately.
