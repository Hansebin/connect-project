/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-green": "#2bae66",
        "main-green-800": "#2bae6680",
        "main-green-300": "#2bae6630",
        "main-black": "#111111",
      },
      height: {
        header: "98px",
        main: `calc(100vh - 98px)`,
      },
      boxShadow: {
        basic: "0px 8px 24px rgba(149, 157, 165, 0.2)",
      },
    },
  },
  plugins: [],
};
