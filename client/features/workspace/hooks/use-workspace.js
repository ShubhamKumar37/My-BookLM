"use client";

import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import {
    getWorkspaces,
    getWorkspace,
    createWorkspace,
} from "../api/workspace.api";

export const useWorkspaces = () => {
    return useQuery({
        queryKey: ["workspaces"],
        queryFn: getWorkspaces,
    });
};

export const useWorkspace = (workspaceId) => {
    return useQuery({
        queryKey: ["workspace", workspaceId],
        queryFn: () => getWorkspace(workspaceId),
        enabled: !!workspaceId,
    });
};

export const useCreateWorkspace = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createWorkspace,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["workspaces"],
            });
        },
    });
};