"use client";

import { Loader2 } from "lucide-react";

import { useWorkspace } from "../hooks/use-workspace";

export function WorkspaceHeader({ workspaceId }) {
    const { data: workspace, isLoading } = useWorkspace(workspaceId);

    return (
        <header className="border-b bg-background/80 backdrop-blur">
            <div className="flex h-14 items-center px-4 sm:px-6">
                {isLoading ? (
                    <Loader2 className="size-4 animate-spin text-muted-foreground" />
                ) : (
                    <div className="min-w-0">
                        <h1 className="truncate text-sm font-semibold">
                            {workspace?.title || "Workspace"}
                        </h1>

                        {workspace?.description && (
                            <p className="hidden truncate text-xs text-muted-foreground sm:block">
                                {workspace.description}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}