const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    rollNumber: String,
    branch: String,
    year: String,
    gender: String,
    interestedIn: String,
    bio: String,
    profilePic: String,
    matches: [String],
  });
  const User = mongoose.model("User", UserSchema);