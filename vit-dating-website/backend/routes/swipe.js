app.post("/swipe", async (req, res) => {
    const { userId, swipeUserId, action } = req.body;
    const user = await User.findById(userId);
    const swipeUser = await User.findById(swipeUserId);
    if (!user || !swipeUser) return res.status(400).json({ message: "User not found" });
    if (action === "like") {
      user.matches.push(swipeUserId);
      swipeUser.matches.push(userId);
      await user.save();
      await swipeUser.save();
    }
    res.json({ message: "Swipe recorded" });
  });
  
  app.listen(5000, () => console.log("Server running on port 5000"));