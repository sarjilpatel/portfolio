"use server"

import dbConnect from "./mongodb"
import { Data } from "@/models/Data"
import { revalidatePath } from "next/cache"
import { writeFile } from "fs/promises"
import { join } from "path"

const DATA_DIR = join(process.cwd(), "data")

export async function updateData(key: string, data: any) {
  try {
    // 1. Update MongoDB
    if (process.env.MONGODB_URI) {
      await dbConnect()
      await Data.findOneAndUpdate(
        { key },
        { value: data },
        { upsert: true }
      )
    }

    // 2. Try to update local file (will fail on Vercel, but that's caught)
    try {
      const filePath = join(DATA_DIR, `${key}.json`)
      await writeFile(filePath, JSON.stringify(data, null, 2))
    } catch (fsError) {
      // It's expected to fail on Vercel's read-only filesystem
      console.warn(`File system update skipped/failed: ${fsError}`)
    }

    revalidatePath("/")
    revalidatePath("/secret-admin")
    return { success: true }
  } catch (error) {
    console.error(`Error updating ${key}:`, error)
    return { success: false, error: String(error) }
  }
}
