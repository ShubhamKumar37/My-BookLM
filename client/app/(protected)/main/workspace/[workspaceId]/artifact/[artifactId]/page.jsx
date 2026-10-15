"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useArtifact } from "@/features/artifact/hooks/use-artifacts";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    Position,
    Handle,
} from "@xyflow/react";

function MarkdownContent({ content }) {
    if (!content) {
        return (
            <p className="text-muted-foreground">
                No content available.
            </p>
        );
    }

    return (
        <article
            className="min-w-0 w-full max-w-none break-words text-[15px] leading-8 text-foreground sm:text-base"
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ children }) => (
                        <h1 className="mb-6 mt-0 border-b border-border pb-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                            {children}
                        </h1>
                    ),

                    h2: ({ children }) => (
                        <h2 className="mb-4 mt-10 border-b border-border/70 pb-2 text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
                            {children}
                        </h2>
                    ),

                    h3: ({ children }) => (
                        <h3 className="mb-3 mt-7 text-lg font-semibold leading-snug sm:text-xl">
                            {children}
                        </h3>
                    ),

                    h4: ({ children }) => (
                        <h4 className="mb-2 mt-5 text-base font-semibold">
                            {children}
                        </h4>
                    ),

                    p: ({ children }) => (
                        <p className="my-4 break-words leading-8 text-foreground/90">
                            {children}
                        </p>
                    ),

                    ul: ({ children }) => (
                        <ul className="my-5 space-y-2 pl-6 marker:text-primary [&_ul]:my-2 [&_ul]:list-[circle]">
                            {children}
                        </ul>
                    ),

                    ol: ({ children }) => (
                        <ol className="my-5 list-decimal space-y-2 pl-6 marker:font-semibold marker:text-primary [&_ol]:my-2">
                            {children}
                        </ol>
                    ),

                    li: ({ children }) => (
                        <li className="break-words pl-1 leading-7">
                            {children}
                        </li>
                    ),

                    strong: ({ children }) => (
                        <strong className="font-semibold text-foreground">
                            {children}
                        </strong>
                    ),

                    em: ({ children }) => (
                        <em className="italic text-foreground/90">
                            {children}
                        </em>
                    ),

                    a: ({ href, children }) => {
                        const isExternal =
                            href?.startsWith("https://") ||
                            href?.startsWith("http://");

                        return (
                            <a
                                href={href}
                                target={isExternal ? "_blank" : undefined}
                                rel={isExternal ? "noopener noreferrer" : undefined}
                                className="break-all font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
                            >
                                {children}
                            </a>
                        );
                    },

                    blockquote: ({ children }) => (
                        <blockquote className="my-6 border-l-4 border-primary/50 bg-muted/40 py-2 pl-5 pr-4 text-muted-foreground [&_p]:my-2">
                            {children}
                        </blockquote>
                    ),

                    hr: () => <hr className="my-8 border-border" />,

                    pre: ({ children }) => (
                        <pre className="my-5 max-w-full overflow-x-auto rounded-xl border bg-muted p-4 text-sm leading-6">
                            {children}
                        </pre>
                    ),

                    code: ({ children, className }) => {
                        const isBlock = Boolean(className?.includes("language-"));

                        return isBlock ? (
                            <code className={`${className ?? ""} font-mono`}>
                                {children}
                            </code>
                        ) : (
                            <code className="break-words rounded-md border border-border/60 bg-muted px-1.5 py-0.5 font-mono text-[0.9em]">
                                {children}
                            </code>
                        );
                    },

                    table: ({ children }) => (
                        <div className="my-6 max-w-full overflow-x-auto rounded-xl border">
                            <table className="w-full min-w-[420px] border-collapse text-left text-sm">
                                {children}
                            </table>
                        </div>
                    ),

                    thead: ({ children }) => (
                        <thead className="bg-muted/70">{children}</thead>
                    ),

                    th: ({ children }) => (
                        <th className="border-b border-border px-4 py-3 font-semibold">
                            {children}
                        </th>
                    ),

                    td: ({ children }) => (
                        <td className="border-t border-border px-4 py-3 align-top">
                            {children}
                        </td>
                    ),

                    del: ({ children }) => (
                        <del className="text-muted-foreground">{children}</del>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </article>

    );
}

function QuizContent({ questions }) {
    const [answers, setAnswers] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    if (!Array.isArray(questions) || questions.length === 0) {
        return (
            <p className="text-muted-foreground">
                No questions available.
            </p>
        );
    }

    const currentQuestion = questions[currentIndex];
    const answeredCount = Object.keys(answers).length;
    const score = questions.reduce(
        (total, question, index) =>
            total + (answers[index] === question.correctIndex ? 1 : 0),
        0,
    );
    const percentage = Math.round((score / questions.length) * 100);

    function handleSubmit(event) {
        event.preventDefault();

        if (answeredCount !== questions.length) return;

        setSubmitted(true);
    }

    function retryQuiz() {
        setAnswers({});
        setCurrentIndex(0);
        setSubmitted(false);
    }

    if (submitted) {
        return (
            <section className="space-y-6">
                <div className="rounded-2xl border p-6 text-center sm:p-10">
                    <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-primary/10 text-3xl font-bold text-primary">
                        {percentage}%
                    </div>

                    <h2 className="mt-5 text-2xl font-bold">Quiz completed!</h2>

                    <p className="mt-2 text-muted-foreground">
                        You answered {score} out of {questions.length} questions correctly.
                    </p>

                    <div className="mx-auto mt-6 h-2 max-w-sm overflow-hidden rounded-full bg-muted">
                        <div
                            className="h-full rounded-full bg-primary transition-all"
                            style={{ width: `${percentage}%` }}
                        />
                    </div>

                    <p className="mt-3 text-sm text-muted-foreground">
                        {percentage >= 80
                            ? "Excellent work! You understand these concepts well."
                            : percentage >= 50
                                ? "Good effort! Review the explanations to improve."
                                : "Keep practicing. Review the explanations and try again."}
                    </p>

                    <button
                        type="button"
                        onClick={retryQuiz}
                        className="mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                    >
                        Try again
                    </button>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Review your answers</h3>

                    {questions.map((question, index) => {
                        const isCorrect = answers[index] === question.correctIndex;

                        return (
                            <article key={index} className="rounded-xl border p-4 sm:p-5">
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <h4 className="font-medium leading-7">
                                        {index + 1}. {question.question}
                                    </h4>

                                    <span
                                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${isCorrect
                                            ? "bg-green-500/10 text-green-600"
                                            : "bg-red-500/10 text-red-600"
                                            }`}
                                    >
                                        {isCorrect ? "Correct" : "Incorrect"}
                                    </span>
                                </div>

                                <p className="mt-3 text-sm text-muted-foreground">
                                    Your answer:{" "}
                                    {question.options[answers[index]] ?? "Not answered"}
                                </p>

                                <p className="mt-1 text-sm">
                                    Correct answer:{" "}
                                    <span className="font-medium">
                                        {question.options[question.correctIndex]}
                                    </span>
                                </p>

                                <p className="mt-3 rounded-lg bg-muted/50 p-3 text-sm leading-6 text-muted-foreground">
                                    {question.explanation}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
                <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium">
                        Question {currentIndex + 1} of {questions.length}
                    </span>

                    <span className="text-muted-foreground">
                        {answeredCount} of {questions.length} answered
                    </span>
                </div>

                <div
                    className="h-2 overflow-hidden rounded-full bg-muted"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={questions.length}
                    aria-valuenow={answeredCount}
                    aria-label="Quiz completion progress"
                >
                    <div
                        className="h-full rounded-full bg-primary transition-all duration-300"
                        style={{
                            width: `${(answeredCount / questions.length) * 100}%`,
                        }}
                    />
                </div>
            </div>

            <section className="rounded-2xl border p-5 sm:p-7">
                <p className="text-sm font-medium text-primary">
                    Question {currentIndex + 1}
                </p>

                <h2 className="mt-3 text-xl font-semibold leading-8">
                    {currentQuestion.question}
                </h2>

                <div className="mt-6 space-y-3">
                    {currentQuestion.options.map((option, optionIndex) => {
                        const selected = answers[currentIndex] === optionIndex;

                        return (
                            <label
                                key={optionIndex}
                                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${selected
                                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                                    : "hover:border-primary/40 hover:bg-muted/30"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name={`question-${currentIndex}`}
                                    value={optionIndex}
                                    checked={selected}
                                    onChange={() =>
                                        setAnswers((previous) => ({
                                            ...previous,
                                            [currentIndex]: optionIndex,
                                        }))
                                    }
                                    className="mt-1 accent-primary"
                                />

                                <span className="leading-6">{option}</span>
                            </label>
                        );
                    })}
                </div>
            </section>

            <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                    type="button"
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex((index) => index - 1)}
                    className="rounded-lg border px-4 py-2.5 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Previous
                </button>

                {currentIndex < questions.length - 1 ? (
                    <button
                        type="button"
                        onClick={() => setCurrentIndex((index) => index + 1)}
                        className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                    >
                        Next question
                    </button>
                ) : (
                    <button
                        type="submit"
                        disabled={answeredCount !== questions.length}
                        className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Submit quiz
                    </button>
                )}
            </div>

            {answeredCount !== questions.length && (
                <p className="text-right text-xs text-muted-foreground">
                    Answer all questions to submit your quiz.
                </p>
            )}
        </form>
    );
}

function FlashcardsContent({ cards }) {
    const [revealed, setRevealed] = useState({});

    if (!Array.isArray(cards) || cards.length === 0) {
        return <p className="text-muted-foreground">No flashcards available.</p>;
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2">
            {cards.map((card, index) => (
                <button
                    key={index}
                    type="button"
                    onClick={() =>
                        setRevealed((previous) => ({
                            ...previous,
                            [index]: !previous[index],
                        }))
                    }
                    className="min-h-44 rounded-xl border p-5 text-left transition hover:border-primary/50 hover:bg-muted/30"
                >
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {revealed[index] ? "Answer" : `Card ${index + 1} · Question`}
                    </p>
                    <p className="mt-4 leading-7">
                        {revealed[index] ? card.back : card.front}
                    </p>
                    <p className="mt-4 text-xs text-primary">
                        {revealed[index] ? "Click to see question" : "Click to reveal answer"}
                    </p>
                </button>
            ))}
        </div>
    );
}

function TakeawaysContent({ items }) {
    if (!Array.isArray(items) || items.length === 0) {
        return <p className="text-muted-foreground">No takeaways available.</p>;
    }

    return (
        <ul className="space-y-3">
            {items.map((item, index) => (
                <li key={index} className="flex gap-3 rounded-xl border p-4 leading-7">
                    <span className="font-semibold text-primary">{index + 1}.</span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

function MindmapContent({ nodes, edges }) {
    if (!Array.isArray(nodes) || nodes.length === 0) {
        return (
            <p className="text-muted-foreground">
                No mind map available.
            </p>
        );
    }

    const nodeIds = new Set(nodes.map((node) => node.id));

    const validEdges = (Array.isArray(edges) ? edges : []).filter(
        (edge) => nodeIds.has(edge.source) && nodeIds.has(edge.target),
    );

    const columns = Math.ceil(Math.sqrt(nodes.length));

    const flowNodes = nodes.map((node, index) => ({
        id: node.id,
        position: {
            x: (index % columns) * 260,
            y: Math.floor(index / columns) * 150,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        data: { label: node.label },
        style: {
            width: 210,
            padding: 14,
            borderRadius: 12,
            border: "1px solid var(--border)",
            background: "var(--card)",
            color: "var(--card-foreground)",
            fontSize: 14,
            lineHeight: 1.5,
        },
    }));

    const flowEdges = validEdges.map((edge, index) => ({
        id: edge.id || `edge-${index}`,
        source: edge.source,
        target: edge.target,
        type: "smoothstep",
        style: {
            stroke: "var(--primary)",
            strokeWidth: 1.5,
        },
    }));

    return (
        <div className="space-y-3">
            <div>
                <h3 className="font-semibold">Concept map</h3>
                <p className="text-sm text-muted-foreground">
                    {nodes.length} concepts · {validEdges.length} connections
                </p>
            </div>

            <div
                className="h-[520px] w-full overflow-hidden rounded-xl border bg-background sm:h-[650px]"
                role="region"
                aria-label="Interactive mind map"
            >
                <ReactFlow
                    nodes={flowNodes}
                    edges={flowEdges}
                    fitView
                    fitViewOptions={{ padding: 0.2 }}
                    minZoom={0.2}
                    maxZoom={2}
                    nodesDraggable
                    nodesConnectable={false}
                    elementsSelectable
                    proOptions={{ hideAttribution: true }}
                >
                    <Background gap={20} size={1} />
                    <Controls />
                    <MiniMap pannable zoomable />
                </ReactFlow>
            </div>

            {validEdges.length === 0 && (
                <p className="text-sm text-muted-foreground">
                    No connections were provided. Concepts are displayed as independent nodes.
                </p>
            )}
        </div>
    );
}

function ArtifactContent({ artifact }) {
    const content = artifact.content;

    if (!content) {
        return <p className="text-muted-foreground">This artifact has no content yet.</p>;
    }

    switch (artifact.type) {
        case "SUMMARY":
        case "REPORT":
            return <MarkdownContent content={content.markdown} />;

        case "TAKEAWAYS":
            return <TakeawaysContent items={content.items} />;

        case "FLASHCARDS":
            return <FlashcardsContent cards={content.cards} />;

        case "QUIZ":
            return <QuizContent questions={content.questions} />;

        case "MINDMAP":
            return <MindmapContent nodes={content.nodes} edges={content.edges} />;

        default:
            return (
                <pre className="overflow-x-auto whitespace-pre-wrap rounded-xl bg-muted p-4 text-sm">
                    {JSON.stringify(content, null, 2)}
                </pre>
            );
    }
}

export default function ArtifactDetailPage() {
    const { workspaceId, artifactId } = useParams();
    const router = useRouter();

    const {
        data: artifact,
        isLoading,
        isError,
        refetch,
    } = useArtifact(workspaceId, artifactId);

    return (
        <main className="mx-auto w-full max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8">
            <button
                type="button"
                onClick={() => router.push(`/main/workspace/${workspaceId}/artifact`)}
                className="text-sm text-muted-foreground transition hover:text-foreground"
            >
                ← Back to artifacts
            </button>

            {isLoading ? (
                <div className="h-64 animate-pulse rounded-xl border bg-muted/40" />
            ) : isError || !artifact ? (
                <div className="rounded-xl border p-6 text-center">
                    <h1 className="font-semibold">Unable to load artifact</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        The artifact could not be loaded. It may have been deleted or you
                        may not have access to it.
                    </p>
                    <button
                        type="button"
                        onClick={() => refetch()}
                        className="mt-4 rounded-lg border px-4 py-2 text-sm hover:bg-muted"
                    >
                        Try again
                    </button>
                </div>
            ) : (
                <>
                    <header className="space-y-3 border-b pb-6">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full border px-3 py-1 text-xs font-medium">
                                {artifact.type}
                            </span>
                            <span className="rounded-full border px-3 py-1 text-xs">
                                {artifact.status}
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            {artifact.title}
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Created {new Date(artifact.createdAt).toLocaleString()}
                        </p>
                    </header>

                    {artifact.status === "PENDING" ||
                        artifact.status === "PROCESSING" ? (
                        <div className="rounded-xl border border-dashed p-8 text-center">
                            <div className="mx-auto size-8 animate-spin rounded-full border-2 border-primary border-r-transparent" />
                            <h2 className="mt-4 font-semibold">Generating your artifact</h2>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Your learning material will appear here when generation finishes.
                            </p>
                        </div>
                    ) : artifact.status === "FAILED" ? (
                        <div className="rounded-xl border border-red-500/30 p-6">
                            <h2 className="font-semibold">Generation failed</h2>
                            <p className="mt-2 text-sm text-muted-foreground">
                                This artifact could not be generated. You can return to the
                                dashboard and create another one.
                            </p>
                        </div>
                    ) : (
                        <article className="min-w-0 rounded-xl border p-4 sm:p-7">
                            <ArtifactContent artifact={artifact} />
                        </article>
                    )}
                </>
            )}
        </main>
    );
}