import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Swipe.css";

const users = [
  { id: 1, name: "Alice", age: 24, image: "https://randomuser.me/api/portraits/women/1.jpg", bio: "Love music and travel." },
  { id: 2, name: "Bob", age: 26, image: "https://randomuser.me/api/portraits/men/2.jpg", bio: "Coffee lover and gamer." },
  { id: 3, name: "Clara", age: 22, image: "https://randomuser.me/api/portraits/women/3.jpg", bio: "Yoga and nature enthusiast." },
  { id: 4, name: "David", age: 28, image: "https://randomuser.me/api/portraits/men/4.jpg", bio: "Tech geek and foodie." },
];

const Swipe = () => {
  const [index, setIndex] = useState(users.length - 1);
  const [direction, setDirection] = useState(null);
  const [hearts, setHearts] = useState([]);
  const navigate = useNavigate();

  const handleSwipe = (dir) => {
    setDirection(dir);

    if (dir === "right") {
      const likedUser = users[index];

      // Floating heart effect
      const id = Math.random();
      setHearts(prev => [...prev, id]);
      setTimeout(() => {
        setHearts(prev => prev.filter(h => h !== id));
      }, 1000);

      // Navigate to Chat page with this user
      navigate("/chat", { state: { user: likedUser } });
    }

    setIndex(prev => prev - 1);
  };

  return (
    <div className="swipe-container">
      <AnimatePresence>
        {index >= 0 ? (
          users.slice(0, index + 1).map((user, i) => (
            <motion.div
              key={user.id}
              className="card"
              initial={{ scale: 0.8 + i * 0.05, y: -i * 10, opacity: 0 }}
              animate={{ scale: 1 - (index - i) * 0.05, y: - (index - i) * 10, opacity: 1 }}
              exit={{ x: direction === "left" ? -500 : 500, opacity: 0, rotate: direction === "left" ? -20 : 20 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, info) => {
                if (info.offset.x > 150) handleSwipe("right");
                else if (info.offset.x < -150) handleSwipe("left");
              }}
            >
              <img src={user.image} alt={user.name} />
              <div className="card-info">
                <h2>{user.name}, {user.age}</h2>
                <p>{user.bio}</p>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            className="card no-users"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <img src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png" alt="No users" />
            <h2>No more users 😔</h2>
          </motion.div>
        )}
      </AnimatePresence>

      {index >= 0 && (
        <div className="buttons">
          <button className="dislike" onClick={() => handleSwipe("left")}>❌</button>
          <button className="like" onClick={() => handleSwipe("right")}>❤️</button>
        </div>
      )}

      {/* Floating Hearts */}
      {hearts.map((id) => (
        <motion.div
          key={id}
          className="floating-heart"
          initial={{ y: 0, opacity: 1, scale: 1 }}
          animate={{ y: -150, opacity: 0, scale: 1.5 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};

export default Swipe;
