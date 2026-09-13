import { api } from "@/lib/axios";

// GET /workspaces/:workspaceId/sources
export const getSources = async (workspaceId) => {
  const response = await api.get(
    `/workspaces/${workspaceId}/sources`
  );

  return response.data;
};

// POST /workspaces/:workspaceId/sources
export const createSource = async (workspaceId, data) => {
  const response = await api.post(
    `/workspaces/${workspaceId}/sources`,
    data
  );

  return response.data;
};

// POST /workspaces/:workspaceId/sources/upload
export const uploadPdf = async (workspaceId, formData) => {
  const response = await api.post(
    `/workspaces/${workspaceId}/sources/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// GET /workspaces/:workspaceId/sources/:sourceId
export const getSource = async (workspaceId, sourceId) => {
  const response = await api.get(
    `/workspaces/${workspaceId}/sources/${sourceId}`
  );

  return response.data;
};

// DELETE /workspaces/:workspaceId/sources/:sourceId
export const deleteSource = async (workspaceId, sourceId) => {
  const response = await api.delete(
    `/workspaces/${workspaceId}/sources/${sourceId}`
  );

  return response.data;
};

// POST /workspaces/:workspaceId/sources/import/youtube
export const importYoutube = async (workspaceId, data) => {
  const response = await api.post(
    `/workspaces/${workspaceId}/sources/import/youtube`,
    data
  );

  return response.data;
};

// POST /workspaces/:workspaceId/sources/import/website
export const importWebsite = async (workspaceId, data) => {
  const response = await api.post(
    `/workspaces/${workspaceId}/sources/import/website`,
    data
  );

  return response.data;
};

// POST /workspaces/:workspaceId/sources/bulk-delete
export const bulkDeleteSources = async (workspaceId, data) => {
  const response = await api.post(
    `/workspaces/${workspaceId}/sources/bulk-delete`,
    data
  );

  return response.data;
};