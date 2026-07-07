/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef7ff",
          100: "#d9edff",
          200: "#bce0ff",
          300: "#8ecdff",
          400: "#59b0ff",
          500: "#2f90ff",
          600: "#1a72f5",
          700: "#155ce1",
          800: "#184bb6",
          900: "#19438f",
        },
        ink: "#1d1d1f",
        // Apple-style neutral grays
        appleink: "#1d1d1f",
        applegray: {
          50: "#fbfbfd",
          100: "#f5f5f7",
          400: "#86868b",
          500: "#6e6e73",
        },
      },
      fontFamily: {
        // System-first so Apple devices render authentic SF Pro; Inter fallback elsewhere.
        sans: ["-apple-system", "BlinkMacSystemFont", "SF Pro Display", "SF Pro Text", "Inter", "system-ui", "Segoe UI", "sans-serif"],
      },
      letterSpacing: {
        apple: "-0.022em",
      },
      boxShadow: {
        card: "0 2px 12px rgba(15,23,42,0.06)",
        nav: "0 -2px 16px rgba(15,23,42,0.08)",
      },
    },
  },
  plugins: [],
};
