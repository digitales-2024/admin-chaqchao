"use client";
import { useBussinessConfig } from "@/hooks/use-business-config";
import { useState, useEffect } from "react";

import { TitleSecction } from "@/components/common/text/TitleSecction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const HeaderPage = () => (
  <div className="mb-6">
    <TitleSecction text="Configuración de la Empresa" />
    <span className="text-sm text-slate-600">
      Ingrese los detalles de su empresa a continuación.
    </span>
  </div>
);

export default function BusinessInformationPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    contacto: "",
    email: "",
    direccion: "",
  });

  const { dataBusinessConfigAll } = useBussinessConfig();
  console.log("dataBusinessConfig", dataBusinessConfigAll);

  useEffect(() => {
    if (dataBusinessConfigAll && dataBusinessConfigAll.length > 0) {
      const businessConfig = dataBusinessConfigAll[0];
      setFormData({
        nombre: businessConfig.businessName || "",
        contacto: businessConfig.contactNumber || "",
        email: businessConfig.email || "",
        direccion: businessConfig.address || "",
      });
    }
  }, [dataBusinessConfigAll]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
    // Aquí puedes agregar la lógica para enviar los datos a tu backend
  };

  return (
    <div className="container mx-auto py-10">
      <HeaderPage />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre de la Empresa</Label>
          <Input
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contacto">Número de Contacto</Label>
          <Input
            id="contacto"
            name="contacto"
            type="tel"
            value={formData.contacto}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="direccion">Dirección</Label>
          <Input
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Guardar Configuración
        </Button>
      </form>
    </div>
  );
}
