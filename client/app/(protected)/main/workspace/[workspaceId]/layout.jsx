"use client";

import { useParams } from "next/navigation";

import { WorkspaceHeader } from "@/features/workspace/components/workspace-header";
import { WorkspaceSidebar } from "@/features/workspace/components/workspace-sidebar";

const WorkspaceLayout = ({ children }) => {
    const params = useParams();
    const workspaceId = params?.workspaceId;

    return (
        <div className="flex min-h-[calc(100vh-4rem)] flex-col">
            {/* Workspace Header */}
            <WorkspaceHeader workspaceId={workspaceId} />

            {/* Mobile Navigation */}
            <div className="border-b bg-background lg:hidden">
                <WorkspaceSidebar workspaceId={workspaceId} />
            </div>

            {/* Workspace Content */}
            <div className="flex min-h-0 flex-1">
                {/* Left Sidebar */}
                <aside className="hidden w-64 shrink-0 border-r lg:block">
                    <WorkspaceSidebar workspaceId={workspaceId} />
                </aside>

                {/* Main Content */}
                <main className="min-w-0 flex-1">
                    {children}
                </main>

                {/* Right Sidebar */}
                <aside className="hidden w-72 shrink-0 border-l xl:block">
                    <div className="h-full p-4">
                        <p className="text-sm text-muted-foreground">
                            Workspace tools
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default WorkspaceLayout;