import { Schema, model, models } from 'mongoose';

const OtpSchema = new Schema({
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true, index: { expires: '5m' } } // Auto-delete after 5 minutes
}, { timestamps: true });

export const Otp = models.Otp || model('Otp', OtpSchema);
