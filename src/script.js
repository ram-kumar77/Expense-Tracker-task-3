// Elements
const typeField = document.getElementById("type");
const detailsField = document.getElementById("details");
const amountField = document.getElementById("amount");
const submitBtn = document.getElementById("submitBtn");
const cardContainer = document.getElementById("cardContainer");
const totalIncomeField = document.getElementById("totalIncome");
const totalExpenseField = document.getElementById("totalExpense");
const balanceField = document.getElementById("balance");

// Global State
let transactions = [];
let totalIncome = 0;
let totalExpense = 0;

// Function to Render Transactions
function renderTransactions() {
  cardContainer.innerHTML = ""; // Clear container

  transactions.forEach((transaction, index) => {
    const card = document.createElement("div");
    card.className = `flex justify-between items-center border-2 rounded-lg p-4 ${
      transaction.type === "income" ? "border-green-500" : "border-red-500"
    }`;

    card.innerHTML = `
      <div>
        <h3 class="font-semibold">${
          transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)
        }</h3>
        <p>${transaction.details}</p>
        <p class="font-bold">₹${transaction.amount}</p>
      </div>
      <div class="flex gap-2">
        <button
          class="bg-yellow-500 text-white px-3 py-1 rounded editBtn hover:bg-yellow-400"
          data-index="${index}"
        >
          Edit
        </button>
        <button
          class="bg-red-600 text-white px-3 py-1 rounded deleteBtn hover:bg-red-500"
          data-index="${index}"
        >
          Delete
        </button>
      </div>
    `;

    cardContainer.appendChild(card);
  });

  updateTotals();
}

// Function to Update Totals
function updateTotals() {
  totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  totalExpense = transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = totalIncome - totalExpense;

  totalIncomeField.textContent = `₹${totalIncome}`;
  totalExpenseField.textContent = `₹${totalExpense}`;
  balanceField.textContent = `₹${balance}`;
}

// Function to Clear Input Fields
function clearFields() {
  detailsField.value = "";
  amountField.value = "";
  typeField.value = "income";
}

// Submit Button Event Listener
submitBtn.addEventListener("click", () => {
  const type = typeField.value;
  const details = detailsField.value.trim();
  const amount = parseFloat(amountField.value);

  if (!details || isNaN(amount) || amount <= 0) {
    alert("Please enter valid details and amount.");
    return;
  }

  const existingIndex = submitBtn.getAttribute("data-editing");

  if (existingIndex !== null) {
    // Update existing transaction
    transactions[existingIndex] = { type, details, amount };
    submitBtn.textContent = "Submit";
    submitBtn.removeAttribute("data-editing");
  } else {
    // Add new transaction
    transactions.push({ type, details, amount });
  }

  renderTransactions();
  clearFields();
});

// Event Delegation for Edit and Delete Buttons
cardContainer.addEventListener("click", (e) => {
  const target = e.target;
  const index = target.getAttribute("data-index");

  if (target.classList.contains("editBtn")) {
    const transaction = transactions[index];
    typeField.value = transaction.type;
    detailsField.value = transaction.details;
    amountField.value = transaction.amount;

    submitBtn.textContent = "Update";
    submitBtn.setAttribute("data-editing", index);
  }

  if (target.classList.contains("deleteBtn")) {
    transactions.splice(index, 1);
    renderTransactions();
  }
});
