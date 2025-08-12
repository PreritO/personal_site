# Setting Up Notion Integration

To set up the Notion integration for this website:

## Step 1: Create a Notion Integration

1. Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click "New integration"
3. Name your integration (e.g., "Personal Website")
4. Select the workspace where your content databases are located
5. Set the capabilities (Read content is required)
6. Click "Submit"
7. Copy your "Internal Integration Token" - this will be your `NOTION_API_KEY`

## Step 2: Share Databases with the Integration

For each of your Notion databases (Blog Posts, Books, and Thoughts):

1. Open the database in Notion
2. Click the "..." menu in the top right
3. Click "Add connections"
4. Find and select your integration

## Step 3: Get Database IDs

For each of your Notion databases:

1. Open the database in Notion
2. Look at the URL, which will be in this format:
   `https://www.notion.so/workspace-name/databaseID?v=...`
3. Copy the `databaseID` part (it's a 32-character string)

## Step 4: Update Environment Variables

Update your `.env.local` file with:

```
NOTION_API_KEY=your_notion_api_key
NOTION_BLOG_DATABASE_ID=your_blog_database_id
NOTION_BOOKS_DATABASE_ID=your_books_database_id
NOTION_THOUGHTS_DATABASE_ID=your_thoughts_database_id
```

## Step 5: Ensure Database Structures

Make sure your Notion databases have the correct fields:

### Blog Posts Database
- Title (Title)
- Slug (Text)
- Date (Date)
- Tags (Multi-select)
- Content (Page content)
- Status (Select with "Published" and "Draft" options)

### Books Database
- Title (Title)
- Author (Text)
- Date Finished (Date)
- Rating (Number)
- Notes (Rich text)
- Public? (Checkbox)

### Thoughts Database
- Content (Title/Text)
- Date (Date)
- Tags (Multi-select)
- Public? (Checkbox)
