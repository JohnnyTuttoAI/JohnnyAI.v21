/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        swiss: ['var(--font-swiss)'],
        mono: ['var(--font-mono)']
      },
      colors: {
        swiss: {
          red: '#FF0000',
          black: '#000000',
          white: '#FFFFFF'
        },
        cyber: {
          blue: '#00F0FF',
          purple: '#BD00FF',
          pink: '#FF0099'
        }
      },
      backgroundImage: {
        'swiss-grid': "url('/grid.svg')",
        'noise': "url('/noise.png')"
      }
    }
  },
  plugins: [],
};