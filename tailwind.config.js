/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./apps/frontend/pages/**/*.{js,ts,jsx,tsx}",
    "./apps/frontend/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A237E",
        secondary: "#3949AB",
        accent: "#FFD600",
        background: "#181C2A",
        surface: "#23263A",
        muted: "#F5F7FA",
        success: "#00C853",
        warning: "#FFD600",
        error: "#D32F2F",
        info: "#29B6F6",
        // Adicione outros tokens conforme a identidade OLV
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        xl: "1rem",
        '2xl': "1.5rem",
      }
    },
  },
  plugins: [],
} 