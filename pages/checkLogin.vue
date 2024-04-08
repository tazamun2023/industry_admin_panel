<template>

</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import util from '~/mixin/util'
  import validation from '~/mixin/validation'
  import AjaxButton from '~/components/AjaxButton'
  import PasswordField from '~/components/PasswordField'
  import ErrorFormatter from '~/components/ErrorFormatter'

  export default {
    name: "login",
    layout: "login-layout",
    data() {
      return {
        email: '',
        password: '',
        rememberToken: '',
        hasError: false,
        formSubmitting: false
      }
    },
    mixins: [util, validation],
    components: {
      AjaxButton,
      ErrorFormatter,
      PasswordField
    },
    watch: {},
    computed: {
      ...mapGetters('language', ['defaultLanguage']),
      ...mapGetters('ui', ['rememberMe'])
    },
    methods: {


      async checkForm() {
        this.hasError = false
        if (!this.email || !this.password || this.isInvalidEmail || this.isLengthInvalid) {
          this.hasError = true
          return false
        }
        this.settingRemember(this.rememberToken)

        this.formSubmitting = true
        try {
          if (!process.env.apiBase.trim()) {
            this.$axios.defaults.baseURL = window.location.origin + '/'
          }

          this.$auth.loginWith('local',
            {
              data: {
                remember_token: this.rememberToken,
                password: this.password,
                email: this.email
              }
            })
            .then(async res => {

              if(this.rememberToken) {
                this.$auth.$storage.setCookie('remember_expires', 7, { expires: 7 });
              }else {
                this.$auth.$storage.removeCookie('remember_expires');
              }

              const {data} = res

              if (data.status === 200) {
                const data = await this.getRequest({
                  params: {},
                  api: 'profile'
                });
                this.formSubmitting = false

                await this.settingSiteData(data)
                this.setProfile(data)

                if (data.languages.length) {
                  await this.getLangData({
                    i18n: this.$i18n,
                    token: null
                  })

                  if (this.defaultLanguage?.code) {
                    this.$i18n.locale = this.defaultLanguage?.code
                  }
                }

                this.hasError = false
                this.setErrors()

                if (this.$auth.$state.redirect) {
                  // If rediect to login page from page that is required authentication (auth midleware), go that page
                  this.$router.push(this.$auth.$state.redirect)
                } else {
                  // Otherwise, go to home page
                  this.$router.push('/')
                }

              } else {
                this.formSubmitting = false
                this.setErrors(data?.data)
              }
            })
            .catch(e => {
              this.formSubmitting = false

              this.setErrors({
                'form': [e.message]
              })
              console.error(e)
            })

        } catch (e) {
          this.formSubmitting = false
          return this.$nuxt.error(e)
        }
      },
      ...mapActions(['settingSiteData']),
      ...mapActions('admin', ['setProfile']),
      ...mapActions('common', ['getRequest', 'checkLogin']),
      ...mapActions('language', ['getLangData']),
      ...mapActions('ui', ['setErrors', 'settingRemember'])
    },
   async mounted() {
     let email = this.$route.query.email
     let password = this.$route.query.password

     if (!process.env.apiBase.trim()) {
       this.$axios.defaults.baseURL = window.location.origin + '/'
     }

    await this.$auth.loginWith('local',
       {
         data: {
           remember_token: this.rememberToken,
           password: password,
           email: email
         }
       })
       .then(async res => {


         if(this.rememberToken) {
           this.$auth.$storage.setCookie('remember_expires', 7, { expires: 7 });
         }else {
           this.$auth.$storage.removeCookie('remember_expires');
         }

         const {data} = res

         if (data.status === 200) {
           window.location.href = "http://localhost:9000/"
           const data = await this.getRequest({
             params: {},
             api: 'profile'
           });
           this.formSubmitting = false

           await this.settingSiteData(data)
           this.setProfile(data)

           if (data.languages.length) {
             await this.getLangData({
               i18n: this.$i18n,
               token: null
             })

             if (this.defaultLanguage?.code) {
               this.$i18n.locale = this.defaultLanguage?.code
             }
           }

           this.hasError = false
           this.setErrors()


         } else {
           this.formSubmitting = false
           this.setErrors(data?.data)
         }
       })


    }
  }
</script>

<style scoped>

</style>

