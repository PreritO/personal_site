# Notion-Backed Personal Website

This is a personal website built with Next.js and powered by Notion as the content backend. The site pulls data from three Notion databases: Blog Posts, Books, and Random Thoughts.

## Features

- Static-first architecture with Incremental Static Regeneration (ISR)
- Dark mode support
- Responsive design for all devices
- Content pulled directly from Notion databases
- Blog posts with tags
- Books collection with ratings
- Random thoughts collection

## Getting Started

1. Set up your Notion integration (see [NOTION_SETUP.md](NOTION_SETUP.md))
2. Update your environment variables in `.env.local`
3. Run the development server:

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

## Content Structure

The website pulls content from three Notion databases:

### 1. Blog Posts
- Title
- Slug (URL path)
- Date
- Tags
- Content
- Status (Published/Draft)

### 2. Books
- Title
- Author
- Date Finished
- Rating
- Notes
- Public? (visibility toggle)

### 3. Random Thoughts
- Content
- Date
- Tags
- Public? (visibility toggle)

## Content Freshness

The site uses Incremental Static Regeneration with different revalidation times:
- Blog posts: Every 1 hour
- Books: Every 24 hours
- Thoughts: Every 10 minutes

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Notion API Documentation](https://developers.notion.com/reference/intro)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.
