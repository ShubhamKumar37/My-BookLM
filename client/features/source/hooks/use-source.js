"use client";

import { useEffect, useRef } from "react";
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

// --------------------------------------------------
// Shared toast helpers
// --------------------------------------------------

const getErrorMessage = (error, fallback) =>
  error?.response?.data?.message ||
  error?.message ||
  fallback;

const useQueryLoadingToast = (isFetching, message) => {
  const toastIdRef = useRef(null);

  useEffect(() => {
    if (isFetching && toastIdRef.current === null) {
      toastIdRef.current = appToast.loading(message);
    }

    if (!isFetching && toastIdRef.current !== null) {
      appToast.dismiss(toastIdRef.current);
      toastIdRef.current = null;
    }

    return () => {
      if (toastIdRef.current !== null) {
        appToast.dismiss(toastIdRef.current);
        toastIdRef.current = null;
      }
    };
  }, [isFetching, message]);
};

const useMutationToast = (loadingMessage, successMessage, errorMessage) => {
  return {
    onMutate: () => ({
      toastId: appToast.loading(loadingMessage),
    }),

    onSuccess: (_, __, context) => {
      appToast.dismiss(context?.toastId);
      appToast.success(successMessage);
    },

    onError: (error, _, context) => {
      appToast.dismiss(context?.toastId);
      appToast.error(getErrorMessage(error, errorMessage));
    },
  };
};

// --------------------------------------------------
// GET: All sources
// --------------------------------------------------

export const useSources = (workspaceId) => {
  const query = useQuery({
    queryKey: ["sources", workspaceId],
    queryFn: () => getSources(workspaceId),
    enabled: !!workspaceId,
  });

  useQueryLoadingToast(query.isFetching, "Fetching sources...");

  return query;
};

// --------------------------------------------------
// GET: Single source
// --------------------------------------------------

export const useSource = (workspaceId, sourceId) => {
  const query = useQuery({
    queryKey: ["source", workspaceId, sourceId],
    queryFn: () => getSource(workspaceId, sourceId),
    enabled: !!workspaceId && !!sourceId,
  });

  useQueryLoadingToast(query.isFetching, "Fetching source details...");

  return query;
};

// --------------------------------------------------
// POST: Create source
// --------------------------------------------------

export const useCreateSource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, data }) =>
      createSource(workspaceId, data),

    ...useMutationToast(
      "Creating source...",
      "Source created successfully.",
      "Failed to create source."
    ),

    onSuccess: (_, variables, context) => {
      appToast.dismiss(context?.toastId);
      appToast.success("Source created successfully.");

      queryClient.invalidateQueries({
        queryKey: ["sources", variables.workspaceId],
      });
    },
  });
};

// --------------------------------------------------
// POST: Upload PDF
// --------------------------------------------------

export const useUploadPdf = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, formData }) =>
      uploadPdf(workspaceId, formData),

    ...useMutationToast(
      "Uploading PDF...",
      "PDF uploaded successfully. Processing has started.",
      "Failed to upload PDF."
    ),

    onSuccess: (_, variables, context) => {
      appToast.dismiss(context?.toastId);
      appToast.success(
        "PDF uploaded successfully. Processing has started."
      );

      queryClient.invalidateQueries({
        queryKey: ["sources", variables.workspaceId],
      });
    },
  });
};

// --------------------------------------------------
// DELETE: Single source
// --------------------------------------------------

export const useDeleteSource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, sourceId }) =>
      deleteSource(workspaceId, sourceId),

    ...useMutationToast(
      "Deleting source...",
      "Source deleted successfully.",
      "Failed to delete source."
    ),

    onSuccess: (_, variables, context) => {
      appToast.dismiss(context?.toastId);
      appToast.success("Source deleted successfully.");

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

// --------------------------------------------------
// POST: Import YouTube video
// --------------------------------------------------

export const useImportYoutube = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, data }) =>
      importYoutube(workspaceId, data),

    ...useMutationToast(
      "Importing YouTube video...",
      "YouTube video imported successfully.",
      "Failed to import YouTube video."
    ),

    onSuccess: (_, variables, context) => {
      appToast.dismiss(context?.toastId);
      appToast.success("YouTube video imported successfully.");

      queryClient.invalidateQueries({
        queryKey: ["sources", variables.workspaceId],
      });
    },
  });
};

// --------------------------------------------------
// POST: Import website
// --------------------------------------------------

export const useImportWebsite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, data }) =>
      importWebsite(workspaceId, data),

    ...useMutationToast(
      "Importing website...",
      "Website imported successfully.",
      "Failed to import website."
    ),

    onSuccess: (_, variables, context) => {
      appToast.dismiss(context?.toastId);
      appToast.success("Website imported successfully.");

      queryClient.invalidateQueries({
        queryKey: ["sources", variables.workspaceId],
      });
    },
  });
};

// --------------------------------------------------
// POST: Bulk delete sources
// --------------------------------------------------

export const useBulkDeleteSources = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, data }) =>
      bulkDeleteSources(workspaceId, data),

    ...useMutationToast(
      "Deleting selected sources...",
      "Selected sources deleted successfully.",
      "Failed to delete selected sources."
    ),

    onSuccess: (_, variables, context) => {
      appToast.dismiss(context?.toastId);
      appToast.success("Selected sources deleted successfully.");

      queryClient.invalidateQueries({
        queryKey: ["sources", variables.workspaceId],
      });
    },
  });
};

// --------------------------------------------------
// POST: Reprocess source
// --------------------------------------------------

export const useReprocessSource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, sourceId }) =>
      reprocessSource(workspaceId, sourceId),

    ...useMutationToast(
      "Reprocessing source...",
      "Source reprocessing started successfully.",
      "Failed to reprocess source."
    ),

    onSuccess: (_, variables, context) => {
      appToast.dismiss(context?.toastId);
      appToast.success("Source reprocessing started successfully.");

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