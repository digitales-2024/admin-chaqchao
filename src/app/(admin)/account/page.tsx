"use client";
import { useProfileQuery } from "@/redux/services/adminApi";
import { getFirstLetter } from "@/utils/getFirstLetter";

import { FormConfigAdmin } from "@/components/account/FormConfigAdmin";
import { FormUpdateInfo } from "@/components/account/FormUpdateInfo";
import { FormUpdateSecurity } from "@/components/account/FormUpdateSecurity";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PageAccount() {
  const { data, isLoading } = useProfileQuery();

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-3xl font-bold">Administración de la cuenta</h1>
      <div className="grid gap-6 md:grid-cols-[1fr_3fr]">
        <Card>
          <CardHeader>
            <CardTitle>Perfil de usuario</CardTitle>
            <CardDescription>
              Administrar información del usuario
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            {isLoading ? (
              <Skeleton className="h-24 w-24 rounded-full" />
            ) : (
              <Avatar className="h-24 w-24">
                <AvatarImage alt="User avatar" src="" />
                <AvatarFallback>{getFirstLetter(data?.name)}</AvatarFallback>
              </Avatar>
            )}
            <div className="text-center">
              {isLoading ? (
                <>
                  <Skeleton className="mb-2 h-7 w-52" />
                  <Skeleton className="h-5" />
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold">{data?.name}</h2>
                  <p className="text-sm text-muted-foreground">{data?.email}</p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
        <Tabs defaultValue="general">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Seguridad</TabsTrigger>
            <TabsTrigger value="admin">Controles administrativos</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <FormUpdateInfo />
          </TabsContent>
          <TabsContent value="security">
            <FormUpdateSecurity />
          </TabsContent>
          <TabsContent value="admin">
            <FormConfigAdmin />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
