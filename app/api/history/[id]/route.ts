import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/firebase";
import { verifyToken } from "@/app/lib/auth";
import { doc, getDoc } from "firebase/firestore";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    //  Await params
    const { id: messageId } = await params;

    // Get userId from query param
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId || !messageId) {
      return NextResponse.json(
        { error: "userId and messageId required" },
        { status: 400 }
      );
    }

    // Fetch single message
    const messageRef = doc(db, "users", userId, "messages", messageId);
    const snapshot = await getDoc(messageRef);

    if (!snapshot.exists()) {
      return NextResponse.json(
        { error: "Message not found" },
        { status: 404 }
      );
    }

    const data = snapshot.data();
    const message = {
      id: snapshot.id,
      userMessage: data.userMessage,
      aiResponse: data.aiResponse,
      imageUrl: data.imageUrl || null,
      createdAt: data.createdAt?.toDate() || null,
    };

    return NextResponse.json({ message }, { status: 200 });

  } catch (error) {
    console.error("History detail error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}