<template>
       <check-validity :gate="'view_financial'">
        <div class="card p-4">
           <div class="flex justify-between">
                <div>
                    <h4 class="font-bold">My Payment Information</h4>
                    <p>Providing this bank account information allows us to deposit payments into your account, including payouts from orders</p>
                </div>
                <div>
                    <button @click="addPayment" class="p-2 leading-3 rounded bg-primary text-white hover:text-primary"
                    v-if="$can('update_financial')"
                    >Add Payment</button>
                </div>
           </div>
        </div>
        <div class="lg:grid lg:grid-cols-3    my-2 gap-4">

          <div class="card p-4" v-for="(value, index) in bankList" :key="index">
            <div class="flex gap-4 justify-between">
                <div class="flex gap-4">
                    <h4 class="font-bold">{{ value.name }}</h4>
                    <span v-if="value.is_default" class="bg-smooth p-1 h-[20px] rounded-lg leading-3 text-primary text-xs mt-1">Default</span>
                </div>
                <div class="flex gap-4">
                        <button @click="deleteModal=true" class="p-2 leading-3 rounded bg-smooth  hover:text-warning">Remove</button>
                    <button @click="editing(value)" v-if="$can('update_financial')" class="p-2 leading-3 rounded bg-primary text-white hover:text-primary">Edit</button>
                </div>
            </div>
            <div class="w-3/4">
                <table>
                    <tr class="hover:bg-none">
                        <td class="border-none">Bank Holders Name</td>
                        <td class="border-none">{{ value.holder_name }}</td>
                    </tr>
                    <tr class="hover:bg-none">
                        <td class="border-none">Bank Name</td>
                        <td class="border-none">{{ value.bank_name }}</td>
                    </tr>
                    <tr class="hover:bg-none">
                        <td class="border-none">IBAN</td>
                        <td class="border-none">{{ value.iban_number }}</td>
                    </tr>
                    <tr class="hover:bg-none">
                        <td class="border-none">Swift Code</td>
                        <td class="border-none">{{ value.swift_code }}</td>
                    </tr>
                </table>
            </div>
            <div class="flex justify-end">
                <input type="checkbox" name="" id=""> <span>Set as Default</span>
            </div>
            <DeleteModal v-if="deleteModal" @closeModal="closeModal">
              <template v-slot:title>
                <h4>{{ $t('vendor.deletemessage') }}</h4>
              </template>
              <!-- -----------default slot------- -->
              <!-- -----------default slot------- -->
              <template v-slot:buttons>
                <div class="flex gap-4 justify-end">
                  <button @click="deleteModal=false" class="p-2 border border-smooth rounded leading-3 w-[60px]">Quit</button>
                  <button @click.prevent="deleting(value)" class="p-2 border border-smooth bg-primary text-white  rounded leading-3 w-[60px] hover:text-primary">Agree</button>
                </div>
              </template>
            </DeleteModal>
          </div>


        </div>
        <!-- -----------------modal------------ -->
        <template v-if="Cardmodal">
    <div class="fixed bg-modal  inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="z-50 bg-white p-6 relative rounded-md shadow w-full md:w-1/2 lg:w-2/3 xl:w-2/5">
        <svg @click="Cardmodal=false" class="w-4 h-4 text-gray-800 absolute ltr:right-3  rtl:left-3 cursor-pointer mt-[-10px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
        <!-- Modal Content -->
        <ValidationObserver  v-slot="{ invalid }">
        <div class="mb-4">
            <h4>Add Bank</h4>

            <form class="px-2" @submit.prevent="BankAction">

              <ValidationProvider name="name" class="w-full" rules="required" v-slot="{ errors }" :custom-messages="{required: `Enter Your ${$t('global.name')}`}">
                <div class="input-wrapper">
                  <label for="">{{ $t('global.name') }}*</label>
                  <input type="text" placeholder="Enter name" v-model="bankData.name">
                  <span  class="error">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>

              <ValidationProvider name="Bank name" class="w-full" rules="required" v-slot="{ errors }" :custom-messages="{required: `Enter Your ${$t('bank.bank_name')}`}">
                <div class="input-wrapper">
                    <label for="">{{ $t('bank.bank_name') }}*</label>
                    <input type="text" placeholder="Enter Bank name" v-model="bankData.bank_name">
                  <span  class="error">{{ errors[0] }}</span>
                </div>
               </ValidationProvider>

                <div class="input-wrapper flex gap-4">
                  <ValidationProvider name="Iban" class="w-full" rules="required|max:24" v-slot="{ errors }" :custom-messages="{required: `Enter Your ${$t('bank.iban')}`}">
                    <div class="w-full input-wrapper">
                        <label class="w-full" for="">{{ $t('bank.iban') }}*</label>
                        <input type="text" placeholder="IBAN" v-model="bankData.iban_number">
                      <span  class="error">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                </div>
                <div class="flex gap-4">
                  <ValidationProvider name="Account Number" class="w-full" rules="required|numeric" v-slot="{ errors }" :custom-messages="{required: `Enter Your ${$t('bank.account_number')}`, numeric: 'Enter Number Only'}">
                    <div class="input-wrapper w-full">
                        <label for="">{{ $t('bank.account_number') }}*</label>
                        <input type="text" placeholder="Enter Bank account number*" v-model="bankData.account_number">
                      <span  class="error">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider name="holder name" class="w-full" rules="required" v-slot="{ errors }" :custom-messages="{required: `Enter Your ${$t('bank.bank_name')}`}">
                    <div class="input-wrapper w-full">
                        <label for="">{{ $t('bank.holder_name') }}*</label>
                        <input type="text" placeholder="Enter Bank account holder's name" v-model="bankData.holder_name">
                      <span  class="error">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                </div>
                <div class="flex gap-4">
                  <ValidationProvider name="Swift" class="w-full" rules="required" v-slot="{ errors }" :custom-messages="{required: `Enter Your ${$t('bank.swift_code')}`}">
                    <div class="input-wrapper w-full">
                        <label for="">{{ $t('bank.swift_code') }}*</label>
                        <input type="text" placeholder="Swift/BIC code*" v-model="bankData.swift_code">
                      <span  class="error">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                </div>
                <div class="input-wrapper w-full">
                    <div class="flex gap-1">
                    <input type="checkbox" v-model="bankData.is_default">
                    <label for="">Set bank details as default</label>
                   </div>
                </div>
                <div class="flex justify-end gap-4">
                    <button  @click="Cardmodal=false" class="btn bg-smooth hover:text-primary  border-secondary mt-20">Cancel</button>
                    <button class="btn bg-primary hover:text-primary text-white border-secondary mt-20" :disabled="invalid">Save Change</button>
                </div>
            </form>
        </div>
        </ValidationObserver>
        <!-- Close Button -->

      </div>
    </div>
  </template>
        <!-- -----------------modal end------------ -->
    </check-validity>
</template>
<style scoped>
table td {
    border-bottom: 0px !important;
}
</style>
<script>
import {mapActions, mapGetters} from "vuex";
import {ValidationObserver, ValidationProvider} from "vee-validate";
import bank from "@/mixin/bank";

export default{
  components:{ValidationObserver, ValidationProvider},
  mixins:[bank],
    data(){
        return{
            Cardmodal:false,
            bankData:{
              id:'',
              vendor_id: null,
              name:'',
              bank_name:'',
              holder_name:'',
              account_number:'',
              iban_number:'',
              swift_code:'',
              is_default:false
            },
          deleteModal:false
        }
    },
  computed:{
        ...mapGetters('admin', ['profile']),
        ...mapGetters('bank', ['bankList'])
   },

  watch:{

  },

  methods:{
    ...mapActions('ui', ["setToastMessage", "setToastError"]),
    ...mapActions('bank', ['getVendorBank', 'storeVendorBank', 'vendorBankDelete', 'updateBank', 'putVendorBank']),
    closeModal(){
      this.deleteModal = false

    },
    async  getAllVendorBank(){
      await this.getVendorBank({
        params:{
          "vendor_id" : this.profile.id
        },
        api:"getVendorBank"
      })
    }

  },
 async mounted() {

    this.bankData.vendor_id = this.profile.id

    try {
      await this.getAllVendorBank()
    }catch (e) {
      return this.$nuxt.error(e)
    }


  }

}
</script>
