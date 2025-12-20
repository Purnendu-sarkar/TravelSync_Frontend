import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        console.log("🔥 API HIT");

        const data = await request.json();
        console.log("📩 DATA RECEIVED:", data);

        const {
            firstName,
            lastName,
            email,
            countryCode,
            phone,
            interests = [],
            message,
        } = data;

        if (!process.env.OWNER_EMAIL) {
            return NextResponse.json(
                { error: "OWNER_EMAIL is not configured" },
                { status: 500 }
            );
        }

        // 1️⃣ Confirmation email to the user
        await resend.emails.send({
            from: "TravelSync <onboarding@resend.dev>", // must be verified in Resend
            to: email,
            subject: "Thank you for contacting us!",
            text: `Hi ${firstName},

We have received your message successfully.
Our team will contact you shortly.

— TravelSync Team`,
        });

        // 2️⃣ Details email to yourself
        await resend.emails.send({
            from: "TravelSync <onboarding@resend.dev>",
            to: process.env.OWNER_EMAIL,
            subject: "📩 New Contact Form Submission",
            text: `
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${countryCode} ${phone}
Interests: ${interests.join(", ")}
Message: ${message}
      `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("❌ Email sending error:", error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}
