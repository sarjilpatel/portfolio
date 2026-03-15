import { readFile } from "fs/promises"
import { join } from "path"

const DATA_DIR = join(process.cwd(), "data")

export async function getData(filename: string) {
  try {
    const filePath = join(DATA_DIR, `${filename}.json`)
    const content = await readFile(filePath, "utf-8")
    return JSON.parse(content)
  } catch (error) {
    console.error(`Error reading ${filename}:`, error)
    return null
  }
}
