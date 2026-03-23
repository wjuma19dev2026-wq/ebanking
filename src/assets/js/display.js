import { formatCurrency } from "./currency.js";
import Item from "./item.js";
const movements_wrapper = document.querySelector("#movements");

const displayMovements = (movements = []) => {
  // Filtrar orden: Desc
  const movFiltered = [...movements].sort((a, b) => {
    return Math.abs(a) - Math.abs(b);
  });

  movFiltered.map((mov, index) => {
    const movement = {
      idx: index + 1,
      amount: formatCurrency(Math.abs(mov), "EUR", "es-ES"),
      timestamp: "3 days ago",
      type: mov >= 0 ? "deposit" : "withdrew",
      color: mov >= 0 ? "success" : "danger",
    };

    // Create item element
    const item = Item(movement);

    // Display in HTML
    movements_wrapper.insertAdjacentElement("afterbegin", item);
  });
};

export default displayMovements;
