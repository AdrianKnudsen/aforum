// API route: POST /api/posts
// Receives a new post from the client and writes it to Sanity CMS.
// Requires a valid Supabase access token in the Authorization header.
import { createClient } from "next-sanity";
import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";
import { rateLimit, getIp } from "@/lib/rateLimit";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",
  apiVersion: "2024-06-27",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export async function POST(req: NextRequest) {
  const { allowed, retryAfterMs } = rateLimit(getIp(req), 20, 60_000); // 20 innlegg per minutt per IP
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) } },
    );
  }

  try {
    // Verify Supabase token
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const supabase = createServerSupabase();
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { _type, title, content } = await req.json();
    if (!title?.trim() || !content?.trim() || !_type) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Look up the Sanity author linked to this Supabase user
    let author = await sanity.fetch<{ _id: string; username: string } | null>(
      `*[_type == "author" && supabaseId == $supabaseId][0]{ _id, username }`,
      { supabaseId: user.id },
    );

    // Auto-create author if missing (handles accounts created outside the register flow)
    if (!author) {
      const username =
        (user.user_metadata?.username as string | undefined) ||
        user.email?.split("@")[0] ||
        "unknown";
      const created = await sanity.create({
        _type: "author",
        username,
        email: user.email ?? "",
        supabaseId: user.id,
        role: "member",
        joinedAt: new Date().toISOString(),
      });
      author = { _id: created._id, username };
    }

    const createdAt = new Date().toISOString();

    const doc = await sanity.create({
      _type,
      title,
      content,
      createdAt,
      author: { _type: "reference", _ref: author._id },
    });

    return NextResponse.json(
      { ...doc, author: { name: author.username } },
      { status: 201 },
    );
  } catch (error) {
    console.error("Sanity mutation error:", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: "An error occurred. Please try again." }, { status: 500 });
  }
}
