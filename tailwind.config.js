/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.mdx",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      margin: {
        "70%": "70%",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans"],
        mono: ["var(--font-ibm-mono)", "monospace"],
      },
      textColor: {
        danger: "#e3342f",
        hyperlink: "#C175FF",
        info: "#007FFF",
        inlinecode: "#d2a8ff",
      },
      borderColor: {
        quote: "#C175FF",
        info: "#007FFF",
        imgborder: "#272727",
      },
      keyframes: {
        blur: {
          "0%": { filter: "blur(0px)" },
          "100%": { filter: "blur(5px)" },
        },
        "fade-in-up": {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        blur: "blur 2s linear infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out both",
      },
    }
  },
  plugins: [require('@tailwindcss/typography')],
};
