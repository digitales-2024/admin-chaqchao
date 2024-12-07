import { LogoChaqchao } from "@/assets/icons";
import { useBussinessConfig } from "@/hooks/use-business-config";
import { BusinessConfigData } from "@/types";
import { Locate, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const CardBussiness = () => {
  const { dataBusinessConfigAll } = useBussinessConfig();

  const [bussines, setBussines] = useState<BusinessConfigData>({
    id: "",
    businessName: "",
    contactNumber: "",
    email: "",
    address: "",
    ruc: "",
  });

  useEffect(() => {
    if (dataBusinessConfigAll && dataBusinessConfigAll.length > 0) {
      const businessConfig = dataBusinessConfigAll[0];
      setBussines({
        id: businessConfig.id,
        businessName: businessConfig.businessName || "",
        contactNumber: businessConfig.contactNumber || "",
        email: businessConfig.email || "",
        address: businessConfig.address || "",
        ruc: businessConfig.ruc || "",
      });
    }
  }, [dataBusinessConfigAll]);

  return (
    <Card className="mx-auto hidden w-full overflow-hidden md:block">
      <CardHeader className="relative flex min-h-56 flex-col items-center justify-center overflow-hidden bg-gradient-to-t from-transparent to-chaqchao-midning-green/80 pb-2">
        <LogoChaqchao className="absolute h-full opacity-5" />
        <div className="rounded-full bg-white">
          <LogoChaqchao className="size-20" />
        </div>
        <CardTitle className="text-2xl uppercase">
          {bussines?.businessName}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center">
          <Mail className="mr-2 h-4 w-4 shrink-0 text-primary" />
          <span className="text-sm">{bussines.email}</span>
        </div>
        <div className="flex items-center">
          <Phone className="mr-2 h-4 w-4 shrink-0 text-primary" />
          <span className="text-sm">{bussines.contactNumber}</span>
        </div>
        <div className="flex items-center">
          <Locate className="mr-2 h-4 w-4 shrink-0 text-primary" />
          <span className="text-sm">{bussines.address} </span>
        </div>
      </CardContent>
      <CardFooter>
        <span className="w-full text-center text-xs uppercase text-slate-500">
          © {bussines.businessName}
        </span>
      </CardFooter>
    </Card>
  );
};
