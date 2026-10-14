"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

export function ChatComposer({ onSend, disabled = false }) {
    const [input, setInput] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const message = input.trim();

        if (!message || disabled) return;

        onSend(message);
        setInput("");
    };

    return (
        <form onSubmit={handleSubmit} className="border-t p-4 sm:p-6 ">
            <div className="mx-auto flex max-w-8xl items-end gap-2">
                <Textarea
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Ask about your sources..."
                    className="max-h-40 resize-none"
                    rows={1}
                    disabled={disabled}
                    onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                            event.preventDefault();
                            event.currentTarget.form?.requestSubmit();
                        }
                    }}
                />

                <Button
                    type="submit"
                    size="icon"
                    disabled={disabled || !input.trim()}
                    aria-label="Send message"
                    className="shrink-0"
                >
                    <Send className="size-4" />
                </Button>
            </div>

            <p className="mx-auto mt-2 max-w-4xl text-xs text-muted-foreground">
                Enter to send · Shift + Enter for a new line
            </p>
        </form>
    );
}
