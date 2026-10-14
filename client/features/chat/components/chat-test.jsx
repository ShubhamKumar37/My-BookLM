"use client";

import { useWorkspaceChat } from "../hooks/use-chat";
import { ChatMessages } from "./chat-messages";

export function ChatTest({ workspaceId, conversationId }) {
    const {
        messages,
        isLoadingMessages,
        isMessagesError,
        messagesError,
    } = useWorkspaceChat(workspaceId, conversationId);

    if (isMessagesError) {
        return (
            <div className="p-4 text-sm text-destructive">
                Failed to load messages: {messagesError?.message}
            </div>
        );
    }

    return (
        <div className="flex h-full min-h-0 flex-col">
            <ChatMessages
                messages={messages}
                isLoading={isLoadingMessages}
            />
        </div>
    );
}