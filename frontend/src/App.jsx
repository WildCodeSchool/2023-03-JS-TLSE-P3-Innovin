import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "primereact/resources/primereact.min.css";
import Cookies from "js-cookie";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import TastingPresentation from "./pages/TastingPresentation/TastingPresentation";
import VisualStage1 from "./pages/VisualStage/VisualStage1";
import VisualStage2 from "./pages/VisualStage/VisualStage2";
import { TastingNoteProvider } from "./contexts/TastingNoteContext";
import { TastingProvider } from "./contexts/TastingContext";

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
      <TastingProvider>
        <TastingNoteProvider>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/registration" element={<Registration />} />
              <Route
                path="/tasting"
                element={<TastingPresentation userToken={userToken} />}
              />
              <Route
                path="/eye/stage1"
                element={<VisualStage1 userToken={userToken} />}
              />
              <Route
                path="/eye/stage2"
                element={<VisualStage2 userToken={userToken} />}
              />
            </Routes>
          </div>
        </TastingNoteProvider>
      </TastingProvider>
    </Router>
  );
}

export default App;
