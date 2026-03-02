'use client'

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GoogleLoginButton } from "./google-login-button";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push("/protected");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center">
      <div className="h-110 w-full rounded-lg border bg-primary/60 shadow-md flex">
        <div className="flex items-center justify-center bg-white p-6">
          <Image
            src="/assets/peso_logo.png"
            alt="Logo"
            width={300}
            height={300}
            className="mb-4"
          />
        </div>
        <form onSubmit={handleLogin} className={cn("w-full max-w-sm space-y-4 p-6", className)} {...props} >
          <h1 className="text-2xl font-bold">LOGIN FORM</h1>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn("bg-white", className)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-0.5">
              <Label htmlFor="password">Password</Label>
              <Label htmlFor="password" className="text-sm text-gray-500">
                <Link href="/forgot-password" className="text-blue-700 hover:underline">
                  Forgot password?
                </Link>
              </Label>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={cn("bg-white", className)}
              required
            />
          </div>
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
          <GoogleLoginButton />
        </form>
      </div>
    </main>
  );
}
