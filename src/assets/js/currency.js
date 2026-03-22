/**
 * Formatea un número como moneda (Similar al currency pipe de Angular)
 * @param {number} value - El número a formatear
 * @param {string} currencyCode - Código de moneda (USD, EUR, MXN, etc.)
 * @param {string} locale - Idioma/Región (es-MX, en-US, es-ES)
 * @returns {string}
 */
export const formatCurrency = (value, currencyCode = "USD", locale = "en-US") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
