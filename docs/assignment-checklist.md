# BazarDor assignment checklist

The supplied assignment README and Figma/Penpot files are the reference. The user's current request explicitly postpones authentication and MongoDB.

## Current website phase

- Responsive home, category, product, sign-in, sign-up and profile layouts.
- Reference colors: page #f0f5f0, cards #fafcfa, borders #e1e8e1, primary #05893e.
- Hind Siliguri font; 1120px desktop content; three columns; 16px product card corners.
- Logo, current Bangla date, category navigation and active link, auth links.
- Infinite price ticker, supplied hero illustration, same-page #সব-পণ্য CTA.
- Top six price risers, top six fallers, all API products.
- Emoji, Bangla name, unit, Bangla price and change badge on every card.
- Numeric sorting, skeletons, API error handling, invalid/empty category states.
- Product summary, category/unit, minimum/maximum/average and all market rows.
- Friendly unknown-route, product and category 404s.
- Reference footer, keyboard accessibility, mobile/tablet/desktop checks.
- Project README, at least five features, eight meaningful commits.

## Later authentication/database phase

- BetterAuth email/password plus Google and GitHub.
- Real signup -> sign-in; sign-in/social login -> home; session-aware navbar/logout.
- Server-side protected product/profile/update routes; redirect notifications.
- MongoDB persistence; name update through BetterAuth updateUser.
- Auth success/error/logout toasts and pending loaders.
- No email verification or forgotten-password flow for assignment submission.
- Production deployment, refresh checks and final Live Link.

## Reference discrepancy

The README says green for increasing prices and red for decreasing prices, while the design uses the opposite. Follow the README's explicit card requirement (green up, red down, gray flat), keeping arrows and labels so the direction is also conveyed without color.
