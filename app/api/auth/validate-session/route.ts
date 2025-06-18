import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json();
    if (!sessionId) {
      return new NextResponse("Session ID required", { status: 400 });
    }

    const supabase = createRouteHandlerClient({ cookies });

    // Validate session with Supabase
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error || !session || session.id !== sessionId) {
      return new NextResponse("Invalid session", { status: 401 });
    }

    // Check if session is expired
    if (session.expires_at && session.expires_at < Date.now() / 1000) {
      return new NextResponse("Session expired", { status: 401 });
    }

    return new NextResponse("Session valid", { status: 200 });
  } catch (error) {
    console.error("Session validation error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
