import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Results from "./components/Results/Results";
import Favorites from "./components/Favorites/Favorites";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="container">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/" element={<Results />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
