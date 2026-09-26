export default async function SourcesPage({ params }) {
    const { workspaceId } = await params;

    return (
        <div className="flex min-h-full flex-col">
            <div className="border-b px-4 py-4 sm:px-6">
                <div>
                    <h1 className="text-lg font-semibold">
                        Sources
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage the books, PDFs, websites, and videos in this workspace.
                    </p>
                </div>
            </div>

            <div className="flex-1 p-4 sm:p-6">
                <div className="rounded-xl border border-dashed p-8 text-center">
                    <p className="text-sm text-muted-foreground">
                        Workspace ID: {workspaceId}
                    </p>
                </div>
            </div>
        </div>
    );
}