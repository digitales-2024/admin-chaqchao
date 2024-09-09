// import { useProfileQuery } from "@/redux/services/adminApi";
// import { useGetRoleQuery } from "@/redux/services/rolesApi";

// import { Button } from "../ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "../ui/card";
// import { Label } from "../ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import { TablePermissions } from "./TablePermissions";

// export const FormConfigAdmin = () => {
//   const { data: dataProfile, isLoading: isLoadignProfile } = useProfileQuery();

//   const { data } = useGetRoleQuery(dataProfile?.roles[0].id);

//   console.log("🚀 ~ FormConfigAdmin ~ data:", data);

//   console.log("🚀 ~ FormConfigAdmin ~ allPermissions:", allPermissions);

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Controles administrativos</CardTitle>
//         <CardDescription>
//           Administrar configuraciones administrativas para este usuario
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <div className="space-y-2">
//           <Label htmlFor="role">Rol de usuario</Label>
//           <Select defaultValue="user">
//             <SelectTrigger id="role">
//               <SelectValue placeholder="Select a role" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="user">User</SelectItem>
//               <SelectItem value="moderator">Moderator</SelectItem>
//               <SelectItem value="admin">Admin</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         <div className="space-y-2">
//           <TablePermissions />
//         </div>
//       </CardContent>
//       <CardFooter>
//         <Button>Save Administrative Changes</Button>
//       </CardFooter>
//     </Card>
//   );
// };
