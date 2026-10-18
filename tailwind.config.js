/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
      },
      maxHeight: {
        128: "32rem",
      },
      gridTemplateColumns: {
        fluid: "repeat(auto-fit,minmax(16rem,1fr))",
      },
      colors: {
        "amber-550": "#ff8c38",
      },
    },
  },
  plugins: [],
};
