/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1F2937", // dark slate
        secondary: "#111827", // darker bg
        accent: "#FBBF24", // golden/yellow for premium touch
        highlight: "#3B82F6", // blue accent
        light: "#F3F4F6", // for text contrast
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
}
