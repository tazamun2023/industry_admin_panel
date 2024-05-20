/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './node_modules/vue-tailwind-datepicker/**/*.js'
  ],

  theme: {
    colors: {
      primary: '#01a781',
      primarylight: '#01A78133',
      seconadry: '#978AB5',
      dark: '#16171A',
      accent: '#4f4f4f',
      light: '#fff',
      gray: '#212121',
      desc: '#EFF4F1',
      error: '#ff0000',
      green: '#177a1f',
      pink: '#ffc8e1',
      burgundy: '#ac0054',
      disabled: '#707070',
      blue:'blue',
      smooth: '#ddd',
      white: '#fff',
      trnsp:'#f1f1f1',
      modal:'#0000007d',
      warning:'#ffc107',
      graylight:'#F9F9F9',
      smoothlight:'#4B5563',
      theem:'#27436F',
      theemlight:'#27436F1A',
      lightdeep:'#F9FAFB',
      warninglight:'#FFD9D9',
      inbg:'#FBFCFE',
      intext:'#737982',
      tabbg:'#F1F1F3',
      obg:'#F8F8F8',
      whitelight:'#FAFAFA',
      cardb:'#C4CDD5'
    },

    screens: {
      sm: '480px',
      md: '768px',
      lg: '999px',
      xl: '1200px',
      xxl: '1320px'
    },

    extend: {
      borderRadius: {
        '4xl': '3rem',
      },
      backgroundColor: {
        'gray-500': '#808080',
      },

    },

    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem'
      }
    },

    fontFamily: {
      display: [ 'sans-serif'],
      body: [ 'sans-serif']
    }
  },
  plugins: [

  ]
}
