import { api } from "@/lib/axios";

export const getConversations = async (workspaceId) => {
    const { data } = await api.get(
        `/workspace/conversation/${workspaceId}`
    );

    return data;
};

export const createConversation = async (workspaceId, payload = {}) => {
    const { data } = await api.post(
        `/workspace/conversation/${workspaceId}`,
        payload
    );

    return data;
};

export const updateConversation = async (
    workspaceId,
    conversationId,
    payload
) => {
    const { data } = await api.patch(
        `/workspace/conversation/${workspaceId}/${conversationId}`,
        payload
    );

    return data;
};

export const deleteConversation = async (
    workspaceId,
    conversationId
) => {
    const { data } = await api.delete(
        `/workspace/conversation/${workspaceId}/${conversationId}`
    );

    return data;
};