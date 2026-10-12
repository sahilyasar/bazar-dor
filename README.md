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
- BetterAuth and MongoDB
- Hind Siliguri font, with Noto Sans Bengali for clearer digits

## Features

- Bangla product names, prices, units, and date.
- Responsive home page with a scrolling price ticker.
- Top six products with rising prices and top six with falling prices.
- Product filtering across eight categories.
- Category pages with low-to-high and high-to-low price sorting.
- Product details with minimum, maximum, and average market prices.
- Loading skeletons, retry option, and friendly 404 pages.
- Email/password sign-up, sign-in, and logout with toast messages.
- Protected product and profile pages, with saved profile name updates.

## Run locally

```bash
git clone https://github.com/sahilyasar/bazar-dor.git
cd bazar-dor
npm install
npm run dev
```

Open http://localhost:3000. Use `npm.cmd` instead of `npm` if PowerShell blocks npm scripts.

Create a `.env` file with your configuration before starting the app:

```env
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_random_secret_at_least_32_characters
MONGODB_URL=your_mongodb_connection_string
```

The database name is `bazar-dor`. You can change it with `MONGODB_DB_NAME`. Keep `.env` private; it is ignored by Git.

For Google login, also add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`. The Google button is available when its credentials are configured. Set this callback URL in your Google OAuth application:

- Google: `http://localhost:3000/api/auth/callback/google`

Use the deployed site's address for `BETTER_AUTH_URL` and the callbacks in production.

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

## Authentication

Registration saves the account in MongoDB and takes the user to sign-in. Successful sign-in opens the home page. The navbar shows the user's name, profile links, and logout button. Product details, profile, and name-update pages check the session on the server. Name changes are saved with BetterAuth's `updateUser` method.

Email verification and password reset are not enabled for this assignment. Google login needs OAuth credentials. Deployment and visual browser checks are pending.
