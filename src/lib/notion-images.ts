/**
 * This utility handles image processing for Notion-hosted images
 * to avoid expiration issues with Notion's temporary URLs.
 */

import { createHash } from 'crypto';
import path from 'path';
import fs from 'fs';

// Directory where we'll store downloaded images
const IMAGE_DIR = path.join(process.cwd(), 'public', 'notion-images');

// Ensure the directory exists
if (!fs.existsSync(IMAGE_DIR)) {
  fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

/**
 * Downloads an image from a URL and saves it locally
 */
export async function downloadNotionImage(imageUrl: string): Promise<string> {
  try {
    // Create a hash of the URL to use as the filename
    const hash = createHash('md5').update(imageUrl).digest('hex');
    const extension = path.extname(new URL(imageUrl).pathname) || '.jpg';
    const filename = `${hash}${extension}`;
    const filePath = path.join(IMAGE_DIR, filename);
    
    // Check if we've already downloaded this image
    if (fs.existsSync(filePath)) {
      return `/notion-images/${filename}`;
    }
    
    // Download the image
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    
    // Save the image
    fs.writeFileSync(filePath, Buffer.from(buffer));
    
    // Return the path to the image relative to the public directory
    return `/notion-images/${filename}`;
  } catch (error) {
    console.error('Error downloading Notion image:', error);
    return imageUrl; // Fall back to the original URL if download fails
  }
}

/**
 * Processes HTML content to download and replace Notion image URLs
 */
export async function processNotionImages(html: string): Promise<string> {
  // Regular expression to find image tags with Notion URLs
  const imgRegex = /<img[^>]+src="(https:\/\/[^"]*notion[^"]*)"[^>]*>/g;
  
  let match;
  let processedHtml = html;
  
  // Find all image tags and process them
  while ((match = imgRegex.exec(html)) !== null) {
    const [fullMatch, imageUrl] = match;
    
    // Download the image and get the local path
    const localImagePath = await downloadNotionImage(imageUrl);
    
    // Replace the original URL with the local path
    processedHtml = processedHtml.replace(
      imageUrl,
      localImagePath
    );
  }
  
  return processedHtml;
}
