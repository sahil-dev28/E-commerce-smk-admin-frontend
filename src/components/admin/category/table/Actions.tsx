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
import { useDeleteCategory } from "@/hooks/category/useDeleteCategory";
import { useState } from "react";
import { CategoryFormDialog } from "../CategoryFormDialog";

export const CategoryActions = ({
  categoryId,
  categoryName,
}: {
  categoryId: string;
  categoryName: string;
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { mutateAsync: deleteCategory } = useDeleteCategory();

  const handleDelete = () => {
    deleteCategory(categoryId);
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
              className="cursor-pointer"
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
            <Button variant="ghost" className="cursor-pointer">
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
              <CategoryFormDialog
                name={categoryName}
                id={categoryId}
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
