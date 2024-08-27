"use client";
import { updatePasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

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

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email" className="text-muted-foreground">
          Email
        </Label>
        <Input
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
        <Input
          type="password"
          id="password"
          {...register("password", { required: "Este campo es requerido" })}
          className="input"
        />
        {errors.password && (
          <span className="text-sm text-red-500">
            {errors?.password?.message}
          </span>
        )}
      </div>
      <div className="grid gap-2">
        <label htmlFor="newPassword" className="text-muted-foreground">
          Nueva contraseña
        </label>
        <Input
          type="password"
          id="newPassword"
          {...register("newPassword", { required: "Este campo es requerido" })}
          className="input"
        />
        {errors.newPassword && (
          <span className="text-sm text-red-500">
            {errors.newPassword.message}
          </span>
        )}
      </div>
      <div className="grid gap-2">
        <label htmlFor="confirmPassword" className="text-muted-foreground">
          Confirmar contraseña
        </label>
        <Input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", {
            required: "Este campo es requerido",
          })}
          className="input"
        />
        {errors.confirmPassword && (
          <span className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>
      <Button type="submit" className="btn">
        Actualizar contraseña
      </Button>
    </form>
  );
};
