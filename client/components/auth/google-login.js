"use client";

import { authClient } from "@/lib/auth-client";

export function GoogleLogin() {
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000/",
    });
  };

  return (
    <button onClick={handleGoogleLogin}>
      Continue with Google
    </button>
  );
}