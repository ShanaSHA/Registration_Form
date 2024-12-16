/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"], // Adjusted for JSX/TSX if applicable
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('https://t4.ftcdn.net/jpg/02/94/29/33/360_F_294293388_rMi36DO4isvXoNh8B3Q5G07X0bL9z1Ng.jpg')",
        'background': "url('https://img.freepik.com/premium-photo/flatlay-black-friday-message-dark-background-top-view_996173-4065.jpg?semt=ais_hybrid')",
      },
      colors: {
        customBlue: '#1e90ff', // Custom blue color
      },
    },
  },
  plugins: [],
};
