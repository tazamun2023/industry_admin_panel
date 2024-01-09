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
      primary: '#765cf1',
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
      disabled: '#707070'
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
