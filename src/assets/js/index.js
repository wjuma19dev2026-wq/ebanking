import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/bootstrap.min.css";
import "../css/styles.css"; // tus estilos personalizados

import displayMovements from "./display.js";
import { accounts } from "./user.js";
import {
  calcPrintBalance,
  calSumInBalance,
  generarUsernames,
  refreshMovements,
} from "./helpers.js";

/** @typedef { import('./types.js').DateTimeOptions } DateOptions */

const login_form = document.querySelector("#login-form");

// Transfer
const btn_transfer = document.querySelector("#btn-transfer");

// Loan request
const loan_amount = document.querySelector("#loan-amount");
const btn_loan = document.querySelector("#btn-loan");

// Delete account
const delete_account = document.querySelector("#delete-account");
const delete_account_pin = document.querySelector("#delete-account-pin");
const btn_delete = document.querySelector("#btn-delete");

// Account settings
const label_welcome = document.querySelector("#label-welcome");
const label_balance = document.querySelector("#label-balance");
const label_sum_in = document.querySelector("#label-sum-in");
const label_sum_out = document.querySelector("#label-sum-out");
const label_sum_int = document.querySelector("#label-sum-int");

// These variables are set when logging in
let current_account = accounts[0];
let users = generarUsernames(accounts);

refreshMovements(current_account);
display_welcome(current_account);

/**
 * DATE APP ZONE
 */
const FECHA = new Date();
const LOCALE = navigator.language;

/** @type { DateOptions } OPTIONS */
const OPTIONS = {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
  minute: "numeric",
  second: "numeric",
};
const FECHA_COMPLETA = new Intl.DateTimeFormat(LOCALE, OPTIONS).format(FECHA);

document.querySelector("#label-date").textContent = FECHA_COMPLETA;

// *********************LOGIN*************************************************************
const onFormSubmit = (ev) => {
  ev.preventDefault();

  users = generarUsernames(accounts);
  const data = new FormData(ev.target);
  const values = Object.fromEntries(data.entries());
  const { username, pin } = values;

  current_account = users.find((user) => user.username === username);

  if (!current_account) {
    console.log("Result: User does not exist.");
    return false;
  }

  if (current_account?.pin !== Number(pin)) {
    console.log("Result: Invalid credentials.");
    return false;
  }

  ev.target.reset();

  label_welcome.innerHTML = `<span class="text-secondary">Welcome back,</span> <span class="text-muted fw-bold">${current_account.owner.split(" ")[0]}</span>`;
  refreshMovements(current_account);
};
login_form.addEventListener("submit", onFormSubmit);
// ****************************************************************************************

// ***********************TRANSFER MONEY***************************************************
const onTransferSubmit = function () {
  const transferToAccount = document.querySelector("#transfer-to").value;
  const transferAmount = document.querySelector("#transfer-amount").value;

  // Validaciones --------------------------------------------------------
  const receiverAccount = users.find(
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

  if (receiverAccount.username === current_account.username) {
    console.log("Result: Invalid account, enter a valid account");
    return;
  } //- Fin de las validaciones ------------------------------------------

  /**
   * Agregar el monto de la trsnferencia a la respectiva cuenta
   * Desde cuenta -Monto
   * Hasta cuenta +Monto
   */
  current_account.movements.push(-transferAmount);
  current_account.movementsDates.push(new Date());
  receiverAccount.movements.push(Number(transferAmount));
  receiverAccount.movementsDates.push(new Date());

  // Refrescar pantalla para imprimir valores actualizados
  refreshMovements(current_account);
};
btn_transfer.addEventListener("click", onTransferSubmit);
// ***************************************************************************************

// **********************DELETE ACCOUNT***************************************************
const onDeleteSubmit = function () {
  const deleteAccountUsername = delete_account.value;
  const accountToDelete = users.find(
    (acc) => acc?.username === deleteAccountUsername,
  );
  if (!accountToDelete) {
    console.log("Result: Account does not exist!.");
    return false;
  }

  if (Number(delete_account_pin.value) !== accountToDelete.pin) {
    console.log("Result: Invalid credentials!.");
    return false;
  }

  if (current_account.username !== accountToDelete.username) {
    console.log("Result: Access denied!.");
    return false;
  }
  const movementToDeleteIndex = accounts.findIndex(
    (user) => user.username === accountToDelete.username,
  );
  if (movementToDeleteIndex >= 0) {
    accounts.splice(movementToDeleteIndex, 1);
    // accion despues de eliminar el usuario
    label_welcome.textContent = "Login in to get started";
    document.querySelector("#wrapper").style.display = "none";
  }
};
btn_delete.addEventListener("click", onDeleteSubmit);
// ***************************************************************************************

// **********************LOAN REQUEST***************************************************
const onLoanRequestSubmit = () => {
  const amount = Number(loan_amount.value);
  if (
    amount > 0 &&
    current_account.movements.some((mov) => mov >= amount * 0.1)
  ) {
    current_account.movements.push(amount);
    current_account.movementsDates.push(new Date());
    refreshMovements(current_account);
  } else {
    console.log(
      `Results: No calificas para un credito por este monto, solo puedes tomar el 0.1% de tu credito mas alto`,
    );
  }
};
btn_loan.addEventListener("click", onLoanRequestSubmit);
// ***************************************************************************************

// **********************SORT MOVEMENTS***************************************************
let sorted = true;
document.querySelector("#btn-sorted").addEventListener("click", function () {
  displayMovements(current_account, sorted);
  sorted = !sorted;
});
// ***************************************************************************************

export function display_balance() {
  label_balance.textContent = calcPrintBalance(current_account);
}

export function display_welcome(acc) {
  label_welcome.innerHTML = `<span class="text-secondary">Welcome back,</span> <span class="text-muted fw-bold">${acc.owner.split(" ")[0]}</span>`;
}

export function display_summary() {
  const { sum_income, sum_out, interest } = calSumInBalance(current_account);
  label_sum_in.textContent = sum_income;
  label_sum_out.textContent = sum_out;
  label_sum_int.textContent = interest;
}
