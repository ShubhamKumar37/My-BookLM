import { api } from "@/lib/axios";

export const getChatMessages = async (workspaceId, conversationId) => {
    const { data } = await api.get(
        `/workspace/chat/${workspaceId}/${conversationId}/messages`
    );

    return data.messages;
};

export const streamChat = async (workspaceId, payload) => {
    return api.post(`/workspace/chat/${workspaceId}`, payload, {
        responseType: "stream",
    });
};
