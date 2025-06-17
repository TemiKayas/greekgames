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
        // Get user metadata from auth user or default values
        const fullName =
          data.user.user_metadata.full_name ||
          data.user.user_metadata.name ||
          data.user.email?.split("@")[0] ||
          "User";

        const role = data.user.user_metadata.role || "student"; // Default to student

        const { error: profileError } = await supabase.from("users").insert({
          id: data.user.id,
          email: data.user.email!,
          full_name: fullName,
          role: role,
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
