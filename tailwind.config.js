/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary background
        background: {
          DEFAULT: '#0F0F12',
          alt: '#0A0A0F',
        },
        // Secondary surfaces / cards
        surface: {
          DEFAULT: '#111115',
          elevated: '#1A1A20',
        },
        // Text
        'text-primary': '#e5e5e5',
        'text-secondary': '#A0A0A8',
        'text-muted': '#B0B0B8',
        // Accents
        accent: {
          DEFAULT: '#00bb72',
          hover: '#00d67d',
          bright: '#00e08a',
        },
        success: '#00E08A',
        // Borders / dividers
        border: {
          DEFAULT: '#222227',
          strong: '#2A2A30',
        },
      },
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      fontSize: {
        'hero': ['clamp(3rem, 6vw, 5rem)', { lineHeight: '1.1', letterSpacing: '0.02em' }],
        'hero-sm': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.15', letterSpacing: '0.02em' }],
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0,0,0,0.45)',
        'glow': '0 0 16px rgba(0,187,114,0.25)',
        'glow-hover': '0 0 24px rgba(0,187,114,0.35)',
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(to bottom, #0F0F12, #001833)',
        'gradient-subtle': 'linear-gradient(180deg, #0F0F12 0%, #0A0A0F 100%)',
      },
      maxWidth: {
        'content': '1280px',
        'content-wide': '1440px',
      },
      transitionDuration: {
        'smooth': '250ms',
        'smooth-long': '300ms',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
