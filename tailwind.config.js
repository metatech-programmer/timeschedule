/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background-app": "#2A3A49",
        "primary-orange-app": "#F68839",
        "secondary-blue-app": "#30B3BB",
        "tertiary-green-app": "#82AD4C",
        "quaternary-gray-app": "#F6F6F4",
      },

      animation: {
        "spin-slow": "spin 1s linear infinite",
        "expanddisplay": "expanddisplay 2700ms linear",
        "fade-in": "fade-in 1600ms linear",
        "fade-in-fast": "fade-in 700ms linear",
        "fade-out": "fade-out 2900ms linear",
        "scroll": "scroll 20s linear infinite",
        "expand-btn": "expand-btn 1600ms linear infinite",
        "expand-btn-2": "expand-btn-2 1600ms linear infinite",
        "border-rainbow": "border-rainbow 1600ms linear infinite",
        "bg-rainbow": "bg-rainbow 6s ease-in-out infinite",
      },
      keyframes: {
        "spin-slow": {
          "0%": {
            transform: "rotate(0deg)"
          },
          "100%": { transform: "rotate(360deg)" },
        },
        "expanddisplay": {
          "0%": { transform: "scale(0) rotate(0deg) translate(-50%, -50%)", opacity: "1" },
          "100%": { transform: "scale(10) rotate(360deg) translate(-50%, -50%)", opacity: "0" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scroll": {
          "0%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(calc(-50%))" },
        },
        "expand-btn": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        "expand-btn-2": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
          "100%": { transform: "scale(1)" },
        },
        "border-rainbow": {
          "0%": { "border-color": "#F68839" },
          "25%": { "border-color": "#30B3BB" },
          "50%": { "border-color": "#82AD4C" },
          "75%": { "border-color": "#F68839" },
          "100%": { "border-color": "#30B3BB" },
        },
        "bg-rainbow": {
          "0%": { "background-image": "linear-gradient(150deg, #f97316, #ffd700, #f97316)", "background-size": "200% 100%" },
          "50%": { "background-image": "linear-gradient(150deg, #f97316, #ffd700, #f97316)", "background-size": "100% 200%" },
          "100%": { "background-image": "linear-gradient(150deg, #f97316, #ffd700, #f97316)", "background-size": "200% 100%" },
          
        }
      },
    },
  },
  plugins: [],
}