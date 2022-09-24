import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sresult from "./pages/Sresult";
import Definition from './pages/Definition'
import Search from "./pages/Search";
import Keywordf from "./pages/Keywordf";
import Concordance from "./pages/Concordance";
import Kwic from "./pages/Kwic";
import List from "./pages/List";
import Listresult from "./pages/Listresult";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Publication from "./pages/Publication";
import LogReg from "./pages/LogReg";
import Contact from "./pages/Contact";
import Help from "./pages/Help";
import About from "./pages/About";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Forgot from "./pages/Forgot";
import Downloaddata from "./pages/Downloaddata";
import Uploadddata from "./pages/UploadData";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/LogReg" element={<LogReg />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Forgot" element={<Forgot />} />
        <Route path="/Help" element={<Help />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/About" element={<About/>} />
        <Route path="/Definition" element={<Definition />} />
        <Route path="/Downloaddata" element={<Downloaddata/>} />
        <Route path="/Uploaddata" element={<Uploadddata/>} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Sresult" element={<Sresult />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Publication" element={<Publication />} />
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
