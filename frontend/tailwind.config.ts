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
          primary: "#1153a1",
          secondary: "#facc15",
          accent: "#000eff",
          neutral: "#f2f2f2",
          "base-100": "oklch(100% 0 0)",
          "base-200": "#F2F2F2",
          "base-300": "#E5E6E6",
          "base-content": "#1f2937",
        },
      },
      {
        dark: {
          "color-scheme": "dark",
          primary: "#1153a1",
          secondary: "#1153a1",
          accent: "#1153a1",
          neutral: "#2a323c",
          "neutral-content": "#A6ADBB",
          "base-100": "#1d232a",
          "base-200": "#191e24",
          "base-300": "#15191e",
          "base-content": "#A6ADBB",
        },
      },
    ],
  },
  theme: {
    extend: {
      colors: {
        primary: {
          "50": "#f1f7fe",
          "100": "#e2edfc",
          "200": "#bfd9f8",
          "300": "#87bbf2",
          "400": "#4799e9",
          "500": "#207cd7",
          "600": "#1260b7",
          "700": "#1153a1",
          "800": "#11427b",
          "900": "#143966",
          "950": "#0d2444",
        },
        secondary: {
          "50": "#f2f5fc",
          "100": "#e1eaf8",
          "200": "#c9daf4",
          "300": "#a4c2ec",
          "400": "#79a3e1",
          "500": "#5b84d8",
          "600": "#4568cb",
          "700": "#3b55ba",
          "800": "#364897",
          "900": "#303e78",
          "950": "#21284a",
        },
        tertiary: {
          "50": "#f5f6fa",
          "100": "#eaecf4",
          "200": "#d0d7e7",
          "300": "#a6b5d3",
          "400": "#768dba",
          "500": "#556fa2",
          "600": "#465d91",
          "700": "#36466e",
          "800": "#303d5c",
          "900": "#2c364e",
          "950": "#1d2334",
        },
      },
    },
  },
};
