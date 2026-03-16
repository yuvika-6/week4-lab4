const readline = require('readline');

let balance = 1000.0;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

function formatCurrency(num) {
  return Number(num).toFixed(2);
}

function showBalance() {
  console.log(`Current balance: ${formatCurrency(balance)}`);
}

async function creditAccount() {
  const input = await prompt('Enter credit amount: ');
  const amount = parseFloat(input);

  if (Number.isNaN(amount) || amount < 0) {
    console.log('Invalid credit amount. Please enter a non-negative number.');
    return;
  }

  balance += amount;
  console.log(`Amount credited. New balance: ${formatCurrency(balance)}`);
}

async function debitAccount() {
  const input = await prompt('Enter debit amount: ');
  const amount = parseFloat(input);

  if (Number.isNaN(amount) || amount < 0) {
    console.log('Invalid debit amount. Please enter a non-negative number.');
    return;
  }

  if (balance >= amount) {
    balance -= amount;
    console.log(`Amount debited. New balance: ${formatCurrency(balance)}`);
  } else {
    console.log('Insufficient funds for this debit.');
  }
}

async function main() {
  console.log('Account Management System');

  while (true) {
    console.log('1. View Balance');
    console.log('2. Credit Account');
    console.log('3. Debit Account');
    console.log('4. Exit');

    const choice = await prompt('Enter your choice (1-4): ');
    switch (choice.trim()) {
      case '1':
        showBalance();
        break;
      case '2':
        await creditAccount();
        break;
      case '3':
        await debitAccount();
        break;
      case '4':
        console.log('Exiting the program. Goodbye!');
        rl.close();
        return;
      default:
        console.log('Invalid choice, please select 1-4.');
    }

    console.log('');
  }
}

main().catch((err) => {
  console.error('Unexpected error:', err);
  rl.close();
});
