import ImagePlaceholder from "@/assets/images/placeholder.webp";
import { Metadata } from "next";

import { BorderBeam } from "@/components/common/BorderBeam ";
import { Safari } from "@/components/common/Safari";
import { FormUpdatePassword } from "@/components/sign-in";

export const metadata: Metadata = {
  title: "Chaqchao - Actualizar Contraseña Temporal",
  description: "Actualiza tu contraseña en el panel administrativo de Chaqchao",
};

export default function PageUpdatePassword() {
  return (
    <div className="h-screen w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="relative hidden items-center justify-center overflow-hidden lg:flex">
        <div
          className="hero absolute bottom-0 right-0 top-0 z-[1] h-full w-full opacity-10"
          style={{
            maskImage: `linear-gradient(to left, transparent, black 20%)`,
          }}
        />
        <div className="relative z-[3] w-[90%] -translate-x-16 rotate-6 rounded-lg">
          <BorderBeam size={500} duration={12} delay={9} />
          <Safari
            url="chaqchao"
            className="relative size-full opacity-70"
            src={ImagePlaceholder.src}
          />
        </div>
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
