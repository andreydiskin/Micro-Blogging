import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import { UsernameContextProvider } from "./context/UsernameContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UsernameContextProvider>
    <App />
  </UsernameContextProvider>
);
