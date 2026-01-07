/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
// 1. The plugins array only contains the require statement
  plugins: [
    require('daisyui'),
  ],
  // 2. The daisyui config object goes here (OUTSIDE of plugins)
  daisyui: {
    themes: ["forest"], 
  },
}