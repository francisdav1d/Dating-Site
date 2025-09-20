import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const location = useLocation();
  const [user, setUser] = useState({
    name: "",
    age: "",
    bio: "",
    image: "",
    interests: []
  });

  useEffect(() => {
    if (location.state && location.state.user) {
      setUser(location.state.user);
    }
  }, [location.state]);

  const handleAddInterest = () => {
    const interest = prompt("Enter new interest:");
    if (interest) setUser({ ...user, interests: [...user.interests, interest] });
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <img src={user.image} alt={user.name} className="profile-pic" />
        <div className="profile-info">
          <h2>{user.name}, {user.age}</h2>
          <p>{user.bio}</p>
          <div className="interests">
            {user.interests?.map((i, idx) => (
              <span key={idx} className="badge">{i}</span>
            ))}
            <button className="add-btn" onClick={handleAddInterest}>+ Add</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
