"use client";

import { useState } from "react";
import {
    ArrowLeft,
    FileText,
    Globe,
    Plus,
    Play,
    FileEdit,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { UploadPdfForm } from "./upload-pdf-form";
import { ImportWebsiteForm } from "./import-website-form";

export function AddSourceDialog({ workspaceId }) {
    const [open, setOpen] = useState(false);
    const [selectedType, setSelectedType] = useState(null);
    console.log("selectedType:", selectedType);

    const handleOpenChange = (value) => {
        setOpen(value);

        if (!value) {
            setSelectedType(null);
        }
    };

    const handleSuccess = () => {
        setOpen(false);
        setSelectedType(null);
    };

    const sourceTypes = [
        {
            type: "PDF",
            title: "Upload PDF",
            description: "Upload a PDF from your device.",
            Icon: FileText,
        },
        {
            type: "WEBSITE",
            title: "Website",
            description: "Import content from a website.",
            Icon: Globe,
        },
        {
            type: "YOUTUBE",
            title: "YouTube",
            description: "Import a YouTube transcript.",
            Icon: Play,
        },
        {
            type: "TEXT",
            title: "Text / Markdown",
            description: "Add your own text or Markdown content.",
            Icon: FileEdit,
        },
    ];

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer">
                    <Plus className="size-4" />
                    Add source
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[calc(100%-2rem)] max-w-lg">
                <DialogHeader>
                    {selectedType && (
                        <Button
                            type="button"
                            variant="ghost"
                            className="mb-2 w-fit cursor-pointer"
                            onClick={() => setSelectedType(null)}
                        >
                            <ArrowLeft className="size-4" />
                            Back
                        </Button>
                    )}

                    <DialogTitle>
                        {selectedType === "PDF"
                            ? "Upload PDF"
                            : selectedType === "WEBSITE"
                                ? "Import website"
                                : selectedType === "YOUTUBE"
                                    ? "Import YouTube"
                                    : selectedType === "TEXT"
                                        ? "Add text or Markdown"
                                        : "Add a source"}
                    </DialogTitle>

                    <DialogDescription>
                        {selectedType === "PDF"
                            ? "Upload a PDF to add it to this workspace."
                            : selectedType === "WEBSITE"
                                ? "Import a webpage and prepare its content for learning."
                                : selectedType === "YOUTUBE"
                                    ? "Import a YouTube video transcript."
                                    : selectedType === "TEXT"
                                        ? "Add your own text or Markdown content."
                                        : "Add learning material to this workspace."}
                    </DialogDescription>
                </DialogHeader>

                {selectedType === "PDF" ? (
                    <UploadPdfForm
                        workspaceId={workspaceId}
                        onSuccess={handleSuccess}
                    />
                ) : selectedType === "WEBSITE" ? (
                    <ImportWebsiteForm
                        workspaceId={workspaceId}
                        onSuccess={handleSuccess}
                    />
                ) : selectedType === null ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                        {sourceTypes.map(({ type, title, description, Icon }) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setSelectedType(type)}
                                // onClick={() => {
                                //     console.log("Website clicked");
                                //     setSelectedType("WEBSITE");
                                // }}
                                className="cursor-pointer rounded-xl border p-4 text-left transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                <Icon className="size-5 text-muted-foreground" />

                                <p className="mt-3 font-medium">{title}</p>

                                <p className="mt-1 text-xs text-muted-foreground">
                                    {description}
                                </p>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                        {selectedType === "YOUTUBE"
                            ? "YouTube import form will be added next."
                            : "Text and Markdown form will be added next."}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}