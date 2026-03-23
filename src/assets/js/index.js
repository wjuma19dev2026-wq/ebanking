import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/styles.css"; // tus estilos personalizados

import displayMovements from "./display.js";
import { users } from "./user.js";
import { calcPrintBalance, calSumInBalance } from "./helpers.js";

const label_balance = document.querySelector("#label-balance");
const label_sum_in = document.querySelector("#label-sum-in");
const label_sum_out = document.querySelector("#label-sum-out");
const label_sum_int = document.querySelector("#label-sum-int");

const user = users[0];
const movements = user.movements;

/**
 * Muestra los movimientos del usuario dentro de una lista
 */
displayMovements(movements);

const deposits = movements.filter((mov) => mov > 0);
const depositsFor = [];
for (const d of deposits) {
  if (d > 0) depositsFor.push(d);
}

/**
 * Funcion que imprime el balance en pantalla
 * @type { () => void } No devuelve nada
 */
function display_balance() {
  label_balance.textContent = calcPrintBalance(movements);
}
display_balance();

/**
 * Funcion que imprime en pantalla el income, out e interest.
 * @type {Function} void No devuelve nada
 */
function display_summary() {
  const { sum_income, sum_out, interest } = calSumInBalance(movements);
  label_sum_in.textContent = sum_income;
  label_sum_out.textContent = sum_out;
  label_sum_int.textContent = interest;
}
display_summary();

const eurToUsd = 1.1;
const totalEurToDollar = (mvs) =>
  mvs.filter((mov) => mov > 0).reduce((acc, mov) => acc + mov * eurToUsd, 0);
const balanceUSD = totalEurToDollar(movements);
// console.log(balanceUSD);
