import { NextResponse } from "next/server";
import { findUserByEmail, createUser } from "@/lib/dataStore";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "nexworld_luxury_secret_key_2026";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const existing = findUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { success: false, error: "An account already exists with this email" },
        { status: 409 }
      );
    }

    const newUser = createUser({
      name,
      email,
      password, // In full production, hash with bcryptjs
      role: "customer",
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      success: true,
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
      token,
    });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { success: false, error: "Registration failed" },
      { status: 500 }
    );
  }
}
