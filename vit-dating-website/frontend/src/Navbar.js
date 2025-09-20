import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Add logout logic
    navigate("/");
  };

  return (
    <nav style={{ padding: "10px", display: "flex", gap: "15px", background: "#f7f7f7" }}>
      <Link to="/discover">Discover</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/chat">Chat</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
