// API route: POST /api/posts
// Receives a new post from the client and writes it to Sanity CMS.
// Expects JSON body: { _type, title, content, createdAt }
import { createClient } from "next-sanity";
import { NextRequest, NextResponse } from "next/server";

// Sanity client configured with credentials from environment variables
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",
  apiVersion: "2024-06-27",
  useCdn: false, // CDN disabled so we always write to the live API
  token: process.env.SANITY_API_TOKEN, // Write token — kept server-side only
});

export async function POST(req: NextRequest) {
  try {
    const { _type, title, content, createdAt } = await req.json();

    // Validate that all required fields are present and non-empty
    if (!title?.trim() || !content?.trim() || !_type) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Create the document in Sanity and return it with status 201
    const doc = await client.create({ _type, title, content, createdAt });
    return NextResponse.json(doc, { status: 201 });
  } catch (error) {
    console.error("Sanity mutation error:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
