# Vercel Deployment Guide

This file contains instructions for deploying your Notion-backed Next.js site to Vercel.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. Your project pushed to a GitHub repository

## Deployment Steps

### 1. Connect Your Repository to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Connect your GitHub account if not already done
4. Select your repository (`personal_site`)
5. Vercel will automatically detect Next.js and suggest optimal settings

### 2. Configure Environment Variables

Add all your Notion-related environment variables:

- `NOTION_API_KEY`
- `NOTION_BLOG_DATABASE_ID`
- `NOTION_BOOKS_DATABASE_ID`
- `NOTION_THOUGHTS_PAGE_ID`

These should be added in the Vercel project settings under the "Environment Variables" section.

### 3. Deploy

Click "Deploy" and Vercel will build and deploy your site.

### 4. Custom Domain Setup

To use a custom domain (like prerit.website):

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your domain and follow the DNS configuration instructions

## Automatic Deployments

Vercel automatically deploys when you push to your main branch, so your workflow is:

1. Make changes locally
2. Test with `npm run dev`
3. Commit and push to GitHub
4. Vercel automatically builds and deploys your site

## Incremental Static Regeneration (ISR)

Your site uses ISR with different revalidation times:
- Blog posts: 1 hour (`revalidate: 3600`)
- Books: 1 day (`revalidate: 86400`)
- Thoughts: 10 minutes (`revalidate: 600`)

These settings will work automatically on Vercel without any additional configuration.
