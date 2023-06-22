import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import TastingPresentation from "./pages/TastingPresentation/TastingPresentation";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, {
        expires: 1 / 8,
      });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route
            path="/Tasting"
            element={<TastingPresentation userToken={userToken} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
