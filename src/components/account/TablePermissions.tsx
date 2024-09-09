import { ScrollArea } from "../ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export const TablePermissions = () => {
  // const [expandedModule, setExpandedModule] = useState<string | null>(null);

  // const toggleModule = (moduleName: string) => {
  //   setExpandedModule(expandedModule === moduleName ? null : moduleName);
  // };

  // const { user } = useAuth();

  // const { data } = useGetRoleQuery(user?.id ?? 0);

  return (
    <div className="w-full">
      {/* Desktop view */}
      <div className="hidden md:block">
        <ScrollArea className="h-[400px] rounded-md border">
          <Table>
            <TableCaption>Todos los permisos de este rol</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Módulo</TableHead>
                {/* {allPermissions.map((permission) => (
                  <TableHead key={permission.cod}>{permission.label}</TableHead>
                ))} */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* {data?.modulePermissions.map((module) => (
                <TableRow key={module.id}>
                  <TableCell className="font-medium">{module.name}</TableCell>
                  {allPermissions.map((permission) => (
                    <TableCell key={permission.cod}></TableCell>
                  ))} 
                </TableRow>
              ))}*/}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        {/* {data?.modulePermissions.map((module) => (
          <div key={module.name} className="mb-4 rounded-md border">
            <Button
              variant="ghost"
              className="w-full justify-between p-4 text-left"
              onClick={() => toggleModule(module.name)}
            >
              {module.name}
              {expandedModule === module.name ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
            {expandedModule === module.name && (
              <div className="p-4">
                {Object.entries(module.permissions).map(([key, permission]) => (
                  <div
                    key={key}
                    className="mb-2 flex items-center justify-between"
                  >
                    <span>{permission.description}</span>
                    <Badge variant="default" className="bg-green-500">
                      ✓
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))} */}
      </div>
    </div>
  );
};
