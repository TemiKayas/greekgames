import { createSupabaseServerClient } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      // eslint-disable-next-line no-console
      console.error("Error exchanging code for session:", error);
      return NextResponse.redirect(`${requestUrl.origin}/?error=auth_error`);
    }

    if (data.user) {
      // Check if profile exists
      const { data: existingProfile } = await supabase
        .from("users")
        .select("id")
        .eq("id", data.user.id)
        .single();

      // Create profile if it doesn't exist and user is confirmed
      if (!existingProfile && data.user.email_confirmed_at) {
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
          // Check if it's a duplicate key error (profile already exists)
          if (profileError.code === "23505") {
            // eslint-disable-next-line no-console
            console.log("Profile already exists, continuing...");
          } else {
            // eslint-disable-next-line no-console
            console.error("Error creating user profile:", profileError);
          }
        } else {
          // eslint-disable-next-line no-console
          console.log("User profile created successfully");
        }
      }
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(`${requestUrl.origin}/`);
}
