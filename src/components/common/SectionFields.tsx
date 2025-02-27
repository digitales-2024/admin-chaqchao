import { ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NamedSectionProps {
  name: string;
  children: ReactNode;
}

export default function SectionFields({ name, children }: NamedSectionProps) {
  return (
    <Card className="mx-auto w-full max-w-2xl border-none bg-slate-50 shadow-none">
      <CardHeader className="p-3">
        <CardTitle className="text-balance text-xs font-black tracking-widest text-slate-600">
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-3">{children}</CardContent>
    </Card>
  );
}
