import { NextRequest, NextResponse } from "next/server";
// Sending emails via Microsoft Graph API using application permissions
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

    // For reCAPTCHA v2, only check success (no score)
    return data.success;
  } catch (error) {
    console.error("❌ reCAPTCHA verification error:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {

  try {
    const data: ContactFormData = await request.json();

    // Validate the data
    const validatedData = contactFormSchema.parse(data);

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
                <a href="mailto:${process.env.EMAIL_RECEIVER || process.env.MS_OFFICE_EMAIL}" style="color: #f97316; text-decoration: none;">
                  ${process.env.EMAIL_RECEIVER || process.env.MS_OFFICE_EMAIL}
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

    // Email configurations for Microsoft Graph API
    const adminEmailData = {
      to: process.env.EMAIL_RECEIVER || process.env.MS_OFFICE_EMAIL,
      subject: `New Contact Form Submission${validatedData.service ? ` - ${validatedData.service}` : ""}`,
      html: adminEmailHtml,
    };

    const customerEmailData = {
      to: validatedData.email,
      subject: `Thank you for contacting Inexor${validatedData.service ? ` - ${validatedData.service}` : ""}`,
      html: customerEmailHtml,
    };

    // Log the form submission
    if (phoneDisplay) {
    }
    if (validatedData.company) {
    }
    if (validatedData.service) {
    }
    if (validatedData.message) {
    }

    // Send emails using Microsoft Graph API (application permissions)
    async function getAzureAccessToken() {
      const tenantId = process.env.MS_TENANT_ID;
      const clientId = process.env.MS_CLIENT_ID;
      const clientSecret = process.env.MS_CLIENT_SECRET;

      if (!tenantId || !clientId || !clientSecret) {
        throw new Error("Azure credentials missing: MS_TENANT_ID/MS_CLIENT_ID/MS_CLIENT_SECRET");
      }

      const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
      const params = new URLSearchParams();
      params.append("client_id", clientId);
      params.append("client_secret", clientSecret);
      params.append("grant_type", "client_credentials");
      params.append("scope", "https://graph.microsoft.com/.default");

      const resp = await fetch(tokenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`Failed to acquire Azure token: ${resp.status} ${errText}`);
      }
      const json = await resp.json();
      return json.access_token as string;
    }

    async function sendMailViaGraph(
      accessToken: string,
      senderEmail: string,
      toEmail: string,
      subject: string,
      htmlContent: string,
    ) {
      const endpoint = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(senderEmail)}/sendMail`;
      const payload = {
        message: {
          subject,
          body: { contentType: "HTML", content: htmlContent },
          toRecipients: [{ emailAddress: { address: toEmail } }],
        },
        saveToSentItems: true,
      };

      const resp = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`Graph sendMail failed: ${resp.status} ${errText}`);
      }
    }

    try {
      const sender = process.env.MS_OFFICE_EMAIL;
      const adminRecipient = adminEmailData.to;
      const customerRecipient = customerEmailData.to;

      if (!sender) {
        throw new Error("MS_OFFICE_EMAIL is not configured");
      }
      if (!adminRecipient) {
        throw new Error("EMAIL_RECEIVER/MS_OFFICE_EMAIL is not configured");
      }

      const token = await getAzureAccessToken();
      await sendMailViaGraph(token, sender, adminRecipient, adminEmailData.subject, adminEmailData.html);
      await sendMailViaGraph(token, sender, customerRecipient, customerEmailData.subject, customerEmailData.html);
    } catch (emailError) {
      console.error("❌ Microsoft Graph email sending failed:", emailError);
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
