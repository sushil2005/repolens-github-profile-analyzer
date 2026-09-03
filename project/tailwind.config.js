/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // GitHub-inspired accent system
        accent: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#bcd9ff',
          300: '#8ec0ff',
          400: '#599cff',
          500: '#2f81f7',
          600: '#1f6feb',
          700: '#1a6ad8',
          800: '#1f5a9e',
          900: '#1d4d82',
          950: '#122a4a',
        },
        success: {
          50: '#e6f7ec',
          100: '#cfe9d6',
          200: '#a3d3b1',
          300: '#6fb884',
          400: '#3f9f5a',
          500: '#2a8a46',
          600: '#1f7239',
          700: '#1a5c30',
          800: '#184a28',
          900: '#143d22',
        },
        warning: {
          50: '#fff7e6',
          100: '#ffeab8',
          200: '#ffd97a',
          300: '#ffc94a',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        error: {
          50: '#fdeaea',
          100: '#f9d2d2',
          200: '#f1a9a9',
          300: '#e87878',
          400: '#db5454',
          500: '#cf3a3a',
          600: '#b32a2a',
          700: '#922020',
          800: '#7a1d1d',
          900: '#681a1a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'shimmer': 'shimmer 1.6s infinite linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
};
