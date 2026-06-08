/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50:  '#fffef9',
          100: '#fdf9ef',
          200: '#f9f2df',
          300: '#f3e8c4',
        },
        gold: {
          100: '#f5e9c8',
          200: '#ecd89a',
          300: '#e0c46e',
          400: '#d4af37',
          500: '#c9a84c',
          600: '#a8872a',
          700: '#7d6319',
          800: '#54420f',
        },
        charcoal: {
          50:  '#f5f5f5',
          100: '#e8e8e8',
          200: '#d1d1d1',
          400: '#9a9a9a',
          600: '#5a5a5a',
          800: '#2a2a2a',
          900: '#1a1a1a',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body:    ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'gold-sm': '0 2px 12px rgba(201,168,76,0.15)',
        'gold':    '0 4px 24px rgba(201,168,76,0.25)',
        'gold-lg': '0 8px 40px rgba(201,168,76,0.35)',
        'card':    '0 2px 16px rgba(0,0,0,0.07)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.12)',
      },
      animation: {
        'fade-up':  'fadeUp 0.6s ease-out forwards',
        'fade-in':  'fadeIn 0.5s ease-out forwards',
        float:      'float 4s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
