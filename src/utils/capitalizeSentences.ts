/**
 * Capitalice la primera letra de cada oración en un texto.
 * @param text Texto a capitalizar.
 * @returns  Texto con la primera letra de cada oración en mayúscula.
 */
export const capitalizeSentences = (text: string) => {
  return text.replace(/(?:^|\. ?)([a-záéíóúüñ])/g, function (match, p1) {
    return match.replace(p1, p1.toUpperCase());
  });
};
