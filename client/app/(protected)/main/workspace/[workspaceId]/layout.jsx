"use client";

import { useParams } from "next/navigation";
import { WorkspaceSidebar } from "@/features/workspace/components/workspace-sidebar";

const WorkspaceLayout = ({ children }) => {
    const params = useParams();
    const workspaceId = params?.workspaceId;

    return (
        <div className="flex h-[calc(100dvh-4.5rem)] min-h-0 w-full max-w-none flex-col overflow-hidden">
            {/* Mobile sidebar */}
            <div className="shrink-0 border-b bg-background lg:hidden">
                <WorkspaceSidebar workspaceId={workspaceId} />
            </div>

            <div className="flex min-h-0 w-full max-w-none flex-1 overflow-hidden">
                {/* Desktop sidebar */}
                <aside className="hidden w-64 shrink-0 overflow-hidden border-r lg:flex lg:flex-col">
                    <WorkspaceSidebar workspaceId={workspaceId} />
                </aside>

                {/* Chat area */}
                <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default WorkspaceLayout;
