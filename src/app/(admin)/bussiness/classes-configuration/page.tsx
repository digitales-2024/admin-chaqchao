import React from "react";

import { TitleSecction } from "@/components/common/text/TitleSecction";

const HeaderPage = () => (
  <div className="mb-6">
    <TitleSecction text="Configuración de la Clases" />
    <span className="text-sm text-slate-600">
      Complete la información de las clases.
    </span>
  </div>
);

export default function ClassesConfigurationPage() {
  return (
    <div>
      <HeaderPage />
    </div>
  );
}
