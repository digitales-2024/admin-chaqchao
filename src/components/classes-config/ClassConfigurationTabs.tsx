import { CalendarClock, CreditCard, NotebookTabs } from "lucide-react";
import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { GeneralConfigForm } from "./GeneralConfigForm";
import { PriceConfigSection } from "./PriceConfigSection";

export default function ClassConfigurationTabs() {
  const [generalFormData, setGeneralFormData] = useState({
    languageName: "",
    closeBeforeStartInterval: 0,
    finalRegistrationCloseInterval: 0,
  });

  const [activeTab, setActiveTab] = useState("schedule");

  const handleGeneralInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGeneralFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="mx-auto w-full">
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="schedule">
            {" "}
            <CalendarClock className="mr-2 h-4 w-4" />
            Horario
          </TabsTrigger>
          <TabsTrigger value="config">
            {" "}
            <NotebookTabs className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="price">
            {" "}
            <CreditCard className="mr-2 h-4 w-4" />
            Precio
          </TabsTrigger>
        </TabsList>
        <TabsContent value="schedule">
          <CardContent className="space-y-4"></CardContent>
        </TabsContent>
        <TabsContent value="config">
          <GeneralConfigForm
            formData={generalFormData}
            handleInputChange={handleGeneralInputChange}
          />
        </TabsContent>
        <TabsContent value="price">
          <PriceConfigSection />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
