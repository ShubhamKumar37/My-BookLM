"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, BookOpen, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

const items = [
    {
        label: "Chat",
        icon: MessageSquare,
        href: "chat",
    },
    {
        label: "Sources",
        icon: BookOpen,
        href: "sources",
    },
    {
        label: "Artifacts",
        icon: Sparkles,
        href: "artifacts",
    },
];

export function WorkspaceSidebar({ workspaceId }) {
    const pathname = usePathname();

    return (
        <aside className="flex flex-col">
            <nav className="flex gap-1 overflow-x-auto p-2 lg:flex-col lg:space-y-1 lg:overflow-visible lg:p-3">
                {items.map((item) => {
                    const Icon = item.icon;

                    const href = `/main/workspace/${workspaceId}/${item.href}`;

                    const isActive =
                        pathname === href || pathname.startsWith(`${href}/`);

                    return (
                        <Link
                            key={item.href}
                            href={href}
                            aria-current={isActive ? "page" : undefined}
                            className={cn(
                                "flex shrink-0 cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                                isActive
                                    ? "bg-primary/10 font-medium text-primary"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <Icon className="size-4 shrink-0" />

                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}