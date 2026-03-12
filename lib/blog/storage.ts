// Blog storage layer - JSON file persistence
import * as fs from 'fs';
import * as path from 'path';
import { BlogPost } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const POSTS_FILE = path.join(DATA_DIR, 'posts.json');

/**
 * Ensure the data directory and files exist
 */
function ensureDataFiles(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(POSTS_FILE)) {
    fs.writeFileSync(POSTS_FILE, '[]', 'utf-8');
  }
}

/**
 * Read JSON file safely
 */
function readJsonFile<T>(filePath: string): T[] {
  ensureDataFiles();

  try {
    const content = fs.readFileSync(filePath, 'utf-8').trim();
    if (!content || content === '') {
      return [];
    }
    return JSON.parse(content) as T[];
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
}

/**
 * Write JSON file with formatting
 */
function writeJsonFile<T>(filePath: string, data: T[]): void {
  ensureDataFiles();

  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
    throw error;
  }
}

/**
 * Get all published posts from storage
 */
export function getAllPostsFromStorage(): BlogPost[] {
  return readJsonFile<BlogPost>(POSTS_FILE);
}

/**
 * Get a single post by slug
 */
export function getPostBySlugFromStorage(slug: string): BlogPost | undefined {
  const posts = getAllPostsFromStorage();
  return posts.find((post) => post.slug === slug);
}

/**
 * Save a post to storage
 */
export function savePost(post: BlogPost): void {
  const posts = getAllPostsFromStorage();
  const existingIndex = posts.findIndex((p) => p.slug === post.slug);

  if (existingIndex >= 0) {
    posts[existingIndex] = post;
  } else {
    posts.push(post);
  }

  writeJsonFile(POSTS_FILE, posts);
}

/**
 * Delete a post by slug
 */
export function deletePost(slug: string): boolean {
  const posts = getAllPostsFromStorage();
  const index = posts.findIndex((p) => p.slug === slug);

  if (index >= 0) {
    posts.splice(index, 1);
    writeJsonFile(POSTS_FILE, posts);
    return true;
  }

  return false;
}
