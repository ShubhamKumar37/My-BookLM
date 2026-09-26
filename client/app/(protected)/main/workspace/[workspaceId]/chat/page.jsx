export default async function ChatPage({ params }) {
    const { workspaceId } = await params;

    return (
        <div className="flex min-h-full flex-col">
            <div className="border-b px-4 py-4 sm:px-6">
                <h1 className="text-lg font-semibold">
                    Chat
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Ask questions about your workspace sources.
                </p>
            </div>

            <div className="flex flex-1 items-center justify-center p-6">
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                        Workspace ID: {workspaceId}
                    </p>

                    <p className="mt-2 text-sm text-muted-foreground">
                        AI chat will be added here.
                    </p>
                </div>
            </div>
        </div>
    );
}