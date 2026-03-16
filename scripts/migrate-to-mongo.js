require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define the MONGODB_URI environment variable inside .env.local");
  process.exit(1);
}

const DataSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
}, { timestamps: true });

const Data = mongoose.models.Data || mongoose.model("Data", DataSchema);

const filesToMigrate = [
  'awards.json',
  'certifications.json',
  'education.json',
  'experience.json',
  'profile.json',
  'projects.json',
  'skills.json'
];

async function migrate() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    for (const filename of filesToMigrate) {
      const key = filename.replace('.json', '');
      const filePath = path.join(process.cwd(), 'data', filename);
      
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const value = JSON.parse(content);

        await Data.findOneAndUpdate(
          { key },
          { value },
          { upsert: true, new: true }
        );
        console.log(`Migrated ${filename} to key "${key}"`);
      } else {
        console.warn(`File ${filePath} not found, skipping.`);
      }
    }

    console.log("Migration completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

migrate();
