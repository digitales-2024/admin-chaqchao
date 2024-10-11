export function getGreeting(): string {
  const currentHour = new Date().getHours();

  if (currentHour >= 0 && currentHour < 12) {
    return "Buen día";
  } else {
    return "Buenas tardes";
  }
}
