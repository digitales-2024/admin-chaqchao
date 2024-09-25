import {
  Users,
  LayoutGrid,
  LucideIcon,
  Package,
  Truck,
  BookUser,
  Clipboard,
  Store,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/",
          label: "Dashboard",
          active: "/" === pathname,
          icon: LayoutGrid,
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
          submenus: [
            {
              href: "/products",
              label: "Productos",
              active: pathname === "/products",
            },
            {
              href: "/products/categories",
              label: "Categorias",
              active: pathname.includes("/categories"),
            },
          ],
        },
        {
          href: "/orders",
          label: "Pedidos",
          active: pathname.includes("/orders"),
          icon: Truck,
          submenus: [],
        },
        {
          href: "/clients",
          label: "Clientes",
          active: pathname.includes("/clients"),
          icon: BookUser,
          submenus: [],
        },
        {
          href: "/reports",
          label: "Reportes",
          active: pathname.includes("/reports"),
          icon: Clipboard,
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
          active: pathname.includes("/users"),
          icon: Users,
          submenus: [
            {
              href: "/users",
              label: "Usuarios",
              active: pathname.includes("/users"),
            },
            {
              href: "/users/roles",
              label: "Roles",
              active: pathname.includes("/roles"),
            },
            {
              href: "/users/permissions",
              label: "Permisos",
              active: pathname.includes("/permissions"),
            },
          ],
        },
        {
          href: "/bussiness",
          label: "Negocio",
          active: pathname.includes("/bussiness"),
          icon: Store,
          submenus: [
            {
              href: "/bussiness/information-general",
              label: "Información",
              active: pathname.includes("/information-general"),
            },
            {
              href: "/bussiness/classes-configuration",
              label: "Clases",
              active: pathname.includes("/classes-configuration"),
            },
          ],
        },
      ],
    },
  ];
}
