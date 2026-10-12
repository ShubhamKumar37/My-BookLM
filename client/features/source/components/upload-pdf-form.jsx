"use client";

import { useRef, useState } from "react";
import { FileText, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useUploadPdf } from "../hooks/use-source";

export function UploadPdfForm({ workspaceId, onSuccess }) {
    const inputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");

    const uploadPdf = useUploadPdf();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!file) {
            return;
        }

        const formData = new FormData();

        formData.append("file", file);

        if (title.trim()) {
            formData.append("title", title.trim());
        }

        uploadPdf.mutate(
            {
                workspaceId,
                formData,
            },
            {
                onSuccess: () => {
                    setFile(null);
                    setTitle("");

                    if (inputRef.current) {
                        inputRef.current.value = "";
                    }

                    onSuccess?.();
                },
            }
        );
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            <div className="space-y-2">
                <label
                    htmlFor="pdf-title"
                    className="text-sm font-medium"
                >
                    Title
                </label>

                <Input
                    id="pdf-title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="My physics notes"
                />
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="pdf-file"
                    className="text-sm font-medium"
                >
                    PDF file
                </label>

                <label
                    htmlFor="pdf-file"
                    className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center transition-colors hover:bg-muted/50"
                >
                    {file ? (
                        <>
                            <FileText className="size-8 text-muted-foreground" />

                            <p className="mt-3 max-w-full truncate text-sm font-medium">
                                {file.name}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                        </>
                    ) : (
                        <>
                            <Upload className="size-8 text-muted-foreground" />

                            <p className="mt-3 text-sm font-medium">
                                Choose a PDF
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                Click to browse your files
                            </p>
                        </>
                    )}

                    <input
                        ref={inputRef}
                        id="pdf-file"
                        type="file"
                        accept="application/pdf,.pdf"
                        className="sr-only"
                        onChange={(event) => {
                            setFile(event.target.files?.[0] || null);
                        }}
                    />
                </label>
            </div>

            <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={!file || uploadPdf.isPending}
            >
                {uploadPdf.isPending
                    ? "Uploading..."
                    : "Upload PDF"}
            </Button>
        </form>
    );
}