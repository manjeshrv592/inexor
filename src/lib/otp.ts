import { SignJWT, jwtVerify } from 'jose';

const OTP_SECRET = process.env.OTP_SECRET || 'default-secret-key';
const OTP_EXPIRY_MINUTES = parseInt(process.env.OTP_EXPIRY_MINUTES || '10');

interface OTPPayload {
  email: string;
  otp: string;
  expiresAt: number;
}

export async function generateOTP(email: string): Promise<{ otp: string; token: string }> {
  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000;

  // Create a signed JWT containing the OTP and expiration
  const secret = new TextEncoder().encode(OTP_SECRET);
  const token = await new SignJWT({ email, otp, expiresAt })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(expiresAt)
    .sign(secret);

  return { otp, token };
}

export async function verifyOTP(token: string, userOtp: string): Promise<{ isValid: boolean; email?: string }> {
  try {
    const secret = new TextEncoder().encode(OTP_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    // Safely cast the payload to OTPPayload
    const otpData = payload as unknown as OTPPayload;
    const { email, otp, expiresAt } = otpData;
    
    // Check if OTP is expired
    if (Date.now() > expiresAt) {
      return { isValid: false };
    }
    
    // Check if OTP matches
    if (otp !== userOtp) {
      return { isValid: false };
    }
    
    return { isValid: true, email };
  } catch (error) {
    console.error('OTP verification failed:', error);
    return { isValid: false };
  }
}
