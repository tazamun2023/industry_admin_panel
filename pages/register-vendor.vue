<template>
  <ValidationObserver v-slot="{invalid}">
  <form
    ref="loginForm"
    @submit.prevent="checkForm()"
    :class="{'has-error': hasError}"
    class="login-form"
  >
    <h4 class="mb-30 mb-sm-15">
      {{ $t('profile.wb') }}
    </h4>

    <error-formatter/>

     <ValidationProvider name="Email" rules="required|email" v-slot="{errors}" :custom-messages="{required: $t('category.req', { type: $t('fSale.email')}), email: $t('user.isValid', { type: $t('fSale.email') })}">
    <div class="input-wrapper">
      <div class="icon-input"><i class="icon email-icon"/>
        <input type="text" :placeholder="$t('fSale.email')" v-model.trim="email">
      </div>
      <span class="error">{{ errors[0] }}</span>
    </div>
     </ValidationProvider>

    <ValidationProvider name="role" rules="required" v-slot="{errors}" :custom-messages="{required: $t('category.req', { type: $t('fSale.role')})}">
      <div class="input-wrapper">
        <div class="icon-input"><i class="icon email-icon"/>
          <input type="text" :placeholder="$t('fSale.role')" v-model.trim="role">
        </div>
        <span class="error">{{ errors[0] }}</span>
      </div>
    </ValidationProvider>


    <ValidationProvider name="password" rules="required|min:8|confirmed:confirmation" v-slot="{ errors }" :custom-messages="{required:  `${$t('user.new_password')} is required` }">
      <div class="input-wrapper">
        <div class="relative">
          <input :type="passwordFieldType" class="rounded w-full px-2" :placeholder="$t('user.new_password')" v-model="password" @keyup="checkPassword()">
          <i
            class="icon"
            :class="!isPasswordTypePassword ? 'eye-icon' : 'eye-close-icon'"
            @click="passwordFieldToggle"
          />
        </div>
        <span class="error">{{ errors[0] }} </span>
        <div class="pb-4">
          <p class="text-xs" :class="{'text-smooth': passwordCon.containsNumber}">{{ $t('user.one_numeric') }}</p>
          <p class="text-xs" :class="{'text-smooth': passwordCon.containsUppercase}">{{ $t('user.alphabetic_uppercase') }}</p>
          <p class="text-xs" :class="{'text-smooth': passwordCon.containsLowercase}">{{ $t('user.alphabetic _lowercase') }}</p>
          <p class="text-xs" :class="{'text-smooth': passwordCon.containsSpecial}">{{ $t('user.one_special') }}</p>
        </div>
      </div>
    </ValidationProvider>


    <ValidationProvider name="Confirm_password" rules="required" v-slot="{ errors }" vid="confirmation" :custom-messages="{required: `${$t('user.confirm_password')} is Required` }">
      <label class="w-full"  for="">{{ $t('user.confirm_password') }}*</label>
      <div class="relative">
        <input :type="passwordFieldType" class="rounded w-full px-2" :placeholder="$t('user.confirm_password')" v-model="confirmation">
        <i
          class="icon"
          :class="!isPasswordTypePassword ? 'eye-icon' : 'eye-close-icon'"
          @click="passwordFieldToggle"
        />
        <span class="error">{{ errors[0] }}</span>
      </div>
    </ValidationProvider>




    <ajax-button
      :activate-btn="true"
      class="mt-20 primary-btn"
      :fetching-data="formSubmitting"
      :loading-text="$t('dataPage.logging')"
      :text="$t('dataPage.sign')"
    />
    <client-only>
      <div
        v-if="isDemo"
      >
        <button
          @click.prevent="setCredentials(-1)"
          class="outline-btn block mtb-15 w-100"
        >
          {{ $t('profile.laa') }}
        </button>

        <button
          @click.prevent="setCredentials(1)"
          class="outline-btn block w-100"
        >
          {{ $t('profile.lav') }}
        </button>

      </div>
    </client-only>
  </form>
  </ValidationObserver>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import util from '~/mixin/util'
  import validation from '~/mixin/validation'
  import AjaxButton from '~/components/AjaxButton'
  import PasswordField from '~/components/PasswordField'
  import ErrorFormatter from '~/components/ErrorFormatter'

  import * as rules from 'vee-validate/dist/rules';
  import { messages } from 'vee-validate/dist/locale/en.json';
  import {extend, ValidationObserver, ValidationProvider} from 'vee-validate';
  import userRegistration from "@/mixin/userRegistration";

  Object.keys(rules).forEach(rule => {
    extend(rule, {
      ...rules[rule], // copies rule configuration
      message: messages[rule] // assign message
    });
  });

  export default {
    name: "login",
    layout: "login-layout",
    middleware: ['common-middleware', 'non-logged-in'],
    data() {
      return {
        email: '',
        password: '',
        rememberToken: '',
        hasError: false,
        formSubmitting: false,
        passwordFieldType: 'password',
        confirmation: '',
        role:''
      }
    },
    mixins: [util, validation, userRegistration],
    components: {
      AjaxButton,
      ErrorFormatter,
      PasswordField,
      ValidationObserver,
      ValidationProvider
    },
    watch: {},
    computed: {
      passwordFieldToggle(){
        if(this.isPasswordTypePassword){
          this.passwordFieldType = 'text'
        } else {
          this.passwordFieldType = 'password'
        }
      },
      isPasswordTypePassword(){
        return this.passwordFieldType === 'password'
      },
      isDemo() {
        return process.env.isDemo
      },
      isInvalidEmail() {
        return (this.email && !this.isValidEmail(this.email))
      },
      isLengthInvalid() {
        return (this.password && !this.isValidLength(this.password))
      },
      ...mapGetters('language', ['defaultLanguage']),
      ...mapGetters('ui', ['rememberMe'])
    },
    methods: {
      setCredentials(data) {
        if (data < 0) {
          this.email = 'admin@mail.com'
          this.password = '123456'
        } else {
          this.email = 'vendor@mail.com'
          this.password = '123456'
        }
        this.checkForm()
      },

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
      ...mapActions('common', ['getRequest']),
      ...mapActions('language', ['getLangData']),
      ...mapActions('ui', ['setErrors', 'settingRemember'])
    },
    mounted() {
      this.rememberToken = this.rememberMe === 'true' ? true : ''
      this.setErrors()
    }
  }
</script>

<style scoped>

</style>

