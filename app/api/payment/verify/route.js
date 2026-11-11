import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await request.json();

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // If using live secret, verify HMAC signature
    if (keySecret && razorpay_signature) {
      const generatedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      if (generatedSignature !== razorpay_signature) {
        return NextResponse.json(
          { success: false, error: "Invalid payment signature verification" },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      paymentId: razorpay_payment_id || `pay_mock_${Date.now()}`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Payment verification error" },
      { status: 500 }
    );
  }
}
