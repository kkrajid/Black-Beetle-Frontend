/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        primary: 'var(--primary)', 
        text: 'var(--text)',
        border: 'var(--border)',
        hover: 'var(--hover)',
        active: 'var(--active)'
      }
    },
  },
  plugins: [],
}

