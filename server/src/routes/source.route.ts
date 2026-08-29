import { Router } from "express";

import { asyncHandler } from "../utils/async-handler.js";
import { bulkDeleteSources, createSource, deleteSource, getSource, importWebsites, importYoutube, listSources, uploadPdf } from "../controllers/soure.controller.js";
import { uploadSinglePdf } from "../middleware/upload.middleware.js";

export const sourceRoutes = Router({ mergeParams: true });

sourceRoutes.get("/", asyncHandler(listSources));
sourceRoutes.post("/", asyncHandler(createSource));
sourceRoutes.post(
    "/upload",
    uploadSinglePdf,
    asyncHandler(uploadPdf),
);
sourceRoutes.post("/import/website", asyncHandler(importWebsites));
sourceRoutes.post("/import/youtube", asyncHandler(importYoutube));
// sourceRoutes.post("/import/web-search", asyncHandler(importWebSearch));
sourceRoutes.post("/bulk-delete", asyncHandler(bulkDeleteSources));
// sourceRoutes.post("/reprocess", asyncHandler(reprocessSources));
// sourceRoutes.get("/:sourceId/chunks", asyncHandler(getSourceChunks));
sourceRoutes.get("/:sourceId", asyncHandler(getSource));
// sourceRoutes.post("/:sourceId/reprocess", asyncHandler(reprocessSource));
sourceRoutes.delete("/:sourceId", asyncHandler(deleteSource));