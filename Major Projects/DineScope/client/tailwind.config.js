/** @type {import('tailwindcss').Config} */
export default {
  /* 1. Enable class-based dark mode */
  darkMode: "class",

  /* 2. Explicit content scanning (recommended even with Vite plugin) */
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      /* 3. Design tokens (colors) */
      colors: {
        brand: {
          DEFAULT: "#ff385c", // primary
          dark: "#e31c5f",
          light: "#ff6f7d",
        },
      },

      /* 4. Custom fonts */
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },

      /* 5. Custom spacing scale */
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        128: "32rem",
      },

      /* 6. Custom breakpoints */
      screens: {
        xs: "475px",
        "3xl": "1600px",
      },

      /* 7. Border radius tokens */
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },

  /* 8. Tailwind plugins */
  plugins: [],
};
