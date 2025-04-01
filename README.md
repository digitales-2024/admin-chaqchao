# Panel de Administración Chaqchao

Este es el panel de administración para Chaqchao, una aplicación web construida con [Next.js](https://nextjs.org/) que permite gestionar todos los aspectos del negocio.

## Características Principales

- **Dashboard Interactivo**

  - Visualización de estadísticas en tiempo real
  - Gráficos de ventas y pedidos
  - Calendario de eventos
  - Seguimiento de nuevos clientes y pedidos

- **Gestión de Pedidos**

  - Vista en tabla y kanban
  - Filtrado por fecha y estado
  - Detalles completos de cada pedido

- **Gestión de Productos**

  - Catálogo de productos
  - Categorías
  - Reportes de productos más vendidos

- **Gestión de Usuarios**

  - Sistema de roles y permisos
  - Administración de cuentas
  - Configuración de seguridad

- **Reportes y Análisis**

  - Reportes de ventas
  - Análisis de productos
  - Filtros personalizables

- **Gestión de Reclamos**

  - Seguimiento de reclamos
  - Filtrado por fecha

- **Configuración de Clases**
  - Personalización de la experiencia de usuario

## Tecnologías Utilizadas

- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn/ui
- React Query
- NextAuth.js

## Requisitos Previos

- Node.js 18.x o superior
- npm o yarn

## Instalación

1. Clona el repositorio:

```bash
git clone [URL_DEL_REPOSITORIO]
```

2. Instala las dependencias:

```bash
npm install
# o
yarn install
```

3. Configura las variables de entorno:

```bash
cp .env.example .env.local
```

4. Inicia el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## Estructura del Proyecto

```
src/
├── app/                 # Rutas y páginas de la aplicación
├── components/         # Componentes reutilizables
├── hooks/             # Hooks personalizados
├── lib/               # Utilidades y configuraciones
├── schemas/           # Esquemas de validación
└── types/             # Definiciones de tipos TypeScript
```

## Contribución

Las contribuciones son bienvenidas. Por favor, asegúrate de:

1. Hacer fork del repositorio
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia [MIT](LICENSE).
