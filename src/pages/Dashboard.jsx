import { useBank, formatMoney } from "../context/BankContext.jsx";
import BalanceCard from "../components/BalanceCard.jsx";
import TransactionList from "../components/TransactionList.jsx";

export default function Dashboard() {
  const { bankName, account, balance, totalDeposited, totalWithdrawn, transactions } = useBank();

  return (
    <section>
      <h1>{bankName} — Bank Management System</h1>

      <div className="grid">
        <BalanceCard title="Account Holder" value={account.holder} />
        <BalanceCard title="Account Number" value={account.number} />
        <BalanceCard title="Current Balance" value={formatMoney(balance)} variant="primary" />
        <BalanceCard title="Total Deposited" value={formatMoney(totalDeposited)} variant="success" />
        <BalanceCard title="Total Withdrawn" value={formatMoney(totalWithdrawn)} variant="danger" />
      </div>

      <h2>Recent Transactions</h2>
      <TransactionList transactions={transactions} limit={5} />
    </section>
  );
}
