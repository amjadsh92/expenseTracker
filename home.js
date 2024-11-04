
const formButton = document.getElementById("form-button");
const transactionList = document.getElementById("transactions-table-body");
const budge = document.getElementById("budget");
const filterCategory = document.getElementById("apply-filters");
const clearFilterButton = document.getElementById("clear-filters");

let expenses = [];
let filtered = [];
let totalBudget = 0;
var counter = 0;
let deleted = false;



formButton.addEventListener("click", (e) => {
    
    e.preventDefault();
    //debugger;
    const name = document.getElementById("description").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("type").value;
    const date = document.getElementById("date").value;

    
    
    let expense = {
        id: counter ++,
        name,
        amount: Number(amount),
        category,
        date
    };


    expenses.push(expense);
    showTransactions(expenses)
    updateBudget(expense)

});

transactionList.addEventListener("click", (e) => {
    
    if (e.target.classList.contains("delete-btn")) {
        const id = parseInt(e.target.dataset.id);
        let expense = expenses.find(expense => expense.id === id);
        expenses = expenses.filter(expense => expense.id !== id);
        deleted = true
        showTransactions(expenses);
        updateBudget(expense)
        
    }

    if (e.target.classList.contains("edit-btn")) {
        //debugger;
        const id = parseInt(e.target.dataset.id);
        let expense = expenses.find(expense => expense.id === id);
        
        const name = document.getElementById("description").value;
        const amount = document.getElementById("amount").value;
        const category = document.getElementById("type").value;
        const date = document.getElementById("date").value;

        //expenses = expenses.filter(expense => expense.id !== id);

        expense = {name, amount, category, date}
       
        showTransactions(expenses);
        
    }
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
                <button class="edit-btn" data-id="${expense.id}">Edit</button>
                <button class="delete-btn" data-id="${expense.id}">Delete</button>
            </td>
        `;

        transactionList.appendChild(row);
    });
}



filterCategory.addEventListener("click",  (e) => {
    
    e.preventDefault();
    
    const minAmount = document.getElementById("min-amount").value;
    const maxAmount= document.getElementById("max-amount").value;
    let filteredExpenses = []
      
    if (minAmount !== ""  && maxAmount === ""){
        filteredExpenses = expenses.filter(expense => parseFloat(expense.amount) >= parseFloat(minAmount));
            
    }

    if (maxAmount !== "" && minAmount === ""){
        filteredExpenses = expenses.filter(expense => parseFloat(expense.amount) <= parseFloat(maxAmount));
        
    }

    if (maxAmount && minAmount ){
        filteredExpenses = expenses.filter(expense => parseFloat(expense.amount) <= parseFloat(maxAmount) && parseFloat(expense.amount) >= parseFloat(minAmount));
        
    }
    
    showTransactions(filteredExpenses)
    
    
       
    

    })


 clearFilterButton.addEventListener("click", () => {
  
  
  document.getElementById("min-amount").value = "";
  document.getElementById("max-amount").value = "";
  showTransactions(expenses)
  



 })   


function updateBudget(expense){

        if(deleted){

            if(expense.category === 'income'){

                totalBudget -= expense.amount
                deleted = false
            }
            else if(expense.category === 'expense'){
    
                totalBudget += expense.amount;
                deleted = false
    
    
            }    


        }

        else{


            if(expense.category === 'income'){

                totalBudget += expense.amount
                deleted = false
            }
            else if(expense.category === 'expense'){
    
                totalBudget -= expense.amount;
                deleted  = false
    
    
            }    
        }
    
   

        
         
        budge.innerHTML = totalBudget

        } 
        
        
    


    
        
    
    


