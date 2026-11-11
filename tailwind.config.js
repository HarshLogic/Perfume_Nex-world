/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#14213D",
          50: "#F0F3F8",
          100: "#DCE3EE",
          200: "#B8C7DD",
          300: "#8EA4C7",
          400: "#5A77A6",
          500: "#325081",
          600: "#223961",
          700: "#182848",
          800: "#14213D", // Official Navy
          900: "#0C1425",
          950: "#070B14",
        },
        cream: {
          DEFAULT: "#F4EDE0", // Official Cream
          50: "#FCFBF7",
          100: "#FAF7F2",
          200: "#F4EDE0",
          300: "#E9DCB8",
          400: "#D9C48E",
          500: "#C5A967",
          600: "#A98E4B",
          700: "#846D3A",
          800: "#604F2C",
          900: "#3D321D",
        },
        coral: {
          DEFAULT: "#FF6B5B", // Official Coral
          50: "#FFF3F1",
          100: "#FFE4E0",
          200: "#FFC8C2",
          300: "#FFA398",
          400: "#FF7B6D",
          500: "#FF6B5B",
          600: "#E84D3C",
          700: "#C23223",
          800: "#992318",
          900: "#701A12",
        },
        luxury: {
          gold: "#C5A059",
          goldLight: "#DFBF7E",
          goldDark: "#947333",
          pink: "#F4D7DA",
          pinkDark: "#9E3C50",
          turquoise: "#2A7B88",
          turquoiseDark: "#154249",
          burgundy: "#5A1827",
          burgundyDark: "#370912",
        }
      },
      fontFamily: {
        serif: ["Cinzel", "Playfair Display", "Didot", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "Montserrat", "Inter", "sans-serif"],
        display: ["Cinzel Decorative", "Cinzel", "serif"],
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "float-reverse": "floatReverse 7s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 4s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(1.5deg)" },
        },
        floatReverse: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(12px) rotate(-1.5deg)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: 0.9, transform: "scale(1)" },
          "50%": { opacity: 0.6, transform: "scale(1.03)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
