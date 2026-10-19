# ROYAL AURA — Homepage Demo

A front-end-only visual demo of the ROYAL AURA conceptual jewellery homepage,
built from the Figma design "Royal Jewellery Store — 01.01 Desktop storefront — Homepage".

## How to open

1. Unzip the folder.
2. Double-click `index.html` (it opens in Chrome, Edge, Firefox or Safari).

No server, install step or internet connection is needed. All fonts, icons and
images are inside this folder.

## Folder structure

```
index.html          Homepage
css/styles.css      All styling (desktop, tablet, mobile)
js/main.js          Interactions
assets/img/         Product, campaign and story illustrations (SVG)
assets/icons/       UI icons (SVG)
assets/fonts/       Cormorant Garamond + Inter (WOFF2, self-hosted)
```

## What works (front-end only)

- Responsive layout: desktop, tablet and mobile. Below 900px the navigation
  becomes a menu button.
- Navigation and buttons scroll smoothly to the matching section.
- Heart buttons on product cards toggle a saved state and update a counter in
  the header. The state is not stored after a page refresh.
- Newsletter form checks the email format and shows a message. Nothing is sent.
- Back-to-top button, scroll-in animations (disabled for users who prefer reduced motion).
- Pages that don't exist in this demo (search, account, bag, "Delivery & returns", etc.)
  show a short "not part of this demo" message instead of a dead link.

## What this demo does NOT include

- No shop, product pages, cart, checkout, payments, accounts or backend.
- Wishlist and newsletter are visual only.

## About the images

The Figma image files could not be downloaded automatically, so the product and
campaign pictures are **illustrated stand-ins** in the brand palette (gold, ruby,
pearl, emerald on burgundy and cream). To use real photography:

1. Put your photos in `assets/img/` (for example `necklace.jpg`).
2. In `index.html`, change the matching `src="assets/img/necklace.svg"` to your file name.
   Images are cropped to fit automatically.

| Used for | Current file |
|---|---|
| Hero banner | `campaign-portrait.svg` |
| Necklaces / Gulbahar Polki Necklace | `necklace.svg` |
| Earrings / Noor Pearl Jhumkas | `jhumkas.svg` |
| Bangles & rings / Meher Gold Bangles | `bangles.svg` |
| Zoya Emerald Ring | `ring.svg` |
| Bridal edit banner | `bridal.svg` |
| Craftsmanship story | `atelier.svg` |

## Notes

- Copy such as testimonials, sourcing and certification wording is concept copy
  from the design and is marked as such on the page. Verify it before any real launch.
- Icons: Lucide (ISC licence). Fonts: Cormorant Garamond and Inter (SIL Open Font Licence).
