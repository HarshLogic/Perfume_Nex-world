import { NextResponse } from "next/server";
import { getProducts, createProduct } from "@/lib/dataStore";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");

    let products = getProducts();

    if (category && category !== "all") {
      products = products.filter(
        (p) => p.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (featured === "true") {
      products = products.filter((p) => p.isFeatured);
    }

    if (search) {
      const q = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({ success: true, count: products.length, products });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.name || !body.price) {
      return NextResponse.json(
        { success: false, error: "Product name and price are required" },
        { status: 400 }
      );
    }

    const newProduct = createProduct({
      ...body,
      price: Number(body.price),
      stock: Number(body.stock || 25),
      image: body.image || "/images/zego.png",
      bottleImage: body.bottleImage || body.image || "/images/zego.png",
      rating: 5.0,
      reviewsCount: 1,
    });

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 }
    );
  }
}
