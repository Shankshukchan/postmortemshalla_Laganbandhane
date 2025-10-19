import MoveToTopButton from "./compoenets/buttons/MoveToTopButton";
import Pricing from "./compoenets/pricing/Pricing";

import "./App.css";
import Footer from "./compoenets/navigation/Footer";
import Login from "./compoenets/register/Login";
import Signup from "./compoenets/register/Signup";
import Home from "./compoenets/home/Home";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { UserProvider } from "./UserContext";
import { LanguageProvider } from "./LanguageContext";
import Templates from "./compoenets/templates/Templates";
import Editor from "./compoenets/editor/Editor";
import Navbar from "./compoenets/navigation/Navbar";
import ContactUs from "./compoenets/contact/ContactUs";
import AboutUs from "./compoenets/about-us/AboutUs";
import UserDashboard from "./compoenets/dashboards/user-dashboard/UserDashboard";
import AdminDashboard from "./compoenets/dashboards/admin-dashboard/AdminDashboard";
import ProtectedAdminRoute from "./compoenets/dashboards/admin-dashboard/ProtectedAdminRoute";

// ProtectedRoute for editor: only redirect to login if not logged in
function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <UserProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/editor/:id" element={<Editor />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
            />
          </Routes>
          <Footer />
          <MoveToTopButton />
        </BrowserRouter>
      </LanguageProvider>
    </UserProvider>
  );
}

export default App;
