"use client";

import { useEffect, useMemo } from "react";
import { useChat } from "@ai-sdk/react";
import { createChatTransport } from "../lib/chat-transport";
import { useChatMessages } from "./use-chat-messages";

export function useWorkspaceChat(workspaceId, conversationId) {
    const transport = useMemo(
        () => createChatTransport(workspaceId, conversationId),
        [workspaceId, conversationId]
    );

    const {
        messages: savedMessages,
        isPending,
        isError,
        error,
    } = useChatMessages(workspaceId, conversationId);

    const chat = useChat({
        id: `${workspaceId}:${conversationId || "new"}`,
        transport,
    });

    useEffect(() => {
        if (savedMessages) {
            chat.setMessages(savedMessages);
        }
    }, [savedMessages, chat.setMessages]);

    return {
        ...chat,
        isLoadingMessages: isPending,
        isMessagesError: isError,
        messagesError: error,
    };
}
