import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { STRICT_SYSTEM_PROMPT } from "@/config/portfolioKnowledge";

interface ChatMessage {
  role: "user" | "model" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history } = body as {
      message: string;
      history?: ChatMessage[];
    };

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required and cannot be empty." },
        { status: 400 }
      );
    }

    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          response:
            "⚠️ **Gemini API Key missing:** Please add `GEMINI_API_KEY=your_key_here` to `frontend/.env.local` (Get a free key from [Google AI Studio](https://aistudio.google.com/)).\n\n*In the meantime, Rana Summar is a Full-Stack AI Engineer specializing in Next.js, FastAPI, and LangChain AI Agents!*",
          status: "mock_warning",
        },
        { status: 200 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // List of reliable Gemini models in order of priority
    const primaryModel = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    const fallbackModels = [primaryModel, "gemini-flash-latest", "gemini-2.5-flash-lite", "gemini-1.5-flash"];
    const uniqueModels = Array.from(new Set(fallbackModels));

    // Format chat history for Gemini
    const formattedHistory = (history || [])
      .filter(
        (m) =>
          m.content &&
          m.content.trim() &&
          (m.role === "user" || m.role === "model" || m.role === "assistant")
      )
      .map((m) => ({
        role: m.role === "assistant" ? "model" : (m.role as "user" | "model"),
        parts: [{ text: m.content }],
      }));

    let lastError: any = null;

    // Attempt generation across available models
    for (const modelName of uniqueModels) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: STRICT_SYSTEM_PROMPT,
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 800,
          },
        });

        const chat = model.startChat({
          history: formattedHistory,
        });

        const result = await chat.sendMessage(message.trim());
        const responseText = result.response.text();

        return NextResponse.json({
          response: responseText,
          status: "success",
          model: modelName,
        });
      } catch (err: any) {
        lastError = err;
        // If it's a 404 model not found, try the next model in the fallback list
        if (err?.message?.includes("404") || err?.message?.includes("not found")) {
          continue;
        }
        // Otherwise break and throw
        break;
      }
    }

    throw lastError || new Error("Failed to generate response across models.");
  } catch (error: any) {
    console.error("Gemini Chat API Error:", error);

    const errorMsg =
      error?.message?.includes("API_KEY_INVALID")
        ? "Invalid Gemini API Key. Please verify your GEMINI_API_KEY in `.env.local`."
        : error?.message?.includes("RESOURCE_EXHAUSTED")
        ? "Gemini API rate limit reached. Please try again in a few seconds."
        : "Failed to generate AI response. Please check server logs.";

    return NextResponse.json(
      {
        error: errorMsg,
        details: process.env.NODE_ENV === "development" ? error?.message : undefined,
      },
      { status: 500 }
    );
  }
}
