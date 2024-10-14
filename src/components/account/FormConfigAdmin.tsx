import { useProfile } from "@/hooks/use-profile";

import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { TablePermissions } from "./TablePermissions";

export const FormConfigAdmin = () => {
  const { user } = useProfile();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Permisos</CardTitle>
        <CardDescription>Administrar los permisos del usuario</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-start gap-2 space-y-2">
          <Label>Rol de usuario</Label>
          <Badge variant="secondary" className="text-sm capitalize">
            {user?.roles[0].name}
          </Badge>
        </div>
        <div className="space-y-2">
          <Label>Permisos</Label>
          <TablePermissions rol={user?.roles[0].id} />
        </div>
      </CardContent>
    </Card>
  );
};
