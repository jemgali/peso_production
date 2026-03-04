import { createClient } from "@/lib/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import { z } from "zod";

const confirmSchema = z.object({
  code: z.string().nullable(),
  token_hash: z.string().nullable(),
  type: z.enum(["signup", "invite", "magiclink", "recovery", "email_change", "email"]).nullable(),
  next: z.string().default("/"),
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const rawParams = {
    code: searchParams.get("code"),
    token_hash: searchParams.get("token_hash"),
    type: searchParams.get("type"),
    next: searchParams.get("next"),
  };
  
  const validationResult = confirmSchema.safeParse(rawParams);

  if (!validationResult.success) {
    redirect(`/auth/error?error=Invalid parameters`);
  }

  const { code, token_hash, type, next } = validationResult.data;
  const supabase = await createClient();

  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data.user) {
      const userRole = data.user.user_metadata?.role || "client";
      switch (userRole) {
        case "admin":
          redirect("/protected/admin");
          break;
        case "employee":
          redirect("/protected/employee");
          break;
        default:
          redirect("/home");
          break;
      }
    } else {
      redirect(`/auth/error?error=${error?.message || "OAuth Session Error"}`);
    }
  }

  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type: type as EmailOtpType,
      token_hash,
    });
    if (!error) {
      redirect(next);
    } else {
      redirect(`/auth/error?error=${error?.message}`);
    }
  }
  redirect(`/auth/error?error=Invalid confirmation link`);
}
