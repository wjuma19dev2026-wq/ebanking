import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/styles.css"; // tus estilos personalizados

import displayMovements from "./display.js";
import { users } from "./user.js";
import {
  calcPrintBalance,
  calSumInBalance,
  generarUsernames,
  refreshMovements,
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

const login_form = document.querySelector("#login-form");

// Transfer
const transfer_to = document.querySelector("#transfer-to");
const transfer_amount = document.querySelector("#transfer-amount");
const btn_transfer = document.querySelector("#btn-transfer");

// Loan request
const loan_amount = document.querySelector("#loan-amount");
const btn_loan = document.querySelector("#btn-loan");

// Delete account
const deleteAccount = document.querySelector("#delete-account");
const deleteAccountPin = document.querySelector("#delete-account-pin");
const btn_delete = document.querySelector("#btn-delete");

// Account settings
const label_welcome = document.querySelector("#label-welcome");
const label_balance = document.querySelector("#label-balance");
const label_sum_in = document.querySelector("#label-sum-in");
const label_sum_out = document.querySelector("#label-sum-out");
const label_sum_int = document.querySelector("#label-sum-int");

// These variables are set when logging in
let current_account = users[6];
const users_with_username = generarUsernames(users);

// *********************LOGIN*************************************************************
const onFormSubmit = (ev) => {
  ev.preventDefault();
  const data = new FormData(ev.target);
  const values = Object.fromEntries(data.entries());
  const { username, pin } = values;

  const user = users_with_username.find((user) => user.username === username);

  if (!user) {
    console.log("Result: User does not exist.");
    return false;
  }

  if (user?.pin !== Number(pin)) {
    console.log("Result: Invalid credentials.");
    return false;
  }

  // Asignar el usuario activo
  current_account = user;
  // Limpiar formulario
  ev.target.reset();
  // Display UI and Message
  label_welcome.innerHTML = `<span class="text-secondary">Welcome back,</span> <span class="text-muted fw-bold">${user.owner.split(" ")[0]}</span>`;
  refreshMovements(current_account);
};
login_form.addEventListener("submit", onFormSubmit);
// ****************************************************************************************

// ***********************TRANSFER MONEY***************************************************
const onTransferSubmit = function (ev) {
  const transferToAccount = transfer_to.value;
  const transferAmount = transfer_amount.value;
  const receiverAccount = users_with_username.find(
    (account) => account.username === transferToAccount,
  );

  if (!receiverAccount) {
    console.log("Result: User does not found!.");
    return false;
  }

  if (transferAmount <= 0) {
    console.log("Result: Invalid amount, please enter a valid value!.");
    return false;
  }

  if (current_account.balance < transferAmount) {
    console.log("Result: you have no available balance!.");
    return false;
  }

  if (receiverAccount?.username !== current_account.username) {
    current_account?.movements.push(-transferAmount);
    receiverAccount?.movements.push(Number(transferAmount));
    refreshMovements(current_account);
  } else {
    console.log("Result: Invalid account, enter a valid account");
  }
};
btn_transfer.addEventListener("click", onTransferSubmit);
// ***************************************************************************************

// **********************DELETE ACCOUNT***************************************************
const onDeleteSubmit = function () {
  console.log("Eliminando account");
};
btn_delete.addEventListener("click", onDeleteSubmit);
// ***************************************************************************************

displayMovements(current_account.movements);

/**
 * Funcion que imprime el balance en pantalla
 * @type { () => void } No devuelve nada
 */
export function display_balance() {
  label_balance.textContent = calcPrintBalance(current_account);
}
display_balance();

/**
 * Funcion que imprime en pantalla el income, out e interest.
 * @type {Function} void No devuelve nada
 */
export function display_summary() {
  const { sum_income, sum_out, interest } = calSumInBalance(current_account);
  label_sum_in.textContent = sum_income;
  label_sum_out.textContent = sum_out;
  label_sum_int.textContent = interest;
}
display_summary();
