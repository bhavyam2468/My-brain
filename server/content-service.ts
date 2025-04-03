import fs from "fs";
import path from "path";
import { promisify } from "util";
import { Entry } from "../client/src/lib/utils";

const readFileAsync = promisify(fs.readFile);
const readdirAsync = promisify(fs.readdir);

class ContentService {
  private contentDir: string;

  constructor() {
    this.contentDir = path.resolve(process.cwd(), "public", "thoughts");
  }

  async getAllEntries(): Promise<Entry[]> {
    try {
      if (!fs.existsSync(this.contentDir)) {
        return [];
      }

      const files = await readdirAsync(this.contentDir);
      const markdownFiles = files.filter(file => file.endsWith(".md"));
      
      const entriesPromises = markdownFiles.map(file => this.parseEntryFile(file));
      return (await Promise.all(entriesPromises)).filter(entry => !!entry) as Entry[];
    } catch (error) {
      console.error("Error reading entries directory:", error);
      return [];
    }
  }

  async getEntry(slug: string): Promise<Entry | null> {
    try {
      const filePath = path.join(this.contentDir, `${slug}.md`);
      
      if (!fs.existsSync(filePath)) {
        return null;
      }
      
      return this.parseEntryFile(`${slug}.md`);
    } catch (error) {
      console.error(`Error reading entry file for ${slug}:`, error);
      return null;
    }
  }

  async getRandomEntry(): Promise<Entry | null> {
    try {
      const entries = await this.getAllEntries();
      
      if (entries.length === 0) {
        return null;
      }
      
      const randomIndex = Math.floor(Math.random() * entries.length);
      return entries[randomIndex];
    } catch (error) {
      console.error("Error getting random entry:", error);
      return null;
    }
  }

  async getRandomEntries(count: number): Promise<Entry[]> {
    try {
      const allEntries = await this.getAllEntries();
      const shuffled = [...allEntries].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    } catch (error) {
      console.error("Error getting random entries:", error);
      return [];
    }
  }
  
  async searchEntries(query: string): Promise<Entry[]> {
    try {
      if (!query || query.trim() === '') {
        return [];
      }
      
      // Get all entries
      const allEntries = await this.getAllEntries();
      
      // Convert query to lowercase for case-insensitive search
      const searchTerms = query.toLowerCase().trim().split(/\s+/);
      
      // Filter entries that contain all the search terms in title, description, or content
      const results = allEntries.filter(entry => {
        const entryText = (
          entry.title.toLowerCase() + ' ' + 
          entry.description.toLowerCase() + ' ' + 
          entry.content.toLowerCase()
        );
        
        // An entry matches if all search terms are found in the entry
        return searchTerms.every(term => entryText.includes(term));
      });
      
      return results;
    } catch (error) {
      console.error("Error searching entries:", error);
      return [];
    }
  }

  private async parseEntryFile(filename: string): Promise<Entry | null> {
    try {
      const filePath = path.join(this.contentDir, filename);
      const content = await readFileAsync(filePath, "utf-8");
      
      const slug = filename.replace(/\.md$/, "");
      const sections = content.split("---").filter(Boolean);
      
      if (sections.length < 3) {
        console.error(`Invalid format for entry file ${filename}`);
        return null;
      }
      
      const title = sections[0].trim();
      const description = sections[1].trim();
      const mainContent = sections.slice(2).join("---").trim();
      
      return {
        slug,
        title,
        description,
        content: mainContent,
      };
    } catch (error) {
      console.error(`Error parsing entry file ${filename}:`, error);
      return null;
    }
  }
}

export const contentService = new ContentService();
