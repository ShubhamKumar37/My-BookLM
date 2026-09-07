import { z } from "zod"
import { CHAT_MODELS } from "../lib/ai-config.js"
import { workspaceIdParamSchema } from "./workspace.validator.js"

export const conversationIdParamSchema = z.object({
    conversationId: z.string().trim().min(1, "Conversation id is required"),
});

export const chatBodySchema = z.object({
    conversationId: z.string().trim().optional(),
    messages: z.array(z.record(z.string(), z.unknown())).min(1),
    model: z.enum(CHAT_MODELS).optional(),
    webSearch: z.boolean().optional()
});

export const createConversationSchema = z.object({
    title: z.string().trim().min(1).max(120).optional()
});

export type ChatBody = z.infer<typeof chatBodySchema>;
export type CreateConversationInput = z.infer<typeof createConversationSchema>;