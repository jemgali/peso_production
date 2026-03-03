"use client";

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

const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: "Last name is required" }),
  suffix: z.string().optional(),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  repeatPassword: z.string().min(6, { message: "Repeat password must be at least 6 characters" }),
  }).refine((data) => data.password === data.repeatPassword, {
  message: "Passwords do not match",
  path: ["repeatPassword"],
});

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [suffix, setSuffix] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    const validationResult = signUpSchema.safeParse({
      email,
      firstName,
      middleName,
      lastName,
      suffix,
      password,
      repeatPassword,
    });

    if (!validationResult.success) {
      setError(validationResult.error.issues[0].message);
      setIsLoading(false);
      return;
    }

    try {
      const { error: supabaseError } = await supabase.auth.signUp({
        email: validationResult.data.email,
        password: validationResult.data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected/client`,
          data: {
            user_first_name: validationResult.data.firstName,
            user_middle_name: validationResult.data.middleName,
            user_last_name: validationResult.data.lastName,
            user_suffix: validationResult.data.suffix,
          },
        },
      });
      if (supabaseError) throw supabaseError;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="h-110 w-full rounded-lg border bg-primary/60 shadow-md">
      <form onSubmit={handleSignUp} className={cn("w-full space-y-4 p-6", className)}>
        <div className="flex">
          <Image
            src="/assets/peso_logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="mb-4"
          />
          <h1 className="text-2xl font-bold mt-2">SIGN UP FORM</h1>
        </div>
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
        <div className="flex">
          <div className="space-y-2 mx-1">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-white"
              required
            />
          </div>
          <div className="space-y-2 mx-1">
            <Label htmlFor="middleName">Middle Name</Label>
            <Input
              id="middleName"
              type="text"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              className="bg-white"
            />
          </div>
          <div className="space-y-2 mx-1">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-white"
              required
            />
          </div>
          <div className="space-y-2 mx-1">
            <Label htmlFor="suffix">Suffix</Label>
            <Input
              id="suffix"
              type="text"
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
              className="bg-white"
            />
          </div>
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
        <div className="space-y-2">
          <Label htmlFor="repeatPassword">Repeat Password</Label>
          <Input
            id="repeatPassword"
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className="bg-white"
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign Up"}
        </Button>
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
        <div className="flex items-center justify-center">
          <Label htmlFor="login" className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-700 hover:underline">
              Login
            </Link>
          </Label>
        </div>
      </form>
    </main>
  );
}
