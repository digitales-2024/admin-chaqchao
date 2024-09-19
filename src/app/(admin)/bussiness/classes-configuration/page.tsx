"use client";
import React from "react";

import ClassConfigurationTabs from "@/components/classes-config/ClassConfigurationTabs";
import { TitleSecction } from "@/components/common/text/TitleSecction";

const HeaderPage = () => (
  <div className="mb-6">
    <TitleSecction text="Configuración de las Clases" />
    <span className="text-sm text-slate-600">
      Complete la configuración de las clases.
    </span>
  </div>
);

export default function ClassesConfigurationPage() {
  return (
    <div className="container mx-auto py-10">
      <HeaderPage />
      <div className="flex items-start space-x-8">
        <ClassConfigurationTabs />
      </div>
    </div>
  );
}
