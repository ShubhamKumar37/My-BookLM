import { z } from "zod";

export const createWorkspaceSchema = z.object({
  title: z
    .string()
    .min(1, "Workspace name is required")
    .min(3, "Workspace name must be at least 3 characters")
    .max(50, "Workspace name must be less than 50 characters"),

  description: z
    .string()
    .max(200, "Description must be less than 200 characters")
    .optional(),
});
