import { DefaultChatTransport } from "ai";

export function createChatTransport(workspaceId, conversationId) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

    if (!baseUrl) {
        throw new Error("NEXT_PUBLIC_API_URL is not configured");
    }

    return new DefaultChatTransport({
        api: `${baseUrl}/workspace/chat/${encodeURIComponent(workspaceId)}`,
        credentials: "include",

        prepareSendMessagesRequest({ messages }) {
            return {
                body: {
                    conversationId,
                    messages,
                },
            };
        },
    });
}