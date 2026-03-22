import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/styles.css"; // tus estilos personalizados

import { movements } from "./storage.js";
import displayMovements from "./display-movements.js";
import { users } from "./user.js";

const movementUSDfor = [];
const rate = 1.1;
for (const mov of movements) movementUSDfor.push(mov);

// Display movements
displayMovements(users[1].movements);
document.querySelector("#balance").textContent =
  "DOP " + users[1].movements.reduce((acc, mov) => acc + mov, 0).toFixed(2);

const movementsDescription = movementUSDfor.map((mov, i, arr) => {
  return `Movement ${i + 1}: You ${mov >= 0 ? "deposit" : "withdrew"} ${Math.abs(mov)}`;
});

console.log(movementsDescription);
