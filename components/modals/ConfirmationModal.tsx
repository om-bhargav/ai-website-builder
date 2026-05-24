"use client";

import * as React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ConfirmationDialogProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => Promise<void> | void;
  destructive?: boolean;
}

export default function ConfirmationDialog({
  children,
  title = "Are you absolutely sure?",
  description = "This action cannot be undone.",
  confirmText = "Continue",
  cancelText = "Cancel",
  onConfirm,
  destructive = false,
}: ConfirmationDialogProps) {
  const [loading, startTransition] = React.useTransition();
  const [open, setOpen] = React.useState(false);

  async function handleConfirm() {
    startTransition(async () => {
      try {
        await onConfirm();
        setOpen(false);
      } catch (error) {
        console.error(error);
      }
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent className="border-border bg-background">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground">{title}</AlertDialogTitle>

          <AlertDialogDescription className="text-muted-foreground">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={loading}
            className="
              border-border
              bg-background
              text-foreground
              hover:bg-accent
              hover:text-accent-foreground
            "
          >
            {cancelText}
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              handleConfirm();
            }}
            className={
              destructive
                ? `
                  bg-destructive
                  text-destructive-foreground
                  hover:bg-destructive/90
                `
                : `
                  bg-primary
                  text-primary-foreground
                  hover:bg-primary/90
                `
            }
          >
            {loading ? "Please wait..." : confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
