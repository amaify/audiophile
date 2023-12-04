/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  safelist: [
    "text-error",
    "text-warning",
    "text-success",
    "text-primary",
    "border-success",
    "border-error",
    "border-warning",
    "bg-hero-image",
    "bg-primary",
    "bg-darkGrey",
    "bg-pattern"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D87D4A",
        primaryHover: "#fbaf85",
        error: "#CD2C2C",
        warning: "#A56300",
        success: "#00801A",
        darkGrey: "#F1F1F1",
        grey: "#F2F2F2"
      },
      margin: {
        lg: "16rem",
        xl: "20rem"
      },
      padding: {
        xl: "325px"
      }
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1380px",
      "2xl": "1536px"
    }
  },
  plugins: []
};
