/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primaryColor: "#1361bb",
      secondaryColor: "#ffffff",
      tertiaryColor: "#fbbf24",
      quaternaryColor: "#f59e0b",
      quinaryColor: "#f87171",
      senaryColor: "#ef4444",
      borderColor: "#ffffff",
      red: "#ef4444",
      green: "#10b981",
      blue: "#3b82f6",
      blockedColor: "#DD2424",
      validatedColor: "#13BA61",
      disabled : "#FFECB3",
      lightBlue : "#0F8491",
      shutterBg: "#CFD8DC",
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      4: "4px",
      8: "8px",
      12: "12px",
      14: "14px",
      16: "16px",
      20: "20px",
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}