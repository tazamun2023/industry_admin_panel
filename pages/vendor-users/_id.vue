<template>
  <div>
    <div class="w-1/3 mx-auto shadow p-4 border border-smooth rounded">
      <div class="flex mb-2 justify-between">
      <h3>{{ $t('app.update_admin') }}</h3>
      <nuxt-link to="/vendor-users" >
        <button class="bg-primary border p-2 leading-3 text-white w-[100px]">List</button>
      </nuxt-link>

    </div>
      <ValidationObserver  class="w-full" v-slot="{ invalid }">
        <form @submit.prevent="formSubmit">
          <transition
            name="fade"
            mode="out-in"
          >
            <div
              class="spinner-wrapper flex layer-white"
              v-if="loading"
            >
              <spinner
                :radius="100"
              />
            </div>
          </transition>

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
            <ValidationProvider  class="w-full" name="Name"  v-slot="{ errors }">
              <label for="">{{ $t('fSale.name') }}</label>
              <input type="text" :placeholder="$t('fSale.name')" v-model="userInfo.name">
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="input-wrapper">
            <ValidationProvider class="w-full" name="email" rules="required|email" v-slot="{ errors }" :custom-messages="{required: $t('category.req', {type: $t('fSale.email')})}">
              <label for="">{{ $t('fSale.email') }}</label>
              <input type="email" :placeholder="$t('fSale.email')" v-model="userInfo.email">
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="input-wrapper">
            <div class="relative">
              <ValidationProvider class="w-full" name="password" rules="required|min:8|confirmed:confirmation" v-slot="{ errors }" :custom-messages="{required:  `${$t('user.new_password')} is required` }">
                <label class="w-full"  for="">{{ $t('user.new_password') }}*</label>
                <input :type="passwordFieldType" class="rounded w-full px-2" :placeholder="$t('user.new_password')" v-model="userInfo.password" @keyup="checkPassword()">
                <i
                  class="icon absolute mt-[7px] ltr:right-1 rtl:left:right-1"
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


          <div class="relative">
            <ValidationProvider  class="w-full" name="Confirm_password" rules="required" v-slot="{ errors }" vid="confirmation" :custom-messages="{required: `${$t('user.confirm_password')} is Required` }">
              <label class="w-full"  for="">{{ $t('user.confirm_password') }}*</label>
              <input :type="passwordFieldType" class="rounded w-full px-2" :placeholder="$t('user.confirm_password')" v-model="confirmation">
              <i
                class="icon icon absolute mt-[7px] ltr:right-1 rtl:left:right-1"
                :class="!isPasswordTypePassword ? 'eye-icon' : 'eye-close-icon'"
                @click="passwordFieldToggle()"
              />
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>



          <div class="input-wrapper mb-0 text-end">
            <button class="bg-primary leading-3 w-[100px] p-2 rounded text-white" :disabled="invalid">Submit</button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import {ValidationObserver, ValidationProvider} from "vee-validate";
import {mapActions, mapGetters} from "vuex";

export default {
  name:'vendor-create',
  components: {ValidationObserver, ValidationProvider},
  data(){
    return {
      userInfo: {
        name:'',
        email:'',
        password:''
      },
      confirmation: '',
      passwordFieldType: 'password',
      passwordCon:{
        containsUppercase:false,
        containsLowercase:false,
        containsNumber:false,
        containsSpecial:false,
        checkLicence:false
      },
      errors:[],
      loading:false,
      id:''
    }
  },
  computed:{
    isPasswordTypePassword(){
      return this.passwordFieldType === 'password'
    },
    ...mapGetters('admin', ['profile']),
    ...mapGetters('language', [ 'languages', 'currentLanguage']),
  },
  watch:{
    profile(){
      this.userInfo.vendor_id = this.profile?.vendor_id
    }
  },
  methods:{
    ...mapActions('vendor', ['getUserById', 'updateUserInformation']),
    ...mapActions('ui', ['setToastMessage', 'setToastError']),

    passwordFieldToggle() {
      if (this.isPasswordTypePassword) {
        this.passwordFieldType = 'text'
      } else {
        this.passwordFieldType = 'password'
      }
    },

    checkPassword(){
      this.passwordCon.containsUppercase = /[A-Z]/.test(this.userInfo.password)
      this.passwordCon.containsLowercase = /[a-z]/.test(this.userInfo.password)
      this.passwordCon.containsNumber = /[0-9]/.test(this.userInfo.password)
      this.passwordCon.containsSpecial = /[#?!@$%^&*-]/.test(this.userInfo.password)
    },

    async formSubmit(){
      try {
        this.loading = true
        const data = await this.updateUserInformation({
          id: this.id,
          params:{
            ...this.userInfo
          },
          lang: this.currentLanguage.code,
          api:'updateUserInformation'
        })
        this.loading = false

        if(data?.status === 200){
          this.$router.push('/admins-vendors')
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

    async getVendorUserById(){
      this.id = this.$route?.params?.id
      this.loading  = true
      const data = await this.getUserById({
        id: this.id,
        api:"getUserById"
      })
      this.loading = false
      if(data.status === 200){
        this.userInfo.name = data.data.name
        this.userInfo.email = data.data.email
        this.errors = []

      }else{
        this.errors = data.data.form
        this.setToastError("", 'Solve the Error')
      }
    }

  },
  async mounted() {
    await this.getVendorUserById()
  }
}



</script>
