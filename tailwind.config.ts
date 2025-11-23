import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: '#35BFFF',
        dark: '#0A0F1A',
        panel: '#111827'
      },
      boxShadow: {
        glow: '0 0 20px rgba(53,191,255,0.35)'
      },
      borderRadius: {
        xl: '1.1rem'
      }
    }
  },
  plugins: [typography]
};

export default config;
