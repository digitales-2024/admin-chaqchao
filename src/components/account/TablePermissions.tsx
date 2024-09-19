import { useAuth } from "@/hooks/use-auth";
import { useGetRoleQuery } from "@/redux/services/rolesApi";
import { Module, Permission } from "@/types";
import { extractUniquePermissions } from "@/utils/extractUniquePermissions";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export const TablePermissions = () => {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const toggleModule = (moduleName: string) => {
    setExpandedModule(expandedModule === moduleName ? null : moduleName);
  };

  const { user } = useAuth();
  const { data } = useGetRoleQuery(user?.roles[0].id as string);
  const [headerPermissions, setHeaderPermissions] = useState<Permission[]>();
  useEffect(() => {
    if (data) {
      const uniquePermissions = extractUniquePermissions(data);
      setHeaderPermissions(uniquePermissions);
    }
  }, [data]);

  return (
    <div className="w-full">
      {/* Desktop view */}
      <div className="hidden md:block">
        <ScrollArea className="h-fit rounded-md border">
          <Table>
            <TableCaption>Todos los permisos de este rol</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="uppercase">Módulo</TableHead>
                {headerPermissions?.map((permission) => (
                  <TableHead key={permission.id} className="uppercase">
                    {permission.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.rolPermissions.map(
                ({
                  module,
                  permissions,
                }: {
                  module: Module;
                  permissions: Permission[];
                }) => (
                  <TableRow key={module.id}>
                    <TableCell className="font-medium uppercase">
                      {module.name}
                    </TableCell>
                    {headerPermissions?.map((permission: Permission) => (
                      <TableCell key={permission.cod}>
                        {permissions?.some(
                          (perm) => perm.cod === permission.cod,
                        ) ? (
                          <Badge
                            variant="default"
                            className="bg-green-500 hover:bg-green-600"
                          >
                            ✓
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-gray-400">
                            -
                          </Badge>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        {data?.rolPermissions.map(
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
                className="w-full justify-between p-4 text-left"
                onClick={() => toggleModule(module.name)}
              >
                <span className="uppercase">{module.name}</span>
                {expandedModule === module.name ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
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
                        ✓
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ),
        )}
      </div>
    </div>
  );
};
