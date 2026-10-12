
"use client";

import { useState } from "react";
import { Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useImportWebsite } from "../hooks/use-source";

export function ImportWebsiteForm({ workspaceId, onSuccess }) {
    const [url, setUrl] = useState("");
    const [title, setTitle] = useState("");

    const importWebsite = useImportWebsite();

    const handleSubmit = (event) => {
        event.preventDefault();

        const normalizedUrl = url.trim();

        if (!normalizedUrl) return;

        importWebsite.mutate(
            {
                workspaceId,
                data: {
                    url: normalizedUrl,
                    ...(title.trim() ? { title: title.trim() } : {}),
                },
            },
            {
                onSuccess: () => {
                    setUrl("");
                    setTitle("");
                    onSuccess?.();
                },
            }
        );
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
                <label htmlFor="website-url" className="text-sm font-medium">
                    Website URL
                </label>

                <Input
                    id="website-url"
                    type="url"
                    placeholder="https://example.com/article"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                    required
                />

                <p className="text-xs text-muted-foreground">
                    Enter a public webpage that you want to learn from.
                </p>
            </div>

            <div className="space-y-2">
                <label htmlFor="website-title" className="text-sm font-medium">
                    Title <span className="text-muted-foreground">(optional)</span>
                </label>

                <Input
                    id="website-title"
                    placeholder="My research article"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
            </div>

            <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={!url.trim() || importWebsite.isPending}
            >
                <Globe className="size-4" />
                {importWebsite.isPending ? "Importing..." : "Import website"}
            </Button>
        </form>
    );
}
