import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "primereact/resources/primereact.min.css";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import TastingPresentation from "./pages/TastingPresentation/TastingPresentation";
import VisualStage1 from "./pages/VisualStage/VisualStage1";
import OlfactoryStage from "./pages/OlfactoryStage/OlfactoryStage";
import VisualStage2 from "./pages/VisualStage/VisualStage2";
import TasteStage1 from "./pages/TasteStage1/TasteStage1";
import TasteStage2 from "./pages/TasteStage2/TasteStage2";
import TasteAdvice from "./pages/TasteAdvice/TasteAdvice";
import WinesTasted from "./pages/WinesTasted/WinesTasted";
import CreationWorkshop from "./pages/CreationWorkshop/CreationWorkshop";
import WorkshopsManagement from "./pages/Admin/WorkshopsManagement/WorshopsManagement";
import { TastingNoteProvider } from "./contexts/TastingNoteContext";
import { TastingProvider } from "./contexts/TastingContext";
import { AuthProvider } from "./contexts/AuthContext";
import { AdminProvider } from "./contexts/AdminContext";
import WinesMap from "./pages/WinesMap/WinesMap";
import AdminHome from "./pages/Admin/AdminHome/AdminHome";
import WorkshopModification from "./pages/Admin/WorkshopModification/WorkshopModification";

function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <Router>
          <TastingProvider>
            <TastingNoteProvider>
              <div className="App">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/registration" element={<Registration />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/tasting" element={<TastingPresentation />} />
                  <Route path="/eye/stage1" element={<VisualStage1 />} />
                  <Route path="/eye/stage2" element={<VisualStage2 />} />
                  <Route path="/mouth/stage1" element={<TasteStage1 />} />
                  <Route path="/mouth/stage2" element={<TasteStage2 />} />
                  <Route path="/advice" element={<TasteAdvice />} />
                  <Route path="/selection" element={<WinesTasted />} />
                  <Route path="/nose/stage1" element={<OlfactoryStage />} />
                  <Route
                    path="/creationworkshop"
                    element={<CreationWorkshop />}
                  />
                  <Route path="/carte" element={<WinesMap />} />
                  <Route path="admin/dashboard" element={<AdminHome />} />
                  <Route
                    path="admin/workshops"
                    element={<WorkshopsManagement />}
                  />
                  <Route
                    path="admin/workshops/edit"
                    element={<WorkshopModification />}
                  />
                </Routes>
              </div>
            </TastingNoteProvider>
          </TastingProvider>
        </Router>
      </AdminProvider>
    </AuthProvider>
  );
}

export default App;
