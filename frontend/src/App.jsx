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
import BlendedWine from "./pages/BlendedWine/BlendedWine";
import WorkshopsManagement from "./pages/Admin/WorkshopsManagement/WorshopsManagement";
import { TastingNoteProvider } from "./contexts/TastingNoteContext";
import { TastingProvider } from "./contexts/TastingContext";
import { CreationWorkshopProvider } from "./contexts/CreationWorkshopContext";
import { AuthProvider } from "./contexts/AuthContext";
import { AdminProvider } from "./contexts/AdminContext";
import WinesMap from "./pages/WinesMap/WinesMap";
import AdminHome from "./pages/Admin/AdminHome/AdminHome";
import WorkshopModification from "./pages/Admin/WorkshopModification/WorkshopModification";
import WorkshopCreation from "./pages/Admin/WorkshopCreation/WorkshopCreation";
import UsersManagement from "./pages/Admin/UsersManagement/UsersManagement";
import UsersModification from "./pages/Admin/UsersModification/UsersModification";

function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <Router>
          <TastingProvider>
            <TastingNoteProvider>
              <CreationWorkshopProvider>
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
                    <Route path="/blendedWine" element={<BlendedWine />} />
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
                    <Route
                      path="admin/workshops/add"
                      element={<WorkshopCreation />}
                    />
                    <Route path="admin/users" element={<UsersManagement />} />
                    <Route
                      path="admin/users/edit"
                      element={<UsersModification />}
                    />
                  </Routes>
                </div>
              </CreationWorkshopProvider>
            </TastingNoteProvider>
          </TastingProvider>
        </Router>
      </AdminProvider>
    </AuthProvider>
  );
}

export default App;
