/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--color-bg) / <alpha-value>)",
        card: "rgb(var(--color-card) / <alpha-value>)",
        text: "rgb(var(--color-text) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        sand: "rgb(var(--color-sand) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        teal: {
          DEFAULT: "#1F7A74",
          light: "#289991",
          dark: "#165955",
          50: "#E8F5F4",
          100: "#D1EBE9",
          600: "#1F7A74",
          700: "#18635E",
          800: "#124D49",
        },
        orange: {
          DEFAULT: "#E07845",
          light: "#E89064",
          dark: "#C65F2C",
        },
        core: "#2F9E44",
        optional: "#D9A441",
        transport: "#5B8DB8",
        remote: "#8E63B5",
        caution: "#D9534F",
      },
      fontFamily: {
        sans: ['"Outfit"', '"Inter"', '"Noto Sans SC"', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(17, 43, 60, 0.08), 0 4px 10px -5px rgba(17, 43, 60, 0.04)',
        'floating': '0 20px 40px -15px rgba(31, 122, 116, 0.15), 0 0 15px rgba(0, 0, 0, 0.05)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-out': 'fadeOut 0.2s cubic-bezier(0.4, 0, 1, 1) forwards',
        'view-appear': 'viewAppear 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pop-in': 'popIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pop-out': 'popOut 0.2s cubic-bezier(0.4, 0, 1, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        viewAppear: {
          '0%': { opacity: '0', transform: 'translateY(10px) scale(0.99)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.80) translateY(24px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        popOut: {
          '0%': { opacity: '1', transform: 'scale(1) translateY(0)' },
          '100%': { opacity: '0', transform: 'scale(0.85) translateY(16px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        },
      },
    },
  },
  plugins: [],
}
