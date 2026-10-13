
import { SourceList } from "@/features/source/components/source-list";
import { AddSourceDialog } from "@/features/source/components/add-source-dialog";

export default async function SourcesPage({ params }) {
    const { workspaceId } = await params;

    return (
        <div className="flex min-h-full flex-col">
            <div className="flex flex-col gap-4 border-b px-4 py-4 sm:flex-row sm:items-center sm:justify-between px-4 py-4 sm:px-6">
                <div className="min-w-0">
                    <h1 className="text-lg font-semibold">Sources</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage the PDFs and websites added to this workspace.
                    </p>
                </div>

                <AddSourceDialog workspaceId={workspaceId} />
            </div>

            <div className="flex-1 p-4 sm:p-6">
                <SourceList workspaceId={workspaceId} />
            </div>
        </div>
    );
}
