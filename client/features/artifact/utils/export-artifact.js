
function sanitizeFilename(title) {
    return (title || "artifact")
        .trim()
        .replace(/[<>:"/\\|?*\x00-\x1F]/g, "-")
        .replace(/[. ]+$/g, "")
        .slice(0, 100) || "artifact";
}

function downloadFile(title, content, extension = "md", mimeType = "text/markdown;charset=utf-8") {
    if (!content || !content.trim()) {
        return false;
    }

    const safeTitle = sanitizeFilename(title);
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${safeTitle}.${extension}`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);

    return true;
}

export function downloadMarkdown(title, markdown) {
    return downloadFile(title, markdown);
}

export function downloadArtifact(artifact) {
    if (!artifact || !artifact.type || !artifact.content) {
        return false;
    }

    const { title, type, content } = artifact;
    let markdown = "";

    switch (type) {
        case "SUMMARY":
        case "REPORT": {
            markdown = content.markdown || "";
            break;
        }

        case "TAKEAWAYS": {
            if (!Array.isArray(content.items)) {
                return false;
            }

            markdown = `# ${title || "Key Takeaways"}\n\n${content.items
                .map((item) => `- ${item}`)
                .join("\n")}`;
            break;
        }

        case "FLASHCARDS": {
            if (!Array.isArray(content.cards)) {
                return false;
            }

            markdown = `# ${title || "Flashcards"}\n\n${content.cards
                .map(
                    (card, index) =>
                        `## Flashcard ${index + 1}\n\n**Front:** ${card.front}\n\n**Back:** ${card.back}`
                )
                .join("\n\n---\n\n")}`;
            break;
        }

        case "QUIZ": {
            if (!Array.isArray(content.questions)) {
                return false;
            }

            markdown = `# ${title || "Quiz"}\n\n${content.questions
                .map((question, index) => {
                    const options = Array.isArray(question.options)
                        ? question.options
                            .map((option, optionIndex) => {
                                const marker =
                                    optionIndex === question.correctIndex
                                        ? " **(Correct answer)**"
                                        : "";

                                return `${String.fromCharCode(65 + optionIndex)}. ${option}${marker}`;
                            })
                            .join("\n")
                        : "";

                    return `## Question ${index + 1}\n\n${question.question}\n\n${options}\n\n**Explanation:** ${question.explanation || "No explanation provided."}`;
                })
                .join("\n\n---\n\n")}`;
            break;
        }

        case "MINDMAP": {
            if (!Array.isArray(content.nodes)) {
                return false;
            }

            const nodeLabels = new Map(
                content.nodes.map((node) => [node.id, node.label])
            );

            const nodes = content.nodes
                .map((node) => `- ${node.label}`)
                .join("\n");

            const connections = Array.isArray(content.edges)
                ? content.edges
                    .map((edge) => {
                        const source = nodeLabels.get(edge.source) || edge.source;
                        const target = nodeLabels.get(edge.target) || edge.target;

                        return `- ${source} → ${target}`;
                    })
                    .join("\n")
                : "";

            markdown = `# ${title || "Mindmap"}\n\n## Nodes\n\n${nodes}\n\n## Connections\n\n${connections || "No connections available."}`;
            break;
        }

        default:
            return false;
    }

    return downloadFile(title, markdown);
}
