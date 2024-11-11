import jsonwebtoken from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { token } = await req.json();
  try {
    jsonwebtoken.verify(token, process.env.JWT_SECRET);
    return NextResponse.json({ valid: true });
  } catch (error) {
    return NextResponse.json({ valid: false });
  }
}
