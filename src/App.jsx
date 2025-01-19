import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Template from "./pages/Template";
import InsectList from "./pages/InsectList";
import zukanIcon from "./assets/zukan_icon.png";
import "./styles/style.css";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">
          <div>
            <img src={zukanIcon} alt="アプリロゴ" />
            <h1>ZUKAN</h1>
          </div>
        </Link>
        <ul>
          <li>
            <Link to="/" class="nav-button">
              <span class="material-icons">add_circle</span>
              登録
            </Link>
          </li>
          <li>
            <Link to="/list" class="nav-button">
              <span class="material-icons">view_list</span>
              図鑑
            </Link>
          </li>
          <li>
            <Link to="/about" class="nav-button">
              <span class="material-icons">help</span>
              使い方
            </Link>
          </li>
          <li>
            <Link to="/contact" class="nav-button">
              <span class="material-icons">email</span>
              お問い合わせ
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/template" element={<Template />} />
        <Route path="/list" element={<InsectList />} />
      </Routes>
    </Router>
  );
}

export default App;
