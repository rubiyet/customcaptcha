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
    }
  },
  plugins: [],
}