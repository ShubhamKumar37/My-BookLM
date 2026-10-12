"use client";

import {
    FileText,
    Globe,
    MoreVertical,
    RotateCcw,
    Trash2,
    Youtube,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    useDeleteSource,
    useReprocessSource,
} from "../hooks/use-source";

const sourceConfig = {
    PDF: {
        label: "PDF",
        icon: FileText,
    },
    WEBSITE: {
        label: "Website",
        icon: Globe,
    },
    YOUTUBE: {
        label: "YouTube",
        icon: Youtube,
    },
    TEXT: {
        label: "Text",
        icon: FileText,
    },
    MARKDOWN: {
        label: "Markdown",
        icon: FileText,
    },
};

const statusVariant = {
    READY: "default",
    PROCESSING: "secondary",
    PENDING: "secondary",
    FAIL: "destructive",
};

export function SourceCard({ source, workspaceId }) {
    const deleteSource = useDeleteSource();
    const reprocessSource = useReprocessSource();

    const config = sourceConfig[source.type] || {
        label: source.type,
        icon: FileText,
    };

    const Icon = config.icon;

    const handleDelete = () => {
        deleteSource.mutate({
            workspaceId,
            sourceId: source.id,
        });
    };

    const handleReprocess = () => {
        reprocessSource.mutate({
            workspaceId,
            sourceId: source.id,
        });
    };

    return (
        <div className="group rounded-xl border bg-card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <Icon className="size-5 text-muted-foreground" />
                    </div>

                    <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold">
                            {source.title}
                        </h3>

                        <p className="mt-0.5 text-xs text-muted-foreground">
                            {config.label}
                        </p>
                    </div>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 cursor-pointer opacity-70 transition-opacity group-hover:opacity-100"
                        >
                            <MoreVertical className="size-4" />

                            <span className="sr-only">
                                Source actions
                            </span>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        {(source.status === "FAIL" ||
                            source.status === "PENDING") && (
                                <DropdownMenuItem
                                    onClick={handleReprocess}
                                    disabled={reprocessSource.isPending}
                                    className="cursor-pointer"
                                >
                                    <RotateCcw className="size-4" />

                                    {reprocessSource.isPending
                                        ? "Reprocessing..."
                                        : "Reprocess"}
                                </DropdownMenuItem>
                            )}

                        <DropdownMenuItem
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={deleteSource.isPending}
                            className="cursor-pointer"
                        >
                            <Trash2 className="size-4" />

                            {deleteSource.isPending
                                ? "Deleting..."
                                : "Delete"}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
                <Badge variant={statusVariant[source.status] || "secondary"}>
                    {source.status}
                </Badge>

                <span className="text-xs text-muted-foreground">
                    {new Date(source.createdAt).toLocaleDateString()}
                </span>
            </div>
        </div>
    );
}