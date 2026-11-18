import { NextResponse } from "next/server";
import { saveContactMessage } from "@/lib/dataStore";

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    const saved = saveContactMessage({ name, email, subject: subject || "General Inquiry", message });

    return NextResponse.json({
      success: true,
      message: "Your message has been received. Our concierge at info@nexence.in will contact you shortly.",
      referenceId: saved.id,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit message" },
      { status: 500 }
    );
  }
}
