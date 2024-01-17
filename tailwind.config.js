/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      colors:{
        'primary': '#6a1c36',
        'secondary': "#FF9933",
        'teritiary':'#24344D'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
]
}

