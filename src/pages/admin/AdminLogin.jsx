// src/pages/admin/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLogin({ setAdminLoggedIn }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Fixed admin credentials
  const ADMIN_EMAIL = "fizzajawed012@gmail.com";
  const ADMIN_PASSWORD = "fjAdmin@012#*";

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setAdminLoggedIn(true);
      navigate("/admin/dashboard");
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="w-full max-w-md p-10 rounded-3xl bg-gradient-to-br from-gray-800/70 via-gray-700/50 to-gray-800/70 backdrop-blur-md shadow-2xl border border-gray-600/30 text-white">
        <h2 className="text-4xl font-extrabold text-center mb-6 text-yellow-400 drop-shadow-lg">
          Admin Login
        </h2>

        {error && <p className="text-red-500 text-center mb-4 font-medium">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-300">Email</label>
            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-4 rounded-xl bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition backdrop-blur-sm"
              required
            />
          </div>

          {/* Password */}
          <div className="relative flex flex-col">
            <label className="mb-2 font-medium text-gray-300">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-4 rounded-xl bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 pr-12 transition backdrop-blur-sm"
              required
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/9 pt-1 text-gray-300 hover:text-yellow-400 transition"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>

          <button
            type="submit"
            className="bg-yellow-400/90 text-gray-900 font-bold py-3 rounded-xl hover:bg-yellow-300/90 shadow-lg transition transform hover:-translate-y-1"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Only authorized admin can access the dashboard
        </p>
      </div>
    </div>
  );
}
