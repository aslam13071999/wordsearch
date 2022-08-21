/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  mode: "jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",

  ],
  theme: {
    colors:{
      'light':{
        'primary': '#ffffff',
        'secondary':'#111827',
        'br-color':'#a3a3a3',
        'lt-gray':'#e5e5e5',
        'gr-800':'#1f2937',
        'blue':'#1e40af'
      }
      },
    extend: {
    }
  },
  plugins: []
}
