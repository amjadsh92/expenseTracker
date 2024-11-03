
const formButton = document.getElementById("form-button");
const transactionList = document.getElementById("transactions-table-body");
const budget = document.getElementById("budget");
//const filterCategory = document.getElementById("filter-category");

let expenses = [];

var counter = 0;

formButton.addEventListener("click", (e) => {
    
    e.preventDefault();
    //debugger;
    const name = document.getElementById("description").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("type").value;
    const date = document.getElementById("date").value;

   

    const expense = {
        id: counter ++,
        name,
        amount,
        category,
        date
    };


    expenses.push(expense);
    showTransactions(expenses)

});


function showTransactions(expenses) {
    transactionList.innerHTML = "";
    expenses.forEach(expense => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${expense.date}</td>
            <td>${expense.name}</td>
            <td>${expense.amount}</td>
            <td>${expense.category}</td>
            <td>
                <button class="edit-btn" id="${expense.id}">Edit</button>
                <button class="delete-btn" id="${expense.id}">Delete</button>
            </td>
        `;

        transactionList.appendChild(row);
    });
}




