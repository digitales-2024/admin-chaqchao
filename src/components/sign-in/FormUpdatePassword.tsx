"use client";
import { useAuth } from "@/hooks/use-auth";
import { useUpdatePasswordMutation } from "@/redux/services/authApi";
import { updatePasswordSchema } from "@/schemas";
import { CustomErrorData } from "@/types";
import { translateError } from "@/utils/translateError";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { InputPassword } from "../common/forms";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Inputs = {
  email: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
};

export const FormUpdatePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const [updatePassword, { data, isSuccess, isLoading }] =
    useUpdatePasswordMutation();

  const { setUser } = useAuth();
  const router = useRouter();

  const onUpdatePassword: SubmitHandler<Inputs> = async (data) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await updatePassword(data);
          if (
            result.error &&
            typeof result.error === "object" &&
            "data" in result.error
          ) {
            const error = (result.error.data as CustomErrorData).error;
            const message = translateError(error as string);
            reject(new Error(message));
          }
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

    toast.promise(promise(), {
      loading: "Actualizando contraseña...",
      success: "Contraseña actualizada correctamente",
      error: (error) => {
        return error.message;
      },
    });
  };

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
      router.replace("/");
    }
  }, [data, isSuccess, setUser, router]);

  return (
    <div className="flex flex-col gap-5">
      <form onSubmit={handleSubmit(onUpdatePassword)} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-muted-foreground">
            Email
          </Label>
          <Input
            placeholder="ejemplo@chaqchao.com"
            type="email"
            id="email"
            {...register("email", { required: "Este campo es requerido" })}
            className="input"
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password" className="text-muted-foreground">
            Contraseña
          </Label>
          <InputPassword
            placeholder="tu contraseña temporal"
            {...register("password")}
            className="hide-password-toggle pr-10"
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && (
            <span className="text-sm text-red-500">
              {errors?.password?.message}
            </span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="newPassword" className="text-muted-foreground">
            Nueva contraseña
          </Label>
          <InputPassword
            placeholder="tu nueva contraseña"
            {...register("newPassword")}
            aria-invalid={errors.newPassword ? "true" : "false"}
          />
          {errors.newPassword && (
            <span className="text-sm text-red-500">
              {errors?.newPassword?.message}
            </span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword" className="text-muted-foreground">
            Confirmar contraseña
          </Label>
          <InputPassword
            placeholder="confirma tu nueva contraseña"
            {...register("confirmPassword")}
            aria-invalid={errors.confirmPassword ? "true" : "false"}
          />
          {errors.confirmPassword && (
            <span className="text-sm text-red-500">
              {errors?.confirmPassword?.message}
            </span>
          )}
        </div>
        <Button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? "Actualizando..." : "Actualizar contraseña"}
        </Button>
        {/* Seccion para ir a logearte */}
        <div className="flex justify-center">
          <Link
            href="/sign-in"
            className="group/return flex w-fit items-center justify-center gap-2 rounded-xl border border-transparent px-2 py-1 text-sm transition-colors duration-500 hover:border-primary hover:text-primary"
          >
            <ArrowLeft className="size-4 translate-x-10 scale-0 text-primary transition-all duration-500 group-hover/return:translate-x-0 group-hover/return:scale-100" />
            Regresa a iniciar sesión
          </Link>
        </div>
      </form>
    </div>
  );
};
