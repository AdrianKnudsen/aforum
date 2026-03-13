// API route: POST /api/posts
// Receives a new post from the client and writes it to Sanity CMS.
// Requires an active NextAuth session — uses the session's authorId as the author reference.
import { createClient } from "next-sanity";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",
  apiVersion: "2024-06-27",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { _type, title, content } = await req.json();

    if (!title?.trim() || !content?.trim() || !_type) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const createdAt = new Date().toISOString();

    const doc = await client.create({
      _type,
      title,
      content,
      createdAt,
      author: { _type: "reference", _ref: session.user.authorId },
    });

    // Return the doc with the resolved author name so the client can display it immediately
    const responseDoc = {
      ...doc,
      author: { name: session.user.username },
    };

    return NextResponse.json(responseDoc, { status: 201 });
  } catch (error) {
    console.error("Sanity mutation error:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
