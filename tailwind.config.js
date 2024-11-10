/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.{html,js,ejs}', './public/js/*.js'],
  theme: {
    extend: {},
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
      2: '400%',
      16: '4rem',
    },
  },
  plugins: [],
};
