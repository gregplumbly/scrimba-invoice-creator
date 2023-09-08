const taskMap = {
  car: { task: "Wash car", price: 10 },
  lawn: { task: "Mow lawn", price: 20 },
  weeds: { task: "Pull weeds", price: 30 },
};

let itemsArray = [];

const invoiceItems = document.getElementById("invoice-items");

function renderItems() {
  invoiceItems.innerHTML = "";
  itemsArray.forEach(({ task, price }) => {
    const invoiceItem = document.createElement("div");
    invoiceItem.classList.add("invoice-item");
    invoiceItem.innerHTML = `
      <p class="line-item">${task}</p>
      <p class="line-item-price">$${price}</p>
    `;
    invoiceItems.appendChild(invoiceItem);
  });

  const total = itemsArray.reduce((acc, { price }) => acc + price, 0);
  console.log(total);
  const totalEl = document.getElementById("invoice-total");
  totalEl.innerHTML = `$${total}`;
}

document.querySelectorAll(".task-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const taskDetails = taskMap[e.target.id];
    if (
      taskDetails &&
      !itemsArray.some((item) => item.task === taskDetails.task)
    ) {
      itemsArray.push(taskDetails);
      renderItems();
    }
  });
});

renderItems();
