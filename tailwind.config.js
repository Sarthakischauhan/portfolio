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
        nav: "#C175FF",
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
        "underline-left-right": {
          "0%": { transform: "scaleX(0)", transformOrigin: "left" },
          "100%": { transform: "scaleX(1)", transformOrigin: "left" },
        },
      },
      animation: {
        blur: "blur 2s linear infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out both",
        "underline-left-right": "underline-left-right 0.25s ease-out forwards",
      },
      fontSize: {
        body: [
          "clamp(0.75rem, 0.7rem + 0.3vw, 0.9rem)",
          // 12px → fluid → 14.4px
        ],
        "section-heading": [
          "clamp(0.75rem, 0.85rem + 0.6vw, 0.9rem)",
          // 15.2px → fluid → 20px
        ],
        nav: [
          "clamp(0.8rem, 0.75rem + 0.2vw, 0.9rem)",
          // ~12.8px → fluid → 14.4px
        ],
        "name-heading": [
          "clamp(1.5625rem, 1.25rem + 1.5vw, 1.875rem)",
          // 25px → fluid → 30px
        ],
      },
      letterSpacing: {
        nav: "0.04em",            
        "section-label": "0.12em", 
        meta: "0.04em",                 
      }
    }
  },
  plugins: [require('@tailwindcss/typography')],
};
