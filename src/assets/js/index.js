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
let accounts = [];
let current_account = [];

// *********************LOGIN*************************************************************
const onFormSubmit = (ev) => {
  ev.preventDefault();

  accounts = generarUsernames(users);
  const data = new FormData(ev.target);
  const values = Object.fromEntries(data.entries());
  const { username, pin } = values;

  current_account = accounts.find((user) => user.username === username);

  if (!current_account) {
    console.log("Result: User does not exist.");
    return false;
  }

  if (current_account?.pin !== Number(pin)) {
    console.log("Result: Invalid credentials.");
    return false;
  }

  ev.target.reset();

  document.querySelector("#wrapper").style.display = "block";
  label_welcome.innerHTML = `<span class="text-secondary">Welcome back,</span> <span class="text-muted fw-bold">${current_account.owner.split(" ")[0]}</span>`;

  refreshMovements(current_account);
};
login_form.addEventListener("submit", onFormSubmit);
// ****************************************************************************************

// ***********************TRANSFER MONEY***************************************************
const onTransferSubmit = function () {
  const transferToAccount = transfer_to.value;
  const transferAmount = transfer_amount.value;
  const receiverAccount = accounts.find(
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
  const deleteAccountUsername = delete_account.value;
  const accountToDelete = accounts.find(
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
    users.splice(movementToDeleteIndex, 1);
    // TODO: accion despues de eliminar el usuario
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
    // TODO: Add loan movement
    current_account.movements.push(amount);
    // TODO: Update UI
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
  console.log("Movements displayed");
  displayMovements(current_account.movements, sorted);
  sorted = !sorted;
});
// ***************************************************************************************

export function display_balance() {
  label_balance.textContent = calcPrintBalance(current_account);
}

export function display_summary() {
  const { sum_income, sum_out, interest } = calSumInBalance(current_account);
  label_sum_in.textContent = sum_income;
  label_sum_out.textContent = sum_out;
  label_sum_int.textContent = interest;
}

// console.log(
//   Object.groupBy(current_account.movements, (mov) =>
//     mov > 0 ? "depositos" : "retiros",
//   ),
// );
