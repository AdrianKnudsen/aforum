// API route: POST /api/auth/register
// Creates a new author document in Sanity with a bcrypt-hashed password.
import { createClient } from "next-sanity";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",
  apiVersion: "2024-06-27",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    if (!username?.trim() || !email?.trim() || !password?.trim()) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Check if email is already taken
    const existing = await client.fetch(
      `*[_type == "author" && email == $email][0]{ _id }`,
      { email },
    );
    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await client.create({
      _type: "author",
      username,
      email,
      passwordHash,
      role: "member",
      joinedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
