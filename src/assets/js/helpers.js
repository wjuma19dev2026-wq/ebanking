// @ts-check

/**
 * @typedef { Object } User
 * @property {string} owner
 * @property {number[]} movements
 * @property {number} interestRate
 * @property {number} pin
 * @property {string} [username]
 */

import { formatCurrency } from "./currency.js";

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

export const calcPrintBalance = (movements) => {
  const balance = movements.reduce((acc, mov) => {
    return acc + mov;
  }, 0);
  return formatCurrency(balance);
};

/** @type {( movements: number[] ) => { sum_income: string, sum_out: string, interest: string  }} */
export const calSumInBalance = (movements) => {
  const sum_income = formatCurrency(
    movements.filter((mov) => mov >= 0).reduce((acc, mov) => acc + mov, 0),
    "EUR",
    "es-ES",
  );
  const sum_out = formatCurrency(
    Math.abs(
      movements.filter((mov) => mov < 0).reduce((acc, mov) => acc + mov, 0),
    ),
    "EUR",
    "es-ES",
  );
  const interest = formatCurrency(
    movements
      .filter((mov) => mov >= 0)
      .map((deposit) => (deposit * 1.2) / 100)
      .filter((int, i, arr) => {
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
