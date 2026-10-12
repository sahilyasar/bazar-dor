# 🛒 বাজার দর / BazarDor

A simple Bangla market-price website built for **B14 Assignment 07**. Compare everyday essentials, see which prices increased or decreased, and check prices across different markets.

The layout follows the supplied **Figma and Penpot** designs, including their colors, Hind Siliguri typography, rounded product cards, three-column desktop grid, hero artwork, and footer.

## Project links

- **GitHub:** https://github.com/sahilyasar/bazar-dor
- **Live link:** Pending deployment.
- **Local preview:** http://localhost:3000

## Current phase

The website UI and public product features are implemented. **Authentication and MongoDB are intentionally reserved for the next phase**, as requested.

Sign-in, sign-up, profile, and name-update pages are interface previews. They validate input and show relevant messages, but they do not create accounts, sign users in, or save profile changes. Product details are currently public; server-side protection will be added with BetterAuth.

## Key features

1. **Bangla interface:** names, prices, units, percentage changes, and the current date in Bangladesh time.
2. **Responsive layout:** one product column on mobile, two on tablet, and three on desktop.
3. **Category navigation:** all eight assignment categories, with the current category highlighted.
4. **Price ticker:** continuously scrolling prices with pause/resume and reduced-motion support.
5. **Home page:** supplied hero illustration, a same-page `#সব-পণ্য` button, top six risers, top six fallers, and all 33 products.
6. **Category filtering and sorting:** filter home products and sort category prices numerically, including Bengali-digit prices.
7. **Product details:** unit, category, today's change, minimum/maximum/average price, and every market's price range.
8. **Loading and error states:** animated skeletons, retry button, empty lists, and friendly missing-page screens.
9. **API resilience:** primary API, both assignment backup APIs, then a clearly labeled saved API snapshot.
10. **Account layouts:** sign-in, sign-up, social buttons, profile, name-update form, and toast messages ready for the next phase.

## Technologies

| Technology | Use |
| --- | --- |
| Next.js 16.4 + App Router | Pages, dynamic routes, product API handler, caching |
| React 19 + JavaScript | Small reusable components and simple state |
| Tailwind CSS 4 + DaisyUI | Styling, inputs, buttons, tables, skeletons |
| react-hot-toast | Form validation and account-service messages |
| Hind Siliguri | Locally served Bangla font, licensed under OFL |

**Next phase:** BetterAuth (email/password, Google, GitHub) and MongoDB.

## Run locally

Use Node.js 20.9 or newer and npm.

```bash
git clone https://github.com/sahilyasar/bazar-dor.git
cd bazar-dor
npm install
npm run dev
```

Open http://localhost:3000. No environment variables are required for this phase.

On Windows PowerShell, use `npm.cmd` if the machine blocks `npm.ps1`.

```bash
npm run lint
npm run build
npm start
```

## Routes

| Route | Page |
| --- | --- |
| `/` | Hero, price changes, all products |
| `/category/[slug]` | Category products and sort dropdown |
| `/product/[slug]` | Product details and market comparison |
| `/signin` | Sign-in interface |
| `/signup` | Registration interface |
| `/profile` | Profile interface |
| `/profile/update` | Name-update interface |
| `/api/products` | Product data and fallback status |

Unknown routes, product slugs, and category slugs show a friendly 404 screen with a home link.

## How the data works

`src/lib/products.js` fetches `/products` from these assignment APIs in order:

1. `https://openapi.programming-hero.com/api/bazardor`
2. `https://api.api-store.workers.dev/api/bazardor`
3. `https://api.abcz.workers.dev/api/bazardor`

Each request has a five-second timeout. Next.js caches successful data for one minute before revalidation. If all sources fail, the site uses the official API response saved on **12 October 2026** and shows that status. Saved information is never presented as a fresh API response.

Categories come from the supplied API snapshot in `src/data/categories.json`. Filtering happens in JavaScript. Sorting uses numeric prices, never formatted text. Risers/fallers are ranked by the largest percentage change.

The summary's minimum and maximum come from all market ranges. The average is the mean of the market midpoints, rounded for display. Each market row shows its own midpoint.

The README and design disagree about badge colors. This project follows the assignment README: **green increases, red decreases, gray unchanged**, with arrows to show direction.

## Simple project structure

```text
public/                  Supplied images and local fonts
src/app/                 Pages, loading/error screens, product API
src/components/          Navbar, hero, cards, forms, ticker, footer
src/data/                Official API fallback snapshots
src/lib/                 Data fetching and Bangla/price helpers
docs/assignment-checklist.md
```

## Remaining before final submission

- Connect BetterAuth with MongoDB.
- Enable email/password, Google, and GitHub authentication.
- Add real session state, logout, auth notifications, and pending loaders.
- Protect product/profile/update routes on the server and notify on redirects.
- Save name changes using BetterAuth `updateUser`.
- Keep email verification and forgotten-password flows out of the assignment.
- Visually check mobile, tablet, and desktop in a browser.
- Deploy to Vercel (or another Next.js host), test route refreshes, and add the Live Link above.

For Vercel, import this GitHub repository and use its Next.js framework preset. Keep the normal server deployment so dynamic routes and `/api/products` work; this project does not use static export.

See [the full assignment checklist](docs/assignment-checklist.md) for the current and deferred requirements.
