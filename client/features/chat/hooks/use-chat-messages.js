import { useQuery } from "@tanstack/react-query";
import { getChatMessages } from "../api/chat.api";

const chatKeys = {
    messages: (workspaceId, conversationId) => [
        "chat",
        workspaceId,
        conversationId,
        "messages",
    ],
};

export function useChatMessages(workspaceId, conversationId) {
    return useQuery({
        queryKey: chatKeys.messages(workspaceId, conversationId),
        queryFn: () => getChatMessages(workspaceId, conversationId),
        enabled: Boolean(workspaceId && conversationId),
    });
}
