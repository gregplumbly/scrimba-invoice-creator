const taskMap = {
  car: { task: "wash car", price: 10 },
  lawn: { task: "mow lawn", price: 20 },
  weeds: { task: "pull weeds", price: 30 },
};

let itemsArray = [];

const invoiceItems = document.getElementById("invoice-items");
const invoiceNote = document.getElementById("invoice-note");
const sendInvoiceBtn = document.getElementById("send-invoice-btn");
const totalEl = document.getElementById("invoice-total");

function renderItems() {
  invoiceItems.innerHTML = "";

  if (itemsArray.length) {
    itemsArray.forEach(({ task, price }, index) => {
      const invoiceItem = document.createElement("div");
      invoiceItem.classList.add("invoice-item");
      invoiceItem.innerHTML = `
      <div class="task-wrapper">
        <p class="line-item" >${task}</p>
        <button class="delete-btn" id="delete-btn" data-index=${index}>
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
      <p class="line-item-price">$<span class="line-item-price-amt" id="line-item-price-amt">${price}</span></p>
     
      `;
      invoiceItems.appendChild(invoiceItem);
      sendInvoiceBtn.classList.remove("btn-disabled");
      totalEl.classList.remove("invoice-total-zero");
    });

    invoiceNote.classList.remove("hide");
  } else {
    totalEl.classList.add("invoice-total-zero");
  }

  const total = itemsArray.reduce((acc, { price }) => acc + price, 0);
  console.log(total);

  totalEl.textContent = `$${total}`;

  // Delete items
  const deleteBtns = document.querySelectorAll(".delete-btn");

  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      console.log("delete");
      const index = e.target.dataset.index;
      itemsArray.splice(index, 1);
      renderItems();
    });
  });
}

// Clear invoice on 'Send invoice' button click
sendInvoiceBtn.addEventListener("click", () => {
  // Empty the array
  itemsArray = [];
  // Re-render
  renderItems();
  // Hide note
  invoiceNote.classList.add("hide");
  // Disable 'Send Invoice button'
  sendInvoiceBtn.classList.add("btn-disabled");
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

// entering tasks manually
const freestyleInput = document.getElementById("freetext-input");
const addBtn = document.getElementById("freetext-btn");
const amount = document.getElementById("amount-select");

addBtn.addEventListener("click", (e) => {
  const customTaskName = freestyleInput.value.toLowerCase();

  taskMap[customTaskName] = {
    task: customTaskName,
    price: parseInt(amount.value),
  };

  console.log(taskMap);

  const taskDetails = taskMap[customTaskName];
  if (
    taskDetails &&
    !itemsArray.some((item) => item.task === taskDetails.task)
  ) {
    itemsArray.push(taskDetails);
    renderItems();
  }

  // Clear input field after adding task
  freestyleInput.value = "";
});

renderItems();