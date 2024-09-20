import { CalendarClock, Clock2, CreditCard, Languages } from "lucide-react";
import { useState } from "react";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { LanguageConfigSection } from "./class-language-config/LanguageConfigSection";
import { PriceConfigSection } from "./class-price-config/PriceConfigSection";
import { ScheduleConfigSection } from "./class-schedule-config/ScheduleConfigSection";

export default function ClassConfigurationTabs() {
  const [activeTab, setActiveTab] = useState("schedule");

  return (
    <Card className="mx-auto w-full">
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="schedule">
            {" "}
            <CalendarClock className="mr-2 h-4 w-4" />
            Horario
          </TabsTrigger>
          <TabsTrigger value="language">
            {" "}
            <Languages className="mr-2 h-4 w-4" />
            Lenguaje
          </TabsTrigger>
          <TabsTrigger value="registration">
            {" "}
            <Clock2 className="mr-2 h-4 w-4" />
            Registro
          </TabsTrigger>
          <TabsTrigger value="price">
            {" "}
            <CreditCard className="mr-2 h-4 w-4" />
            Precio
          </TabsTrigger>
        </TabsList>
        <TabsContent value="schedule">
          <ScheduleConfigSection />
        </TabsContent>
        <TabsContent value="language">
          <LanguageConfigSection />
        </TabsContent>
        <TabsContent value="registration"></TabsContent>
        <TabsContent value="price">
          <PriceConfigSection />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
