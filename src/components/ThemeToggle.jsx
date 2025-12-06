import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/slices/themeSlice";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="bg-secondary p-2 rounded-full hover:bg-accent transition text-light"
    >
      {theme === "dark" ? <FaSun /> : <FaMoon />}
    </button>
  );
}
