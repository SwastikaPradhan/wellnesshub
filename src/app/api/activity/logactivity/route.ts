import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const token=req.headers.get("authorization");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/activity/logactivity`, {
      method: "POST",
      headers: { "Content-Type": "application/json" , ...(token ? {"Authorization":token}:{})}, 
      body: JSON.stringify(body),
      credentials: "include", // pass cookies to backend
    });
    // If response isn’t JSON, catch it
    const text = await res.text();
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data, { status: res.status });
    } catch {
      return NextResponse.json({ error: "Backend did not return JSON", details: text }, { status: 500 });
    }
  } catch (error: any) {
    console.error("Proxy error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
