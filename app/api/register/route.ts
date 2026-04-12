// app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getUserByPhone, createUser } from "../../lib/userService";

type RequestBody = {
  name: string;
  phoneNumber: string;
  password: string;
};

export async function POST(req: NextRequest) {
  try {
    const { name, phoneNumber, password }: RequestBody = await req.json();

    // Validation
    if (name.length < 3 || name.length > 10)
      return NextResponse.json({ error: "Name must be 3-10 characters" }, { status: 400 });

    if (!/^\d{10}$/.test(phoneNumber))
      return NextResponse.json({ error: "Phone number must be 10 digits" }, { status: 400 });

    if (!/^\d{5}$/.test(password))
      return NextResponse.json({ error: "Password must be 5 digits" }, { status: 400 });

    // Check if user exists
    const existingUser = await getUserByPhone(phoneNumber);
    if (existingUser) return NextResponse.json({ error: "User already registered" }, { status: 400 });

    // Create user
    const user = await createUser(name, phoneNumber, password);

    return NextResponse.json({ message: "User registered successfully", user });
  } catch (err) {
    console.error("Register API Error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}