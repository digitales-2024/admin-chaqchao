"use client";
import { ChaqchaoOneColor } from "@/assets/icons";
import { useProfile } from "@/hooks/use-profile";
import { getFirstLetter } from "@/utils/getFirstLetter";
import { Lock, Settings, User } from "lucide-react";

import { FormConfigAdmin } from "@/components/account/FormConfigAdmin";
import { FormUpdateInfo } from "@/components/account/FormUpdateInfo";
import { FormUpdateSecurity } from "@/components/account/FormUpdateSecurity";
import { ErrorPage } from "@/components/common/ErrorPage";
import { HeaderPage } from "@/components/common/HeaderPage";
import { Shell } from "@/components/common/Shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PageAccount() {
  const { user } = useProfile();
  if (!user) {
    return (
      <Shell>
        <HeaderPage title="Administración de la cuenta" />
        <ErrorPage />
      </Shell>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-3xl font-bold">Administración de la cuenta</h1>
      <div className="grid gap-4 lg:grid-cols-[1fr_2fr]">
        <Card className="relative mx-auto hidden h-[500px] max-w-[320px] flex-col gap-6 overflow-hidden lg:flex">
          <div className="pattern absolute bottom-0 left-0 right-0 top-0 opacity-5"></div>
          <CardHeader>
            <CardTitle className="text-balance text-xl">
              {getFirstLetter(user?.name)}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-end space-y-10">
            <ChaqchaoOneColor className="absolute -right-24 -top-12 size-80 fill-chaqchao-midning-green opacity-70" />
            <div className="flex flex-col gap-4 text-start">
              <h2 className="text-pretty text-2xl font-semibold capitalize">
                {user?.name}
              </h2>
              <span className="uppercase">{user?.roles[0].name}</span>
              <p className="truncate text-sm text-muted-foreground">
                {user?.email}
              </p>
              <p className="text-end">Chaqchao</p>
            </div>
          </CardContent>
        </Card>
        <Tabs defaultValue="general">
          <TabsList className="grid h-fit w-full grid-cols-1 grid-rows-3 gap-2 sm:grid-cols-3 sm:grid-rows-1">
            <TabsTrigger value="general" className="flex truncate">
              <User className="mr-2 h-4 w-4 flex-shrink-0" />
              General
            </TabsTrigger>
            <TabsTrigger value="security" className="flex truncate">
              <Lock className="mr-2 h-4 w-4 flex-shrink-0" />
              <span>Seguridad</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex truncate">
              <Settings className="mr-2 block size-4 flex-shrink-0" />
              <span>Permisos</span>
            </TabsTrigger>
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
