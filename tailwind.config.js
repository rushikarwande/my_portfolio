/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#4361EE',
        'neon-purple': '#7209B7',
        'neon-pink': '#F72585',
      },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
      },
      animation: {
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'scale(1)',
          },
          '33%': {
            transform: 'scale(1.1)',
          },
          '66%': {
            transform: 'scale(0.9)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
      },
      boxShadow: {
        'glow': '0 0 15px rgba(67, 97, 238, 0.7)',
      },
    },
  },
  plugins: [],
}
