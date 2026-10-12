import type { Express } from "express";
import { workspaceRoutes } from "./workspace.route.js";
import { sourceRoutes } from "./source.route.js";

export function registerRoutes(app: Express) {
    app.use("/api/workspace", workspaceRoutes);
    app.use("/api/workspace/source", sourceRoutes);

}