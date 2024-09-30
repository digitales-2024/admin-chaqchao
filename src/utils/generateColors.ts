// Variables con los colores de Tailwind CSS
const tailwindColors = [
  "#fbbf24", // yellow-500
  "#60a5fa", // blue-500
  "#a78bfa", // purple-500
  "#f472b6", // pink-500
  "#fb923c", // orange-500
  "#38bdf8", // sky-500
  "#22d3ee", // cyan-500
  "#4ade80", // lime-500
  "#facc15", // amber-500
  "#e879f9", // fuchsia-500
  "#c084fc", // violet-500
  "#f97316", // orange-500
  "#2dd4bf", // teal-500
];

// Función para generar una paleta de colores
export const generateColors = (numCategories: number): string[] => {
  const colors: string[] = [];
  for (let i = 0; i < numCategories; i++) {
    colors.push(tailwindColors[i % tailwindColors.length]);
  }
  return colors;
};
