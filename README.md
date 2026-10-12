# বাজার দর / BazarDor

BazarDor is a Bangla website for checking the prices of everyday essentials. It shows price changes and lets users compare prices across different markets.

## Links

- GitHub: https://github.com/sahilyasar/bazar-dor
- Live site: Coming soon

## Technologies

- Next.js and React
- JavaScript
- Tailwind CSS and DaisyUI
- react-hot-toast
- BetterAuth setup in progress
- Hind Siliguri font

## Features

- Bangla product names, prices, units, and date.
- Responsive home page with a scrolling price ticker.
- Top six products with rising prices and top six with falling prices.
- Product filtering across eight categories.
- Category pages with low-to-high and high-to-low price sorting.
- Product details with minimum, maximum, and average market prices.
- Loading skeletons, retry option, and friendly 404 pages.
- Sign-in, sign-up, profile, and name-update forms.

## Run locally

```bash
git clone https://github.com/sahilyasar/bazar-dor.git
cd bazar-dor
npm install
npm run dev
```

Open http://localhost:3000. Use `npm.cmd` instead of `npm` if PowerShell blocks npm scripts.

```bash
npm run lint
npm run build
npm start
```

## Product API

Products are fetched from the assignment API:

`https://openapi.programming-hero.com/api/bazardor/products`

If it is unavailable, the app tries both backup APIs provided in the assignment. If all three fail, it shows saved API data with a notice.

Prices are sorted as numbers and displayed in Bengali digits. The market average is calculated from the midpoint of each market's price range.

## Project structure

```text
src/app/          Pages and API routes
src/components/   Reusable UI components
src/lib/          Data, formatting, and authentication helpers
src/data/         Saved product and category data
public/           Images and fonts
```

## In progress

Authentication and MongoDB integration are in progress. Account forms currently show messages without signing users in or saving changes. Product details are public until route protection is connected. Deployment and browser checks are also pending.
