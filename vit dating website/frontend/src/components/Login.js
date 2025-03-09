import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const [verified, setVerified] = useState(false);

  const sendOtp = async () => {
    const response = await axios.post("http://localhost:5000/send-otp", { email });
    setOtp(response.data.otp);
  };

  const verifyOtp = async () => {
    const response = await axios.post("http://localhost:5000/verify-otp", { email, otp, userOtp });
    if (response.data.token) setVerified(true);
  };

  return (
    <div>
      <h2>VIT Dating Login</h2>
      {!verified ? (
        <div>
          <input type="email" placeholder="Enter VIT Email" onChange={(e) => setEmail(e.target.value)} />
          <button onClick={sendOtp}>Send OTP</button>
          <input type="text" placeholder="Enter OTP" onChange={(e) => setUserOtp(e.target.value)} />
          <button onClick={verifyOtp}>Verify OTP</button>
        </div>
      ) : (
        <h3>Login Successful!</h3>
      )}
    </div>
  );
};

export default Login;