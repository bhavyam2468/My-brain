import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

// Force initial load theme based on saved or default
const savedTheme = localStorage.getItem("themeColor") || "blue";

// Force dark mode
document.documentElement.classList.add('dark');
document.documentElement.classList.remove('light');

// Add theme class
document.documentElement.classList.add(`theme-${savedTheme}`);

// Set initial CSS variables based on theme
if (savedTheme === "blue") {
  document.documentElement.style.setProperty('--gradient-start', '220, 100%, 50%');
  document.documentElement.style.setProperty('--gradient-mid', '210, 100%, 25%');
  document.documentElement.style.setProperty('--gradient-end', '200, 100%, 10%');
  document.documentElement.style.setProperty('--particle-color', 'rgba(96, 165, 250, 0.7)');
}

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
