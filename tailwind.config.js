/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '2xs': ['0.8125rem', { lineHeight: '1.125rem' }],
        xs: ['0.875rem', { lineHeight: '1.25rem' }],
        sm: ['0.9375rem', { lineHeight: '1.375rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      fontFamily: {
        sans: ["'Anek Bangla'", "'Hind Siliguri'", "system-ui", "-apple-system", "sans-serif"],
        anek: ["'Anek Bangla'", "'Hind Siliguri'", "sans-serif"],
        heading: ["'Anek Bangla'", "'Hind Siliguri'", "sans-serif"],
        hind: ["'Hind Siliguri'", "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        brand: {
          yellow: "var(--primary-yellow)",
          "yellow-hover": "var(--primary-yellow-hover)",
          green: "var(--primary-green)",
          "green-hover": "var(--primary-green-hover)",
          emerald: "#063d27",
          forest: "#042618",
          amber: "#f59e0b",
          gold: "#d97706",
          blue: "var(--brand-blue)",
          dark: "var(--text-main)",
          muted: "var(--text-muted)",
          border: "var(--border-color)",
          light: "var(--bg-light)",
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-reverse': 'float-reverse 7s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'blob': 'blob 10s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.92', transform: 'scale(1.02)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -40px) scale(1.08)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(6, 61, 39, 0.12), 0 0 1px 1px rgba(0, 0, 0, 0.04)',
        'luxury-hover': '0 25px 50px -12px rgba(6, 61, 39, 0.22), 0 0 1px 1px rgba(16, 185, 129, 0.2)',
        'glow-gold': '0 0 25px rgba(245, 158, 11, 0.35)',
        'glow-green': '0 0 25px rgba(16, 185, 129, 0.3)',
      },
    },
  },
  plugins: [],
};
