"use client";
import React from "react";

import ClassConfigurationTabs from "@/components/classes-config/ClassConfigurationTabs";
import { HeaderPage } from "@/components/common/HeaderPage";
import { Shell } from "@/components/common/Shell";

export default function ClassesConfigurationPage() {
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
