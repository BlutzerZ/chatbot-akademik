import daisyui from "daisyui";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [typography, daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#2563eb",
          secondary: "#facc15",
          accent: "#000eff",
          neutral: "#1d1d1d",
          "base-100": "#f3f4f6",
          info: "#009bff",
          success: "#009b54",
          warning: "#e28300",
          error: "#d24255",
        },
      },
      "dark",
    ],
  },
};
