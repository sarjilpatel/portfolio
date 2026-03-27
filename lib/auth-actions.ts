"use server"

import nodemailer from 'nodemailer'
import dbConnect from './mongodb'
import { Otp } from '@/models/Otp'
import crypto from 'crypto'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const transporer = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-at-least-32-chars-long'
)

export async function sendOtp(password: string) {
  try {
    // 1. Check password
    if (password !== process.env.ADMIN_PASSWORD) {
      return { success: false, error: "Invalid password" }
    }

    // 2. Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString()

    // 3. Save OTP in DB
    await dbConnect()
    await Otp.deleteMany({}) // Clear previous OTPs (simple strategy)
    await Otp.create({
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
    })

    // 4. Send Email
    await transporer.sendMail({
      from: `"Portfolio Admin" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "Your Secret Admin OTP",
      text: `Your OTP for portfolio admin login is: ${otp}. It will expire in 5 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <h2 style="color: #333;">Admin Authentication Request</h2>
          <p>You requested access to the portfolio admin panel.</p>
          <div style="background-color: #fff; padding: 20px; border-radius: 10px; border: 1px solid #ddd; margin: 20px 0;">
            <p style="font-size: 14px; color: #666; margin-bottom: 10px;">Your One-Time Password:</p>
            <h1 style="font-size: 32px; color: #2563eb; letter-spacing: 5px; margin: 0;">${otp}</h1>
          </div>
          <p style="color: #999; font-size: 12px;">This code expires in 5 minutes.</p>
        </div>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error("Error sending OTP:", error)
    return { success: false, error: "System failure during OTP dispatch" }
  }
}

export async function verifyOtp(otpInput: string) {
  try {
    await dbConnect()
    const storedOtp = await Otp.findOne({ otp: otpInput })

    if (!storedOtp) {
      return { success: false, error: "Invalid or expired OTP" }
    }

    // OTP is valid - Create session
    const token = await new SignJWT({ role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h') // Persist for 1 day
      .sign(JWT_SECRET)

    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 24 hours
    })

    // Delete OTP after verification
    await Otp.deleteOne({ _id: storedOtp._id })

    return { success: true }
  } catch (error) {
    console.error("Error verifying OTP:", error)
    return { success: false, error: "System error during verification" }
  }
}

export async function checkAuth() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_session')?.value

    if (!token) return false

    await jwtVerify(token, JWT_SECRET)
    return true
  } catch {
    return false
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
  return { success: true }
}
