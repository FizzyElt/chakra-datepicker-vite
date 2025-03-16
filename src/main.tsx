import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "./components/ui/provider";

const root = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <Provider forcedTheme="dark">
        <App />
      </Provider>
    </React.StrictMode>,
  );
}
