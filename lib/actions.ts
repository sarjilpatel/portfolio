"use server"

import { writeFile } from "fs/promises"
import { join } from "path"
import { revalidatePath } from "next/cache"

const DATA_DIR = join(process.cwd(), "data")

export async function updateData(filename: string, data: any) {
  try {
    const filePath = join(DATA_DIR, `${filename}.json`)
    await writeFile(filePath, JSON.stringify(data, null, 2))
    revalidatePath("/")
    revalidatePath("/secret-admin")
    return { success: true }
  } catch (error) {
    console.error(`Error updating ${filename}:`, error)
    return { success: false, error: String(error) }
  }
}
