import { NextResponse } from "next/server";
import { getOrders, createOrder } from "@/lib/dataStore";

export async function GET() {
  try {
    const orders = getOrders();
    return NextResponse.json({ success: true, count: orders.length, orders });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.customer || !body.items || body.items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Customer details and items are required" },
        { status: 400 }
      );
    }

    const order = createOrder(body);

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to place order" },
      { status: 500 }
    );
  }
}
