import { api } from "@/lib/axios";

// GET /api/workspace/source/:workspaceId
export const getSources = async (workspaceId) => {
  const response = await api.get(
    `/workspace/source/${workspaceId}`
  );

  return response.data;
};

// POST /api/workspace/source
export const createSource = async (workspaceId, data) => {
  const response = await api.post(
    `/workspace/source`,
    {
      ...data,
      workspaceId,
    }
  );

  return response.data;
};

// POST /api/workspace/source/upload/:workspaceId
export const uploadPdf = async (workspaceId, formData) => {
  const response = await api.post(
    `/workspace/source/upload/${workspaceId}`,
    formData
  );

  return response.data;
};

// GET /api/workspace/source/:sourceId
export const getSource = async (sourceId) => {
  const response = await api.get(
    `/workspace/source/${sourceId}`
  );

  return response.data;
};

// DELETE /api/workspace/source/:workspaceId/:sourceId
export const deleteSource = async (workspaceId, sourceId) => {
  const response = await api.delete(
    `/workspace/source/${workspaceId}/${sourceId}`
  );

  return response.data;
};

// POST /api/workspace/source/import/youtube/:workspaceId
export const importYoutube = async (workspaceId, data) => {
  const response = await api.post(
    `/workspace/source/import/youtube/${workspaceId}`,
    data
  );

  return response.data;
};

// POST /api/workspace/source/import/website/:workspaceId
export const importWebsite = async (workspaceId, data) => {
  const response = await api.post(
    `/workspace/source/import/website/${workspaceId}`,
    data
  );

  return response.data;
};

// POST /api/workspace/source/bulk-delete
export const bulkDeleteSources = async (workspaceId, data) => {
  const response = await api.post(
    `/workspace/source/bulk-delete`,
    {
      ...data,
      workspaceId,
    }
  );

  return response.data;
};

// POST /api/workspace/source/:sourceId/reprocess
export const reprocessSource = async (sourceId) => {
  const response = await api.post(
    `/workspace/source/${sourceId}/reprocess`
  );

  return response.data;
};