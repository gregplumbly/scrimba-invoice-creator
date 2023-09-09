const taskMap = {
  car: { task: "Wash car", price: 10 },
  lawn: { task: "Mow lawn", price: 20 },
  weeds: { task: "Pull weeds", price: 30 },
};

let itemsArray = [];

const invoiceItems = document.getElementById("invoice-items");
const invoiceNote = document.getElementById("invoice-note");

function renderItems() {
  invoiceItems.innerHTML = "";

  if (itemsArray.length) {
    itemsArray.forEach(({ task, price }) => {
      const invoiceItem = document.createElement("div");
      invoiceItem.classList.add("invoice-item");
      invoiceItem.innerHTML = `
        <p class="line-item">${task}</p>
        <p class="line-item-price">$${price}</p>
      `;
      invoiceItems.appendChild(invoiceItem);
    });    

    invoiceNote.classList.remove("hide");
  }

  const total = itemsArray.reduce((acc, { price }) => acc + price, 0);
  console.log(total);

  const totalEl = document.getElementById("invoice-total");
  totalEl.textContent = `$${total}`;

}

// Clear invoice on 'Send invoice' button click
document.getElementById("send-invoice-btn").addEventListener("click", () => {
  // Empty the array
  itemsArray = [];
  // Re-render
  renderItems();
  // Hide note
  invoiceNote.classList.add('hide');
});

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
