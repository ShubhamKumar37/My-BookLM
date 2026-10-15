import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createArtifact,
    deleteArtifact,
    getArtifact,
    getArtifacts,
} from "../api/artifact.api";
import { appToast } from "@/lib/toast.js";

export const artifactKeys = {
    all: ["artifacts"],
    lists: () => [...artifactKeys.all, "list"],
    list: (workspaceId) => [...artifactKeys.lists(), workspaceId],
    details: () => [...artifactKeys.all, "detail"],
    detail: (workspaceId, artifactId) => [
        ...artifactKeys.details(),
        workspaceId,
        artifactId,
    ],
};

export function useArtifacts(workspaceId) {
    return useQuery({
        queryKey: artifactKeys.list(workspaceId),
        queryFn: () => getArtifacts(workspaceId),
        enabled: Boolean(workspaceId),
        refetchInterval: (query) => {
            const artifacts = query.state.data;

            const hasActiveGeneration = Array.isArray(artifacts)
                ? artifacts.some(
                    (artifact) =>
                        artifact.status === "PENDING" ||
                        artifact.status === "PROCESSING",
                )
                : false;

            return hasActiveGeneration ? 3000 : false;
        },
    });
}

export function useArtifact(workspaceId, artifactId) {
    return useQuery({
        queryKey: artifactKeys.detail(workspaceId, artifactId),
        queryFn: () => getArtifact(workspaceId, artifactId),
        enabled: Boolean(workspaceId && artifactId),
        refetchInterval: (query) => {
            const status = query.state.data?.status;

            return status === "PENDING" || status === "PROCESSING"
                ? 3000
                : false;
        },
    });
}

export function useCreateArtifact(workspaceId) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => createArtifact(workspaceId, data),

        onSuccess: (artifact) => {
            queryClient.invalidateQueries({
                queryKey: artifactKeys.list(workspaceId),
            });

            appToast.success("Artifact generation started");

            if (artifact?.id) {
                queryClient.setQueryData(
                    artifactKeys.detail(workspaceId, artifact.id),
                    artifact,
                );
            }
        },

        onError: (error) => {
            appToast.error(
                error.response?.data?.message ||
                error.message ||
                "Failed to create artifact",
            );
        },
    });
}

export function useDeleteArtifact(workspaceId) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (artifactId) => deleteArtifact(workspaceId, artifactId),

        onSuccess: (_, artifactId) => {
            queryClient.removeQueries({
                queryKey: artifactKeys.detail(workspaceId, artifactId),
            });

            queryClient.invalidateQueries({
                queryKey: artifactKeys.list(workspaceId),
            });

            appToast.success("Artifact deleted successfully");
        },

        onError: (error) => {
            appToast.error(
                error.response?.data?.message ||
                error.message ||
                "Failed to delete artifact",
            );
        },
    });
}