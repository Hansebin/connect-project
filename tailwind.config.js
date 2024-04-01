/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-green": "#2bae66",
        "main-green-300": "#2bae6630",
      },
      height: {
        header: "98px",
        main: `calc(100vh - 98px)`,
      },
    },
  },
  plugins: [],
};
