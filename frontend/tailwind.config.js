/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          less: "#747bff",
          medium: "#646cff",
          high: "#535bf2",
        },
      },
    },
  },
  plugins: [],
};
