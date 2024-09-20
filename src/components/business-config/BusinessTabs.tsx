import { CreateBusinessConfigSchema } from "@/schemas/businessInformation/createBusinessConfigSchema";
import { Building2, CalendarDays, DoorClosed, DoorOpen } from "lucide-react";
import { useForm } from "react-hook-form";

import { BusinessHourPopover } from "@/components/business-config/BusinessHourPopover";
import { CreateBusinessConfigForm } from "@/components/business-config/CreateBusinessConfigForm";
import { UpdateBusinessHoursSheet } from "@/components/business-config/UpdateBusinessHoursSheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BusinessHour {
  id: string;
  dayOfWeek: string;
  openingTime: string;
  closingTime: string;
  isOpen: boolean;
}

interface BusinessTabsProps {
  form: ReturnType<typeof useForm<CreateBusinessConfigSchema>>;
  handleSubmit: (data: CreateBusinessConfigSchema) => Promise<void>;
  daysOfWeek: { [key: string]: string };
  businessHoursArray: BusinessHour[];
  refetchBusinessHours: () => void;
}

export function BusinessTabs({
  form,
  handleSubmit,
  daysOfWeek,
  businessHoursArray,
  refetchBusinessHours,
}: BusinessTabsProps) {
  return (
    <Tabs defaultValue="information" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="information">
          <Building2 className="mr-2 h-4 w-4" />
          Información
        </TabsTrigger>
        <TabsTrigger value="schedule">
          <CalendarDays className="mr-2 h-4 w-4" />
          Horario
        </TabsTrigger>
      </TabsList>

      <TabsContent value="information">
        <Card>
          <CardHeader>
            <CardTitle>Información</CardTitle>
            <CardDescription>
              Ingrese los detalles de su empresa a continuación.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreateBusinessConfigForm form={form} onSubmit={handleSubmit} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="schedule">
        <Card>
          <div>
            <CardHeader>
              <div>
                <CardTitle>Horario</CardTitle>
                <CardDescription>
                  Configure el horario de atención de su empresa.
                </CardDescription>
              </div>
              <div>
                <UpdateBusinessHoursSheet
                  daysOfWeek={daysOfWeek}
                  businessHoursArray={businessHoursArray}
                  refetchBusinessHours={refetchBusinessHours}
                />
              </div>
            </CardHeader>
          </div>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(daysOfWeek).map(([day, dayInSpanish]) => {
                const businessHour = businessHoursArray.find(
                  (bh: BusinessHour) => bh.dayOfWeek === day,
                );
                return (
                  <div key={day} className="flex items-center space-x-4">
                    <Label className="w-24">{dayInSpanish}</Label>
                    <div className="flex gap-2">
                      <span className="text-xs text-slate-500">
                        <DoorOpen />
                      </span>{" "}
                      {businessHour?.openingTime} -
                      <span className="text-xs text-slate-500">
                        <DoorClosed />
                      </span>
                      {businessHour?.closingTime}
                    </div>
                    <BusinessHourPopover
                      day={dayInSpanish}
                      openingTime={businessHour?.openingTime || "00:00"}
                      closingTime={businessHour?.closingTime || "00:00"}
                      id={businessHour?.id || ""}
                    />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
