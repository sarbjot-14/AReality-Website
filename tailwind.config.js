const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'pages/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans]
      },
      colors: {
        primary: '#22577a',
        secondary: '#8FCB9B',
        accent: '#80ed99',
        neutral: '#fffafb'
      },
      backgourndColors: {
        primary: '#22577a',
        secondary: '#22577a',
        accent: '#80ed99',
        neutral: '#fffafb'
      }
    }
  },
  plugins: []
};
