const prompt = require("prompt-sync")();


let budget = parseFloat(prompt("Enter your budget: "));
let expenses = [];


function addExpense(amount, category) {
    expenses.push({ amount: parseFloat(amount), category });
    console.log(`Added expense: $${amount} for ${category}`);
}

function calculateTotal() {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
}

function checkBudget() {
    const total = calculateTotal();
    if (total > budget) {
        console.log(`You are over your budget by $${(total - budget).toFixed(2)}.`);
    } else {
        console.log(`You are within your budget. You have $${(budget - total).toFixed(2)} left.`);
    }
}

function removeExpense(category) {
    const index = expenses.findIndex(expense => expense.category === category);
    if (index !== -1) {
        const removed = expenses.splice(index, 1)[0];
        console.log(`Removed expense: $${removed.amount} for ${removed.category}`);
    } else {
        console.log(`No expense found for the category "${category}".`);
    }
}

let running = true;

while (running) {
    console.log("\nChoose an option:");
    console.log("1. Add an Expense");
    console.log("2. View Total Expenses");
    console.log("3. Check Budget");
    console.log("4. Remove an Expense");
    console.log("5. Exit");

    let choice = prompt("Enter your choice (1-5): ");

    switch (choice) {
        case "1":
            let amount = prompt("Enter your expense amount: ");
            let category = prompt("Enter the expense category: ");
            addExpense(amount, category);
            break;
        case "2":
            console.log(`Total expenses so far: $${calculateTotal().toFixed(2)}`);
            break;
        case "3":
            checkBudget();
            break;
        case "4":
            let removeCat = prompt("Enter the category of your expense to remove: ");
            removeExpense(removeCat);
            break;
        case "5":
            running = false;
            console.log("Exiting this program.");
            break;
        default:
            console.log("Invalid choice. Please enter a number between 1 and 5.");
    }
}
