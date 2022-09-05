/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{html,js,css}",
  "./views/*.ejs",
  "./views/layouts/*.ejs",],
  theme: {
    fontFamily:{
      'helve':['Helvetica', 'Arial', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}
