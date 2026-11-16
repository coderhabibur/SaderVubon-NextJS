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
        '2xs': ['0.8125rem', { lineHeight: '1.125rem' }], // 13px
        xs: ['0.875rem', { lineHeight: '1.25rem' }],       // 14px (minimum comfortable reading size)
        sm: ['0.9375rem', { lineHeight: '1.375rem' }],     // 15px
        base: ['1rem', { lineHeight: '1.5rem' }],           // 16px
        lg: ['1.125rem', { lineHeight: '1.75rem' }],        // 18px
        xl: ['1.25rem', { lineHeight: '1.75rem' }],         // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],          // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],     // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],       // 36px
        '5xl': ['3rem', { lineHeight: '1' }],               // 48px
      },
      fontFamily: {
        sans: ["'Hind Siliguri'", "system-ui", "-apple-system", "sans-serif"],
        hind: ["'Hind Siliguri'", "system-ui", "-apple-system", "sans-serif"],
        anek: ["'Anek Bangla'", "'Hind Siliguri'", "sans-serif"],
        heading: ["'Anek Bangla'", "'Hind Siliguri'", "sans-serif"],
      },
      colors: {
        brand: {
          yellow: "var(--primary-yellow)",
          "yellow-hover": "var(--primary-yellow-hover)",
          green: "var(--primary-green)",
          "green-hover": "var(--primary-green-hover)",
          blue: "var(--brand-blue)",
          dark: "var(--text-main)",
          muted: "var(--text-muted)",
          border: "var(--border-color)",
          light: "var(--bg-light)",
        },
      },
    },
  },
  plugins: [],
};
