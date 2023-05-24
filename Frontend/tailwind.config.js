/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'merriweather': ['Merriweather', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'opendyslexic': ['OpenDyslexic', 'sans-serif'],
      },
      colors: {
        'primary': '#FFD48E',
        'primary-dark': '#FFC46B',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

