import { DefaultChatTransport } from "ai";

export function createChatTransport(workspaceId, conversationId) {
    return new DefaultChatTransport({
        api: `${process.env.NEXT_PUBLIC_API_URL} /workspace/chat / ${workspaceId} `,

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
