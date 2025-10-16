var expenses = [];

function Expense(desc, amount, category) {
    this.desc = desc;
    this.amount = amount;
    this.category = category;
}

// Add Expense
function addExpense() {
    var desc = document.getElementById("desc");
    var amount = document.getElementById("amount");
    var category = document.getElementById("category");

    // Reset styles
    desc.classList.remove("invalid");
    amount.classList.remove("invalid");
    category.classList.remove("invalid");

    try {
        if (!desc.value || !amount.value || !category.value) {
            throw "All fields are required!";
        }

        if (isNaN(amount.value) || Number(amount.value) <= 0) {
            amount.classList.add("invalid");
            throw "Amount must be a positive number!";
        }

        var expense = new Expense(desc.value, Number(amount.value), category.value);
        expenses.push(expense);

        displayExpenses();
        calculateTotal();

        desc.value = "";
        amount.value = "";
        category.value = "";
    } catch (err) {
        alert("Error: " + err);
    }
}

// Display all expenses
function displayExpenses(list = expenses) {
    var tbody = document.querySelector("#expenseTable tbody");
    tbody.innerHTML = "";

    for (var i = 0; i < list.length; i++) {
        var tr = document.createElement("tr");

        var tdDesc = document.createElement("td");
        tdDesc.textContent = list[i].desc;

        var tdAmount = document.createElement("td");
        tdAmount.textContent = "$" + list[i].amount;

        var tdCategory = document.createElement("td");
        tdCategory.textContent = list[i].category;

        var tdAction = document.createElement("td");
        var delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.onclick = (function(index) {
            return function() { deleteExpense(index); };
        })(i);

        tdAction.appendChild(delBtn);

        tr.appendChild(tdDesc);
        tr.appendChild(tdAmount);
        tr.appendChild(tdCategory);
        tr.appendChild(tdAction);
        tbody.appendChild(tr);
    }
}

// Delete Expense
function deleteExpense(index) {
    try {
        expenses.splice(index, 1);
        displayExpenses();
        calculateTotal();
    } catch (err) {
        alert("Error deleting expense: " + err);
    }
}

// Calculate Total
function calculateTotal() {
    var total = 0;
    for (var i = 0; i < expenses.length; i++) {
        total += expenses[i].amount;
    }
    document.getElementById("total").textContent = "Total: $" + total;
}

// Filter by Category
function filterExpenses() {
    var category = document.getElementById("filterCategory").value.toLowerCase();
    if (!category) {
        displayExpenses();
        return;
    }

    var filtered = expenses.filter(function(exp) {
        return exp.category.toLowerCase().includes(category);
    });

    displayExpenses(filtered);
}

// Reset All
function resetAll() {
    try {
        expenses = [];
        document.querySelector("#expenseTable tbody").innerHTML = "";
        document.getElementById("total").textContent = "Total: $0";
        document.getElementById("filterCategory").value = "";
        alert("All data cleared!");
    } catch (err) {
        alert("Error resetting data: " + err);
    }
}
