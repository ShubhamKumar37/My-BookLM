"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
    MessageSquare,
    BookOpen,
    Sparkles,
    Plus,
    MessagesSquare,
    Loader2,
    MoreHorizontal,
    Pencil,
    Trash2,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { RenameConversationDialog } from "@/features/conversation/components/rename-conversation-dialog";
import { cn } from "@/lib/utils";
import { useConversations, useCreateConversation, useDeleteConversation } from "@/features/conversation/hooks/use-conversation";

const items = [
    {
        label: "Chat",
        icon: MessageSquare,
        href: "chat",
    },
    {
        label: "Sources",
        icon: BookOpen,
        href: "sources",
    },
    {
        label: "Artifacts",
        icon: Sparkles,
        href: "artifacts",
    },
];

export function WorkspaceSidebar({ workspaceId }) {
    const pathname = usePathname();

    const [conversationToRename, setConversationToRename] = useState(null);

    const {
        data: conversations = [],
        isLoading,
        isError,
    } = useConversations(workspaceId);

    const createMutation = useCreateConversation(workspaceId);

    const handleCreateConversation = () => {
        createMutation.mutate({});
    };

    const router = useRouter();
    const searchParams = useSearchParams();

    const deleteMutation = useDeleteConversation(workspaceId);

    const handleDeleteConversation = (conversation) => {
        deleteMutation.mutate(conversation.id, {
            onSuccess: () => {
                if (
                    searchParams.get("conversationId") === conversation.id
                ) {
                    router.push(`/main/workspace/${workspaceId}/chat`);
                }
            },
        });
    };

    return (
        <aside className="flex min-h-0 flex-col">
            <nav className="flex gap-1 overflow-x-auto p-2 lg:flex-col lg:space-y-1 lg:overflow-visible lg:p-3">
                {items.map((item) => {
                    const Icon = item.icon;
                    const href = `/main/workspace/${workspaceId}/${item.href}`;

                    const isActive =
                        pathname === href || pathname.startsWith(`${href}/`);

                    return (
                        <Link
                            key={item.href}
                            href={href}
                            aria-current={isActive ? "page" : undefined}
                            className={cn(
                                "flex shrink-0 cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                                isActive
                                    ? "bg-primary/10 font-medium text-primary"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <Icon className="size-4 shrink-0" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-3 flex min-h-0 flex-col border-t px-3 pt-4">
                <div className="mb-3 flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                        <MessagesSquare className="size-4 shrink-0 text-muted-foreground" />
                        <h3 className="truncate text-sm font-semibold">
                            Conversations
                        </h3>
                    </div>

                    <button
                        type="button"
                        onClick={handleCreateConversation}
                        disabled={createMutation.isPending}
                        aria-label="Create new conversation"
                        title="New conversation"
                        className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {createMutation.isPending ? (
                            <Loader2 className="size-4 animate-spin" />
                        ) : (
                            <Plus className="size-4" />
                        )}
                    </button>
                </div>

                <div className="flex min-h-0 flex-col gap-1 overflow-y-auto">
                    {isLoading && (
                        <div className="flex items-center gap-2 px-2 py-3 text-xs text-muted-foreground">
                            <Loader2 className="size-3.5 animate-spin" />
                            Loading conversations...
                        </div>
                    )}

                    {isError && (
                        <p className="px-2 py-3 text-xs text-destructive">
                            Couldn't load conversations. Please refresh and try again.
                        </p>
                    )}

                    {!isLoading &&
                        !isError &&
                        conversations.length === 0 && (
                            <div className="rounded-lg border border-dashed px-3 py-4 text-center">
                                <p className="text-xs text-muted-foreground">
                                    No conversations yet.
                                </p>

                                <button
                                    type="button"
                                    onClick={handleCreateConversation}
                                    disabled={createMutation.isPending}
                                    className="mt-2 cursor-pointer text-xs font-medium text-primary hover:underline disabled:opacity-50"
                                >
                                    Start your first chat
                                </button>
                            </div>
                        )}

                    {conversations.map((conversation) => {
                        const href = `/main/workspace/${workspaceId}/chat?conversationId=${conversation.id}`;

                        const isActive =
                            pathname.startsWith(
                                `/main/workspace/${workspaceId}/chat`
                            ) &&
                            typeof window !== "undefined" &&
                            new URLSearchParams(
                                window.location.search
                            ).get("conversationId") === conversation.id;

                        return (
                            <div
                                key={conversation.id}
                                className={cn(
                                    "group flex min-w-0 items-center gap-1 rounded-lg transition-colors",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <Link
                                    href={href}
                                    title={
                                        conversation.title || "New conversation"
                                    }
                                    className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 px-2.5 py-2 text-sm"
                                >
                                    <MessageSquare className="size-4 shrink-0" />

                                    <span className="min-w-0 flex-1 truncate">
                                        {conversation.title || "New conversation"}
                                    </span>
                                </Link>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button
                                            type="button"
                                            aria-label={`Options for ${conversation.title || "conversation"}`}
                                            title="Conversation options"
                                            className="mr-1 inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-background sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
                                        >
                                            <MoreHorizontal className="size-4" />
                                        </button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent
                                        align="end"
                                        className="w-40"
                                    >
                                        <DropdownMenuItem
                                            className="cursor-pointer"
                                            onClick={() => {
                                                setConversationToRename(conversation);
                                            }}
                                        >
                                            <Pencil className="mr-2 size-4" />
                                            Rename
                                        </DropdownMenuItem>

                                        <DropdownMenuItem
                                            className="cursor-pointer text-destructive focus:text-destructive"
                                            disabled={deleteMutation.isPending}
                                            onClick={() => {
                                                console.log("We deleted  a conversation");
                                                handleDeleteConversation(conversation)
                                            }
                                            }
                                        >
                                            <Trash2 className="mr-2 size-4" />
                                            {deleteMutation.isPending ? "Deleting..." : "Delete"}
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        );
                    })}
                </div>
            </div>

            <RenameConversationDialog
                workspaceId={workspaceId}
                conversation={conversationToRename}
                open={Boolean(conversationToRename)}
                onOpenChange={(open) => {
                    if (!open) {
                        setConversationToRename(null);
                    }
                }}
            />
        </aside>
    );
}