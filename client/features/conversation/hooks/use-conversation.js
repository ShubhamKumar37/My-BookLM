import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import { appToast } from "@/lib/toast";

import {
    getConversations,
    createConversation,
    updateConversation,
    deleteConversation,
} from "@/features/conversation/api/conversation.api";

const conversationKeys = {
    all: ["conversations"],
    workspace: (workspaceId) => [
        ...conversationKeys.all,
        workspaceId,
    ],
};

// Fetch conversations for a workspace
export function useConversations(workspaceId) {
    return useQuery({
        queryKey: conversationKeys.workspace(workspaceId),
        queryFn: () => getConversations(workspaceId),
        enabled: Boolean(workspaceId),
    });
}

// Create a conversation
export function useCreateConversation(workspaceId) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload = {}) =>
            createConversation(workspaceId, payload),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: conversationKeys.workspace(workspaceId),
            });

            appToast.success("Conversation created successfully.");
        },

        onError: () => {
            appToast.error("Couldn't create the conversation.");
        },
    });
}

// Rename/update a conversation
export function useUpdateConversation(workspaceId) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ conversationId, payload }) =>
            updateConversation(workspaceId, conversationId, payload),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: conversationKeys.workspace(workspaceId),
            });

            appToast.success("Conversation renamed successfully.");
        },

        onError: () => {
            appToast.error("Couldn't rename the conversation.");
        },
    });
}

// Delete a conversation
export function useDeleteConversation(workspaceId) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (conversationId) =>
            deleteConversation(workspaceId, conversationId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: conversationKeys.workspace(workspaceId),
            });

            appToast.success("Conversation deleted successfully.");
        },

        onError: () => {
            appToast.error("Couldn't delete the conversation.");
        },
    });
}
