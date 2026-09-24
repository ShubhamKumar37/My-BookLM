"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  useCreateWorkspace,
  useUpdateWorkspace,
} from "../hooks/use-workspace";

import { createWorkspaceSchema } from "../schemas/workspace.schema";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function CreateWorkspaceForm({
  workspace,
  onSuccess,
}) {
  const isEditing = !!workspace;

  const createWorkspace = useCreateWorkspace();
  const updateWorkspace = useUpdateWorkspace();

  const form = useForm({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      title: workspace?.title || "",
      description: workspace?.description || "",
    },
  });

  const isPending =
    createWorkspace.isPending || updateWorkspace.isPending;

  const onSubmit = (data) => {
    if (isEditing) {
      updateWorkspace.mutate(
        {
          workspaceId: workspace.id,
          data,
        },
        {
          onSuccess: () => {
            onSuccess?.();
          },
        }
      );

      return;
    }

    createWorkspace.mutate(data, {
      onSuccess: () => {
        form.reset();
        onSuccess?.();
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workspace name</FormLabel>

              <FormControl>
                <Input
                  placeholder="My Physics Notes"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>

              <FormControl>
                <Textarea
                  placeholder="A workspace for organizing my study materials..."
                  className="resize-none"
                  rows={4}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isPending}
        >
          {isPending
            ? isEditing
              ? "Updating..."
              : "Creating..."
            : isEditing
              ? "Update workspace"
              : "Create workspace"}
        </Button>
      </form>
    </Form>
  );
}