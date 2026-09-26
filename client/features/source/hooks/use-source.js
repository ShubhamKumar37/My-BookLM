"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getSources,
  createSource,
  uploadPdf,
  getSource,
  deleteSource,
  importYoutube,
  importWebsite,
  bulkDeleteSources,
  reprocessSource,
} from "../api/source.api";

import { appToast } from "@/lib/toast";

export const useSources = (workspaceId) => {
  return useQuery({
    queryKey: ["sources", workspaceId],
    queryFn: () => getSources(workspaceId),
    enabled: !!workspaceId,
  });
};

export const useSource = (workspaceId, sourceId) => {
  return useQuery({
    queryKey: ["source", workspaceId, sourceId],
    queryFn: () => getSource(workspaceId, sourceId),
    enabled: !!workspaceId && !!sourceId,
  });
};

export const useCreateSource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, data }) =>
      createSource(workspaceId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["sources", variables.workspaceId],
      });
    },
  });
};

export const useUploadPdf = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, formData }) =>
      uploadPdf(workspaceId, formData),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["sources", variables.workspaceId],
      });
    },
  });
};

export const useDeleteSource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, sourceId }) =>
      deleteSource(workspaceId, sourceId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["sources", variables.workspaceId],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "source",
          variables.workspaceId,
          variables.sourceId,
        ],
      });
    },
  });
};

export const useImportYoutube = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, data }) =>
      importYoutube(workspaceId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["sources", variables.workspaceId],
      });
    },
  });
};

export const useImportWebsite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, data }) =>
      importWebsite(workspaceId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["sources", variables.workspaceId],
      });
    },
  });
};

export const useBulkDeleteSources = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, data }) =>
      bulkDeleteSources(workspaceId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["sources", variables.workspaceId],
      });
    },
  });
};

export const useReprocessSource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, sourceId }) =>
      reprocessSource(workspaceId, sourceId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["sources", variables.workspaceId],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "source",
          variables.workspaceId,
          variables.sourceId,
        ],
      });
    },
  });
};
