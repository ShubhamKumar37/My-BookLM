"use client";

import { MoreVertical, Trash2 } from "lucide-react";

import { EditWorkspaceDialog } from "./edit-workspace-dialog";

import { useDeleteWorkspace } from "../hooks/use-workspace";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

const gradients = [
    "from-violet-500/20 via-purple-500/10 to-fuchsia-500/20",
    "from-blue-500/20 via-cyan-500/10 to-teal-500/20",
    "from-emerald-500/20 via-green-500/10 to-lime-500/20",
    "from-orange-500/20 via-amber-500/10 to-yellow-500/20",
    "from-pink-500/20 via-rose-500/10 to-red-500/20",
];

export function WorkspaceCard({ workspace, index = 0 }) {
    const deleteWorkspace = useDeleteWorkspace();

    const gradient = gradients[index % gradients.length];

    const handleDelete = () => {
        deleteWorkspace.mutate({
            workspaceId: workspace.id,
        });
    };

    return (
        <Card
            className={`group relative overflow-hidden border-border/60 bg-gradient-to-br ${gradient} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
        >
            {/* Decorative background */}
            <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-white/10 blur-2xl" />

            <CardHeader className="relative flex flex-row items-start justify-between space-y-0">
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-background/70 text-lg font-bold shadow-sm backdrop-blur">
                        {workspace.icon ||
                            workspace.title.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                        <CardTitle className="line-clamp-1 text-lg">
                            {workspace.title}
                        </CardTitle>

                        <p className="mt-1 text-xs text-muted-foreground">
                            {workspace.defaultModel}
                        </p>
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                    {/* Edit */}
                    <EditWorkspaceDialog
                        workspace={workspace}
                    />

                    {/* Delete */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="size-8 opacity-70 transition-opacity group-hover:opacity-100"
                            >
                                <MoreVertical className="size-4" />

                                <span className="sr-only">
                                    Workspace actions
                                </span>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                variant="destructive"
                                disabled={deleteWorkspace.isPending}
                                onClick={handleDelete}
                            >
                                <Trash2 className="size-4" />

                                {deleteWorkspace.isPending
                                    ? "Deleting..."
                                    : "Delete workspace"}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>

            <CardContent className="relative">
                <p className="line-clamp-2 min-h-10 text-sm text-muted-foreground">
                    {workspace.description ||
                        "No description provided."}
                </p>

                <div className="mt-5 text-xs text-muted-foreground">
                    Created{" "}
                    {new Date(
                        workspace.createdAt
                    ).toLocaleDateString()}
                </div>
            </CardContent>
        </Card>
    );
}