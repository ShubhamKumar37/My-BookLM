"use client";

import { authClient } from "@/lib/auth-client";

export function TestAuth() {
    const { data: session, isPending } = authClient.useSession();

    if (isPending) {
        return <p>Loading session...</p>;
    }

    return (
        <div>
            <p>Session test</p>

            {session ? (
                <pre>{JSON.stringify(session, null, 2)}</pre>
            ) : (
                <p>No session found</p>
            )}
        </div>
    );
}