import { api } from "@/lib/axios";

// GET /workspace
export const getWorkspaces = async () => {
    const response = await api.get("/workspace");

    console.log("These are workspaces = ", response);

    return response.data;
};

// GET /workspace/:workspaceId
export const getWorkspace = async (workspaceId) => {
    const response = await api.get(
        `/workspace/${workspaceId}`
    );

    return response.data;
};

// POST /workspace
export const createWorkspace = async (data) => {
    const response = await api.post(
        "/workspace",
        data
    );

    return response.data;
};

// PATCH /workspace/:workspaceId
export const updateWorkspace = async (workspaceId, data) => {
    const response = await api.patch(
        `/workspace/${workspaceId}`,
        data
    );

    return response.data;
};

// DELETE /workspace/:workspaceId
export const deleteWorkspace = async (workspaceId) => {
    const response = await api.delete(
        `/workspace/${workspaceId}`
    );

    return response.data;
};