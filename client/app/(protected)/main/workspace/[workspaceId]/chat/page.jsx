import { ChatTest } from "@/features/chat/components/chat-test";

export default async function ChatPage({ params, searchParams }) {
    const { workspaceId } = await params;
    const { conversationId } = await searchParams;

    return (
        <div className="flex min-h-full flex-col">
            <div className="border-b px-4 py-4 sm:px-6">
                <h1 className="text-lg font-semibold">Chat</h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Ask questions about your workspace sources.
                </p>
            </div>

            <div className="flex min-h-0 flex-1 flex-col">
                <ChatTest
                    workspaceId={workspaceId}
                    conversationId={conversationId}
                />
            </div>
        </div>
    );
}