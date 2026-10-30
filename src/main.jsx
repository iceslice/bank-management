import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { BankProvider } from "./context/BankContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <BankProvider>
        <App />
      </BankProvider>
    </BrowserRouter>
  </StrictMode>
);
