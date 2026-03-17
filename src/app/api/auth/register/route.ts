// API route: POST /api/auth/register
// Creates a Sanity author document linked to a Supabase user.
import { createClient } from "next-sanity";
import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getIp } from "@/lib/rateLimit";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",
  apiVersion: "2024-06-27",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export async function POST(req: NextRequest) {
  const { allowed, retryAfterMs } = rateLimit(getIp(req), 5, 60 * 60_000); // 5 registreringer per time per IP
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) } },
    );
  }

  try {
    const { supabaseId, username, email } = await req.json();

    if (!supabaseId?.trim() || !username?.trim() || !email?.trim()) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const existing = await client.fetch(
      `*[_type == "author" && email == $email][0]{ _id }`,
      { email },
    );
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    await client.create({
      _type: "author",
      username,
      email,
      supabaseId,
      role: "member",
      joinedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
