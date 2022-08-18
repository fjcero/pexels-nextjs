# Pexels + Nextjs

## Getting Started

Run the development server:

```bash
pnpm dev # (suggested)
# or
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Todo list

- ✅ Boilerplate with Nextjs + Typescript
- ⬜️ Connect with Pexels API
- ⬜️ Load images (lazy loading, blurring, etc)
- ✅ Navigation with infinite scroll
- ✅ Deploy to Vercel

## Overview

For experimenting the demo online, you can go to:

> 💡 Demo: https://pexels-nextjs-git-main-fjcero.vercel.app

## Pre-requirements

- An API key for Pexels is required. After generating the key, `.env` should be updated with the proper value for `NEXT_PUBLIC_PEXELS_API_KEY`. Nextjs automatically reads this variable when running in local environment.

### Navigation

1. On first load, to enhance UX, a set of images is prefetched using `getServerSideProps`
2. After scrolling, the `button` for loading more has a `IntersectionObserver` listener to automatically load 10 more images when reached
3. To prevent scrollings ad infinitum, a hard limit of 10 pages is set, so whenever the user exceeds the first 10 pages while scrolling, the `Load more` button needs to be clicked
4. For fetching data in the Client side we are using `react-query` which adds a caching layer on top of `fetch`. This is really convenient when reloading things that might be 

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
pnpm 