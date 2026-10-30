import { useBank, formatMoney } from "../context/BankContext.jsx";
import BalanceCard from "../components/BalanceCard.jsx";
import DepositForm from "../components/DepositForm.jsx";

export default function Deposit() {
  const { balance } = useBank();
  return (
    <section>
      <h1>Deposit Money</h1>
      <BalanceCard title="Current Balance" value={formatMoney(balance)} variant="primary" />
      <DepositForm />
    </section>
  );
}
