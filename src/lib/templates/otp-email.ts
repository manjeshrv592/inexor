interface OTPEmailProps {
  otp: string;
  expiryMinutes: number;
}

export function getOTPEmailTemplate({ otp, expiryMinutes }: OTPEmailProps): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Login Verification Code</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #f65009 0%, #c54007 100%); padding: 30px; text-align: center; color: white; }
        .content { padding: 30px; }
        .otp-code { 
          font-size: 36px; 
          letter-spacing: 5px; 
          font-weight: bold; 
          color: #f65009; 
          text-align: center; 
          margin: 30px 0; 
          padding: 15px 0; 
          background: #f8f8f8; 
          border-radius: 8px; 
        }
        .footer { 
          margin-top: 30px; 
          padding-top: 20px; 
          border-top: 1px solid #e5e7eb; 
          font-size: 14px; 
          color: #6b7280; 
          text-align: center; 
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Your Login Verification Code</h1>
        </div>
        <div class="content">
          <p>Hello,</p>
          <p>Your verification code for INEXOR login is:</p>
          <div class="otp-code">${otp}</div>
          <p>This code will expire in ${expiryMinutes} minutes.</p>
          <p>If you didn't request this code, you can safely ignore this email.</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} INEXOR. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
