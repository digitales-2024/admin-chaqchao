import { CalendarClock, CreditCard, NotebookTabs } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

enum TypeCurrency {
  SOL = "SOL",
  DOLAR = "DOLAR",
}

enum ClassTypeUser {
  ADULT = "ADULT",
  CHILD = "CHILD",
}

type FormSection = "schedule" | "config" | "price";

export default function ClassConfigurationTabs() {
  const [formData, setFormData] = useState({
    classTypeUser: "",
    price: 0,
    typeCurrency: "",
    startTime: "",
    languageName: "",
    closeBeforeStartInterval: 0,
    finalRegistrationCloseInterval: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (section: FormSection) => {
    const sectionData = {
      schedule: {
        startTime: formData.startTime,
        closeBeforeStartInterval: formData.closeBeforeStartInterval,
        finalRegistrationCloseInterval: formData.finalRegistrationCloseInterval,
      },
      config: {
        classTypeUser: formData.classTypeUser,
        languageName: formData.languageName,
      },
      price: {
        price: formData.price,
        typeCurrency: formData.typeCurrency,
      },
    };

    console.log(`Form submitted for ${section}:`, sectionData[section]);
    // Aquí puedes agregar la lógica para enviar los datos al servidor
  };

  return (
    <Card className="mx-auto w-full">
      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="schedule">
            <CalendarClock className="mr-2 h-4 w-4" />
            Horario
          </TabsTrigger>
          <TabsTrigger value="config">
            <NotebookTabs className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="price">
            <CreditCard className="mr-2 h-4 w-4" />
            Precio
          </TabsTrigger>
        </TabsList>
        <TabsContent value="schedule">
          <CardContent className="space-y-4"></CardContent>
        </TabsContent>
        <TabsContent value="config">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="languageName">Nombre del Idioma</Label>
              <Input
                id="languageName"
                name="languageName"
                type="text"
                value={formData.languageName}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="closeBeforeStartInterval">
                Intervalo de Cierre Antes del Inicio (minutos)
              </Label>
              <Input
                id="closeBeforeStartInterval"
                name="closeBeforeStartInterval"
                type="number"
                value={formData.closeBeforeStartInterval}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="finalRegistrationCloseInterval">
                Intervalo de Cierre Final de Inscripción (minutos)
              </Label>
              <Input
                id="finalRegistrationCloseInterval"
                name="finalRegistrationCloseInterval"
                type="number"
                value={formData.finalRegistrationCloseInterval}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="button" onClick={() => handleSubmit("config")}>
              Guardar Configuración General
            </Button>
          </CardFooter>
        </TabsContent>
        <TabsContent value="price">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="classTypeUser">Tipo de Usuario</Label>
              <Select
                name="classTypeUser"
                value={formData.classTypeUser}
                onValueChange={(value) =>
                  handleSelectChange("classTypeUser", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el tipo de usuario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ClassTypeUser.ADULT}>Adulto</SelectItem>
                  <SelectItem value={ClassTypeUser.CHILD}>Niño</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="typeCurrency">Tipo de Moneda</Label>
              <Select
                name="typeCurrency"
                value={formData.typeCurrency}
                onValueChange={(value) =>
                  handleSelectChange("typeCurrency", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el tipo de moneda" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TypeCurrency.SOL}>SOL</SelectItem>
                  <SelectItem value={TypeCurrency.DOLAR}>DOLAR</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Precio</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="button" onClick={() => handleSubmit("price")}>
              Guardar Configuración de Precio
            </Button>
          </CardFooter>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
