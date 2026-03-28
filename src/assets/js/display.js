import { formatCurrency } from "./currency.js";
import { clearElement, formatearFecha } from "./helpers.js";
import Item from "./item.js";
const movements_wrapper = document.querySelector("#movements");

const displayMovements = (account, sorted = false) => {
  // Limpiar el contenedor de los movimientos.
  clearElement(document.querySelector("#movements"));

  // Se crea un objeto para combinar el movimiento con la fecha.
  const combineMovementsDates = account.movements.map((movement, i) => {
    return { movement, movementDate: account.movementsDates.at(i) };
  });

  // Se sortea por orden, en este caso descendente.
  const mov = combineMovementsDates
    .slice()
    .sort((a, b) => (sorted ? a.movement - b.movement : combineMovementsDates));

  // Iterar el arreglo de movimientos
  mov.map((obj, index) => {
    const { movement, movementDate } = obj;
    const fecha = formatearFecha(movementDate);

    const movementObj = {
      idx: index + 1,
      amount: formatCurrency(Math.abs(movement), "EUR", "es-ES"),
      timestamp: fecha,
      type: movement >= 0 ? "deposit" : "withdrew",
      color: movement >= 0 ? "success" : "danger",
    };

    // Crear el item de movimiento
    const item = Item(movementObj);

    // Imprimir en el contenedor  de movimientos en el HTML
    movements_wrapper.insertAdjacentElement("afterbegin", item);
  });
};

export default displayMovements;
