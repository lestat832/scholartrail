/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'privacy-teal': '#45818E',
        'neutral-gray': '#6C7B7F',
        'vault-blue': '#34495E',
        'protected-bg': '#F7F9FB',
        'verified-green': '#27AE60',
        'info-blue': '#3498DB',
        'trust-pink': '#E85A9B',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Playfair Display', 'Georgia', 'serif'],
      },
      keyframes: {
        confettiFall: {
          '0%': {
            transform: 'translateY(0) rotate(0deg)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(100vh) rotate(720deg)',
            opacity: '0',
          },
        },
      },
      animation: {
        confetti: 'confettiFall 3s ease-out forwards',
      },
    },
  },
  plugins: [],
}