"use client";

import { Loader2 } from "lucide-react";

import { useWorkspaces } from "@/features/workspace/hooks/use-workspace";
import { CreateWorkspaceDialog } from "@/features/workspace/components/create-workspace-dialog";

const Page = () => {
    const {
        data: workspaces,
        isLoading,
        isError,
    } = useWorkspaces();

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        All Workspaces
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Select a workspace to continue learning.
                    </p>
                </div>

                <CreateWorkspaceDialog />
            </div>

            {/* Workspace Data */}
            {isLoading && (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="size-6 animate-spin text-muted-foreground" />
                </div>
            )}

            {isError && (
                <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
                    <p className="text-sm text-destructive">
                        Failed to load workspaces.
                    </p>
                </div>
            )}

            {!isLoading && !isError && (
                <pre className="overflow-auto rounded-xl border bg-muted/50 p-4 text-sm">
                    {JSON.stringify(workspaces, null, 2)}
                </pre>
            )}
        </div>
    );
};

export default Page;