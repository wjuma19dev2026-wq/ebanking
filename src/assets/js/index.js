import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/styles.css"; // tus estilos personalizados

import displayMovements from "./display.js";
import { users } from "./user.js";
import {
  calcPrintBalance,
  calSumInBalance,
  clearElement,
  generarUsernames,
} from "./helpers.js";

window.addEventListener("load", () => {
  document.querySelector("#wrapper").style.opacity = 1;
  const loader = document.getElementById("loader");

  // Añadimos la clase que lo oculta con transición
  loader.classList.add("loader-hidden");

  // Opcional: eliminarlo del DOM después de la transición para ahorrar recursos
  loader.addEventListener("transitionend", function () {
    if (loader.parentNode) {
      loader.parentNode.removeChild(loader);
    }
  });
});

const movements_wrapper = document.querySelector("#movements");
const login_form = document.querySelector("#login-form");
const label_welcome = document.querySelector("#label-welcome");
const label_balance = document.querySelector("#label-balance");
const label_sum_in = document.querySelector("#label-sum-in");
const label_sum_out = document.querySelector("#label-sum-out");
const label_sum_int = document.querySelector("#label-sum-int");

/*******************************************************************
 * LOGIN ***********************************************************
 ******************************************************************/
let current_account = users[0];
const users_with_username = generarUsernames(users);

const onSubmit = (ev) => {
  ev.preventDefault();
  const data = new FormData(ev.target);
  const values = Object.fromEntries(data.entries());
  const { username, pin } = values;

  const user = users_with_username.find((user) => user.username === username);

  if (!user) {
    console.log("User not exist.");
    return;
  }

  if (user?.pin !== Number(pin)) {
    console.log("Invalid credentials.");
    return;
  }

  // Asignar el usuario activo
  current_account = user;
  // Limpiar formulario
  ev.target.reset();
  // Display UI and Message
  label_welcome.innerHTML = `<span class="text-secondary">Welcome back,</span> <span class="text-muted fw-bold">${user.owner.split(" ")[0]}</span>`;
  clearElement(movements_wrapper);
  // Display Movements
  displayMovements(current_account.movements);
  // Display Balance
  display_balance();
  // Display Summary
  display_summary();
};
login_form.addEventListener("submit", onSubmit);
/******************************************************************/

displayMovements(current_account.movements);

/**
 * Funcion que imprime el balance en pantalla
 * @type { () => void } No devuelve nada
 */
function display_balance() {
  label_balance.textContent = calcPrintBalance(current_account.movements);
}
display_balance();

/**
 * Funcion que imprime en pantalla el income, out e interest.
 * @type {Function} void No devuelve nada
 */
function display_summary() {
  const { sum_income, sum_out, interest } = calSumInBalance(current_account);
  label_sum_in.textContent = sum_income;
  label_sum_out.textContent = sum_out;
  label_sum_int.textContent = interest;
}
display_summary();
