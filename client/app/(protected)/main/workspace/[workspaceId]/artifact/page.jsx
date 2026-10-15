"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    useArtifacts,
    useCreateArtifact,
    useDeleteArtifact,
} from "@/features/artifact/hooks/use-artifacts";

const ARTIFACT_TYPES = [
    {
        value: "SUMMARY",
        label: "Summary",
        description: "Understand the main ideas quickly.",
        icon: "📄",
    },
    {
        value: "TAKEAWAYS",
        label: "Key Takeaways",
        description: "Extract the most important points.",
        icon: "💡",
    },
    {
        value: "FLASHCARDS",
        label: "Flashcards",
        description: "Practice concepts with question-and-answer cards.",
        icon: "🗂️",
    },
    {
        value: "QUIZ",
        label: "Quiz",
        description: "Test your knowledge with multiple-choice questions.",
        icon: "🧠",
    },
    {
        value: "MINDMAP",
        label: "Mind Map",
        description: "Connect concepts and visualize relationships.",
        icon: "🕸️",
    },
    {
        value: "REPORT",
        label: "Report",
        description: "Generate a structured, detailed report.",
        icon: "📚",
    },
];

export default function ArtifactPage() {
    const { workspaceId } = useParams();
    const deleteMutation = useDeleteArtifact(workspaceId);
    const router = useRouter();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedType, setSelectedType] = useState("SUMMARY");
    const [title, setTitle] = useState("");

    const {
        data: artifacts = [],
        isLoading,
        isError,
        refetch,
    } = useArtifacts(workspaceId);

    const createMutation = useCreateArtifact(workspaceId);

    function handleCloseDialog() {
        if (createMutation.isPending) return;

        setIsDialogOpen(false);
        setTitle("");
        setSelectedType("SUMMARY");
    }

    function handleCreateArtifact(event) {
        event.preventDefault();

        const selectedArtifact = ARTIFACT_TYPES.find(
            (type) => type.value === selectedType,
        );

        if (!selectedArtifact) return;

        const artifactTitle =
            title.trim() ||
            `${selectedArtifact.label} · ${new Date().toLocaleDateString()} `;

        createMutation.mutate(
            {
                type: selectedType,
                title: artifactTitle,
            },
            {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    setTitle("");
                    setSelectedType("SUMMARY");
                },
            },
        );
    }

    return (
        <main className="min-h-0 w-full flex-1 overflow-y-auto overscroll-contain">

            <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
                <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Learning Artifacts
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Turn your workspace sources into useful learning materials.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsDialogOpen(true)}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                    >
                        <span aria-hidden="true">+</span>
                        Generate Artifact
                    </button>
                </header>

                {isLoading ? (
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="h-36 animate-pulse rounded-xl border bg-muted/40"
                            />
                        ))}
                    </div>
                ) : isError ? (
                    <div className="rounded-xl border p-6 text-center">
                        <p className="font-medium">Could not load artifacts</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Please try loading your artifacts again.
                        </p>
                        <button
                            type="button"
                            onClick={() => refetch()}
                            className="mt-4 rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted"
                        >
                            Try again
                        </button>
                    </div>
                ) : artifacts.length === 0 ? (
                    <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
                        <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-muted text-2xl">
                            ✨
                        </div>
                        <h2 className="text-lg font-semibold">No artifacts yet</h2>
                        <p className="mt-2 max-w-md text-sm text-muted-foreground">
                            Generate a summary, flashcards, quiz, mind map, or report
                            from your workspace sources. Your learning materials will
                            appear here.
                        </p>
                        <button
                            type="button"
                            onClick={() => setIsDialogOpen(true)}
                            className="mt-5 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                        >
                            Generate your first artifact
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {artifacts.map((artifact) => (
                            <article
                                key={artifact.id}
                                role="link"
                                tabIndex={0}
                                onClick={() =>
                                    router.push(
                                        `/main/workspace/${workspaceId}/artifact/${artifact.id}`,
                                    )
                                }
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        router.push(
                                            `/main/workspace/${workspaceId}/artifact/${artifact.id}`,
                                        );
                                    }
                                }}
                                className="cursor-pointer rounded-xl border bg-card p-5 transition hover:border-primary/40 hover:shadow-sm"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                            {artifact.type.replaceAll("_", " ")}
                                        </p>
                                        <h2 className="mt-2 truncate font-semibold">
                                            {artifact.title}
                                        </h2>
                                    </div>

                                    <span className="shrink-0 rounded-full border px-2.5 py-1 text-xs">
                                        {artifact.status}
                                    </span>
                                </div>

                                <p className="mt-4 text-sm text-muted-foreground">
                                    <button
                                        type="button"
                                        onClick={(event) => {
                                            event.stopPropagation();

                                            const confirmed = window.confirm(
                                                `Delete "${artifact.title}"? This action cannot be undone.`,
                                            );

                                            if (confirmed) {
                                                deleteMutation.mutate(artifact.id);
                                            }
                                        }}
                                        disabled={deleteMutation.isPending}
                                        aria-label={`Delete ${artifact.title}`}
                                        className="rounded-lg border px-3 py-2 text-sm text-destructive transition hover:bg-destructive/10 disabled:opacity-50"
                                    >
                                        Delete
                                    </button>
                                    {" "}Created{" "}
                                    {new Date(
                                        artifact.createdAt,
                                    ).toLocaleDateString()}
                                </p>
                            </article>
                        ))}
                    </div>
                )}

                {isDialogOpen && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
                        onMouseDown={(event) => {
                            if (
                                event.target === event.currentTarget &&
                                !createMutation.isPending
                            ) {
                                handleCloseDialog();
                            }
                        }}
                    >
                        <section
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="artifact-dialog-title"
                            className="my-auto w-full max-w-2xl rounded-2xl border bg-background p-5 shadow-xl sm:p-7"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h2
                                        id="artifact-dialog-title"
                                        className="text-xl font-semibold"
                                    >
                                        Generate an artifact
                                    </h2>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Choose what you want to create from your
                                        ready workspace sources.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleCloseDialog}
                                    disabled={createMutation.isPending}
                                    aria-label="Close dialog"
                                    className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:opacity-50"
                                >
                                    ✕
                                </button>
                            </div>

                            <form
                                onSubmit={handleCreateArtifact}
                                className="mt-6 space-y-5"
                            >
                                <fieldset>
                                    <legend className="mb-3 text-sm font-medium">
                                        Choose artifact type
                                    </legend>

                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {ARTIFACT_TYPES.map((type) => {
                                            const isSelected =
                                                selectedType === type.value;

                                            return (
                                                <button
                                                    key={type.value}
                                                    type="button"
                                                    onClick={() =>
                                                        setSelectedType(type.value)
                                                    }
                                                    aria-pressed={isSelected}
                                                    className={`rounded - xl border p - 4 text - left transition ${isSelected
                                                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                                                        : "hover:border-primary/40 hover:bg-muted/40"
                                                        } `}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span
                                                            className="text-2xl"
                                                            aria-hidden="true"
                                                        >
                                                            {type.icon}
                                                        </span>
                                                        <span className="font-medium">
                                                            {type.label}
                                                        </span>
                                                        {isSelected && (
                                                            <span
                                                                className="ml-auto text-sm text-primary"
                                                                aria-label="Selected"
                                                            >
                                                                ✓
                                                            </span>
                                                        )}
                                                    </div>

                                                    <p className="mt-2 text-sm text-muted-foreground">
                                                        {type.description}
                                                    </p>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </fieldset>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="artifact-title"
                                        className="text-sm font-medium"
                                    >
                                        Artifact title
                                        <span className="ml-1 font-normal text-muted-foreground">
                                            (optional)
                                        </span>
                                    </label>

                                    <input
                                        id="artifact-title"
                                        value={title}
                                        onChange={(event) =>
                                            setTitle(event.target.value)
                                        }
                                        maxLength={120}
                                        placeholder="e.g. Chapter 1 Summary"
                                        disabled={createMutation.isPending}
                                        className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
                                    />

                                    <p className="text-xs text-muted-foreground">
                                        Leave blank to generate a title automatically.
                                    </p>
                                </div>

                                <div className="flex flex-col-reverse gap-3 border-t pt-4 sm:flex-row sm:justify-end">
                                    <button
                                        type="button"
                                        onClick={handleCloseDialog}
                                        disabled={createMutation.isPending}
                                        className="rounded-lg border px-4 py-2.5 text-sm font-medium transition hover:bg-muted disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={createMutation.isPending}
                                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {createMutation.isPending && (
                                            <span
                                                className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent"
                                                aria-hidden="true"
                                            />
                                        )}
                                        {createMutation.isPending
                                            ? "Starting generation..."
                                            : "Generate Artifact"}
                                    </button>
                                </div>
                            </form>
                        </section>
                    </div>
                )}
            </div>
        </main>
    );
}
