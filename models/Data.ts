import mongoose, { Schema, model, models } from "mongoose";

const DataSchema = new Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: Schema.Types.Mixed,
    required: true,
  },
}, { timestamps: true });

export const Data = models.Data || model("Data", DataSchema);
