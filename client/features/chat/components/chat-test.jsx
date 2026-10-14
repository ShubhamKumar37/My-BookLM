"use client";

import { useWorkspaceChat } from "../hooks/use-chat";
import { ChatMessages } from "./chat-messages";
import { ChatComposer } from "./chat-composer";
import { Button } from "@/components/ui/button";

export function ChatTest({ workspaceId, conversationId }) {
    const {
        messages,
        sendMessage,
        status,
        error,
        clearError,
        isLoadingMessages,
        isMessagesError,
        messagesError,
    } = useWorkspaceChat(workspaceId, conversationId);

    const isStreaming = status === "submitted" || status === "streaming";

    const handleSend = (text) => {
        if (!conversationId) {
            return;
        }

        sendMessage({ text });
    };

    if (isMessagesError) {
        return (
            <div className="p-4 text-sm text-destructive">
                Failed to load messages: {messagesError?.message}
            </div>
        );
    }

    return (
        <div className="flex min-h-0 flex-1 flex-col">
            <div className="min-h-0 flex-1 overflow-y-auto">
                <ChatMessages
                    messages={messages}
                    isLoading={isLoadingMessages}
                />
            </div>

            {error && (
                <div className="flex items-center justify-between gap-3 px-4 pb-2 text-sm text-destructive">
                    <span>{error.message || "Failed to send message."}</span>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={clearError}
                    >
                        Dismiss
                    </Button>
                </div>
            )}

            <ChatComposer
                onSend={handleSend}
                disabled={!conversationId || isStreaming || isLoadingMessages}
            />
        </div>
    );
}
