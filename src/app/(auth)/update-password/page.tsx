import ImagePlaceholder from "@/assets/images/placeholder.webp";
import { Metadata } from "next";
import Image from "next/image";

import { FormUpdatePassword } from "@/components/sign-in";

export const metadata: Metadata = {
  title: "Chaqchao - Actualizar Contraseña Temporal",
  description: "Actualiza tu contraseña en el panel administrativo de Chaqchao",
};

export default function PageUpdatePassword() {
  return (
    <div className="h-screen w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden bg-muted lg:block">
        <Image
          src={ImagePlaceholder}
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="flex h-full items-center justify-center py-1">
        <div className="mx-auto grid h-fit w-[350px] items-start justify-start gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Ingresa tu nueva contraseña</h1>
            <p className="text-balance text-sm text-muted-foreground">
              Actualiza tu contraseña temporal para acceder al panel de
              administración de <span className="text-primary"> Chaqchao</span>
            </p>
          </div>
          <FormUpdatePassword />
        </div>
      </div>
    </div>
  );
}
