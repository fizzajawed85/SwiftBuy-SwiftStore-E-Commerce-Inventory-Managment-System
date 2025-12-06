// src/pages/Auth/Login.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../../redux/slices/authSlice.js";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/config.js";

export default function Login() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  // Google Login
  const handleGoogleLogin = async () => {
    dispatch(loginStart());
    try {
      const result = await signInWithPopup(auth, googleProvider);
      dispatch(loginSuccess(result.user));
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  };

  // Email & Password Login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    dispatch(loginStart());
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      dispatch(loginSuccess(res.user));
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-2 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-2 rounded bg-gray-700 text-white"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-400 text-gray-900 py-2 rounded hover:bg-yellow-300 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <hr className="my-4 border-gray-600" />

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-500 py-2 rounded transition"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}
