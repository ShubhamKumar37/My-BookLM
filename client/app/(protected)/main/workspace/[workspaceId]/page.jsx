export default async function WorkspacePage({ params }) {
    const { workspaceId } = await params;

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold tracking-tight">
                Workspace
            </h1>

            <p className="text-sm text-muted-foreground">
                Workspace ID: {workspaceId}
            </p>
        </div>
    );
}