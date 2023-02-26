import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import App from "./App";
import Details from "./Details.jsx";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <header>
        <Link to={"/"}>Adopt Me!</Link>
      </header>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
