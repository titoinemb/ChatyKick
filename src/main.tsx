import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Chat, Login } from "@components";
import "@styles/all.scss";

// block context menu for all elements
document.addEventListener("contextmenu", (e) => e.preventDefault());

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  </React.StrictMode>
);