/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D7B257',
        text: '#91916B',
        background: '#000000',
        border: 'rgba(215, 178, 87, 0.2)',
        hover: 'rgba(215, 178, 87, 0.2)',
        active: 'rgba(215, 178, 87, 0.3)',
      },
    },
  },
  plugins: [],
}

