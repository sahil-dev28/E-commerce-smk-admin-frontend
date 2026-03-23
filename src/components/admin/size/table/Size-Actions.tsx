import { Copy, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SizeFormDialog } from "../SizeFormDialog";
import { useDeleteSize } from "@/hooks/size/useDeleteSize";

export const SizeActions = ({
  sizeId,
  sizeValue,
}: {
  sizeId: string;
  sizeValue: number;
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { mutateAsync: deleteSize } = useDeleteSize();

  const handleDelete = () => {
    deleteSize(sizeId);
  };
  return (
    <main>
      <div className="flex items-center justify-end">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              onClick={(e) => {
                e.preventDefault();
                setOpenDialog(true);
              }}
            >
              <Trash2 size={"18"} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete</p>
          </TooltipContent>
        </Tooltip>

        <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="cursor-pointer bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost">
              <Copy size={"18"} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Copy</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" className="px-0">
              <SizeFormDialog
                value={sizeValue}
                id={sizeId}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                mode="edit"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </main>
  );
};
