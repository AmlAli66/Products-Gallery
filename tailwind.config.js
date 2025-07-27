/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#6366F1',
        background: {
          light: '#f8fafc',
          dark: '#0f172a'
        },
        text: {
          light: '#111827',
          dark: '#e5e7eb'
        }
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.1)',
        cardDark: '0 2px 8px rgba(255,255,255,0.1)'
      }
    }
  },
  plugins: []
};
