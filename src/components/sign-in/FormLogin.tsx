"use client";

import { useLoginMutation } from "@/redux/services/authApi";
import { authSchema } from "@/schemas";
import { Credentials } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export const FormLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>({
    resolver: zodResolver(authSchema),
  });

  // aplicamos el redux toolkit
  const [login, { data, error, isLoading }] = useLoginMutation();
  console.log("data", data);
  console.log("error", error);

  const onSubmit: SubmitHandler<Credentials> = useCallback(async (data) => {
    await login(data);
  }, []);

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
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  {...register("password")}
                  className="hide-password-toggle pr-10"
                  aria-invalid={errors.password ? "true" : "false"}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  tabIndex={-1}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <EyeIcon className="h-4 w-4" aria-hidden="true" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
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

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Ocurrio un problema</AlertTitle>
          <AlertDescription>
            {/* {translateError(error?.data?.message)} */}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
