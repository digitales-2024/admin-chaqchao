import { CalendarClock, Clock2, Languages } from "lucide-react";
import { useState } from "react";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { LanguageConfigSection } from "./class-language-config/LanguageConfigSection";
import { RegistrationConfigSection } from "./class-registration-config/RegistrationConfigSection";
import { ScheduleConfigSection } from "./class-schedule-config/ScheduleConfigSection";

const tabs = [
  {
    id: "schedule",
    icon: CalendarClock,
    label: "Horarios/Precios/Capacidad",
    content: <ScheduleConfigSection />,
  },
  {
    id: "language",
    icon: Languages,
    label: "Lenguaje",
    content: <LanguageConfigSection />,
  },
  {
    id: "registration",
    icon: Clock2,
    label: "Registro",
    content: <RegistrationConfigSection />,
  },
  // {
  //   id: "price",
  //   icon: CreditCard,
  //   label: "Precio",
  //   content: <PriceConfigSection />,
  // },
  // {
  //   id: "capacity",
  //   icon: UsersRound,
  //   label: "Capacidad",
  //   content: <CapacityConfigSection />,
  // },
];

export default function ClassConfigurationTabs() {
  const [activeTab, setActiveTab] = useState("schedule");

  return (
    <Card className="mx-auto w-full">
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value)}
        className="w-full"
      >
        <TabsList className="grid h-fit w-full grid-cols-1 sm:grid-cols-3">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} className="flex" value={tab.id}>
              <tab.icon className="mr-2 h-4 w-4 flex-shrink-0" />
              <span className="truncate text-ellipsis">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
}
