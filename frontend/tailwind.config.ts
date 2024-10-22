import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
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
  plugins: [daisyui],
};
