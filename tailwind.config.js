module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // "./node_modules/flowbite-react/**/*.js",
  ],
  plugins: [
    //  require("flowbite/plugin")
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      "main-100": "#16425B",
      "blue-200": "#34C4EF",
      "brand-deep": "#16425B",
      "teal-green": "#365469",
      red: "#ED1C24",
      "gray-100": "#767676",
      "gray-200": "#D9D9D9",
      "gray-300": "#D9DBE1",
      white: "#fff",
      "black-100": "#16425B",
      "brand-primary": "#16425B",
      black: "#000",
    },
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        default: "0px 1px 7px rgba(0, 0, 0, 0.1)",
      },
      spacing: {
        90: "350px",
      },
    },
  },

  fontFamily: {
    sans: ["Poppins", "sans-serif"],
  },

  plugins: [],
};
