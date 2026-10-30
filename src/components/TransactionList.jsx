import TransactionItem from "./TransactionItem.jsx";

// `limit` is optional so the dashboard can show only recent transactions.
export default function TransactionList({ transactions, limit }) {
  if (transactions.length === 0) {
    return <p className="empty">No transactions yet.</p>;
  }

  const visible = limit ? transactions.slice(0, limit) : transactions;

  return (
    <ul className="tx-list">
      {visible.map((tx) => (
        <TransactionItem key={tx.id} transaction={tx} />
      ))}
    </ul>
  );
}
