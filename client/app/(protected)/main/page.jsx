"use client";

import { Loader2 } from "lucide-react";

import { useWorkspaces } from "@/features/workspace/hooks/use-workspace";
import { CreateWorkspaceDialog } from "@/features/workspace/components/create-workspace-dialog";
import { WorkspaceCard } from "@/features/workspace/components/workspace-card";

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

            {/* Loading */}
            {isLoading && (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="size-6 animate-spin text-muted-foreground" />
                </div>
            )}

            {/* Error */}
            {isError && (
                <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
                    <p className="text-sm text-destructive">
                        Failed to load workspaces.
                    </p>
                </div>
            )}

            {/* Workspaces */}
            {!isLoading && !isError && (
                <>
                    {workspaces?.length > 0 ? (
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {workspaces.map((workspace, index) => (
                                <WorkspaceCard
                                    key={workspace.id}
                                    workspace={workspace}
                                    index={index}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed">
                            <h2 className="text-lg font-semibold">
                                No workspaces yet
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Create your first workspace to get started.
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Page;