import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Portfolio from "./Portfolio";
import "./styles.css";

const root = document.getElementById("root");
if (!root) throw new Error("Portfolio mount point is missing.");

createRoot(root).render(
  <StrictMode>
    <Portfolio section={root.dataset.section === "labs" ? "labs" : "projects"} />
  </StrictMode>,
);
