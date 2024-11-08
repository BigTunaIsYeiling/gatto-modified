import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = request.cookies.get("token");
  if (!token) {
    return NextResponse.redirect(new URL("/register", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
