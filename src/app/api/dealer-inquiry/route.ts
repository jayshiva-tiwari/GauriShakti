import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, city, message } = body;

    // Validate
    if (!name || !phone || !email || !city) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const businessEmail = process.env.BUSINESS_EMAIL || process.env.SMTP_USER;

    // 1. Email to business owner
    const ownerMailOptions = {
      from: `"GAURiShakti Website" <${process.env.SMTP_USER}>`,
      to: businessEmail,
      subject: `New Dealer Inquiry — ${name} from ${city}`,
      text: `You have a new dealer inquiry from the website.\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nCity: ${city}\nMessage: ${message || 'N/A'}\n`,
    };

    // 2. Email to user
    const userMailOptions = {
      from: `"GAURiShakti Team" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Thank you for your interest in GAURiShakti!`,
      text: `Hi ${name},\n\nThank you for your interest in becoming a GAURiShakti feed distributor/dealer. We have received your details.\n\nOur team will reach out to you via WhatsApp or phone call shortly to discuss pricing, margins, and how to get started.\n\nBest regards,\nGAURiShakti Team\n`,
    };

    let adminEmailSent = false;
    try {
      await transporter.sendMail(ownerMailOptions);
      adminEmailSent = true;
    } catch (adminErr) {
      console.error("Error sending admin email:", adminErr);
    }

    try {
      await transporter.sendMail(userMailOptions);
    } catch (userErr) {
      console.error("Error sending user confirmation email:", userErr);
    }

    if (!adminEmailSent) {
      // If we couldn't even notify the admin, we might want to return an error 
      // or at least log it properly so the UI knows there was an issue.
      // But we will return 200 OK if we want to be forgiving, or 500 if we require admin notification.
      // We will return 500 here since admin notification is critical if we aren't saving to DB.
      return NextResponse.json({ error: "Failed to send inquiry to admin" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unexpected error in dealer inquiry route:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
