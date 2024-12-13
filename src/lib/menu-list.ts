import { usePermissions } from "@/hooks/use-permissions";
import {
  Users,
  LayoutGrid,
  LucideIcon,
  Package,
  Truck,
  BookUser,
  Clipboard,
  Store,
  BookOpenCheck,
  Book,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
  show: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  show: boolean;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function GetMenuList(pathname: string): Group[] {
  const { hasPermission } = usePermissions();
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/",
          label: "Dashboard",
          active: "/" === pathname,
          icon: LayoutGrid,
          show: true,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Módulos",
      menus: [
        {
          href: "",
          label: "Productos",
          active: pathname.includes("/products"),
          icon: Package,
          show:
            hasPermission("PRD", ["READ"]) || hasPermission("CAT", ["READ"]),
          submenus: [
            {
              href: "/products",
              label: "Productos",
              active: pathname === "/products",
              show: hasPermission("PRD", ["READ"]),
            },
            {
              href: "/products/categories",
              label: "Categorías",
              active: pathname.includes("/categories"),
              show: hasPermission("CAT", ["READ"]),
            },
          ],
        },
        {
          href: "/orders",
          label: "Pedidos",
          active: pathname.includes("/orders"),
          icon: Truck,
          show: hasPermission("ORD", ["READ"]),
          submenus: [],
        },
        {
          href: "/clients",
          label: "Clientes",
          active: pathname.includes("/clients"),
          icon: BookUser,
          show: hasPermission("CST", ["READ"]),
          submenus: [],
        },
        {
          href: "/reports",
          label: "Reportes",
          active: pathname.includes("/reports"),
          icon: Clipboard,
          show: hasPermission("RPT", ["READ"]),
          submenus: [],
        },
        {
          href: "/class",
          label: "Clases",
          active: pathname === "/class",
          icon: BookOpenCheck,
          show: hasPermission("CLS", ["READ"]),
          submenus: [],
        },
        {
          href: "/claims",
          label: "Reclamos",
          show: hasPermission("CLM", ["READ"]),
          active: pathname === "/claims",
          icon: Book,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Configuración",
      menus: [
        {
          href: "/users",
          label: "Usuarios",
          show:
            hasPermission("USR", ["READ"]) ||
            hasPermission("ROL", ["READ"]) ||
            hasPermission("PER", ["READ"]),
          active: pathname.includes("/users"),
          icon: Users,
          submenus: [
            {
              href: "/users",
              label: "Usuarios",
              active: pathname === "/users",
              show: hasPermission("USR", ["READ"]),
            },
            {
              href: "/users/roles",
              label: "Roles",
              active: pathname.includes("/roles"),
              show: hasPermission("ROL", ["READ"]),
            },
            {
              href: "/users/permissions",
              label: "Permisos",
              active: pathname.includes("/permissions"),
              show: hasPermission("PRM", ["READ"]),
            },
          ],
        },
        {
          href: "/bussiness",
          label: "Negocio",
          show:
            hasPermission("BNSS", ["READ"]) || hasPermission("STG", ["READ"]),
          active: pathname.includes("/bussiness"),
          icon: Store,
          submenus: [
            {
              href: "/bussiness/information-general",
              label: "Información",
              show: hasPermission("BNSS", ["READ"]),
              active: pathname.includes("/information-general"),
            },
            {
              href: "/bussiness/classes-configuration",
              label: "Clases",
              active: pathname.includes("/classes-configuration"),
              show: hasPermission("CLS", ["READ"]),
            },
          ],
        },
      ],
    },
  ];
}
