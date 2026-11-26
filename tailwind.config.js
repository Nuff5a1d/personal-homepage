/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          'Inter',
          'sans-serif',
        ],
        mono: [
          '"SF Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      colors: {
        apple: {
          black: '#000000',
          surface: '#111113',
          card: '#161618',
          lightBg: '#F5F5F7',
          lightCard: '#FFFFFF',
          blue: '#0071E3',
          blueDark: '#2997FF',
        },
      },
      boxShadow: {
        'apple-light': '0 4px 24px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.03)',
        'apple-light-hover': '0 16px 40px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)',
        'apple-dark': '0 20px 50px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
      },
      animation: {
        'pulse-slow': 'pulse 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'equalizer-1': 'eq 1.1s ease-in-out infinite',
        'equalizer-2': 'eq 0.85s ease-in-out infinite 0.15s',
        'equalizer-3': 'eq 1.25s ease-in-out infinite 0.3s',
        'equalizer-4': 'eq 0.95s ease-in-out infinite 0.45s',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        eq: {
          '0%, 100%': { transform: 'scaleY(0.28)' },
          '50%': { transform: 'scaleY(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};
