import { useBussinessConfig } from "@/hooks/use-business-config";
import { CreateBusinessConfigSchema } from "@/schemas/businessInformation/createBusinessConfigSchema";
import {
  Building2,
  CalendarDays,
  DoorClosed,
  DoorOpen,
  Minus,
} from "lucide-react";
import { useEffect, useState } from "react";
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

import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

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

const tabs = [
  {
    id: "information",
    label: "Información",
    icon: Building2,
  },
  {
    id: "schedule",
    label: "Horario",
    icon: CalendarDays,
  },
];

export function BusinessTabs({
  form,
  handleSubmit,
  daysOfWeek,
  businessHoursArray,
  refetchBusinessHours,
}: BusinessTabsProps) {
  const {
    dataBusinessConfigAll: businessConfigData,
    isSuccess,
    refetch: refetchBusinessConfig,
  } = useBussinessConfig();
  const [isBusinessConfigCreated, setIsBusinessConfigCreated] = useState(false);

  useEffect(() => {
    if (isSuccess && businessConfigData && businessConfigData.length > 0) {
      setIsBusinessConfigCreated(true);
    } else {
      setIsBusinessConfigCreated(false);
    }
  }, [isSuccess, businessConfigData]);

  const onSubmit = async (data: CreateBusinessConfigSchema) => {
    await handleSubmit(data);
    refetchBusinessConfig(); // Refrescar datos después de la sumisión
  };

  return (
    <Tabs defaultValue="information" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            className="flex"
            value={tab.id}
            disabled={tab.id === "schedule" && !isBusinessConfigCreated}
          >
            <tab.icon className="mr-2 h-4 w-4 flex-shrink-0" />
            <span className="truncate text-ellipsis">{tab.label}</span>
          </TabsTrigger>
        ))}
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
            <CreateBusinessConfigForm form={form} onSubmit={onSubmit} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="schedule">
        <Card>
          <CardHeader>
            <CardTitle>Horario</CardTitle>
            <CardDescription>
              Configure el horario de atención de su empresa.
            </CardDescription>
            <div className="flex justify-start">
              <UpdateBusinessHoursSheet
                daysOfWeek={daysOfWeek}
                businessHoursArray={businessHoursArray}
                refetchBusinessHours={refetchBusinessHours}
              />
            </div>
          </CardHeader>
          <Separator className="mb-6" />
          <CardContent className="w-full space-y-2">
            <div className="flex w-full flex-col gap-10">
              {Object.entries(daysOfWeek).map(([day, dayInSpanish]) => {
                const businessHour = businessHoursArray.find(
                  (bh: BusinessHour) => bh.dayOfWeek === day,
                );
                return (
                  <div
                    key={day}
                    className="flex w-full items-center justify-between gap-y-4"
                  >
                    <div className="flex w-full flex-wrap items-center justify-between gap-2">
                      <Label className="w-32 uppercase">
                        <Badge
                          variant="outline"
                          className="border border-emerald-600"
                        >
                          {dayInSpanish}
                        </Badge>
                      </Label>
                      <div className="flex items-center justify-center gap-2">
                        <DoorOpen
                          className="size-4 flex-wrap text-slate-500"
                          strokeWidth={1}
                        />
                        {businessHour?.openingTime}
                        <Minus className="text-emerald-500" />
                        {businessHour?.closingTime}
                        <DoorClosed
                          className="size-4 flex-wrap text-slate-500"
                          strokeWidth={1}
                        />
                      </div>
                    </div>
                    <div className="w-fit">
                      <BusinessHourPopover
                        day={dayInSpanish}
                        openingTime={businessHour?.openingTime || "00:00"}
                        closingTime={businessHour?.closingTime || "00:00"}
                        id={businessHour?.id || ""}
                      />
                    </div>
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
