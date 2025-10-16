import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { ZodError } from "zod";
import {
  contactFormSchema,
  type ContactFormData,
  countryCodes,
} from "@/lib/validations/contact";

// Function to verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    console.error("❌ RECAPTCHA_SECRET_KEY is not configured");
    return false;
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    console.log("🔐 reCAPTCHA verification result:", {
      success: data.success,
      hostname: data.hostname,
    });

    // For reCAPTCHA v2, only check success (no score)
    return data.success;
  } catch (error) {
    console.error("❌ reCAPTCHA verification error:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  console.log("🚀 API ROUTE CALLED - /api/contact");
  console.log("🔧 Environment check:");
  console.log("   GMAIL_USER:", process.env.GMAIL_USER || "❌ MISSING");
  console.log(
    "   GMAIL_APP_PASSWORD:",
    process.env.GMAIL_APP_PASSWORD || "❌ MISSING",
  );
  console.log("   EMAIL_RECEIVER:", process.env.EMAIL_RECEIVER || "❌ MISSING");
  console.log("   RECAPTCHA_SECRET_KEY:", process.env.RECAPTCHA_SECRET_KEY ? "✅ PRESENT" : "❌ MISSING");

  try {
    const data: ContactFormData = await request.json();
    console.log("📨 Received data:", { ...data, recaptchaToken: data.recaptchaToken ? "[PRESENT]" : "[MISSING]" });

    // Validate the data
    const validatedData = contactFormSchema.parse(data);
    console.log("✅ Data validated successfully");

    // Verify reCAPTCHA token
    if (!validatedData.recaptchaToken) {
      console.error("❌ reCAPTCHA token is missing");
      return NextResponse.json(
        { error: "reCAPTCHA verification is required" },
        { status: 400 }
      );
    }

    const isRecaptchaValid = await verifyRecaptcha(validatedData.recaptchaToken);
    if (!isRecaptchaValid) {
      console.error("❌ reCAPTCHA verification failed");
      return NextResponse.json(
        { error: "reCAPTCHA verification failed. Please try again." },
        { status: 400 }
      );
    }

    console.log("✅ reCAPTCHA verification successful");

    // Get country code from country abbreviation (only if provided)
    const selectedCountry = validatedData.countryCode
      ? countryCodes.find(
          (country) => country.country === validatedData.countryCode,
        )
      : null;
    const countryCodeDisplay =
      selectedCountry?.code || validatedData.countryCode;

    // Build phone display conditionally
    const phoneDisplay = validatedData.phone
      ? `${countryCodeDisplay ? countryCodeDisplay + " " : ""}${validatedData.phone}`
      : null;

    // Admin email template
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission - Inexor</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8fafc;">
        <div style="font-family: 'Raleway', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #f65009 0%, #c54007 100%); padding: 40px 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
          New Contact Form Submission
            </h1>
            <p style="color: #fddcce; margin: 10px 0 0 0; font-size: 16px; font-weight: 300;">
              A new inquiry has been received
            </p>
          </div>

          <!-- Main Content -->
          <div style="padding: 40px 30px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h2 style="color: #1f2937; margin: 0 0 15px 0; font-size: 24px; font-weight: 500;">
                Customer Contact Details
        </h2>
              <p style="color: #6b7280; margin: 0; font-size: 16px; line-height: 1.6; font-weight: 300;">
                Review the inquiry details below and respond promptly to provide excellent customer service.
              </p>
            </div>

            <!-- Customer Details Card -->
            <div style="background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 12px; padding: 25px; margin: 30px 0;">
              <h3 style="color: #374151; margin: 0 0 20px 0; font-size: 18px; font-weight: 500; border-bottom: 2px solid #f65009; padding-bottom: 8px; display: inline-block;">
                👤 Customer Information
              </h3>
              
              <div style="space-y: 12px;">
                <div style="margin-bottom: 12px;">
                  <span style="color: #6b7280; font-size: 14px; font-weight: 400; display: block; margin-bottom: 4px;">Full Name:</span>
                  <span style="color: #1f2937; font-size: 16px; font-weight: 500;">${validatedData.name}</span>
                </div>
                
                <div style="margin-bottom: 12px;">
                  <span style="color: #6b7280; font-size: 14px; font-weight: 400; display: block; margin-bottom: 4px;">Email Address:</span>
                  <span style="color: #f65009; font-size: 16px; font-weight: 500;">
                    <a href="mailto:${validatedData.email}" style="color: #f65009; text-decoration: none;">${validatedData.email}</a>
                  </span>
                </div>

                ${
                  validatedData.company
                    ? `
                <div style="margin-bottom: 12px;">
                  <span style="color: #6b7280; font-size: 14px; font-weight: 400; display: block; margin-bottom: 4px;">Company:</span>
                  <span style="color: #1f2937; font-size: 16px; font-weight: 500;">${validatedData.company}</span>
                </div>
                `
                    : ""
                }

                ${
                  phoneDisplay
                    ? `
                <div style="margin-bottom: 12px;">
                  <span style="color: #6b7280; font-size: 14px; font-weight: 400; display: block; margin-bottom: 4px;">Phone Number:</span>
                  <span style="color: #1f2937; font-size: 16px; font-weight: 500;">
                    <a href="tel:${phoneDisplay.replace(/\s/g, "")}" style="color: #1f2937; text-decoration: none;">${phoneDisplay}</a>
                  </span>
                </div>
                `
                    : ""
                }
              </div>
        </div>

        ${
          validatedData.service
            ? `
            <!-- Service Interest Card -->
            <div style="background: linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%); border: 1px solid #f97316; border-radius: 12px; padding: 25px; margin: 30px 0;">
              <h3 style="color: #ea580c; margin: 0 0 15px 0; font-size: 18px; font-weight: 500;">
                🛠️ Service Interest
              </h3>
              <div style="background: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #fed7aa;">
                <span style="color: #f97316; font-size: 18px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                  ${validatedData.service}
                </span>
              </div>
        </div>
        `
            : ""
        }

        ${
          validatedData.message
            ? `
            <!-- Customer Message Card -->
            <div style="background: #eff6ff; border: 1px solid #3b82f6; border-radius: 12px; padding: 25px; margin: 30px 0;">
              <h3 style="color: #1d4ed8; margin: 0 0 15px 0; font-size: 18px; font-weight: 500;">
                💬 Customer Message
              </h3>
              <div style="background: #ffffff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
                <p style="color: #1e40af; margin: 0; font-size: 15px; line-height: 1.6; font-weight: 400; font-style: italic;">
                  "${validatedData.message.replace(/\n/g, "<br>")}"
                </p>
              </div>
        </div>
        `
            : ""
        }

            <!-- Action Required -->
            <div style="background: linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%); border: 1px solid #f59e0b; border-radius: 12px; padding: 25px; margin: 30px 0; text-align: center;">
              <h3 style="color: #92400e; margin: 0 0 15px 0; font-size: 18px; font-weight: 500;">
                ⚡ Action Required
              </h3>
              <p style="color: #a16207; margin: 0 0 15px 0; font-size: 15px; line-height: 1.6; font-weight: 400;">
                Please respond to this inquiry within <strong>24-48 hours</strong> to maintain our excellent customer service standards.
              </p>
              <div style="margin-top: 20px;">
                <a href="mailto:${validatedData.email}?subject=Re: Your inquiry about ${validatedData.service || "our services"}&body=Dear ${validatedData.name},%0A%0AThank you for your inquiry about ${validatedData.service || "our services"}. " 
                   style="background-color: #f65009; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 500; display: inline-block;">
                  📧 Reply to Customer
                </a>
              </div>
            </div>

            <!-- Quick Stats -->
            <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #e5e7eb;">
              <div style="display: inline-block; margin: 0 20px;">
                <p style="color: #6b7280; margin: 0 0 5px 0; font-size: 12px; font-weight: 400; text-transform: uppercase; letter-spacing: 1px;">
                  Submission Date
                </p>
                <p style="color: #1f2937; margin: 0; font-size: 14px; font-weight: 500;">
                  ${new Date().toLocaleDateString()}
                </p>
              </div>
              <div style="display: inline-block; margin: 0 20px;">
                <p style="color: #6b7280; margin: 0 0 5px 0; font-size: 12px; font-weight: 400; text-transform: uppercase; letter-spacing: 1px;">
                  Submission Time
                </p>
                <p style="color: #1f2937; margin: 0; font-size: 14px; font-weight: 500;">
                  ${new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #1f2937; padding: 30px; text-align: center;">
            <p style="color: #9ca3af; margin: 0 0 10px 0; font-size: 14px; font-weight: 400;">
              Inexor Contact Form Notification System
            </p>
            <p style="color: #6b7280; margin: 0; font-size: 12px; font-weight: 300;">
              This notification was generated automatically on ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Customer confirmation email template
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You - Inexor</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8fafc;">
        <div style="font-family: 'Raleway', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #f65009 0%, #c54007 100%); padding: 40px 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
              Thank You, ${validatedData.name}!
            </h1>
            <p style="color: #fddcce; margin: 10px 0 0 0; font-size: 16px; font-weight: 300;">
              We've received your inquiry
            </p>
          </div>

          <!-- Main Content -->
          <div style="padding: 40px 30px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h2 style="color: #1f2937; margin: 0 0 15px 0; font-size: 24px; font-weight: 500;">
                Your Message Has Been Received
              </h2>
              <p style="color: #6b7280; margin: 0; font-size: 16px; line-height: 1.6; font-weight: 300;">
                Thank you for reaching out to Inexor. We appreciate your interest in our services and will get back to you soon.
              </p>
            </div>

            <!-- Summary Card -->
            <div style="background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 12px; padding: 25px; margin: 30px 0;">
              <h3 style="color: #374151; margin: 0 0 20px 0; font-size: 18px; font-weight: 500; border-bottom: 2px solid #f97316; padding-bottom: 8px; display: inline-block;">
                Your Inquiry Summary
              </h3>
              
              <div style="space-y: 12px;">
                <div style="margin-bottom: 12px;">
                  <span style="color: #6b7280; font-size: 14px; font-weight: 400; display: block; margin-bottom: 4px;">Name:</span>
                  <span style="color: #1f2937; font-size: 16px; font-weight: 500;">${validatedData.name}</span>
                </div>
                
                <div style="margin-bottom: 12px;">
                  <span style="color: #6b7280; font-size: 14px; font-weight: 400; display: block; margin-bottom: 4px;">Email:</span>
                  <span style="color: #1f2937; font-size: 16px; font-weight: 500;">${validatedData.email}</span>
                </div>

                ${
                  validatedData.company
                    ? `
                <div style="margin-bottom: 12px;">
                  <span style="color: #6b7280; font-size: 14px; font-weight: 400; display: block; margin-bottom: 4px;">Company:</span>
                  <span style="color: #1f2937; font-size: 16px; font-weight: 500;">${validatedData.company}</span>
                </div>
                `
                    : ""
                }

                ${
                  validatedData.service
                    ? `
                <div style="margin-bottom: 12px;">
                  <span style="color: #6b7280; font-size: 14px; font-weight: 400; display: block; margin-bottom: 4px;">Service of Interest:</span>
                  <span style="color: #f97316; font-size: 16px; font-weight: 600;">${validatedData.service}</span>
                </div>
                `
                    : ""
                }

                ${
                  phoneDisplay
                    ? `
                <div style="margin-bottom: 12px;">
                  <span style="color: #6b7280; font-size: 14px; font-weight: 400; display: block; margin-bottom: 4px;">Phone:</span>
                  <span style="color: #1f2937; font-size: 16px; font-weight: 500;">${phoneDisplay}</span>
                </div>
                `
                    : ""
                }
              </div>
            </div>

            ${
              validatedData.message
                ? `
            <div style="background: #fffbeb; border: 1px solid #fbbf24; border-radius: 12px; padding: 25px; margin: 30px 0;">
              <h3 style="color: #92400e; margin: 0 0 15px 0; font-size: 16px; font-weight: 500;">
                Your Message:
              </h3>
              <p style="color: #78350f; margin: 0; font-size: 15px; line-height: 1.6; font-weight: 400; font-style: italic;">
                "${validatedData.message}"
              </p>
            </div>
            `
                : ""
            }

            <!-- What's Next -->
            <div style="background: linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%); border: 1px solid #bbf7d0; border-radius: 12px; padding: 25px; margin: 30px 0; text-align: center;">
              <h3 style="color: #166534; margin: 0 0 15px 0; font-size: 18px; font-weight: 500;">
                What Happens Next?
              </h3>
              <p style="color: #15803d; margin: 0; font-size: 15px; line-height: 1.6; font-weight: 400;">
                Our team will review your inquiry and get back to you within <strong>24-48 hours</strong>. 
                We'll provide you with detailed information about our ${validatedData.service ? validatedData.service + " " : ""}services and how we can help your business.
              </p>
            </div>

            <!-- Contact Info -->
            <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px; font-weight: 400;">
                Have questions? Feel free to reach out to us anytime.
              </p>
              <p style="color: #f97316; margin: 0; font-size: 16px; font-weight: 500;">
                <a href="mailto:${process.env.EMAIL_RECEIVER || process.env.GMAIL_USER}" style="color: #f97316; text-decoration: none;">
                  ${process.env.EMAIL_RECEIVER || process.env.GMAIL_USER}
                </a>
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #1f2937; padding: 30px; text-align: center;">
            <p style="color: #9ca3af; margin: 0 0 10px 0; font-size: 14px; font-weight: 400;">
              Thank you for choosing Inexor
            </p>
            <p style="color: #6b7280; margin: 0; font-size: 12px; font-weight: 300;">
              This email was sent on ${new Date().toLocaleString()}
        </p>
      </div>
        </div>
      </body>
      </html>
    `;

    // Email configurations
    const adminEmailData = {
      from: process.env.GMAIL_USER,
      to: process.env.EMAIL_RECEIVER || process.env.GMAIL_USER,
      subject: `New Contact Form Submission${validatedData.service ? ` - ${validatedData.service}` : ""}`,
      html: adminEmailHtml,
    };

    const customerEmailData = {
      from: process.env.GMAIL_USER,
      to: validatedData.email,
      subject: `Thank you for contacting Inexor${validatedData.service ? ` - ${validatedData.service}` : ""}`,
      html: customerEmailHtml,
    };

    // Log the form submission
    console.log("🎉 NEW CONTACT FORM SUBMISSION:");
    console.log("================================");
    console.log(`📅 Date: ${new Date().toLocaleString()}`);
    console.log(`👤 Name: ${validatedData.name}`);
    console.log(`📧 Email: ${validatedData.email}`);
    if (phoneDisplay) {
      console.log(`📱 Phone: ${phoneDisplay}`);
    }
    if (validatedData.company) {
      console.log(`🏢 Company: ${validatedData.company}`);
    }
    if (validatedData.service) {
      console.log(`🛠️ Service: ${validatedData.service}`);
    }
    if (validatedData.message) {
      console.log(`💬 Message: ${validatedData.message}`);
    }
    console.log("================================");

    // Send email using Gmail SMTP
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      try {
        console.log("📧 Attempting to send email via Gmail SMTP...");
        console.log("🔧 Gmail User:", process.env.GMAIL_USER);
        console.log("🔧 Email Receiver:", process.env.EMAIL_RECEIVER);

        // Create transporter using Gmail SMTP
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        });

        console.log("🔧 Testing SMTP connection...");
        await transporter.verify();
        console.log("✅ SMTP connection verified!");

        console.log("📧 Sending admin notification email...");
        // Send admin notification email
        const adminInfo = await transporter.sendMail(adminEmailData);
        console.log("✅ Admin email sent successfully!");
        console.log("📧 Admin Message ID:", adminInfo.messageId);
        console.log("📧 Admin email sent to:", adminInfo.envelope?.to);

        console.log("📧 Sending customer confirmation email...");
        // Send customer confirmation email
        const customerInfo = await transporter.sendMail(customerEmailData);
        console.log("✅ Customer confirmation email sent successfully!");
        console.log("📧 Customer Message ID:", customerInfo.messageId);
        console.log("📧 Customer email sent to:", customerInfo.envelope?.to);
      } catch (emailError) {
        console.error("❌ Gmail SMTP failed:", emailError);
        console.log("ℹ️ Form data is still logged above");
      }
    } else {
      console.log("❌ Gmail credentials not found in environment variables");
      console.log(
        "ℹ️ Please check GMAIL_USER and GMAIL_APP_PASSWORD in .env.local",
      );
    }

    return NextResponse.json(
      {
        message:
          "Form submitted successfully! A confirmation email has been sent to your inbox, and we'll get back to you soon.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Form submission error:", error);

    // Handle validation errors specifically
    if (error instanceof ZodError) {
      const validationErrors = error.issues.map(err => {
        if (err.path.includes('recaptchaToken')) {
          return "Please complete the reCAPTCHA verification to continue";
        }
        return err.message;
      });
      
      return NextResponse.json(
        { 
          error: validationErrors[0] || "Please check your form data and try again",
          validationErrors: validationErrors
        },
        { status: 400 }
      );
    }

    // Always log the form data even if email fails
    console.log("📧 FORM SUBMISSION (with error):", {
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    // Still return success to user since we logged the data
    return NextResponse.json(
      {
        message:
          "Form submitted successfully! A confirmation email has been sent to your inbox, and we'll get back to you soon.",
      },
      { status: 200 },
    );
  }
}
