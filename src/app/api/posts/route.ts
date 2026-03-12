import { createClient } from "next-sanity";
import { NextRequest, NextResponse } from "next/server";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",
  apiVersion: "2024-06-27",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    const { _type, title, content, createdAt } = await req.json();

    if (!title?.trim() || !content?.trim() || !_type) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const doc = await client.create({ _type, title, content, createdAt });
    return NextResponse.json(doc, { status: 201 });
  } catch (error) {
    console.error("Sanity mutation error:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
