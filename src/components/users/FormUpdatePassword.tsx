import { useUsers } from "@/hooks/use-users";
import {
  sendNewPasswordSchema,
  SendNewPasswordSchema,
} from "@/schemas/users/sendNewPasswordSchema";
import { User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";

interface FormUpdatePasswordProps {
  user: User;
}

export const FormUpdatePassword = ({ user }: FormUpdatePasswordProps) => {
  const {
    onSendNewPassword,
    dataSendNewPassword,
    isSuccessSendNewPassword,
    isLoadingSendNewPasswrod,
  } = useUsers();
  console.log(
    "🚀 ~ FormUpdatePassword ~ dataSendNewPassword:",
    dataSendNewPassword,
  );

  const form = useForm<SendNewPasswordSchema>({
    resolver: zodResolver(sendNewPasswordSchema),
  });

  const onSubmit = (input: SendNewPasswordSchema) => {
    onSendNewPassword({ email: user.email, ...input });
  };

  useEffect(() => {
    if (isSuccessSendNewPassword) {
      form.reset();
    }
  }, [isSuccessSendNewPassword]);

  return (
    <Form {...form}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Restablecer Contraseña</CardTitle>
          <CardDescription>
            Ingresa tu correo para recibir una nueva contraseña
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password Nueva</FormLabel>
                      <FormControl>
                        <Input placeholder="tu@ejemplo.com" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <Button disabled={isLoadingSendNewPasswrod}>
            {isLoadingSendNewPasswrod
              ? "Enviando..."
              : "Enviar Nueva Contraseña"}
          </Button>
          {/* {message && (
            <div
              className={`mt-4 flex items-center ${message.type === "success" ? "text-green-600" : "text-red-600"}`}
            >
              {message.type === "success" ? (
                <CheckCircle className="mr-2" />
              ) : (
                <AlertCircle className="mr-2" />
              )}
              <p>{message.text}</p>
            </div>
          )} */}
        </CardFooter>
      </Card>
    </Form>
  );
};
