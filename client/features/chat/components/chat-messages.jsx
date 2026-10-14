"use client";

export function ChatMessages({ messages, isLoading }) {
    if (isLoading) {
        return (
            <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
                Loading messages...
            </div>
        );
    }

    if (!messages?.length) {
        return (
            <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
                Start a conversation by sending a message.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 overflow-y-auto p-4">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"
                        }`}
                >
                    <div
                        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm ${message.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-foreground"
                            }`}
                    >
                        {message.parts?.map((part, index) =>
                            part.type === "text" ? (
                                <span key={index}>{part.text}</span>
                            ) : null
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}