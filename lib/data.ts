import dbConnect from "./mongodb";
import { Data } from "@/models/Data";
import { readFile } from "fs/promises";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data");

export async function getData(filename: string) {
  // If we have MONGODB_URI, try to fetch from MongoDB first
  if (process.env.MONGODB_URI) {
    try {
      await dbConnect();
      const record = await Data.findOne({ key: filename });
      if (record) {
        return record.value;
      }
      console.log(`Key ${filename} not found in MongoDB, falling back to file system.`);
    } catch (error) {
      console.error(`MongoDB error fetching ${filename}:`, error);
    }
  }

  // Fallback to local files (useful for local development and if DB is not yet populated)
  try {
    const filePath = join(DATA_DIR, `${filename}.json`);
    const content = await readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading ${filename} from file system:`, error);
    return null;
  }
}
