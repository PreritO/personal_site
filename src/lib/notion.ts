import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { remark } from 'remark';
import html from 'remark-html';
import { 
  PageObjectResponse, 
  PartialPageObjectResponse,
  DatabaseObjectResponse,
  PartialDatabaseObjectResponse
} from "@notionhq/client/build/src/api-endpoints";
import { processNotionImages } from './notion-images';

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Initialize NotionToMarkdown converter
const n2m = new NotionToMarkdown({ notionClient: notion });

// Types for our Notion database entries
export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  date: string;
  categories: string[];
  content: string;
  status: string;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  url?: string;
  dateFinished: string;
  rating?: number;
  notes: string;
  isPublic: boolean;
};

/**
 * Converts Notion blocks to HTML content
 */
export async function notionBlocksToHtml(pageId: string): Promise<string> {
  // Get all blocks in the page
  const mdBlocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(mdBlocks);
  
  // Convert markdown to HTML
  const processedContent = await remark()
    .use(html)
    .process(mdString.parent);
  
  // Process Notion images to handle expiration issues
  const htmlWithProcessedImages = await processNotionImages(processedContent.toString());
  
  return htmlWithProcessedImages;
}

/**
 * Gets all published blog posts
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  const blogDatabaseId = process.env.NOTION_BLOG_DATABASE_ID as string;
  
  console.log("Fetching blog posts from database ID:", blogDatabaseId);

  // First, let's fetch the database to inspect its structure
  try {
    const databaseInfo = await notion.databases.retrieve({
      database_id: blogDatabaseId,
    });
    
    console.log("Database properties:", Object.keys(databaseInfo.properties));
  } catch (error) {
    console.error("Error retrieving database info:", error);
  }

  // Let's try without a filter first to see if we can get any posts
  const response = await notion.databases.query({
    database_id: blogDatabaseId,
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });
  
  console.log(`Found ${response.results.length} posts total`);

  const posts = await Promise.all(
    response.results.map(async (page) => {
      // Type assertion to ensure we're working with a PageObjectResponse
      const pageObj = page as PageObjectResponse;
      const properties = pageObj.properties as any;
      
      console.log("Post property names:", Object.keys(properties));
      console.log("Status property type:", properties.Status?.type);
      console.log("Status property value:", JSON.stringify(properties.Status, null, 2));
      
      return {
        id: pageObj.id,
        slug: properties.Slug.rich_text[0]?.plain_text || "",
        title: properties.Title.title[0]?.plain_text || "Untitled",
        date: properties.Date.date?.start || "",
        categories: properties.Categories.multi_select.map((category: any) => category.name),
        content: "", // We'll fetch this separately when needed
        status: properties.Status?.status?.name || properties.Status?.select?.name || "Unknown",
      };
    })
  );

  return posts;
}

/**
 * Gets a specific blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const blogDatabaseId = process.env.NOTION_BLOG_DATABASE_ID as string;
  
  try {
    const response = await notion.databases.query({
      database_id: blogDatabaseId,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
    });

    if (!response.results.length) {
      return null;
    }

    // Type assertion to ensure we're working with a PageObjectResponse
    const page = response.results[0] as PageObjectResponse;
    const properties = page.properties as any;
    
    // Get the content as HTML
    const content = await notionBlocksToHtml(page.id);

    return {
      id: page.id,
      slug: properties.Slug?.rich_text?.[0]?.plain_text || "",
      title: properties.Title?.title?.[0]?.plain_text || "Untitled",
      date: properties.Date?.date?.start || "",
      categories: properties.Categories?.multi_select?.map((category: any) => category.name) || [],
      content,
      status: properties.Status?.status?.name || properties.Status?.select?.name || "Unknown",
    };
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

/**
 * Gets all public books
 */
export async function getAllBooks(): Promise<Book[]> {
  const booksDatabaseId = process.env.NOTION_BOOKS_DATABASE_ID as string;
  
  try {
    // First, let's fetch the database to inspect its structure
    const databaseInfo = await notion.databases.retrieve({
      database_id: booksDatabaseId,
    });
    
    console.log("Books database properties:", JSON.stringify(databaseInfo.properties, null, 2));
    
    const response = await notion.databases.query({
      database_id: booksDatabaseId,
      filter: {
        property: "Public",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "Date Finished",
          direction: "descending",
        },
      ],
    });

    console.log(`Found ${response.results.length} books total`);

    const books = await Promise.all(
      response.results.map(async (page) => {
        // Type assertion to ensure we're working with a PageObjectResponse
        const pageObj = page as PageObjectResponse;
        const properties = pageObj.properties as any;
        
        return {
          id: pageObj.id,
          title: properties.Title?.title?.[0]?.plain_text || "Untitled",
          author: properties.Author?.rich_text?.[0]?.plain_text || "",
          url: properties.Url?.url || "",
          dateFinished: properties["Date Finished"]?.date?.start || "",
          rating: properties.Rating?.number,
          notes: properties.Notes?.rich_text?.[0]?.plain_text || "",
          isPublic: properties["Public"]?.checkbox || false,
        };
      })
    );

    return books;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}

/**
 * Gets all  thoughts
 */
// Add this to src/lib/notion.ts

export async function getThoughtsPage() {
  // Replace with your actual Notion page ID
  const pageId = process.env.NOTION_THOUGHTS_PAGE_ID;
  
  if (!pageId) {
    console.error("Missing NOTION_THOUGHTS_PAGE_ID environment variable");
    return { blocks: [] };
  }

  try {
    // Fetch all blocks from the page
    const blocks = await notion.blocks.children.list({
      block_id: pageId,
    });

    // Process the blocks to extract the bulleted list items
    const thoughts = processThoughtBlocks(blocks.results);
    
    return { 
      blocks: thoughts,
      lastEditedTime: new Date().toISOString() // We could fetch page metadata for this
    };
  } catch (error) {
    console.error("Error fetching thoughts page:", error);
    return { blocks: [] };
  }
}

// Helper function to process blocks and extract bulleted list items
function processThoughtBlocks(blocks: any[]) {
  const thoughts = [];
  
  for (const block of blocks) {
    // Process bulleted list items
    if (block.type === 'bulleted_list_item') {
      const content = block.bulleted_list_item.rich_text.map((text: any) => text.plain_text).join('');
      
      // Basic thought item
      const thought = {
        id: block.id,
        content,
        hasChildren: block.has_children,
        children: []
      };
      
      // If this is a toggle, we'll need to fetch its children separately
      if (block.has_children) {
        // We'd ideally fetch children here, but we'll handle this later
      }
      
      thoughts.push(thought);
    }
  }
  
  return thoughts;
}
