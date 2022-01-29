const Balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


const dummyTransction = [
{ id: 1, text: 'Flower', amount: -20 },
{ id: 2, text: 'Salary', amount: 300 },
{ id: 3, text: 'Book', amount: -10 },
{ id: 4, text: 'Camera', amount: 150 }

];


//  let appu = [
//    { id: 1, text: 'Flowerss', amount: -200 },
//  { id: 2, text: 'Salaryss', amount: 3000 },
//  { id: 3, text: 'Bookss', amount: -100 },
//  { id: 4, text: 'Camerass', amount: 1500 }
//  ]

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

 let transactions = 
   localStorage.getItem('transactions') !== null ? localStorageTransactions : [];



// let transactions = dummyTransction;
// console.log(transactions);

//Add transaction
function addTransaction(e) {
  e.preventDefault();

  if(text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage()

    text.value = '';
    amount.value = '';
  }
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 1000000);
}

//Add transactions to DOM list
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;

  list.appendChild(item);

}

function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0)
  .toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    Balance.innerText = `RS.${total}`;
    money_plus.innerText = `RS.${income}`;
    money_minus.innerText = `RS.${expense}`;
   
}

// REmove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  init();

  updateLocalStorage();
}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function init() {
  list.innerHTML = '';

  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

addEventListener('submit', addTransaction)


