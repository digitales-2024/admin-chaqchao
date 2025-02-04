"use client";

export default function Loading() {
  return (
    <div className="flex items-center justify-center space-x-2 dark:invert">
      <span className="sr-only">Cargando...</span>
      <div className="size-4 animate-bounce rounded-full bg-secondary [animation-delay:-0.3s]" />
      <div className="size-4 animate-bounce rounded-full bg-secondary [animation-delay:-0.15s]" />
      <div className="size-4 animate-bounce rounded-full bg-secondary" />
    </div>
  );
}
