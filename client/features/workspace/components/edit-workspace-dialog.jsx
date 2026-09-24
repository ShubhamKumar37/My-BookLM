"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { CreateWorkspaceForm } from "./create-workspace-form";

export function EditWorkspaceDialog({ workspace }) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 shrink-0"
                >
                    <Pencil className="size-4" />

                    <span className="sr-only">
                        Edit workspace
                    </span>
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[calc(100%-2rem)] max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        Edit workspace
                    </DialogTitle>

                    <DialogDescription>
                        Update your workspace name and description.
                    </DialogDescription>
                </DialogHeader>

                <CreateWorkspaceForm
                    workspace={workspace}
                    onSuccess={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    );
}