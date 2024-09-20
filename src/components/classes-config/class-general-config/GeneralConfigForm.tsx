import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GeneralConfigFormProps {
  formData: {
    languageName: string;
    closeBeforeStartInterval: number;
    finalRegistrationCloseInterval: number;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function GeneralConfigForm({
  formData,
  handleInputChange,
}: GeneralConfigFormProps) {
  const handleSubmit = () => {
    const generalData = {
      languageName: formData.languageName,
      closeBeforeStartInterval: formData.closeBeforeStartInterval,
      finalRegistrationCloseInterval: formData.finalRegistrationCloseInterval,
    };
    console.log("Datos del formulario de configuración general:", generalData);
  };

  return (
    <>
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
        <Button type="button" onClick={handleSubmit}>
          Guardar Configuración
        </Button>
      </CardFooter>
    </>
  );
}
