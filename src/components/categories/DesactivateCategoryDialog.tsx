import { useCategories } from "@/hooks/use-categories";
import { Category } from "@/types";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

interface DesactivateCategoryDialogProps {
  category: Category;
  onSuccess?: () => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DesactivateCategoryDialog = ({
  category,
  onSuccess,
  isOpen,
  onOpenChange,
}: DesactivateCategoryDialogProps) => {
  const { onDeactivateCategory } = useCategories();

  const handleDesactivate = async () => {
    onDeactivateCategory(category.id);
    onSuccess?.();
    onOpenChange(false); // Cierra el diálogo después de la acción
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            {`Esta acción eliminará la categoría "${category.name}".`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDesactivate}>
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
