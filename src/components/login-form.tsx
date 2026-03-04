'use client'

import { useState } from "react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

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
    setIsLoading(true);
    setError(null);

    const validationResult = loginSchema.safeParse({ email, password });
    if (!validationResult.success) {
      setError(validationResult.error.issues[0].message);
      setIsLoading(false);
      return;
    }
    
    const supabase = createClient();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email:  validationResult.data.email,
        password: validationResult.data.password,
      });
      if (error) throw error;

      const userRole = data.user?.user_metadata?.role || 'client';
      switch (userRole) {
        case 'admin':
          router.push("/protected/admin");
          break;
        case 'employee':
          router.push("/protected/employee");
          break;
        default:
          router.push("/home");
      }
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
        <form onSubmit={handleLogin} className={cn("w-full space-y-4 p-6", className)}>
          <h1 className="text-2xl font-bold">LOGIN FORM</h1>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white"
              required
            />
          </div>
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          <div className="mt-4 space-y-2">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="signup" className="text-sm text-gray-500">
              <Link href="/auth/sign-up" className="text-blue-700 hover:underline">
                Sign up
              </Link>
            </Label>
            <Label htmlFor="password" className="text-sm text-gray-500">
              <Link href="/auth/forgot-password" className="text-blue-700 hover:underline">
                Forgot password?
              </Link>
            </Label>
          </div>
        </form>
      </div>
    </main>
  );
}
