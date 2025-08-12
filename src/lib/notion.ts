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
  tags: string[];
  content: string;
  status: string;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  dateFinished: string;
  rating?: number;
  notes: string;
  isPublic: boolean;
};

export type Thought = {
  id: string;
  content: string;
  date: string;
  tags: string[];
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
  
  try {
    // First, let's fetch the database to inspect its structure
    const databaseInfo = await notion.databases.retrieve({
      database_id: blogDatabaseId,
    });
    
    console.log("Database properties:", JSON.stringify(databaseInfo.properties, null, 2));
    
    // Query with no filters first to debug
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
        
        console.log("Post properties:", JSON.stringify(properties, null, 2));
        
        return {
          id: pageObj.id,
          slug: properties.Slug?.rich_text?.[0]?.plain_text || pageObj.id,
          title: properties.Title?.title?.[0]?.plain_text || "Untitled",
          date: properties.Date?.date?.start || new Date().toISOString(),
          tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
          content: "", // We'll fetch this separately when needed
          status: properties.Status?.select?.name || "Draft",
        };
      })
    );

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
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
      tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
      content,
      status: properties.Status?.select?.name || "Draft",
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
        property: "Public?",
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
          dateFinished: properties["Date Finished"]?.date?.start || "",
          rating: properties.Rating?.number,
          notes: properties.Notes?.rich_text?.[0]?.plain_text || "",
          isPublic: properties["Public?"]?.checkbox || false,
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
 * Gets all public thoughts
 */
export async function getAllThoughts(): Promise<Thought[]> {
  const thoughtsDatabaseId = process.env.NOTION_THOUGHTS_DATABASE_ID as string;
  
  try {
    // First, let's fetch the database to inspect its structure
    const databaseInfo = await notion.databases.retrieve({
      database_id: thoughtsDatabaseId,
    });
    
    console.log("Thoughts database properties:", JSON.stringify(databaseInfo.properties, null, 2));
    
    const response = await notion.databases.query({
      database_id: thoughtsDatabaseId,
      filter: {
        property: "Public?",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });

    console.log(`Found ${response.results.length} thoughts total`);

    const thoughts = await Promise.all(
      response.results.map(async (page) => {
        // Type assertion to ensure we're working with a PageObjectResponse
        const pageObj = page as PageObjectResponse;
        const properties = pageObj.properties as any;
        
        return {
          id: pageObj.id,
          content: properties.Content?.title?.[0]?.plain_text || "",
          date: properties.Date?.date?.start || "",
          tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
          isPublic: properties["Public?"]?.checkbox || false,
        };
      })
    );

    return thoughts;
  } catch (error) {
    console.error("Error fetching thoughts:", error);
    return [];
  }
}
