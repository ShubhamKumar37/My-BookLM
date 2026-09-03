import { uploadPdfToCloudinary } from "../lib/cloudinary.js";
import { scrapeWebsite } from "../lib/firecrawl.js";
import { extractPdfFromBuffer } from "../lib/pdf.js";
import { enqueueSourceProcessing } from "../lib/source-events.js";
import { fetchYoutubeTranscript } from "../lib/youtube.js";
import { createSource, createSourceRecord, deleteSourceRecord, findSourceByIdAndWorkspaceId, findSourcesByWorkspaceId } from "../repository/source.repository.js";
import { NotFoundError } from "../types/app-error.js";
import { CreateSourceInput, ImportWebsiteInput, ImportYoutubeInput, ListSourcesQuery } from "../validators/source.validator.js";
import { getWorkspaceByIdForUserId } from "./workspace.services.js";

export async function createAndProcessSource(
    data: Parameters<typeof createSourceRecord>[0]
) {
    const source = await createSource(data);

    await enqueueSourceProcessing({
        sourceId: source.id,
        workspaceId: source.workspaceId,
    });

    return source;
}

export async function listSourcesForWorkspace(
    workspaceId: string,
    userId: string,
    filters: ListSourcesQuery = {},
) {
    await getWorkspaceByIdForUserId(workspaceId, userId);
    return findSourcesByWorkspaceId(workspaceId, filters);
}

export async function getSourceForWorkspace(
    workspaceId: string,
    sourceId: string,
    userId: string,
) {
    await getWorkspaceByIdForUserId(workspaceId, userId);

    const source = await findSourceByIdAndWorkspaceId(sourceId, workspaceId);

    if (!source) {
        throw new NotFoundError("Source not found");
    }

    return source;
}

export async function createTextOrMarkdownSource(
    workspaceId: string,
    userId: string,
    input: CreateSourceInput,
) {
    await getWorkspaceByIdForUserId(workspaceId, userId);

    //     return createAndProcessSource({
    //         workspaceId,
    //         type: input.type,
    //         title: input.title,
    //         content: input.content,
    //         status: "PENDING",
    //     });
}

export async function deleteSourceForWorkspace(
    workspaceId: string,
    sourceId: string,
    userId: string,
) {
    await getSourceForWorkspace(workspaceId, sourceId, userId);
    // await removeSourceFromIndex(workspaceId, sourceId);
    await deleteSourceRecord(sourceId);
}

export async function bulkDeleteSourcesForWorkspace(
    workspaceId: string,
    userId: string,
    sourceIds: string[],
) {
    await getWorkspaceByIdForUserId(workspaceId, userId);

    for (const sourceId of sourceIds) {
        await deleteSourceForWorkspace(workspaceId, sourceId, userId);
    }
}

export async function importWebsiteSource(workspaceId: string, userId: string, input: ImportWebsiteInput) {
    await getWorkspaceByIdForUserId(workspaceId, userId);

    const scrape = await scrapeWebsite(input.url);

    return createAndProcessSource({
        workspaceId,
        type: "WEBSITE",
        title: input.title || scrape.title || input.url,
        content: scrape.markdown,
        url: scrape.sourceUrl,
        status: "PENDING",
        metadata: {
            importedForm: scrape.sourceUrl
        }
    });
}

export async function uploadPdfSource(
    workspaceId: string,
    userId: string,
    file: Express.Multer.File,
    title?: string
) {
    await getWorkspaceByIdForUserId(workspaceId, userId);

    const upload = await uploadPdfToCloudinary(file.buffer, file.originalname);

    let pageCount: number | undefined;
    let content: string | null = null;

    try {
        const extracted = await extractPdfFromBuffer(file.buffer);
        pageCount = extracted.pageCount;
        content = extracted.text;
    } catch (error) {

    }

    return createAndProcessSource({
        workspaceId,
        type: "PDF",
        title: title?.trim() || file.originalname.replace(/\.pdf$/i, ""),
        content,
        status: "PENDING",
        metadata: {
            fileUrl: upload.secureUrl,
            fileName: upload.originalFilename,
            fileSize: upload.bytes,
            publicId: upload.publicId,
            resourceType: upload.resourceType,
            pageCount,
        }
    });
}

export async function importYoutubeSource(
    workspaceId: string,
    userId: string,
    input: ImportYoutubeInput
) {
    await getWorkspaceByIdForUserId(workspaceId, userId);

    const transcript = await fetchYoutubeTranscript(input.url);

    return await createAndProcessSource({
        workspaceId,
        status: "PENDING",
        title: input.title || `YOUTUBE ${transcript.videoId}`,
        content: transcript.content,
        type: "YOUTUBE",
        url: input.url,
        metadata: {
            videoId: transcript.videoId
        }
    });
}