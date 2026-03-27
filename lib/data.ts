import dbConnect from "./mongodb";
import { Data } from "@/models/Data";
import { readFile } from "fs/promises";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data");

export async function getData(filename: string) {
  // If we have MONGODB_URI and not explicitely disabled, try to fetch from MongoDB first

  if (process.env.MONGODB_URI && process.env.FORCE_STATIC !== 'true') {
    console.log("MONGO URI:", process.env.MONGODB_URI);
    try {
      await dbConnect();
      const record = await Data.findOne({ key: filename });
      if (record && record.value) {
        return record.value;
      }
      console.log(`Key "${filename}" not found in MongoDB, falling back to static file system.`);
    } catch {
      console.warn(`MongoDB fetch failed for "${filename}", falling back to static file system.`);
    }
  }

  // Final fallback to local files (Static Data)
  try {
    const filePath = join(DATA_DIR, `${filename}.json`);
    const content = await readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch {
    console.error(`ERROR: Could not load static data for "${filename}":`);
    // Return empty array/object depending on what's expected for this file
    const emptyDefaults: Record<string, unknown> = {
        projects: [],
        skills: [],
        experience: [],
        certifications: [],
        education: [],
        profile: {}
    };
    return emptyDefaults[filename] || null;
  }
}
