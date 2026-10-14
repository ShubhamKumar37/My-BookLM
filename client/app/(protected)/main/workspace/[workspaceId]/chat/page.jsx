import { ChatTest } from "@/features/chat/components/chat-test";

export default async function ChatPage({ params, searchParams }) {
    const { workspaceId } = await params;
    const { conversationId } = await searchParams;

    return (
        <div className="flex h-full min-h-0 w-full flex-col overflow-hidden">
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
                <ChatTest
                    workspaceId={workspaceId}
                    conversationId={conversationId}
                />
            </div>
        </div>
    );
}