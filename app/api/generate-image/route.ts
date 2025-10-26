import { NextRequest } from "next/server";
import { OpenAI } from "openai";

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

export async function POST(req: NextRequest) {
  if (!openai) {
    return new Response(JSON.stringify({ error: "OpenAI API key not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  const { prompt } = await req.json();
  try {
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "512x512"
    });
    if (!response.data || response.data.length === 0 || !response.data[0].url) {
      throw new Error("Failed to generate image");
    }
    const imageUrl = response.data[0].url;

    return new Response(JSON.stringify({ imageUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
