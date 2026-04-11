/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-500': '#3b82f6',
        'primary-600': '#2563eb',
        'dark-100': '#1f2937',
        'dark-200': '#111827',
        'dark-300': '#0b0f19',
      },
    },
  },
  plugins: [],
}