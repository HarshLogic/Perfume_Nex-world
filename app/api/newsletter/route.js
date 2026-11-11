import { NextResponse } from "next/server";
import { addSubscriber } from "@/lib/dataStore";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const result = addSubscriber(email);
    return NextResponse.json({ success: true, message: result.message });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Subscription failed" },
      { status: 500 }
    );
  }
}
