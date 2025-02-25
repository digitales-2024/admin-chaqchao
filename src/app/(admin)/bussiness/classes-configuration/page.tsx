"use client";
import { useClassSchedules } from "@/hooks/use-class-schedule";
import { usePermissions } from "@/hooks/use-permissions";
import React from "react";

import ClassConfigurationTabs from "@/components/classes-config/ClassConfigurationTabs";
import { AccessDenied } from "@/components/common/AccessDenied";
import { ErrorPage } from "@/components/common/ErrorPage";
import { HeaderPage } from "@/components/common/HeaderPage";
import { Shell } from "@/components/common/Shell";
import { Skeleton } from "@/components/ui/skeleton";

export default function ClassesConfigurationPage() {
  const { hasPermission, isLoadingHas } = usePermissions();
  const hasSettingsPermission = hasPermission("STG", ["READ"]);
  const { isLoading, error } = useClassSchedules();

  if (isLoading || isLoadingHas) {
    return (
      <Shell>
        <HeaderPage
          title="Configuración de las Clases"
          description="Complete la configuración de las clases"
        />
        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-col justify-between gap-2 gap-y-2 sm:flex-row">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-auto min-h-52 w-full flex-1 justify-end" />
        </div>
      </Shell>
    );
  }

  if (!hasSettingsPermission) {
    return (
      <Shell>
        <HeaderPage
          title="Configuración de las Clases"
          description="Complete la configuración de las clases"
        />
        <AccessDenied message="No tienes permisos para ver la configuración de clases." />
      </Shell>
    );
  }

  if (error) {
    return (
      <Shell>
        <HeaderPage
          title="Configuración de las Clases"
          description="Complete la configuración de las clases"
        />
        <ErrorPage />
      </Shell>
    );
  }

  return (
    <Shell>
      <HeaderPage
        title="Configuración de las Clases"
        description="Complete la configuración de las clases"
      />
      <div className="flex items-start space-x-8">
        <ClassConfigurationTabs />
      </div>
    </Shell>
  );
}
