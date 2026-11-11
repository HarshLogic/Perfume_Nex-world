import { NextResponse } from "next/server";
import { getProductById, updateProduct, deleteProduct } from "@/lib/dataStore";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const product = getProductById(id);

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Fragrance not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch fragrance" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    const updated = updateProduct(id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Product not found to update" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const deleted = deleteProduct(id);
    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
