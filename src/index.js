import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sresult from "./pages/Sresult";
import Search from "./pages/Search";
import Keywordf from "./pages/keywordf";
import Concordance from "./pages/Concordance";
import Kwic from "./pages/Kwic";
import List from "./pages/List";
import Listresult from "./pages/Listresult";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Sresult" element={<Sresult />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Keywordf" element={<Keywordf />} />
        <Route path="/Concordance" element={<Concordance />} />
        <Route path="/Kwic" element={<Kwic />} />
        <Route path="/List" element={<List />} />
        <Route path="/Listresult" element={<Listresult/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();