"use client";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Globe } from "lucide-react";

export function GoogleLogin() {
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000/",
    });
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">
          Welcome
        </CardTitle>

        <CardDescription>
          Sign in to continue to your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Button
          variant="outline"
          className="w-full h-11 gap-3"
          onClick={handleGoogleLogin}
        >
          <Globe className="h-5 w-5" />
          Continue with Google
        </Button>
      </CardContent>
    </Card>
  );
}