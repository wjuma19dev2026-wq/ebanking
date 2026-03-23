const Item = ({ idx, type, amount, timestamp, color }) => {
  const itemEl = document.createElement("li");
  const badgeEl = document.createElement("span");
  const timestampEl = document.createElement("span");
  const amountEl = document.createElement("span");

  itemEl.setAttribute(
    "class",
    "list-group-item text-bg-light justify-content-between d-flex flex-row align-items-center",
  );
  badgeEl.setAttribute("class", `badge text-bg-${color} align-self-center`);
  badgeEl.innerHTML = `${idx} ${type}`;
  timestampEl.textContent = timestamp;
  amountEl.classList.add("fw-bold");
  amountEl.textContent = `${amount}`;

  itemEl.appendChild(badgeEl);
  itemEl.appendChild(timestampEl);
  itemEl.appendChild(amountEl);

  return itemEl;
};

export default Item;
