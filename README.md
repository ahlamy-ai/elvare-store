# ÉLVARÉ — independent storefront preview

A responsive editorial storefront for a premium-positioned women's fashion concept.

## Current verified repository state
- Responsive editorial landing page and customer-information page.
- Data-driven catalogue renderer reading product records from `catalog.json`.
- Displays 60 products per batch with a Load More control; supports large catalogues once a supplier feed is imported.
- Currently contains five researched supplier candidates, not 1,000 imported SKUs.
- Structured `catalog.json` with public catalogue observations for five candidates.
- No customer checkout, payment collection, cart, live inventory sync, order processing or supplier API connection.
- Product stock and shipping to each destination remain unverified. JSON prices are public wholesale list observations, not ÉLVARÉ retail prices.

## Commercial and launch gates
1. Confirm seller eligibility with Matterhorn using the actual legal/business details.
2. Obtain authenticated feed/API access and verify live stock by size and actual reseller cost.
3. Confirm shipping cost, delivery estimate and customs/tax treatment for each destination.
4. Resolve written dropshipping, customer returns, damaged-goods, refund and complaint terms.
5. Obtain payment-provider approval for the seller's actual country, business status and settlement account. A personal IBAN is not automatically a merchant payment gateway.
6. Calculate landed cost (product + shipping + taxes/duties + payment/FX fees + returns allowance) before setting retail prices.
7. Implement secure server-side checkout, order records, stock sync, supplier fulfilment and tracking. Never store card details or private supplier/API credentials in this static repository.
8. Complete seller identity, contact, privacy, delivery, returns and consumer-law information before accepting orders.

## Premium pricing rule
ÉLVARÉ aims for premium positioning and a healthy margin, but no retail price should be published from wholesale cost alone.
`landed_cost = supplier_cost + shipping + taxes/duties + payment_FX_fees + returns_allowance`
`retail_price = landed_cost / (1 - target_gross_margin)`

Validate the resulting price against comparable products and customer expectations.

## Deployment
This is a plain static site suitable for GitHub Pages or Cloudflare Pages. Cloudflare Pages settings:
- Production branch: `main`
- Build command: leave blank (or `exit 0`)
- Build output directory: repository root (`/` or `.`)

A repository commit does not itself prove that a Pages deployment is live. Confirm the published URL after connecting the hosting provider.
