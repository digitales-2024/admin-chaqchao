import { useClassLanguages } from "@/hooks/use-class-language";
import { ClassLanguageData } from "@/types";
import { Edit, Trash, Ellipsis, BookType } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";

import { AddLanguageDialog } from "./AddLanguageDialog";
import { DeleteLanguageDialog } from "./DeleteLanguageDialog";
import { EditLanguageSheet } from "./EditLanguageSheet";

export function LanguageConfigSection() {
  const [selectedLanguage, setSelectedLanguage] =
    useState<ClassLanguageData | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [languageToDelete, setLanguageToDelete] =
    useState<ClassLanguageData | null>(null);

  const {
    dataClassLanguagesAll,
    isSuccess: isSuccessLanguages,
    refetch: refetchClassLanguages,
  } = useClassLanguages();

  // Función para editar
  const handleEdit = (languageData: ClassLanguageData) => {
    setSelectedLanguage(languageData);
    setIsEditOpen(true);
  };

  // Función para eliminar
  const handleDelete = (languageData: ClassLanguageData) => {
    setLanguageToDelete(languageData);
    setShowDeleteDialog(true);
  };

  return (
    <div className="container mx-auto py-5">
      <div className="mb-8 flex items-center justify-between px-4">
        <div>
          <h2 className="text-2xl font-bold">Configuración de Lenguaje</h2>
          <span className="text-gray-600">
            Ingrese los lenguajes de las clases.
          </span>
        </div>
        <AddLanguageDialog refetchClassLanguages={refetchClassLanguages} />
      </div>

      <div className="space-y-5">
        {isSuccessLanguages &&
        dataClassLanguagesAll &&
        dataClassLanguagesAll.length > 0 ? (
          dataClassLanguagesAll.map((language) => (
            <Card key={language.id}>
              <CardContent className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <BookType className="mr-4 mt-4" aria-hidden="true" />
                  <div>
                    <p className="mt-4 text-base font-semibold">
                      {language.languageName}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        aria-label="Open menu"
                        variant="ghost"
                        className="flex size-8 p-0 data-[state=open]:bg-muted"
                      >
                        <Ellipsis className="size-4" aria-hidden="true" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onSelect={() => handleEdit(language)}>
                        Editar
                        <DropdownMenuShortcut>
                          <Edit className="size-4" aria-hidden="true" />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onSelect={() => handleDelete(language)}>
                        Eliminar
                        <DropdownMenuShortcut>
                          <Trash className="size-4" aria-hidden="true" />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No hay lenguajes configurados.</p>
        )}
      </div>

      {selectedLanguage && (
        <EditLanguageSheet
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          languageData={selectedLanguage}
          refetchClassLanguages={refetchClassLanguages}
        />
      )}

      {languageToDelete && (
        <DeleteLanguageDialog
          language={languageToDelete}
          onSuccess={refetchClassLanguages}
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
        />
      )}
    </div>
  );
}
