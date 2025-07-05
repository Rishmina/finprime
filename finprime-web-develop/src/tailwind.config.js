/** @type {import('tailwindcss').Config} */
import aspectRatio from '@tailwindcss/aspect-ratio';

export default {
  content: [
    "./project-1-/index.html",
    "./project-1-main/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        brandDark: "#0b0b0d",
        brandBlue: "#1a1f39",
      },
      borderRadius: {
        '6xl': '4rem',
        '7xl': '5rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        cinzel: ['Cinzel', 'serif'],
        lato: ['"Lato"', 'sans-serif'],
        khula: ['Khula', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
        'kulim-park': ['"Kulim Park"', 'sans-serif'],
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0deg) scale(10)' },
          '100%': { transform: 'rotate(-360deg) scale(10)' },
        },
        fadeInRightsmall: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRightsmalls: {
          '0%': { opacity: '0', transform: 'translateX(0px)' },
          '100%': { opacity: '1', transform: 'translateX(20)' },
        },
        fadeinright: {
          '0%': { opacity: '0', transform: 'translateX(200px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeinrightsmall: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeinleft: {
          '0%': { opacity: '0', transform: 'translateX(-200px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeinleftsmall: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeinbottom: {
          '0%': { opacity: '0', transform: 'translateY(200px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeintop: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeinbottomadj: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scrollImages: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        rotate: 'rotate 2s linear infinite',
        fadeinrightsmalls: 'fadeinrightsmalls 0.8s ease-out forwards',
        fadeinrightsmall: 'fadeinrightsmall 0.8s ease-out forwards',
        fadeinleftsmall: 'fadeinleftsmall  0.8s ease-out forwards',
        fadeInRightsmall: 'fadeInRightsmall 0.5s ease-out forwards',
        fadeinright: 'fadeinright 3s ease-out forwards',
        fadeinleft: 'fadeinleft 3s ease-out forwards',
        fadeinbottom: 'fadeinbottom 1.5s ease-out forwards',
        fadeintop: 'fadeintop 0.5s ease-out forwards',
        fadeinbottomadj: 'fadeinbottomadj 1.5S ease-out forwards',
        scrollImages: 'scrollImages 40s linear infinite',
      },
    },
  },
  plugins: [
    aspectRatio,
  ],
};
