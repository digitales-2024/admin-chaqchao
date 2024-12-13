"use client";
import { useProtectedRoutes } from "@/utils/protectedRoutes";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { Shell } from "@/components/common/Shell";
import AdminPanelLayout from "@/components/layouts/AdminPanelLayout";
import { Card } from "@/components/ui/card";

// Define las rutas protegidas
const protectedRoutes = [
  { path: "/products", module: "PRD", permission: "READ" },
  { path: "/products/categories", module: "CAT", permission: "READ" },
  { path: "/users", module: "users", permission: "READ" },
  { path: "/users/roles", module: "users", permission: "READ" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const router = useRouter();
  const { canAccessRoute, isLoadingHas } = useProtectedRoutes();
  useEffect(() => {
    if (!isLoadingHas) return; // Espera a que los datos estén cargados

    const currentRoute = protectedRoutes.find((route) => route.path === path);

    if (
      currentRoute &&
      !canAccessRoute({
        module: currentRoute.module,
        permissions: [currentRoute.permission],
      })
    ) {
      router.push("/"); // Redirige si no tiene acceso
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingHas, path, router]);

  return (
    <AdminPanelLayout>
      <Card className="border-none">
        <Shell>{children}</Shell>
      </Card>
    </AdminPanelLayout>
  );
}
