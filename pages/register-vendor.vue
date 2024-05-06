<template>
  <ValidationObserver  class="w-full"  v-slot="{invalid}">
  <form @submit.prevent="userRegister()" class="login-form">
    <transition
      name="fade"
      mode="out-in"
    >
      <div
        class="spinner-wrapper flex justify-center layer-white"
        v-if="loading"
      >
        <spinner
          :radius="100"
        />
      </div>
    </transition>



    <h4 class="mb-30 mb-sm-15">
      {{ $t('profile.register_user') }}
    </h4>

    <div class="card p-4" v-if="errors?.length">
      <ul
        class="error-list mb-15"
      >
        <li
          class="mb-10"
        >
          {{ $t('forgotPassword.errorOccurred') }}
        </li>
        <li
          v-for="(value, index) in errors"
          :key="index"
        >
          {{ value }}
        </li>
      </ul>
    </div>

    <div class="input-wrapper">
      <lang-input :hasError="hasError" type="text" :title="$t('global.name')" :valuesOfLang="name"
                  @updateInput="updateInput">
      </lang-input>
    </div>


    <div class="input-wrapper">
      <div class="relative"><i class="icon absolute mt-[7px] mx-1 email-icon"/>
        <ValidationProvider class="w-full"  name="Email" rules="required|email" v-slot="{errors}" :custom-messages="{required: $t('category.req', { type: $t('fSale.email')}), email: $t('user.isValid', { type: $t('fSale.email') })}">
        <input style="padding:0px 35px"  type="text" :placeholder="$t('fSale.email')" v-model.trim="email" readonly>
          <span class="error">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
    </div>


      <div class="input-wrapper">
        <div class="relative"><i class="icon absolute mt-[7px] mx-1 email-icon"/>
          <ValidationProvider class="w-full"  name="role" rules="required" v-slot="{errors}" :custom-messages="{required: $t('category.req', { type: $t('fSale.role')})}">
          <input style="padding:0px 35px" type="text" :placeholder="$t('fSale.role')" v-model.trim="roles" readonly>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
      </div>


      <div class="input-wrapper">
        <div class="relative">
          <ValidationProvider class="w-full"  name="password" rules="required|min:8|confirmed:confirmation" v-slot="{ errors }" :custom-messages="{required:  `${$t('user.new_password')} is required` }">
          <input :type="passwordFieldType" class="rounded w-full px-2" :placeholder="$t('user.new_password')" v-model="password" @keyup="checkPassword()">
         <i
            class="icon absolute mt-[7px] ltr:right-1 rtl:left-1"
            :class="!isPasswordTypePassword ? 'eye-icon' : 'eye-close-icon'"
            @click="passwordFieldToggle"
          />
            <span class="error">{{ errors[0] }} </span>
          </ValidationProvider>
        </div>

        <div class="pb-4">
          <p class="text-xs" :class="{'text-smooth': passwordCon.containsNumber}">{{ $t('user.one_numeric') }}</p>
          <p class="text-xs" :class="{'text-smooth': passwordCon.containsUppercase}">{{ $t('user.alphabetic_uppercase') }}</p>
          <p class="text-xs" :class="{'text-smooth': passwordCon.containsLowercase}">{{ $t('user.alphabetic _lowercase') }}</p>
          <p class="text-xs" :class="{'text-smooth': passwordCon.containsSpecial}">{{ $t('user.one_special') }}</p>
        </div>
      </div>




      <label class="w-full"  for="">{{ $t('user.confirm_password') }}*</label>
      <div class="relative">
        <ValidationProvider  class="w-full"  name="Confirm_password" rules="required" v-slot="{ errors }" vid="confirmation" :custom-messages="{required: `${$t('user.confirm_password')} is Required` }">
        <input :type="passwordFieldType" class="rounded w-full px-2" :placeholder="$t('user.confirm_password')" v-model="confirmation">
       <i
          class="icon  absolute mt-[-35px] ltr:right-1 rtl:left-1"
          :class="!isPasswordTypePassword ? 'eye-icon' : 'eye-close-icon'"
          @click="passwordFieldToggle()"
        />-
        <span class="error">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>



    <button class="mt-20 primary-btn" :disabled="invalid">
      <span class="flex gap-2"> <span>Save</span> <img class="h-3 w-3 mt-[15px]" src="~/assets/icon/archive-add.svg" alt=""></span>
    </button>

  </form>
  </ValidationObserver>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import AjaxButton from '~/components/AjaxButton'

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
    name: "register-vendor",
    layout: "login-layout",
    middleware: ['common-middleware', 'non-logged-in'],
    data() {
      return {
        name: {'ar':'', 'en':''},
        email: '',
        password: '',
        vendor_id: '',
        customer_id:'',
        admin_id:'',
        rememberToken: '',
        hasError: false,
        formSubmitting: false,
        passwordFieldType: 'password',
        confirmation: '',
        roles:'',
        type:'',
        passwordCon:{
          containsUppercase:false,
          containsLowercase:false,
          containsNumber:false,
          containsSpecial:false,
          checkLicence:false
        },
        loading: false,
        errors:[]
      }
    },
    components: {
      AjaxButton,
      ValidationObserver,
      ValidationProvider
    },
    watch: {},
    computed: {
      isPasswordTypePassword(){
        return this.passwordFieldType === 'password'
      },

      ...mapGetters('language', [ 'languages', 'currentLanguage']),
      ...mapGetters('vendor', ['userInfo']),
    },
    methods: {

      updateInput(input, language, value) {
        this.$set(input, language, value);
      },

      passwordFieldToggle() {
        if (this.isPasswordTypePassword) {
          this.passwordFieldType = 'text'
        } else {
          this.passwordFieldType = 'password'
        }
      },

      async userRegister(){
        try {
          this.loading = true
          const data = await this.registerUser({
            params:{
              'name': this.name,
              'email': this.email,
              'vendor_id': this.vendor_id,
              'roles': this.roles,
              'password': this.password,
              'admin_id': this.admin_id,
              'customer_id': this.customer_id,
              'type': this.type
            },
            lang: this.currentLanguage.code,
            api:'userRegistration'
          })
          this.loading = false

          if(data?.status === 200){
            this.$router.push('/login')
            this.setToastMessage(data.message)
            this.errors = []
          }else{
            this.errors = data.data.form
            this.setToastError(data.message)
          }
        } catch (e) {
          return this.$nuxt.error(e)
        }
      },


      checkPassword(){
        this.passwordCon.containsUppercase = /[A-Z]/.test(this.password)
        this.passwordCon.containsLowercase = /[a-z]/.test(this.password)
        this.passwordCon.containsNumber = /[0-9]/.test(this.password)
        this.passwordCon.containsSpecial = /[#?!@$%^&*-]/.test(this.password)
      },

      ...mapActions('language', ['getLangData']),
      ...mapActions('vendor', ['getUserByEmail', 'registerUser']),
      ...mapActions('ui', ['setToastMessage', 'setToastError'])
    },
  async mounted() {

      this.email = this.$route.query.email
      if(this.email?.length > 0){
        this.loading =true
      const data = await  this.getUserByEmail({
           params:{
              email: this.email
           },
           api:"getUserInfo"
         })
        this.loading = false
        if(data.status === 200){
          this.type = data.data.type
          this.roles = data.data.roles
          this.vendor_id = data.data.vendor_id
        }
      }

    }
  }
</script>

<style scoped>

</style>

