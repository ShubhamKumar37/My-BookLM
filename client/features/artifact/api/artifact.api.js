import { api } from "@/lib/axios";

const ARTIFACT_BASE_URL = "/workspace/artifact";

export async function getArtifacts(workspaceId) {
    const response = await api.get(
        `${ARTIFACT_BASE_URL}/${workspaceId}`
    );

    return response.data;
}

export async function getArtifact(workspaceId, artifactId) {
    const response = await api.get(
        `${ARTIFACT_BASE_URL}/${workspaceId}/${artifactId}`
    );

    return response.data;
}

export async function createArtifact(workspaceId, data) {
    const response = await api.post(
        `${ARTIFACT_BASE_URL}/${workspaceId}`,
        data
    );

    return response.data;
}

export async function deleteArtifact(workspaceId, artifactId) {
    const response = await api.delete(
        `${ARTIFACT_BASE_URL}/${workspaceId}/${artifactId}`
    );

    return response.data;
}