"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

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

export function CreateWorkspaceDialog({
  workspace,
  trigger,
  open: controlledOpen,
  onOpenChange,
}) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;

  const open = isControlled
    ? controlledOpen
    : internalOpen;

  const handleOpenChange = (value) => {
    if (!isControlled) {
      setInternalOpen(value);
    }

    onOpenChange?.(value);
  };

  const isEditing = !!workspace;

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      {/* Only render a trigger when this dialog needs one */}
      {!isControlled && (
        <DialogTrigger asChild>
          {trigger || (
            <Button>
              <Plus className="size-4" />
              New Workspace
            </Button>
          )}
        </DialogTrigger>
      )}

      <DialogContent className="w-[calc(100%-2rem)] max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing
              ? "Edit workspace"
              : "Create a workspace"}
          </DialogTitle>

          <DialogDescription>
            {isEditing
              ? "Update your workspace details."
              : "Create a workspace to organize your books, sources, and learning materials."}
          </DialogDescription>
        </DialogHeader>

        <CreateWorkspaceForm
          workspace={workspace}
          onSuccess={() => handleOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}