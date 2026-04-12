import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/firebase";
import { verifyToken } from "@/app/lib/auth";
import {
  collection, getDocs,
  query, orderBy,
} from "firebase/firestore";

export async function GET(req: NextRequest) {
  try {
    // 🔐 Check JWT token
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

    // ✅ Get userId from query param
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    // 📜 Fetch all messages from Firestore
    const messagesRef = collection(db, "users", userId, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));
    const snapshot = await getDocs(q);

    const messages = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        userMessage: data.userMessage,
        aiResponse: data.aiResponse,
        imageUrl: data.imageUrl || null,
        createdAt: data.createdAt?.toDate() || null,
      };
    });

    return NextResponse.json({ messages }, { status: 200 });

  } catch (error) {
    console.error("History API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}