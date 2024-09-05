// import { useState } from "react";

// import { ScrollArea } from "../ui/scroll-area";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "../ui/tooltip";

// export const TablePermissions = () => {
//   const [expandedModule, setExpandedModule] = useState<string | null>(null);

//   const toggleModule = (moduleName: string) => {
//     setExpandedModule(expandedModule === moduleName ? null : moduleName);
//   };

//   const allPermissions = groupPermissions(data?.modulePermissions || []);

//   function groupPermissions(modules) {
//     const permissionsMap = {};

//     modules.forEach((module) => {
//       module.permissions.forEach((permission) => {
//         // Extraer la acción del código (ej. 'SAVE' de 'RPT-SAVE' incluso el 'RPT-SAVE-ALL' sacar SAVE-ALL)
//         const action = extractCode(permission.cod);

//         // Si no existe el permiso en el mapa, lo añadimos
//         if (!permissionsMap[action]) {
//           permissionsMap[action] = {
//             cod: action,
//             label: permissionLabels[action] || action,
//             description: `Permiso para ${permissionLabels[action]?.toLowerCase() || action.toLowerCase()} en cualquier módulo.`,
//           };
//         }
//       });
//     });

//     // Convertir el mapa en un arreglo
//     return Object.values(permissionsMap);
//   }
//   return (
//     <div className="w-full">
//       {/* Desktop view */}
//       <div className="hidden md:block">
//         <ScrollArea className="h-[400px] rounded-md border">
//           <Table>
//             <TableCaption>Todos los permisos de este rol</TableCaption>
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="w-[100px]">Módulo</TableHead>
//                 {allPermissions.map((permission) => (
//                   <TableHead key={permission.cod}>{permission.label}</TableHead>
//                 ))}
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {data?.modulePermissions.map((module) => (
//                 <TableRow key={module.id}>
//                   <TableCell className="font-medium">{module.name}</TableCell>
//                   {allPermissions.map((permission) => (
//                     <TableCell key={permission.cod}></TableCell>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </ScrollArea>
//       </div>

//       {/* Mobile view */}
//       <div className="md:hidden">
//         {data?.modulePermissions.map((module) => (
//           <div key={module.name} className="mb-4 rounded-md border">
//             <Button
//               variant="ghost"
//               className="w-full justify-between p-4 text-left"
//               onClick={() => toggleModule(module.name)}
//             >
//               {module.name}
//               {expandedModule === module.name ? (
//                 <ChevronUp className="h-4 w-4" />
//               ) : (
//                 <ChevronDown className="h-4 w-4" />
//               )}
//             </Button>
//             {expandedModule === module.name && (
//               <div className="p-4">
//                 {Object.entries(module.permissions).map(([key, permission]) => (
//                   <div
//                     key={key}
//                     className="mb-2 flex items-center justify-between"
//                   >
//                     <span>{permission.description}</span>
//                     <Badge variant="default" className="bg-green-500">
//                       ✓
//                     </Badge>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
