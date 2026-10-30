import { useEffect, useRef, useState } from "react";
import { useBank, formatMoney } from "../context/BankContext.jsx";

export default function WithdrawForm() {
  const { withdraw, balance } = useBank();
  const [amount, setAmount] = useState("");
  const [feedback, setFeedback] = useState(null); // { ok, message }
  const [confirming, setConfirming] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Step 1: validate, then ask for confirmation.
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = Number(amount);

    if (amount === "" || Number.isNaN(value)) {
      setFeedback({ ok: false, message: "Please enter a valid amount." });
    } else if (value <= 0) {
      setFeedback({ ok: false, message: "Amount must be greater than zero." });
    } else if (value > balance) {
      setFeedback({ ok: false, message: "Insufficient funds. Amount exceeds your balance." });
    } else {
      setFeedback(null);
      setConfirming(true);
      return;
    }
    inputRef.current?.focus();
  };

  // Step 2: user confirmed.
  const handleConfirm = () => {
    const result = withdraw(amount);
    setFeedback(result);
    setConfirming(false);
    if (result.ok) setAmount("");
    inputRef.current?.focus();
  };

  const handleCancel = () => {
    setConfirming(false);
    setFeedback({ ok: false, message: "Withdrawal cancelled." });
    inputRef.current?.focus();
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="withdraw-amount">Withdrawal amount ($)</label>
      <input
        id="withdraw-amount"
        ref={inputRef}
        type="number"
        step="0.01"
        placeholder="0.00"
        value={amount}
        disabled={confirming}
        onChange={(e) => setAmount(e.target.value)}
      />

      {confirming ? (
        <div className="confirm-box" role="alertdialog">
          <p>
            Are you sure you want to withdraw <strong>{formatMoney(Number(amount))}</strong>?
          </p>
          <div className="confirm-actions">
            <button type="button" className="btn btn-danger" onClick={handleConfirm}>
              Yes, withdraw
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button type="submit" className="btn btn-danger">
          Withdraw
        </button>
      )}

      {feedback && (
        <p className={`message ${feedback.ok ? "message-success" : "message-error"}`} role="status">
          {feedback.message}
        </p>
      )}
    </form>
  );
}
