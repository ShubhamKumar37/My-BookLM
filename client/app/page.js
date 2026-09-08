"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { GoogleLogin } from "@/components/auth/google-login";

export default function Home() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && session) {
      router.replace("/dashboard");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="size-6 animate-spin" />
      </div>
    );
  }

  if (session) {
    return null;
  }

  return (
    <main>
      <h1>Welcome</h1>

      <GoogleLogin />
    </main>
  );
}