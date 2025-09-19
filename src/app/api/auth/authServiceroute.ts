import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function POST(req: NextRequest) {
  try {
    const { pathname } = new URL(req.url);
    const body = await req.json();
    let endpoint = "";
    if (pathname.endsWith("/signup")) {
      endpoint = "/signup";
    } else if (pathname.endsWith("/login")) {
      endpoint = "/login";
    } else if (pathname.endsWith("/social-login")) {
      endpoint = "/social-login";
    } else if (pathname.endsWith("/logout")) {
      endpoint = "/logout";
    } else { 
      return NextResponse.json({ error:"Invalid route" }, { status: 404 });
    }

    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include", // important for cookies
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
