"use client";
import { useClasses } from "@/hooks/use-class";
import { useGetClassesCapacityQuery } from "@/redux/services/classApi";
import { CreateClassSchema, createClassSchema } from "@/schemas";
import { TypeClass } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import CreateClassForm from "./CreateClassForm";
import { SummaryClass } from "./SummaryClass";

const dataForm = {
  button: "Crear un registro de una clase",
  title: "Crear un registro de una clase",
  description: "Llena los campos para registrar una nueva clase en el sistema.",
};

export function CreateClassDialog() {
  const [open, setOpen] = useState(false);

  const form = useForm<createClassSchema>({
    resolver: zodResolver(CreateClassSchema),
    defaultValues: {
      typeClass: TypeClass.NORMAL,
      userName: "",
      userEmail: "",
      userPhone: "",
      scheduleClass: "",
      languageClass: "",
      dateClass: undefined,
      totalAdults: 1,
      totalChildren: 0,
      totalPriceAdults: 0,
      totalPriceChildren: 0,
      totalPrice: 0,
      totalParticipants: 1,
      comments: "",
      typeCurrency: "USD",
      methodPayment: "",
      status: "CONFIRMED",
    },
  });
  console.log("🚀 ~ CreateClassDialog ~ form:", form.watch());
  const { createClass, isLoadingCreateClass } = useClasses();
  const { data: classCapacities, isLoading: isLoadingClassCapacities } =
    useGetClassesCapacityQuery(
      {
        typeClass: form.getValues("typeClass") as TypeClass,
      },
      {
        skip: !form.getValues("typeClass"),
      },
    );
  const onSubmit = async () => {
    setOpenAlertConfirm(true);
  };

  const handleCreateClass = async () => {
    try {
      const formValues = form.getValues();
      const totalParticipants =
        formValues.totalAdults + formValues.totalChildren;

      await createClass({
        ...formValues,
        totalParticipants,
        isClosed: false,
        status: "CONFIRMED",
      });
      setOpen(!open);
      form.reset();
    } catch (error) {
      throw error;
    }
  };
  const handleCreateClassClosed = async () => {
    try {
      const formValues = form.getValues();
      const totalParticipants =
        formValues.totalAdults + formValues.totalChildren;

      await createClass({
        ...formValues,
        totalParticipants,
        isClosed: true,
        status: "CONFIRMED",
      });
      setOpen(!open);
      form.reset();
    } catch (error) {
      throw error;
    }
  };

  const handleClose = () => {
    setOpen(!open);
    form.reset();
  };

  const isDisabled =
    !!classCapacities || isLoadingClassCapacities || isLoadingCreateClass;

  const [openAlertConfirm, setOpenAlertConfirm] = useState<boolean>(false);

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Plus className="mr-2 size-4" aria-hidden="true" />
            {dataForm.button}
          </Button>
        </DialogTrigger>
        <DialogContent
          tabIndex={undefined}
          className="min-w-full lg:min-w-[800px]"
        >
          <DialogHeader>
            <DialogTitle>{dataForm.title}</DialogTitle>
            <DialogDescription>{dataForm.description}</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-full max-h-[80vh] w-full justify-center gap-4">
            {open && (
              <CreateClassForm form={form} onSubmit={onSubmit}>
                <DialogFooter>
                  <div className="flex w-full flex-row-reverse gap-2">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={!isDisabled}
                    >
                      Crear registro
                    </Button>
                    <AlertDialog
                      open={openAlertConfirm}
                      onOpenChange={setOpenAlertConfirm}
                    >
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            ¿Quieres cerrar la clase?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Resumen de la clase
                          </AlertDialogDescription>
                          <ScrollArea className="h-full max-h-[70vh] w-full justify-center gap-4">
                            <SummaryClass class={form} />
                          </ScrollArea>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction asChild>
                            <Button
                              className="w-full border-none bg-slate-200 text-gray-900 hover:bg-slate-300"
                              variant="ghost"
                              onClick={handleCreateClass}
                            >
                              {isLoadingCreateClass ? (
                                <>
                                  <RefreshCcw
                                    className="mr-2 size-4 animate-spin"
                                    aria-hidden="true"
                                  />
                                  Creando...
                                </>
                              ) : (
                                "No, solo crear registro"
                              )}
                            </Button>
                          </AlertDialogAction>
                          <AlertDialogAction asChild>
                            <Button
                              className="w-full"
                              onClick={handleCreateClassClosed}
                            >
                              {isLoadingCreateClass ? (
                                <>
                                  <RefreshCcw
                                    className="mr-2 size-4 animate-spin"
                                    aria-hidden="true"
                                  />
                                  Creando...
                                </>
                              ) : (
                                "Si, cerrar la clase"
                              )}
                            </Button>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <DialogClose asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                      >
                        Cancelar
                      </Button>
                    </DialogClose>
                  </div>
                </DialogFooter>
              </CreateClassForm>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
