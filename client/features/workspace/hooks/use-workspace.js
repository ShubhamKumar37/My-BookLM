"use client";

import { appToast } from "@/lib/toast";
import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import {
    getWorkspaces,
    getWorkspace,
    createWorkspace,
    deleteWorkspace,
    updateWorkspace
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

        onMutate: () => {
            return {
                toastId: appToast.loading("Creating workspace..."),
            };
        },

        onSuccess: (_, __, context) => {
            queryClient.invalidateQueries({
                queryKey: ["workspaces"],
            });

            appToast.dismiss(context?.toastId);

            appToast.success("Workspace created successfully.");
        },

        onError: (error, _, context) => {
            appToast.dismiss(context?.toastId);

            appToast.error(
                error?.response?.data?.message ||
                "Failed to create workspace."
            );
        },
    });
};

export const useUpdateWorkspace = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ workspaceId, data }) =>
            updateWorkspace(workspaceId, data),

        onMutate: () => {
            return {
                toastId: appToast.loading("Updating workspace..."),
            };
        },

        onSuccess: (_, variables, context) => {
            queryClient.invalidateQueries({
                queryKey: ["workspaces"],
            });

            queryClient.invalidateQueries({
                queryKey: ["workspace", variables.workspaceId],
            });

            appToast.dismiss(context?.toastId);

            appToast.success("Workspace updated successfully.");
        },

        onError: (error, _, context) => {
            appToast.dismiss(context?.toastId);

            appToast.error(
                error?.response?.data?.message ||
                "Failed to update workspace."
            );
        },
    });
};

export const useDeleteWorkspace = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ workspaceId }) =>
            deleteWorkspace(workspaceId),

        onMutate: () => {
            return {
                toastId: appToast.loading("Deleting workspace..."),
            };
        },

        onSuccess: (_, variables, context) => {
            queryClient.invalidateQueries({
                queryKey: ["workspaces"],
            });

            queryClient.removeQueries({
                queryKey: ["workspace", variables.workspaceId],
            });

            appToast.dismiss(context?.toastId);

            appToast.success("Workspace deleted successfully.");
        },

        onError: (error, _, context) => {
            appToast.dismiss(context?.toastId);

            appToast.error(
                error?.response?.data?.message ||
                "Failed to delete workspace."
            );
        },
    });
};