import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import DestinationPage from "./pages/DestinationPage";
import Planner from "./pages/Planner";
import Expenses from "./pages/Expenses";
import Profile from "./pages/Profile";
import Results from "./pages/Results";
import Assistant from "./pages/Assistant";
import Verify from "./pages/Verify";
import CreateTrip from "./pages/CreateTrip";
import JoinTrip from "./pages/JoinTrip";
import Map from "./pages/Map";
import PlannerHub from "./pages/plannerhub";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Dashboard sub-pages */}
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />

        {/* Your primary page containing your newly configured 2-in-a-row layout */}
        
        
        {/* Dynamic target router matching the `to={`/explore/${p.id}`}` pathing */}
        <Route path="/explore/:id" element={<DestinationPage />} />
        <Route path="/planner" element={<PlannerHub />} />
        <Route path="/planner/:id" element={<Planner />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/results" element={<Results />} />
        <Route path="/assistant" element={<Assistant />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/join/:inviteCode" element={<JoinTrip />} />
        <Route path="/map" element={<Map />} />

         
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
