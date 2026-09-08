"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogOut, Loader2 } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const logoutMutation = useMutation({
        mutationFn: async () => {
            await authClient.signOut();
        },

        onSuccess: () => {
            queryClient.clear();

            router.replace("/");
            router.refresh();
        },
    });

    return (
        <Button
            type="button"
            variant="outline"
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
        >
            {logoutMutation.isPending ? (
                <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Logging out...
                </>
            ) : (
                <>
                    <LogOut className="mr-2 size-4" />
                    Logout
                </>
            )}
        </Button>
    );
}