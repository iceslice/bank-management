import { useEffect, useRef, useState } from "react";
import { useBank } from "../context/BankContext.jsx";

export default function DepositForm() {
  const { deposit } = useBank();
  const [amount, setAmount] = useState("");
  const [feedback, setFeedback] = useState(null); // { ok, message }
  const inputRef = useRef(null);

  // Focus the amount input when the form first appears.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = deposit(amount);
    setFeedback(result);
    if (result.ok) setAmount("");
    inputRef.current?.focus();
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="deposit-amount">Deposit amount ($)</label>
      <input
        id="deposit-amount"
        ref={inputRef}
        type="number"
        step="0.01"
        placeholder="0.00"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit" className="btn btn-success">
        Deposit
      </button>
      {feedback && (
        <p className={`message ${feedback.ok ? "message-success" : "message-error"}`} role="status">
          {feedback.message}
        </p>
      )}
    </form>
  );
}
