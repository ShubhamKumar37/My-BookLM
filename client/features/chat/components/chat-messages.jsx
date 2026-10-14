"use client";

import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function ChatMessages({ messages, isLoading }) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "auto",
            block: "end",
        });
    }, [messages]);

    if (isLoading) {
        return (
            <div className="flex flex-1 items-center justify-center text-base text-muted-foreground">
                Loading messages...
            </div>
        );
    }

    if (!messages?.length) {
        return (
            <div className="flex flex-1 items-center justify-center text-base text-muted-foreground">
                Start a conversation by sending a message.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 chat-scrollbar">
            {messages.map((message) => {
                const role = message.role?.toLowerCase();
                const isUser = role === "user";

                const text = message.parts
                    ?.filter((part) => part.type === "text")
                    .map((part) => part.text)
                    .join("");

                return (
                    <div
                        key={message.id}
                        className={`flex w-full ${isUser ? "justify-end" : "justify-start"
                            }`}
                    >
                        <div
                            className={`w-fit max-w-[min(90%,900px)] rounded-2xl px-4 py-3 text-base leading-7 sm:max-w-[85%] ${isUser
                                ? "bg-primary text-primary-foreground whitespace-pre-wrap"
                                : " text-foreground"
                                }`}
                        >
                            {isUser ? (
                                text
                            ) : (
                                <div className="prose prose-base dark:prose-invert max-w-none break-words
  [&_p]:my-3
  [&_ul]:my-3
  [&_ul]:list-disc
  [&_ul]:pl-6
  [&_ol]:my-3
  [&_ol]:list-decimal
  [&_ol]:pl-6
  [&_li]:my-1
  [&_li>p]:my-1
  [&_h1]:mt-6
  [&_h1]:mb-3
  [&_h2]:mt-5
  [&_h2]:mb-2
  [&_h3]:mt-4
  [&_h3]:mb-2
  [&_pre]:my-4
  [&_pre]:overflow-x-auto
  [&_code]:break-words
">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {text || ""}
                                    </ReactMarkdown>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}

            <div ref={bottomRef} />
        </div>
    );
}
