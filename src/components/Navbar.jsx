import { NavLink } from "react-router-dom";
import { useBank } from "../context/BankContext.jsx";

const links = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/deposit", label: "Deposit" },
  { to: "/withdraw", label: "Withdraw" },
  { to: "/transactions", label: "Transaction History" },
];

export default function Navbar() {
  const { bankName } = useBank();
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <span className="brand">🏦 {bankName}</span>
        <nav>
          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
