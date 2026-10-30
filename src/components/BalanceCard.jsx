// Reusable card: used for balance, total deposited, total withdrawn, account info.
export default function BalanceCard({ title, value, variant = "default" }) {
  return (
    <div className={`card card-${variant}`}>
      <p className="card-title">{title}</p>
      <p className="card-value">{value}</p>
    </div>
  );
}
