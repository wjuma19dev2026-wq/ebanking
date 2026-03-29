import { formatCurrency } from "./currency.js";
import displayMovements from "./display.js";
import { display_balance, display_summary } from "./index.js";

export const generarUsernames = (accs) => {
  return accs.map((acc) => {
    const partes = acc.owner
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .split(/\s+/)
      .map((name) => (name.length < 2 ? name[0] : name));
    const inicial = partes[0].charAt(0);
    const apellido = partes[1];
    acc.username = `${inicial}${apellido}`;
    return acc;
  });
};

export const createUsername = (acc) => {
  const partes = acc.owner
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/\s+/)
    .map((name) => (name.length < 2 ? name[0] : name));
  const inicial = partes[0].charAt(0);
  const apellido = partes[1];
  acc.username = `${inicial}${apellido}`;
  return acc;
};

export const calcPrintBalance = (account) => {
  account.balance = account.movements.reduce((acc, mov) => {
    return acc + mov;
  }, 0);
  return formatCurrency(account.balance);
};

/** @type {( account: User ) => { sum_income: string, sum_out: string, interest: string  }} */
export const calSumInBalance = (account) => {
  const sum_income = formatCurrency(
    account.movements
      .filter((mov) => mov >= 0)
      .reduce((acc, mov) => acc + mov, 0),
    "EUR",
    "es-ES",
  );
  const sum_out = formatCurrency(
    Math.abs(
      account.movements
        .filter((mov) => mov < 0)
        .reduce((acc, mov) => acc + mov, 0),
    ),
    "EUR",
    "es-ES",
  );
  const interest = formatCurrency(
    account.movements
      .filter((mov) => mov >= 0)
      .map((deposit) => (deposit * account.interestRate) / 100)
      .filter((int) => {
        // console.log(int);
        // Solo paga interes a depositos mayores a 1
        return int >= 1;
      })
      .reduce((acc, mov) => acc + mov, 0),
    "EUR",
    "es-ES",
  );
  return {
    sum_income,
    sum_out,
    interest,
  };
};

export const clearElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

export const refreshMovements = (acc) => {
  displayMovements(acc);
  display_balance();
  display_summary();
};

/**
 * Formatear la hora recibida en minutos y segundos
 * @param  { number } segundos Segundos debe de ser tipo numero
 * @return { string }
 */
export const formatearHora = (segundos) => {
  const min = Math.floor(segundos / 60)
    .toString()
    .padStart(2, "0");
  const sec = (segundos % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
};

const FORMAT_DAYS_PASSED = (dateNow, datePass) =>
  Math.round(Math.abs(datePass - dateNow) / (1000 * 60 * 60 * 24));
export const formatearFecha = (fecha, locale) => {
  const days = FORMAT_DAYS_PASSED(new Date(), new Date(fecha));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days <= 7) return "This week";

  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(fecha));
};
