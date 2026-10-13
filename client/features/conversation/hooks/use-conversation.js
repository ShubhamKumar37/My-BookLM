import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

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

export function useConversations(workspaceId) {
    return useQuery({
        queryKey: conversationKeys.workspace(workspaceId),
        queryFn: () => getConversations(workspaceId),
        enabled: Boolean(workspaceId),
    });
}

export function useCreateConversation(workspaceId) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload = {}) =>
            createConversation(workspaceId, payload),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: conversationKeys.workspace(workspaceId),
            });
        },
    });
}

export function useUpdateConversation(workspaceId) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ conversationId, payload }) =>
            updateConversation(workspaceId, conversationId, payload),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: conversationKeys.workspace(workspaceId),
            });
        },
    });
}

export function useDeleteConversation(workspaceId) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (conversationId) =>
            deleteConversation(workspaceId, conversationId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: conversationKeys.workspace(workspaceId),
            });
        },
    });
}