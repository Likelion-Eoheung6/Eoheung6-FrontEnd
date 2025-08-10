/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'blue-dark': '#009DFF',
        'blue-normal': '#00BBFF',
        'blue-light': '#95E3FF',
        indigo: '#00468B',
        'yellow-light': '#FFEFA1',
        'yellow-normal': '#FFD400',
        orange: '#FDB000',
        white: '#FDFDFD',
        'gray-100': '#FAFAFA',
        'gray-200': '#E0E0E0',
        'gray-300': '#B3B3B3',
        'gray-400': '#545454',
        black: '#111111',
      },
      maxWidth: {
        content: '394px',
      },
      fontFamily: {
        sans: ['Hakgyoansim Rikodeo', 'Pretendard', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
