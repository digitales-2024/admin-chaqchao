/**
 * Extraer el codigo de una cadena de texto
 *
 * @param text Texto del que se va a extraer el codigo
 * @returns Codigo extraido
 * @example extractCode('RPT-SAVE' || 'RPT-GET-ALL') // 'SAVE' || 'GET-ALL'
 */
export function extractCode(text: string): string {
  const index = text.indexOf("-");
  return index !== -1 ? text.substring(index + 1) : text;
}
