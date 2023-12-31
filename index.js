const invoiceItems = document.getElementById("invoice-items");
const invoiceNote = document.getElementById("invoice-note");
const sendInvoiceBtn = document.getElementById("send-invoice-btn");
const totalEl = document.getElementById("invoice-total");
const freestyleInput = document.getElementById("freetext-input");
const addButton = document.getElementById("freetext-btn");
const amount = document.getElementById("amount-select");
const errorEl = document.getElementById("error");
const taskMap = {
  car: { task: "wash car", price: 10 },
  lawn: { task: "mow lawn", price: 20 },
  weeds: { task: "pull weeds", price: 30 },
};

let itemsArray = [];

function renderItems() {
  invoiceItems.innerHTML = "";

  if (itemsArray.length === 0) {
    sendInvoiceBtn.classList.add("btn-disabled");
  }

  if (itemsArray.length) {
    itemsArray.forEach(({ task, price }, index) => {
      const invoiceItem = document.createElement("div");
      invoiceItem.classList.add("invoice-item");
      invoiceItem.innerHTML = `
       <div class="task-wrapper">
        <li class="line-item" >${task}</li>
        <button class="delete-btn" id="delete-btn" data-index=${index}>
          <i class="fa-solid fa-trash-can" data-index=${index}></i>
        </button>
      </div>
\      <p class="line-item-price">$<span class="line-item-price-amt" id="line-item-price-amt">${price}</span></p>
      `;
      invoiceItems.appendChild(invoiceItem);
      sendInvoiceBtn.classList.remove("btn-disabled");
      totalEl.classList.remove("invoice-total-zero");
    });

    invoiceNote.classList.remove("hide");
  } else {
    totalEl.classList.add("invoice-total-zero");
  }

  // event listerner for delete buttons
  const deleteBtns = document.querySelectorAll(".delete-btn");
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      deleteTask(index);
    });
  });

  updateTotal();
}

function updateTotal() {
  const total = itemsArray.reduce((acc, { price }) => acc + price, 0);
  totalEl.textContent = `$${total}`;
}

function deleteTask(index) {
  // Re-enable the appropriate button
  if (itemsArray[index].task === "wash car") {
    document.getElementById("car").classList.remove("btn-disabled");
  } else if (itemsArray[index].task === "mow lawn") {
    document.getElementById("lawn").classList.remove("btn-disabled");
  } else if (itemsArray[index].task === "pull weeds") {
    document.getElementById("weeds").classList.remove("btn-disabled");
  }

  itemsArray.splice(index, 1);
  renderItems();
}

function clearFreeformInput() {
  freestyleInput.value = "";
}

freestyleInput.addEventListener("input", () => {
  errorEl.textContent = "";
});

function validateInput() {
  const taskDescription = freestyleInput.value.trim();
  const taskPrice = parseInt(amount.value);

  let errorMessage = "";
  if (!taskDescription) {
    errorMessage =
      "Task description cannot be empty. Please enter a task description and add again.";
  } else if (
    itemsArray.some(
      (item) => item.task.toLowerCase() === taskDescription.toLowerCase()
    )
  ) {
    errorMessage = "This task already exists.";
  } else if (!taskPrice || taskPrice <= 0) {
    errorMessage = "Please select a valid price.";
  }

  if (errorMessage) {
    // Clear the input field
    clearFreeformInput();
    // Optionally, display the error message in your UI
    errorEl.textContent = errorMessage;
    return false;
  }

  return true;
}

// Clear invoice on 'Send invoice' button click
sendInvoiceBtn.addEventListener("click", () => {
  // Empty the array
  itemsArray = [];
  // Re-render
  errorEl.textContent = "";
  freestyleInput.value = "";
  document.getElementById("car").classList.remove("btn-disabled");
  document.getElementById("lawn").classList.remove("btn-disabled");
  document.getElementById("weeds").classList.remove("btn-disabled");
  renderItems();
  // Hide note
  invoiceNote.classList.add("hide");
  // Disable 'Send Invoice button'
  sendInvoiceBtn.classList.add("btn-disabled");
});

//  Add items from the buttons
document.querySelectorAll(".task-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    errorEl.textContent = "";
    btn.classList.add("btn-disabled");
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

// Add free form items
addButton.addEventListener("click", (e) => {
  if (validateInput()) {
    taskMap[freestyleInput.value] = {
      task: freestyleInput.value.trim(),
      price: parseInt(amount.value),
    };

    const taskDetails = taskMap[freestyleInput.value];

    if (
      taskDetails &&
      !itemsArray.some((item) => item.task === taskDetails.task)
    ) {
      itemsArray.push(taskDetails);
      renderItems();
    }
    // Clear the input field
    clearFreeformInput();
  }
});

renderItems();
