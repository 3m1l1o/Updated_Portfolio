import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { initEmailService } from "./utils/emailService";

// Initialize EmailJS
initEmailService().catch((error) => {
  console.error("Failed to initialize EmailJS:", error);
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
