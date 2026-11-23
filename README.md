# ÉLVARÉ — storefront preview

A responsive static storefront concept, prepared as the first independent ÉLVARÉ repository.

## Current state
- Editorial landing page and responsive layout
- Demonstration product cards and local saved-items drawer
- Pre-launch information page
- No real products, prices, inventory, checkout, customer accounts, order processing or supplier integration

## Before accepting orders
1. Confirm trademark/name availability in target markets.
2. Confirm seller legal status, tax and consumer-law requirements.
3. Obtain written supplier approval for dropshipping, product images, destination countries, shipping, returns, stock feeds and automated order submission.
4. Verify a payment provider that onboards the actual seller country and business type and settles to an account in the seller's name.
5. Implement secure server-side checkout, order records, supplier fulfilment, tracking, refunds and customer support.
6. Never collect or store card details directly in this static site.

## Cloudflare Pages
Connect this GitHub repository using Cloudflare Pages Git integration. For this plain HTML site:
- Production branch: main
- Build command: leave blank (or use `exit 0`)
- Build output directory: `/` (repository root)

Cloudflare Pages will provide a `*.pages.dev` hostname after a successful deployment. This repository is a preview, not a live shop.