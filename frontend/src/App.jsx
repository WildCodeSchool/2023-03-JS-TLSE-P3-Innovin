import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import TastingPresentation from "./pages/TastingPresentation/TastingPresentation";
// import TastingPresentation from "./pages/TastingPresentation";
import VisualStage1 from "./pages/VisualStage/VisualStage1";
import OlfactoryStage from "./pages/OlfactoryStage/OlfactoryStage";

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
          {/* <Route
            path="/tasting"
            element={<TastingPresentation userToken={userToken} />}
          /> */}
          <Route
            path="/eye/stage1"
            element={<VisualStage1 userToken={userToken} />}
          />
          <Route
            path="/nose"
            element={<OlfactoryStage userToken={userToken} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
