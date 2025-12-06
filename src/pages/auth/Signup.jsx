// src/pages/Auth/Signup.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../../redux/slices/authSlice.js";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/config.js";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error: reduxError } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Google Signup
  const handleGoogleSignup = async () => {
    dispatch(loginStart());
    try {
      const result = await signInWithPopup(auth, googleProvider);
      dispatch(loginSuccess(result.user));
      navigate("/dashboard");
    } catch (err) {
      dispatch(loginFailure(err.message));
      setError(err.message);
    }
  };

  // Email Signup
  const handleEmailSignup = async (e) => {
    e.preventDefault();

    dispatch(loginStart());
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      dispatch(loginSuccess(res.user));
      navigate("/dashboard");
    } catch (err) {
      dispatch(loginFailure(err.message));
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-gray-800">
        
        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-center mb-6 text-yellow-400">
          Create Account
        </h2>

        {/* Google Signup */}
        <button
          onClick={handleGoogleSignup}
          className="mb-6 w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-gray-600 hover:bg-gray-700 transition shadow-sm text-white"
        >
          <FcGoogle size={22} /> Sign up with Google
        </button>

        {/* Errors */}
        {(error || reduxError) && (
          <p className="text-red-500 mb-4 text-center">{error || reduxError}</p>
        )}

        {/* Signup Form */}
        <form onSubmit={handleEmailSignup} className="flex flex-col gap-4">

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-300 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative flex flex-col">
            <label className="text-gray-300 font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition pr-10 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/9 pt-1 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold py-3 rounded-lg shadow-md transition mt-2"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Links */}
        <div className="mt-5 flex flex-col items-center gap-2 text-sm text-gray-300">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-400 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
