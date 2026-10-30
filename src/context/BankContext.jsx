import { createContext, useContext, useEffect, useState } from "react";

const BankContext = createContext(null);

export const BANK_NAME = "Unity Trust Bank";
export const ACCOUNT = {
  holder: "Alex Johnson",
  number: "1234 5678 9012",
};

const INITIAL_BALANCE = 1000;
const BALANCE_KEY = "bank_balance";
const TX_KEY = "bank_transactions";

export const formatMoney = (value) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

// Read from localStorage safely (falls back if missing or corrupted).
function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

// Shared validation: returns an error message or null.
function validateAmount(value) {
  if (value === "" || value === null || value === undefined) return "Please enter an amount.";
  const amount = Number(value);
  if (Number.isNaN(amount)) return "Amount must be a number.";
  if (amount <= 0) return "Amount must be greater than zero.";
  return null;
}

export function BankProvider({ children }) {
  const [balance, setBalance] = useState(() => load(BALANCE_KEY, INITIAL_BALANCE));
  const [transactions, setTransactions] = useState(() => load(TX_KEY, []));

  // Persist to localStorage whenever data changes.
  useEffect(() => {
    localStorage.setItem(BALANCE_KEY, JSON.stringify(balance));
  }, [balance]);

  useEffect(() => {
    localStorage.setItem(TX_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (type, amount) => {
    const tx = {
      id: Date.now() + Math.random(),
      type,
      amount,
      date: new Date().toISOString(),
    };
    setTransactions((prev) => [tx, ...prev]); // newest first
  };

  // Both return { ok: boolean, message: string }
  const deposit = (value) => {
    const error = validateAmount(value);
    if (error) return { ok: false, message: error };
    const amount = Math.round(Number(value) * 100) / 100;
    setBalance((prev) => Math.round((prev + amount) * 100) / 100);
    addTransaction("Deposit", amount);
    return { ok: true, message: `Successfully deposited ${formatMoney(amount)}.` };
  };

  const withdraw = (value) => {
    const error = validateAmount(value);
    if (error) return { ok: false, message: error };
    const amount = Math.round(Number(value) * 100) / 100;
    if (amount > balance) {
      return { ok: false, message: "Insufficient funds. Amount exceeds your balance." };
    }
    setBalance((prev) => Math.round((prev - amount) * 100) / 100);
    addTransaction("Withdrawal", amount);
    return { ok: true, message: `Successfully withdrew ${formatMoney(amount)}.` };
  };

  const resetData = () => {
    setBalance(INITIAL_BALANCE);
    setTransactions([]);
  };

  const totalDeposited = transactions
    .filter((t) => t.type === "Deposit")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalWithdrawn = transactions
    .filter((t) => t.type === "Withdrawal")
    .reduce((sum, t) => sum + t.amount, 0);

  const value = {
    bankName: BANK_NAME,
    account: ACCOUNT,
    balance,
    transactions,
    totalDeposited,
    totalWithdrawn,
    deposit,
    withdraw,
    resetData,
  };

  return <BankContext.Provider value={value}>{children}</BankContext.Provider>;
}

export function useBank() {
  const ctx = useContext(BankContext);
  if (!ctx) throw new Error("useBank must be used inside <BankProvider>");
  return ctx;
}
