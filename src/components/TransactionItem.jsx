import { formatMoney } from "../context/BankContext.jsx";

export default function TransactionItem({ transaction }) {
  const { type, amount, date } = transaction;
  const isDeposit = type === "Deposit";

  return (
    <li className={`tx-item ${isDeposit ? "tx-deposit" : "tx-withdrawal"}`}>
      <div>
        <p className="tx-type">{type}</p>
        <p className="tx-date">{new Date(date).toLocaleString()}</p>
      </div>
      <p className="tx-amount">
        {isDeposit ? "+" : "-"}
        {formatMoney(amount)}
      </p>
    </li>
  );
}
