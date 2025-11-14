This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Project Specifics

- This project is a simplified streaming dashboard demo built with Next.js 14 (App Router), TypeScript and Tailwind CSS.
- The app fetches movie data from The Movie Database (TMDB). You must provide a TMDB API key in a local `.env.local` file (see below).

## Environment Variables

- Create a local `.env.local` file in the project root with the following content:

```env
TMDB_API_KEY=your_tmdb_api_key_here
```

- For safety, the repository includes `.env.local.example` (no secrets). The real `.env.local` is ignored by Git (see `.gitignore`).

## AI Report

An AI usage report is included at `AI_Report.md`. It documents which AI tools were used and where they influenced the code.

## Running Locally

Install dependencies and run the dev server:

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` and try searching via the header, or click posters to view details.

