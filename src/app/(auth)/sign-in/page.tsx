import { LogoChaqchao } from "@/assets/icons";
import ImagePlaceholder from "@/assets/images/placeholder.webp";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { BorderBeam } from "@/components/common/BorderBeam ";
import { Safari } from "@/components/common/Safari";
import { FormLogin } from "@/components/sign-in";

export const metadata: Metadata = {
  title: "Chaqchao - Iniciar Sesión",
  description: "Inicia sesión en el panel administrativo de Chaqchao",
};

export default function PageSignIn() {
  return (
    <div className="h-screen w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex h-full items-center justify-center py-12">
        <div className="flex h-fit w-[350px] flex-col gap-10">
          <LogoChaqchao className="mx-auto size-20" />
          <div className="grid gap-2 text-center">
            <h1 className="text-2xl font-bold">
              Bienvenido a <span className="text-primary">Chaqchao</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Inicia sesión para acceder al panel administrativo de Chaqchao
            </p>
          </div>
          <FormLogin />
          <span className="text-slate-500">
            ¿Es la primera vez que ingresas? Cambia tu contraseña
            <Link
              href="/update-password"
              className="group/change-pass ml-1 inline-flex items-center justify-center gap-2 rounded-xl border border-transparent px-2 text-primary transition-all duration-500 hover:border-primary"
            >
              <span>aquí</span>
              <ArrowRight
                size={16}
                className="-translate-x-10 text-transparent transition-all duration-500 group-hover/change-pass:translate-x-0 group-hover/change-pass:text-primary"
              />
            </Link>
          </span>
        </div>
      </div>
      <div className="relative hidden items-center justify-center overflow-hidden lg:flex">
        <div
          className="hero absolute bottom-0 right-0 top-0 z-[1] h-full w-full opacity-10"
          style={{
            maskImage: `linear-gradient(to right, transparent, black 20%)`,
          }}
        />
        <div className="relative z-[3] translate-x-16 -rotate-6 rounded-lg">
          <BorderBeam size={500} duration={12} delay={9} />
          <Safari
            url="chaqchao"
            className="relative size-[98%] opacity-70"
            src={ImagePlaceholder.src}
          />
        </div>
      </div>
    </div>
  );
}
