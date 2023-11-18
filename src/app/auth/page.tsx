"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { toast } from "@/app/_components/ui/use-toast";
import { getAuthOnClient } from "@/lib/auth/getAuthOnClient";
import { signInSchema } from "@/types/signInSchema";

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // * Parse the signin input, attempt to signin, display any errors, and finally redirect on success
  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();

    // * Parse email and password with zod
    const parsedSignInData = signInSchema.safeParse({ email, password });

    // * Display errors if zod finds any
    if (!parsedSignInData.success) {
      toast({
        title: "Sign In Error",
        description: (
          <ul>
            {parsedSignInData.error.issues.map((error, idx) => (
              <li key={idx}>
                <span className="font-semibold capitalize">{error.path}: </span>
                {error.message}
              </li>
            ))}
          </ul>
        ),
        variant: "destructive",
      });
    }

    // * Attempt to signin the user if a valid email and password are submitted
    if (!!parsedSignInData.success) {
      const { auth } = getAuthOnClient();

      const {
        data: { user },
        error,
      } = await auth.signInWithPassword({
        email: parsedSignInData.data.email,
        password: parsedSignInData.data.password,
      });

      // * Display any errors with signing in
      if (error) {
        toast({
          title: "Sign In Error",
          description: error.message,
          variant: "destructive",
        });
      }

      // * Redirect on successful signin
      if (!!user) router.replace("/dashboard");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[hsl(331,74.5%,65.4%)] to-secondary to-70% text-white">
      <Card className="relative after:pointer-events-none after:absolute after:top-0 after:h-full after:w-full after:animate-pulse after:bg-transparent after:shadow-2xl after:shadow-accent after:duration-1000">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>If you have an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSignIn}
            className="flex h-full flex-col items-center justify-center gap-12"
          >
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="email@example.com"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <Button type="submit" size="lg">
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="block text-sm text-muted-foreground">
          <p>Don&apos;t have an account?</p>
          <p>Sucks because I&apos;m too lazy to make a sign-up page.</p>
        </CardFooter>
      </Card>
    </main>
  );
}
