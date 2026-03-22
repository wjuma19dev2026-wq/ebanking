import { createEl } from "./create-el.js";

const displayMovements = (movements) => {
  movements.map((mov, index) => {
    const movement = {
      idx: index + 1,
      amount: Math.abs(mov).toFixed(),
      timestamp: "3 days ago",
      type: mov >= 0 ? "deposit" : "withdrew",
      color: mov >= 0 ? "success" : "danger",
    };

    // Create item element
    const item = createEl(movement);

    // Display in HTML
    document.querySelector("#movements").appendChild(item);
  });
};

export default displayMovements;
