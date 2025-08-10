import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './features/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        glass: 'rgba(255,255,255,0.1)',
        'glass-border': 'rgba(255,255,255,0.2)',
      },
      backdropBlur: {
        glass: '12px',
      },
    },
  },
  plugins: [],
};
export default config;
