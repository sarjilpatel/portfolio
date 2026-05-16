"use server"

import dbConnect from "./mongodb"
import { Data } from "@/models/Data"
import { revalidatePath, revalidateTag } from "next/cache"
import { writeFile } from "fs/promises"
import { join } from "path"

const DATA_DIR = join(process.cwd(), "data")

export async function updateData(key: string, data: any) {
  try {
    if (process.env.MONGODB_URI) {
      await dbConnect()
      await Data.findOneAndUpdate(
        { key },
        { value: data },
        { upsert: true }
      )
    }

    // Will silently fail on Vercel's read-only filesystem — that's expected
    try {
      const filePath = join(DATA_DIR, `${key}.json`)
      await writeFile(filePath, JSON.stringify(data, null, 2))
    } catch (fsError) {
      console.warn(`File system update skipped/failed: ${fsError}`)
    }

    revalidateTag("portfolio-data", {})
    revalidatePath("/")
    revalidatePath("/secret-admin")
    return { success: true }
  } catch (error) {
    console.error(`Error updating ${key}:`, error)
    return { success: false, error: String(error) }
  }
}
