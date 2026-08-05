import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";

// Public / landing
import LandingPage from "../features/landing/LandingPage";
import Home from "../features/landing/Home";
import Login from "../features/auth/Login";
import Signup from "../features/auth/Signup";
import ForgotPassword from "../features/auth/ForgotPassword";
import ResetPassword from "../features/auth/ResetPassword";
import Verify from "../features/auth/Verify";

// Dashboard / core app
import Dashboard from "../features/dashboard/Dashboard";
import Profile from "../features/dashboard/Profile";
import Explore from "../features/explore/Explore";
import DestinationPage from "../features/explore/DestinationPage";
import Map from "../features/explore/Map";
import Results from "../features/explore/Results";

// Trip planning
import PlannerHub from "../features/trip/PlannerHub";
import Planner from "../features/trip/Planner";
import CreateTrip from "../features/trip/CreateTrip";
import JoinTrip from "../features/trip/JoinTrip";
import Expenses from "../features/expenses/Expenses";
import Assistant from "../features/assistant/Assistant";
import FinalDestinationView from "../features/trip/FinalDestinationView";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/join/:inviteCode" element={<JoinTrip />} />

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/explore/:id" element={<DestinationPage />} />
        <Route path="/results" element={<Results />} />
        <Route path="/map" element={<Map />} />

        <Route path="/planner" element={<PlannerHub />} />
        <Route path="/planner/:id" element={<Planner />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/expenses" element={<Expenses />} />

        {/* :tripId optional — Assistant falls back to general chat if absent */}
        <Route path="/assistant" element={<Assistant />} />
        <Route path="/assistant/:tripId" element={<Assistant />} />
      </Route>
      <Route path="/planner/:id/destination" element={<FinalDestinationView />} />

      {/* 404 */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}