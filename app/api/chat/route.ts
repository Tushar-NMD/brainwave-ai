import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { db } from "@/app/lib/firebase";
import { verifyToken } from "@/app/lib/auth";
import {
  collection, addDoc, getDocs,
  query, orderBy, limit, serverTimestamp,
} from "firebase/firestore";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    // Check JWT token
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized - No token" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: "Unauthorized - Invalid token" },
        { status: 401 }
      );
    }

    // Token valid — proceed
    const { message, userId, imageUrl } = await req.json();

    console.log("userId received:", userId);
    console.log("message received:", message);
    console.log("imageUrl received:", imageUrl);

    if (!message || !userId) {
      return NextResponse.json(
        { error: "message and userId required" },
        { status: 400 }
      );
    }

    // 1️Fetch chat history from Firestore
    const messagesRef = collection(db, "users", userId, "messages");
    const q = query(messagesRef, orderBy("createdAt", "desc"), limit(10));
    const snapshot = await getDocs(q);

    const history = snapshot.docs.reverse().flatMap((doc) => {
      const data = doc.data();
      if (!data.userMessage || !data.aiResponse) return [];
      return [
        { role: "user" as const, content: String(data.userMessage) },
        { role: "assistant" as const, content: String(data.aiResponse) },
      ];
    });

    // 2️Send to Groq with vision support
    const groqMessages: any[] = [
      { role: "system", content: "You are a helpful AI assistant." },
      ...history,
    ];

    if (imageUrl) {
      groqMessages.push({
        role: "user",
        content: [
          { type: "text", text: message },
          { type: "image_url", image_url: { url: imageUrl } },
        ],
      });
    } else {
      groqMessages.push({
        role: "user",
        content: message,
      });
    }

    let completion;
    try {
      completion = await groq.chat.completions.create({
        model: imageUrl ? "meta-llama/llama-4-scout-17b-16e-instruct" : "llama-3.3-70b-versatile",
        messages: groqMessages,
        max_tokens: 1024,
      });
    } catch (groqError: any) {
      console.error("Groq API Error Details:", groqError?.response?.data || groqError.message);
      return NextResponse.json({ error: "AI Service Error: " + (groqError.message || "Unknown error") }, { status: 502 });
    }

    const aiResponse = completion.choices[0].message.content || "";

    // 3️Save to Firestore
    try {
      const docRef = await addDoc(messagesRef, {
        userMessage: message,
        imageUrl: imageUrl || null,
        aiResponse,
        createdAt: serverTimestamp(),
      });
      console.log("Saved! Doc ID:", docRef.id);
    } catch (saveError) {
      console.error("Save failed:", saveError);
    }

    // 4️ Return response
    return NextResponse.json({ response: aiResponse }, { status: 200 });

  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}