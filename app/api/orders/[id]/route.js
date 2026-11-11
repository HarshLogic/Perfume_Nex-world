import { NextResponse } from "next/server";
import { getOrderById, updateOrderStatus } from "@/lib/dataStore";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const order = getOrderById(id);

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to retrieve order" },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    if (!body.orderStatus) {
      return NextResponse.json(
        { success: false, error: "orderStatus is required" },
        { status: 400 }
      );
    }

    const updated = updateOrderStatus(id, body.orderStatus);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update order status" },
      { status: 500 }
    );
  }
}
