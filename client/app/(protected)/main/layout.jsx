"use client";

import React from "react";
import Link from "next/link";

import { LogoutButton } from "@/components/auth/logout-button";
import { authClient } from "@/lib/auth-client";

const Layout = ({ children }) => {
    const { data: session, isPending } = authClient.useSession();

    const user = session?.user;

    return (
        <div className="min-h-screen bg-background">
            {/* Navbar */}
            <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                    {/* Brand */}
                    <Link
                        href="/main"
                        className="flex items-center gap-2 font-semibold tracking-tight"
                    >
                        <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <span className="text-lg font-bold">M</span>
                        </div>

                        <span className="text-lg">My-Book-LM</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="flex items-center gap-3">

                        {/* User Profile */}
                        {!isPending && user && (
                            <Link
                                href="/profile"
                                className="flex items-center gap-2 rounded-full transition-opacity hover:opacity-80"
                            >
                                <img
                                    src={
                                        user.image ||
                                        `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
                                            user.name || user.email || "User"
                                        )}`
                                    }
                                    alt={user.name || "User"}
                                    className="size-9 rounded-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
                                            user.name || user.email || "User"
                                        )}`;
                                    }}
                                />
                            </Link>
                        )}

                        <LogoutButton />
                    </nav>
                </div>
            </header>

            {/* Page Content */}
            <main className="mx-auto w-full max-w-7xl px-6 py-8">
                {children}
            </main>
        </div>
    );
};

export default Layout;