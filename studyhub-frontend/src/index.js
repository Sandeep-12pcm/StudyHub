import React from "react";
import './index.css';
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // should include Tailwind

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);