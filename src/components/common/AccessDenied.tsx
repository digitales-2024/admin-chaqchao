"use client";

interface AccessDeniedProps {
  message?: string;
}

export const AccessDenied = ({ message }: AccessDeniedProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h2 className="text-xl font-semibold text-red-600">Acceso Denegado</h2>
      <p className="text-gray-600">
        {message || "No tienes permisos para acceder a esta sección."}
      </p>
    </div>
  );
};
