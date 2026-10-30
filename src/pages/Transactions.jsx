import { useBank } from "../context/BankContext.jsx";
import TransactionList from "../components/TransactionList.jsx";

export default function Transactions() {
  const { transactions, resetData } = useBank();

  const handleReset = () => {
    if (window.confirm("Reset balance and delete all transactions?")) resetData();
  };

  return (
    <section>
      <h1>Transaction History</h1>
      <TransactionList transactions={transactions} />
      <button className="btn btn-secondary reset-btn" onClick={handleReset}>
        Reset demo data
      </button>
    </section>
  );
}
