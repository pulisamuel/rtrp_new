/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1B2D5B',
          50: '#E8ECF4',
          100: '#C5CDDF',
          200: '#8A9ABF',
          300: '#4F679F',
          400: '#23407A',
          500: '#1B2D5B',
          600: '#162548',
          700: '#111C36',
          800: '#0C1324',
          900: '#070A12',
        },
        midblue: {
          DEFAULT: '#2A5C8F',
          50: '#E9F0F8',
          100: '#C7D9EC',
          200: '#8FB3D8',
          300: '#578DC5',
          400: '#3671A7',
          500: '#2A5C8F',
          600: '#224B74',
          700: '#1A3959',
          800: '#12283E',
          900: '#0A1723',
        },
        emerald: {
          DEFAULT: '#1D9E75',
          50: '#E6F7F1',
          100: '#B3E8D6',
          200: '#80D9BC',
          300: '#4DCAA1',
          400: '#26B48A',
          500: '#1D9E75',
          600: '#178260',
          700: '#11654B',
          800: '#0B4836',
          900: '#052C21',
        },
        amber: {
          DEFAULT: '#F5A623',
          50: '#FEF5E7',
          100: '#FCE4B5',
          200: '#FAD383',
          300: '#F8C251',
          400: '#F6B42F',
          500: '#F5A623',
          600: '#D98F1A',
          700: '#BD7812',
          800: '#A1610A',
          900: '#854A02',
        },
        surface: '#FFFFFF',
        pageBg: '#F4F7FF',
        heading: '#1B2D5B',
        body: '#4A5C7A',
        muted: '#6B7A9A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
