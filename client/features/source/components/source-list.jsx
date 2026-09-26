"use client";

import { Loader2 } from "lucide-react";

import { useSources } from "../hooks/use-source";

export function SourceList({ workspaceId }) {
    const {
        data: sources,
        isLoading,
        isError,
    } = useSources(workspaceId);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-16">
                <Loader2 className="size-5 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
                <p className="text-sm text-destructive">
                    Failed to load sources.
                </p>
            </div>
        );
    }

    if (!sources?.length) {
        return (
            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center">
                <h2 className="text-base font-semibold">
                    No sources yet
                </h2>

                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                    Add a PDF, website, YouTube video, or text to start
                    learning from your sources.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {sources.map((source) => (
                <div
                    key={source.id}
                    className="rounded-xl border p-4"
                >
                    <p className="font-medium">
                        {source.title}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                        {source.type}
                    </p>

                    <p className="mt-3 text-xs text-muted-foreground">
                        Status: {source.status}
                    </p>
                </div>
            ))}
        </div>
    );
}