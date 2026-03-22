import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/styles.css"; // tus estilos personalizados

import displayMovements from "./display.js";

import { users } from "./user.js";
import { formatCurrency } from "./currency.js";
import { generarUsernames } from "./helpers.js";

const user = users[1];
const movements = user.movements;

displayMovements(movements);

document.querySelector("#balance").textContent = formatCurrency(
  movements.reduce((acc, mov) => acc + mov, 0),
);

const usersWithUsernames = generarUsernames(users);

const deposits = movements.filter((mov) => mov > 0);
const depositsFor = [];
for (const d of deposits) {
  if (d > 0) depositsFor.push(d);
}
const withdrews = movements.filter((mov) => mov < 0);
console.log(depositsFor);
console.log(withdrews);
