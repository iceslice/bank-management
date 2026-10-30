import { useBank, formatMoney } from "../context/BankContext.jsx";
import BalanceCard from "../components/BalanceCard.jsx";
import WithdrawForm from "../components/WithdrawForm.jsx";

export default function Withdraw() {
  const { balance } = useBank();
  return (
    <section>
      <h1>Withdraw Money</h1>
      <BalanceCard title="Available Balance" value={formatMoney(balance)} variant="primary" />
      <WithdrawForm />
    </section>
  );
}
