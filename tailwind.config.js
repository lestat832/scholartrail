/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // New Design System Colors
        'st-purple': {
          50: '#F3F0FF',
          100: '#E9E5FF',
          200: '#D6CCFF',
          300: '#A78BFA',
          400: '#8B5CF6',
          500: '#7C3AED',
          600: '#6366F1',
          700: '#5B21B6',
          800: '#4C1D95',
          900: '#3C1361',
        },
        'st-blue': {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#3B82F6',
          500: '#2563EB',
          600: '#1E40AF',
          700: '#1E3A8A',
          800: '#1E2A78',
          900: '#1E2A54',
        },
        // Semantic colors
        'st-success': '#10B981',
        'st-warning': '#F59E0B',
        'st-error': '#EF4444',
        'st-info': '#06B6D4',
        
        // Legacy colors (for gradual migration)
        'privacy-teal': '#8B5CF6',    // Map to st-purple-400
        'neutral-gray': '#6B7280',    // Map to gray-500
        'vault-blue': '#111827',      // Map to gray-900
        'protected-bg': '#F9FAFB',    // Map to gray-50
        'verified-green': '#10B981',  // Map to st-success
        'info-blue': '#2563EB',       // Map to st-blue-500
        'trust-pink': '#7C3AED',      // Map to st-purple-500
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