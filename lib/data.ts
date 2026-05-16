import dbConnect from "./mongodb";
import { Data } from "@/models/Data";
import { readFile } from "fs/promises";
import { join } from "path";
import { unstable_cache } from "next/cache";

const DATA_DIR = join(process.cwd(), "data");

const KEYS = ["profile", "projects", "skills", "experience", "education", "certifications"] as const;
type DataKey = (typeof KEYS)[number];

const emptyDefaults: Record<DataKey, unknown> = {
  projects: [],
  skills: [],
  experience: [],
  certifications: [],
  education: [],
  profile: {},
};

async function readStaticFile(filename: string): Promise<unknown> {
  try {
    const filePath = join(DATA_DIR, `${filename}.json`);
    const content = await readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch {
    return emptyDefaults[filename as DataKey] ?? null;
  }
}

async function fetchAllFromMongo(): Promise<Record<string, unknown> | null> {
  if (!process.env.MONGODB_URI || process.env.FORCE_STATIC === "true") return null;
  try {
    await dbConnect();
    const records = await Data.find({ key: { $in: [...KEYS] } }).lean();
    const result: Record<string, unknown> = {};
    for (const r of records) {
      result[(r as any).key] = (r as any).value;
    }
    return result;
  } catch {
    console.warn("MongoDB batch fetch failed, falling back to static files");
    return null;
  }
}

// Cached for the portfolio homepage — invalidated when admin saves via revalidateTag("portfolio-data")
export const getAllData = unstable_cache(
  async () => {
    const mongoData = await fetchAllFromMongo();
    const result: Record<string, unknown> = {};
    for (const key of KEYS) {
      result[key] = mongoData?.[key] ?? (await readStaticFile(key));
    }
    return result;
  },
  ["portfolio-all-data"],
  { tags: ["portfolio-data"], revalidate: false }
);

// Always-fresh version for admin page — bypasses cache
export async function getAllDataFresh(): Promise<Record<string, unknown>> {
  const mongoData = await fetchAllFromMongo();
  const result: Record<string, unknown> = {};
  for (const key of KEYS) {
    result[key] = mongoData?.[key] ?? (await readStaticFile(key));
  }
  return result;
}

// Legacy single-key getter kept for any direct use
export async function getData(filename: string) {
  if (process.env.MONGODB_URI && process.env.FORCE_STATIC !== "true") {
    try {
      await dbConnect();
      const record = await Data.findOne({ key: filename });
      if (record?.value) return record.value;
    } catch {
      console.warn(`MongoDB fetch failed for "${filename}", falling back to static.`);
    }
  }
  return readStaticFile(filename);
}
