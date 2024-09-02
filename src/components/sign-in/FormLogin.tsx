"use client";

import { TOKEN } from "@/constants";
import { useLoginMutation } from "@/redux/services/authApi";
import { authSchema } from "@/schemas";
import { Credentials, CustomErrorData } from "@/types";
import { translateError } from "@/utils/translateError";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { AlertTriangle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { InputPassword } from "../common/forms";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export const FormLogin = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>({
    resolver: zodResolver(authSchema),
  });

  const [login, { data, error, isLoading }] = useLoginMutation();

  const onSubmit: SubmitHandler<Credentials> = async (credentials) => {
    const user = await login(credentials);
    if (user.data) {
      router.push("/");
    }
  };

  useEffect(() => {
    if (data) {
      Cookies.set(TOKEN, data.token);
    }
  }, [data]);

  return (
    <div className="flex flex-col gap-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              {...register("email")}
              placeholder="ejemplo@chaqchao.com"
              autoComplete="email"
            />
            {errors.email?.message && (
              <span className="text-xs text-red-500">
                {errors.email?.message}
              </span>
            )}
          </div>
          <div className="grid gap-2">
            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <InputPassword
                id="password"
                {...register("password")}
                placeholder="********"
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <Button
            type="submit"
            className="w-full select-none"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Autenticando...
              </>
            ) : (
              "Ingresar"
            )}
          </Button>
        </div>
      </form>

      {error && "data" in error && typeof error.data === "object" && (
        <Alert variant="destructive" className="flex flex-col gap-2">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>
            {translateError((error.data as CustomErrorData).error)}
          </AlertTitle>
          <AlertDescription>
            {translateError((error.data as CustomErrorData).message)}
          </AlertDescription>
          {(error.data as CustomErrorData).statusCode === 403 && (
            <Link href="/update-password" className="text-slate-900">
              Cambiar contraseña
            </Link>
          )}
        </Alert>
      )}
    </div>
  );
};
