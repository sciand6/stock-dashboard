import "./App.css";
import { Link } from "react-router-dom";
import React from "react";
import Main from "./components/Main";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <h1>Stock Charts</h1>
      <Link to="/about">
        <div className="help-icon">?</div>
      </Link>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/about" element={<h1>About</h1>}></Route>
      </Routes>
    </div>
  );
}

export default App;
