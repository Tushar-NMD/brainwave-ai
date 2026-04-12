// app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getUserByPhone, verifyPassword } from "../../lib/userService";
import { JWT_SECRET } from "../../lib/auth";

type RequestBody = {
  phoneNumber: string;
  password: string;
};

export async function POST(req: NextRequest) {
  try {
    const { phoneNumber, password }: RequestBody = await req.json();

    const user = await getUserByPhone(phoneNumber);
    if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });

    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });

    const token = jwt.sign({ id: user.id, phoneNumber: user.phoneNumber }, JWT_SECRET, { expiresIn: "7d" });

    return NextResponse.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login API Error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}