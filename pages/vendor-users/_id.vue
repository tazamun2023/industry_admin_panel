<template>
  <div class="tab-sidebar p-4"   v-if="$can('invite')">
    <div class="flex mb-2 justify-between">
      <h3>Add Vendor User</h3>
      <button class="bg-primary border p-2 leading-3 text-white w-[100px]">List</button>
    </div>
    <div>
      <ValidationObserver v-slot="{ invalid }">
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
          <ValidationProvider name="email" rules="required|email" v-slot="{ errors }" :custom-messages="{required: $t('category.req', {type: $t('fSale.email')})}">
          <label for="">{{ $t('fSale.email') }}</label>
          <input type="email" :placeholder="$t('fSale.email')" v-model="userInfo.email">
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="input-wrapper" v-if="$can('assign_roles')">
          <ValidationProvider name="roles" rules="required" v-slot="{ errors }" :custom-messages="{required: $t('category.req', {type: $t('user.role')})}">
          <label class="w-full" for="">{{ $t('user.role') }}</label>
          <select class="w-50 p-2 border border-smooth rounded" v-model="userInfo.roles">
            <option value="">Select role</option>
            <option value="vendor">Vendor</option>
          </select>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="input-wrapper">
          <label for="verified"><input type="checkbox" v-model="userInfo.isVerified"> {{ $t('user.verified') }}</label>
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
          email:'',
          roles: '',
          isVerified:'',
          vendor_id: '',
          type:'admin',
        },
      errors:[],
      loading:false
    }
  },
  computed:{
    ...mapGetters('admin', ['profile']),
  },
  watch:{
    profile(){
      this.userInfo.vendor_id = this.profile?.vendor_id
    }
  },
  methods:{
    ...mapActions('vendor', ['sentInvitation']),
    ...mapActions('ui', ['setToastMessage', 'setToastError']),
    async formSubmit(){
       this.loading  = true
      const data = await this.sentInvitation({
               params:{
                    ...this.userInfo
               },
             api:"sentInvitation"
      })
      this.loading = false
      if(data.status === 200){
        this.errors = []
        this.setToastMessage(data.message)
      }else{
        this.errors = data.data.form
        this.setToastError("", 'Solve the Error')
      }
    }
  },
  mounted() {
    this.userInfo.vendor_id = this.profile?.vendor_id
  }
}



</script>
