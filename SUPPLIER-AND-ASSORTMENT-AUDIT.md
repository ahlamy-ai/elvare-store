# ÉLVARÉ — Supplier & assortment audit
Updated: 2026-11-23
Status: research only — no supplier account, feed, stock reservation, order or payment has been connected.

## Brand and company direction
- Brand presentation: ÉLVARÉ — French fashion concept, Bourges, France; worldwide customer audience.
- The Bourges association is brand positioning only until a real operating company and lawful registered office are established there. Do not publish a fictitious company address or imply products are Made in France without origin evidence.
- Fulfilment model: supplier ships directly to the customer; ÉLVARÉ handles the customer relationship, payment, refunds and order management once legally and operationally enabled.

## Approved launch direction
- Assortment: mixed women's fashion — refined everyday, occasionwear, tailoring/co-ords, selected accessories and shoes.
- Market ambition: worldwide, but checkout must be restricted to destinations individually verified in the supplier's live shipping table and by the payment provider.
- Positioning: premium presentation and premium margin discipline; do not set retail prices until wholesale net cost, shipping, taxes, payment fees and returns exposure are known.

## Supplier under review: Matterhorn Wholesale (Poland)
Important legal-entity update: the current Help Center states that, from 19 August 2025, the wholesale operation is run by Grupa Modne Zakupy Sp. z o.o. Older pages still show Matterhorn Moda sp. z o.o. details. Confirm the exact contracting and invoicing entity in the seller account and on a current pro-forma invoice before paying. Current contact page: https://help.matterhorn-wholesale.com/CMS2/article/contact-details/ .

Official site: https://matterhorn-wholesale.com/
Integration/feed page: https://matterhorn-wholesale.com/?str=xmloffer
Official help/terms: https://matterhorn-wholesale.com/?str=help
Official dropshipping integration guide: https://matterhorn-wholesale.com/top_no_168358_prod_id-168358.htm?str=dropshipping-help

### What public supplier information confirms
- Public site advertises 31,000+ products, 120+ European brands, no monthly subscription, no minimum order quantity and worldwide shipping.
- Supplier says dropshipping is available: it can ship directly to the end customer in an unmarked parcel without a sales invoice inside.
- XML/CSV/XLS feeds include product descriptions, wholesale net prices, image links, sizes, stock by size and EAN where available; feeds are updated every two hours.
- REST API can retrieve products/stocks and submit automated orders, but it requires a custom integration. It is not a turnkey connector for this static GitHub Pages site.
- The public Europe shipping table currently shows destination-specific rates and estimates for several countries. For a 1 kg parcel it lists France €8.90 / 3–4 days, Spain €6.90 / 4–5 days, Great Britain €6.90 / 5–6 days and Portugal €7.90 / 4 days. These are public table examples only, not a quote for a particular SKU/order or a guarantee of final delivery. Algeria is not listed in that Europe table; this does not prove it is impossible, but it must be confirmed in the authenticated account/API in writing. Source: https://matterhorn-wholesale.com/shopify/index.php?region=Europe&type=shipping_costs .

### Important commercial blockers — do not ignore
- Supplier terms say it sells only to business entities and self-employed resellers. Registration and valid invoicing/business details are required. Eligibility for a seller resident in Algeria has not been confirmed.
- Wholesale prices are net and VAT/tax treatment depends on buyer and destination. Public category-page display prices are not a reliable substitute for the logged-in wholesale feed.
- Supplier terms say it does not accept ordinary returns; only damaged products may be exchanged, and damage must be reported in writing within 24 hours of parcel receipt. It also says it does not accept returns/complaints from the reseller's customers. This is a major consumer-facing returns risk for fashion and must be resolved in writing before launch.
- Orders begin processing only after supplier payment is received. "No inventory" does not mean zero working capital: ÉLVARÉ would need money available to pay the supplier before or while the customer payment settles.
- Supplier says API ordering requires a custom-built integration. Until implemented and tested, fulfilment is manual.
- No written confirmation yet for Algeria delivery, seller eligibility for an Algeria-based individual/business, current contracting entity, per-SKU shipping costs, return routing, branded packaging, product image usage on ÉLVARÉ's own store, or account eligibility.

## Publicly visible product leads (NOT approved for sale yet)
These are genuine product/category entries surfaced on Matterhorn's public catalogue. Public pages do not provide a dependable live wholesale price/stock snapshot without supplier login. IDs and sizes below are discovery leads only; recheck all details in the authenticated feed before import.

| Candidate | Public catalogue reference | Publicly shown details | Decision |
|---|---|---|---|
| Daydress LaBalancia | Product ID 231346 | Bestseller label; sizes XS/S and M/L shown | Candidate for refined everyday edit; verify composition, colour variants, live stock and net price |
| Evening dress Numoco | Product ID 231235 | Sizes S, L, XL and 2XL shown | Candidate for occasionwear; verify live stock, fabric, photos and net price |
| Daydress Italy Moda | Product ID 231530 | New label; one-size shown | Hold until fit measurements and size/returns risk are checked |

Catalogue page: https://matterhorn-wholesale.com/womens_clothing_women_k-60.htm
Dresses page: https://matterhorn-wholesale.com/dresses_womens_clothing_k-280.htm

## Proposed first capsule (target 24–30 verified SKUs)
- 8–10 dresses: day, evening and occasion.
- 5–6 coordinated sets / tailored pieces.
- 4–5 blouses and elevated tops.
- 3–4 handbags / accessories.
- 2–3 shoes only after size/return economics are checked.

Selection rules:
1. Prefer stable size runs and clear garment measurements; avoid one-size items unless measurements are explicit.
2. Require usable product photos, accurate material composition, care instructions and colour/size variants.
3. Prefer products with EAN and stock across several sizes.
4. Exclude counterfeit-risk or unclear brand-rights items.
5. Do not publish an item unless the current feed confirms stock and the delivered-cost calculation supports the target price.
6. Keep the first launch narrow; never import the entire supplier catalogue.

## Premium price gate
For every SKU calculate:
- landed cost = supplier net price + destination shipping allocation + payment/FX costs + applicable duties/taxes + expected loss/returns allowance.
- retail price = landed cost / (1 - target gross margin).
A premium target margin must be tested against competitor retail prices and customer delivery expectations. Do not multiply wholesale price alone and call the result profit. Taxes, payment fees, advertising and customer-service costs remain separate.

## Required evidence before launch
- A Matterhorn account accepted with the seller's actual legal/business details.
- Downloaded XML/CSV feed or official API credentials stored privately (never pasted into chat).
- Live shipping quote and delivery estimate for each launch country.
- Written answer on customer returns, damaged goods, exchanges, image-use rights and Algeria-based reseller eligibility.
- Payment provider approval for the seller's real country/business type and supported currencies.
- A secure backend for checkout, order records, stock sync and fulfilment; supplier API integration tested in sandbox/staging before real orders.
- Consumer-facing legal pages and lawful seller registration for the markets served.

## Next handoff
Download the women's clothing, footwear and handbags/accessories XML or CSV feeds from the supplier account and attach them here. Do not share your password, API secret or private account credentials. I can then screen actual SKUs, prices, size-level stock, images and EANs and produce the first priced capsule.
