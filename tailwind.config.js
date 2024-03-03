/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Kepp on Adding colors
        primary: {
          400: "#fefefe",
        },
      }
    },
  },
  plugins: [],
}

