import { createSupabaseServerClient } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (code) {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      // Check if user profile exists in our users table
      const { data: existingProfile } = await supabase
        .from("users")
        .select("id")
        .eq("id", data.user.id)
        .single();

      // If no profile exists, create one
      if (!existingProfile) {
        const { error: profileError } = await supabase.from("users").insert({
          id: data.user.id,
          email: data.user.email!,
          full_name:
            data.user.user_metadata.full_name ||
            data.user.user_metadata.name ||
            "Unknown",
          role: "student", // Default role for OAuth signups
          avatar_url: data.user.user_metadata.avatar_url,
        });

        if (profileError) {
          // eslint-disable-next-line no-console
          console.error("Error creating profile:", profileError);
        }
      }
    }
  }

  // Redirect to dashboard or home page
  return NextResponse.redirect(`${origin}/dashboard`);
}
