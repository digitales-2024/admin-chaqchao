"use client";
import { useRol } from "@/hooks/use-rol";
import { Module, Permission } from "@/types";
import { extractUniquePermissionsModules } from "@/utils/extractUniquePermissionsModules";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { useEffect, useState } from "react";

import { HeaderPage } from "@/components/common/HeaderPage";
import { Shell } from "@/components/common/Shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function PagePermissions() {
  const { dataRolPermissions } = useRol();
  const [headerPermissions, setHeaderPermissions] = useState<Permission[]>();
  useEffect(() => {
    if (dataRolPermissions) {
      const uniquePermissions =
        extractUniquePermissionsModules(dataRolPermissions);
      setHeaderPermissions(uniquePermissions);
    }
  }, [dataRolPermissions]);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const toggleModule = (moduleName: string) => {
    setExpandedModule(expandedModule === moduleName ? null : moduleName);
  };

  return (
    <Shell>
      <HeaderPage
        title="Permisos"
        description="Todos los permisos de cada módulo"
      />

      <div className="hidden md:block">
        <Table>
          <TableCaption>Todos los modulos y permisos</TableCaption>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="uppercase">Módulo</TableHead>
              {headerPermissions?.map((permission) => (
                <TableHead key={permission.id} className="uppercase">
                  {permission.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataRolPermissions?.map(({ module, permissions }) => (
              <TableRow key={module.id}>
                <TableCell className="inline-flex w-full items-center justify-between bg-slate-50">
                  <span className="uppercase">{module.name}</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="size-4 text-slate-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{module.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                {headerPermissions?.map((permission) => {
                  const hasPermission = permissions.find(
                    (p) => p.id === permission.id,
                  );
                  return (
                    <TableCell key={permission.id}>
                      {hasPermission ? (
                        <Badge
                          variant="default"
                          className="bg-green-500 hover:bg-green-600"
                        >
                          Si
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-gray-400">
                          No
                        </Badge>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Mobile view */}
      <div className="md:hidden">
        {dataRolPermissions?.map(
          ({
            module,
            permissions,
          }: {
            module: Module;
            permissions: Permission[];
          }) => (
            <div key={module.name} className="mb-4 rounded-md border">
              <Button
                variant="ghost"
                className="inline-flex w-full justify-between p-4 text-left"
                onClick={() => toggleModule(module.name)}
              >
                <span className="uppercase">{module.name}</span>
                <div className="inline-flex gap-6">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="size-4 text-slate-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{module.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {expandedModule === module.name ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </Button>
              {expandedModule === module.name && (
                <div className="p-4">
                  {permissions.map((permission) => (
                    <div
                      key={permission.cod}
                      className="mb-2 flex items-center justify-between"
                    >
                      <span className="capitalize">{permission.name}</span>
                      <Badge variant="default" className="bg-green-500">
                        Si
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ),
        )}
      </div>
    </Shell>
  );
}
