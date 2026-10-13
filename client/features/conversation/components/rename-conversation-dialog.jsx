"use client";

import { useEffect, useState } from "react";
import { useUpdateConversation } from "@/features/conversation/hooks/use-conversation";
import { appToast } from "@/lib/toast";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function RenameConversationDialog({
    workspaceId,
    conversation,
    open,
    onOpenChange,
}) {
    const [title, setTitle] = useState("");

    const updateMutation = useUpdateConversation(workspaceId);

    useEffect(() => {
        if (open) {
            setTitle(conversation?.title || "");
        }
    }, [open, conversation]);

    const handleRename = async (event) => {
        event.preventDefault();

        const trimmedTitle = title.trim();

        if (!trimmedTitle) {
            appToast.error("Please enter a conversation title.");
            return;
        }

        if (trimmedTitle.length > 120) {
            appToast.error("Title must be 120 characters or fewer.");
            return;
        }

        if (trimmedTitle === (conversation?.title || "")) {
            onOpenChange(false);
            return;
        }

        try {
            await updateMutation.mutateAsync({
                conversationId: conversation.id,
                payload: { title: trimmedTitle },
            });

            appToast.success("Conversation renamed successfully.");
            onOpenChange(false);
        } catch {
            appToast.error("Couldn't rename the conversation. Please try again.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <form onSubmit={handleRename}>
                    <DialogHeader>
                        <DialogTitle>Rename conversation</DialogTitle>
                        <DialogDescription>
                            Choose a clear title so you can find this conversation later.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-5">
                        <Input
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder="Conversation title"
                            maxLength={120}
                            autoFocus
                            disabled={updateMutation.isPending}
                        />
                        <p className="mt-2 text-right text-xs text-muted-foreground">
                            {title.length}/120
                        </p>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            className="cursor-pointer"
                            onClick={() => onOpenChange(false)}
                            disabled={updateMutation.isPending}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            className="cursor-pointer"
                            disabled={updateMutation.isPending || !title.trim()}
                        >
                            {updateMutation.isPending ? "Saving..." : "Save changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
