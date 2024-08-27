import ImagePlaceholder from "@/assets/images/placeholder.webp";
import Image from "next/image";

import { FormLogin } from "@/components/sign-in";

export default function PageSignIn() {
  return (
    <div className="h-screen w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex h-full items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Chaqchao Admin</h1>
            <p className="text-balance text-muted-foreground">
              Inicia sesión para continuar
            </p>
          </div>
          <FormLogin />
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src={ImagePlaceholder}
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover object-center"
        />
      </div>
    </div>
  );
}
