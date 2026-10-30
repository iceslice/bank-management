# Bank Management System

A simple frontend-only Bank Management System built with **React** and **Vite**.
Users can view account information, deposit money, withdraw money, and review transaction history.
The balance is **simulated** — there is no backend, database, or real money involved.

## Features

- Dashboard with bank name, account holder, account number, balance, total deposited and total withdrawn
- Deposit form with validation (no empty, zero, or negative amounts) and a success message
- Withdraw form with validation, insufficient-funds error, and a confirmation step before withdrawing
- Transaction history (type, amount, date) with different styles for deposits and withdrawals
- Empty-state message when there are no transactions
- Navigation with React Router DOM (`NavLink`)
- Shared state through the Context API
- Data saved in `localStorage` so it survives a page refresh
- `useRef` focuses the amount input automatically
- Responsive CSS

## Tech Stack

- React 18 (functional components, `useState`, `useEffect`, `useRef`, `useContext`)
- Vite
- React Router DOM v6

## Installation

Requires [Node.js](https://nodejs.org/) 18 or newer.

```bash
git clone <your-repository-url>
cd bank-management
npm install
npm run dev
```

Open the local URL shown in the terminal (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Project Structure

```
bank-management/
├── src/
│   ├── components/   Navbar, BalanceCard, DepositForm, WithdrawForm, TransactionList, TransactionItem
│   ├── pages/        Dashboard, Deposit, Withdraw, Transactions
│   ├── context/      BankContext.jsx (state, validation, localStorage)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── README.md
```

## Notes

The starting balance is $1,000. Use "Reset demo data" on the Transaction History page to start over.
