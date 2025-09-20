import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Profile from "./components/Profile/Profile";
import Swipe from "./components/Swipe/Swipe";
import Chat from "./components/Chat/Chat";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const isLoggedIn = false; // Replace with actual auth state later

  return (
    <Router>
      {isLoggedIn && <Navbar />} {/* Show navbar only if logged in */}
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/discover" /> : <Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/discover" element={isLoggedIn ? <Swipe /> : <Navigate to="/" />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/" />} />
        <Route path="/chat" element={isLoggedIn ? <Chat /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* Catch-all redirect */}
      </Routes>
    </Router>
  );
}

export default App;
