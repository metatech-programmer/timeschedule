/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background-app": "#0D1B2A",
        "surface-1": "#132236",
        "surface-2": "#1A2D42",
        "primary-orange-app": "#F68839",
        "secondary-blue-app": "#30B3BB",
        "tertiary-green-app": "#4ADE80",
        "quaternary-gray-app": "#F1F5F9",
        "muted-app": "#7B9BB0",
        "border-app": "rgba(48,179,187,0.2)",
      },
      fontFamily: {
        sans: ["Space Grotesk", "system-ui", "sans-serif"],
      },

      animation: {
        "spin-slow": "spin 1s linear infinite",
        "expanddisplay": "expanddisplay 2700ms linear",
        "fade-in": "fade-in 1600ms linear",
        "fade-in-fast": "fade-in 700ms linear",
        "fade-out": "fade-out 2900ms linear",
        "scroll": "scroll 10s linear infinite",
        "expand-btn": "expand-btn 1600ms linear infinite",
        "expand-btn-2": "expand-btn-2 1600ms linear infinite",
        "border-rainbow": "border-rainbow 1600ms linear infinite",
        "bg-rainbow": "bg-rainbow 6s ease-in-out infinite",
        "rotate-45": "rotate-45 3600ms ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "slide-up": "slide-up 500ms ease-out",
        "shimmer": "shimmer 2s linear infinite",
        "live-dot": "live-dot 1.5s ease-in-out infinite",
        "wiggle": "wiggle 2.5s ease-in-out infinite",
        "bounce-soft": "bounce-soft 2.8s ease-in-out infinite",
        "heartbeat": "heartbeat 1.8s ease-in-out infinite",
        "sparkle": "sparkle 3.5s ease-in-out infinite",
        "drift": "drift 9s ease-in-out infinite",
        "wave-hand": "wave-hand 2.5s ease-in-out infinite",
        "ping-slow": "ping-slow 2.5s cubic-bezier(0,0,0.2,1) infinite",
        "float-slow": "float 10s ease-in-out infinite",
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
          "100%": { transform: "translateX(-100%)" },

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

        },
        "rotate-45": {
          "0%": { transform: "rotate(-32deg)" },
          "50%": { transform: "rotate(35deg)" },
          "100%": { transform: "rotate(-32deg)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "glow-pulse": {
          "0%, 100%": { "box-shadow": "0 0 15px rgba(246,136,57,0.3)" },
          "50%": { "box-shadow": "0 0 30px rgba(246,136,57,0.7), 0 0 60px rgba(48,179,187,0.3)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "shimmer": {
          "0%": { "background-position": "-200% 0" },
          "100%": { "background-position": "200% 0" },
        },
        "live-dot": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.4)", opacity: "0.6" },
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-9deg)" },
          "75%": { transform: "rotate(9deg)" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "heartbeat": {
          "0%, 100%": { transform: "scale(1)" },
          "15%": { transform: "scale(1.18)" },
          "30%": { transform: "scale(0.96)" },
          "45%": { transform: "scale(1.13)" },
          "60%": { transform: "scale(1)" },
        },
        "sparkle": {
          "0%, 100%": { opacity: "1", transform: "scale(1) rotate(0deg)" },
          "50%": { opacity: "0.25", transform: "scale(0.6) rotate(180deg)" },
        },
        "drift": {
          "0%, 100%": { transform: "translate(0px, 0px)" },
          "33%": { transform: "translate(12px, -10px)" },
          "66%": { transform: "translate(-8px, 6px)" },
        },
        "wave-hand": {
          "0%, 55%, 100%": { transform: "rotate(0deg)", "transform-origin": "70% 70%" },
          "20%": { transform: "rotate(-12deg)", "transform-origin": "70% 70%" },
          "40%": { transform: "rotate(14deg)", "transform-origin": "70% 70%" },
        },
        "ping-slow": {
          "0%": { transform: "scale(1)", opacity: "0.8" },
          "75%, 100%": { transform: "scale(2.2)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
}