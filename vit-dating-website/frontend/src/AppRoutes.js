// AppRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Profile from "./components/Profile/Profile";
import Swipe from "./components/Swipe/Swipe";
import Chat from "./components/Chat/Chat";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/discover" element={<Swipe />} />
    <Route path="/chat" element={<Chat />} />
  </Routes>
);

export default AppRoutes;
