/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F6F2EA',
          surface: '#EDE7DC',
          elevated: '#FAF7F2',
          border: 'rgba(20, 32, 27, 0.10)',
          darkBorder: 'rgba(20, 32, 27, 0.18)',
        },
        ink: {
          DEFAULT: '#14201B',
          muted: '#5C6A64',
          faint: '#8E9C96',
          subtle: 'rgba(20, 32, 27, 0.05)',
        },
        pine: {
          DEFAULT: '#0F4C3A',
          hover: '#16604A',
          light: '#E7EFEA',
          dark: '#08281F',
          muted: '#1F5A48',
        },
        saffron: {
          DEFAULT: '#E8A317',
          hover: '#D49210',
          light: '#FDF6E8',
        },
        positive: {
          DEFAULT: '#2D7A58',
          light: '#E9F4EE',
        },
        warning: {
          DEFAULT: '#C96528',
          light: '#FBF0E9',
        },
        negative: {
          DEFAULT: '#B83A3A',
          light: '#FAEDED',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Newsreader', 'Georgia', 'serif'],
        sans: ['Instrument Sans', 'DM Sans', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        editorial: '0 1px 3px rgba(20, 32, 27, 0.06), 0 4px 12px rgba(20, 32, 27, 0.04)',
        hover: '0 4px 14px rgba(20, 32, 27, 0.08), 0 1px 2px rgba(20, 32, 27, 0.04)',
        sheet: '0 -10px 30px rgba(20, 32, 27, 0.12)',
      },
      borderRadius: {
        btn: '9px',
        card: '12px',
        tag: '6px',
      },
    },
  },
  plugins: [],
}
