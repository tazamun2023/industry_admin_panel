export default ({ app }) => {
  app.router.afterEach((to, from) => {
    if (app.i18n.locale === 'ar') {
      app.head.htmlAttrs.dir = 'rtl'
      app.head.htmlAttrs.lang = 'ar'
    } else {
      app.head.htmlAttrs.dir = 'ltr'
      app.head.htmlAttrs.lang = 'en'
    }
  })
}
