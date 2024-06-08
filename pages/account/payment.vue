<template>
  <check-validity :gate="'view_financial'">
    <!-- <div class="card p-4">
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
    </div> -->
    <!-- ----------------------------------- -->

    <div class="px-[10em] py-4">
      <div class="py-2">
        <h3 class="uppercase">Payments</h3>
      </div>
      <div class="w-full flex gap-4 items-center">
        <button @click="addPayment" v-if="$can('update_financial')"
                class="flex w-[156px] hover:bg-primary gap-4 bg-primary text-white px-4 items-center">
          <img class="w-7 h-7" src="~/assets/icon/add-square.svg" alt="">
          New
        </button>
        <div class="related w-full">
          <img src="~/assets/icon/search-normal.svg" alt=""
               class="w-4 h-4 absolute ltr:ml-[14px] rtl:mr-[14px] mt-[13px]">
          <input type="text" placeholder="Search" class="w-full px-34px" v-model="search" @change="searchBank">
        </div>
        <div class="w-[300px] flex gap-4 items-center">
          <img v-if="orderbyType == 'asc'" @click="orderbyType='desc', searchBank()" class="w-7 h-7"
               src="~/assets/icon/frame.svg" alt="">
          <img v-if="orderbyType == 'desc'" @click="orderbyType='asc', searchBank()" class="w-7 h-7 rotate-180"
               src="~/assets/icon/frame.svg" alt="">
          <div class="relative inline-block text-left">
            <div class="min-w-[156px]">
              <button @click="shortDropdown" type="button"
                      class="inline-flex w-full justify-between  capitalize items-center text-[13px] gap-4 px-1 rounded-[10px] bg-white p-1  text-sm font-semibold text-primary shadow-sm"
                      id="menu-button" aria-expanded="true" aria-haspopup="true">
                <img style="background: #01A78133;" class="w-8 h-8 bg-primary p-2 rounded"
                     src="~/assets/icon/setting-5.svg" alt="">
                {{ btnText }}
                <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clip-rule="evenodd"/>
                </svg>
              </button>
            </div>

            <div v-if="dropDown"
                 class="absolute right-0 z-10 mt-2 w-[156px] origin-top-right rounded-md bg-white shadow-lg   focus:outline-none"
                 role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
              <div class="py-1 px-2" role="none">
                <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                <span @click="orderBy='name', searchBank(),selectOption($t('filter.name'))"
                      :class="{'bg-primarylight text-primary': btnText === $t('filter.name')}"
                      class="hover:bg-primarylight block rounded-[7px] cursor-pointer my-1 px-4 py-2 text-sm " role="menuitem"
                      tabindex="-1" id="menu-item-0">{{ $t('filter.name') }}</span>
                <span @click="orderBy='bank_name', searchBank(),selectOption($t('filter.BankName'))"
                      :class="{'bg-primarylight text-primary': btnText === $t('filter.BankName')}"
                      class="text-gray-700 block hover:bg-primarylight rounded-[7px] cursor-pointer my-1 px-4 py-2 text-sm" role="menuitem" tabindex="-1"
                      id="menu-item-1">{{ $t('filter.BankName') }}</span>
                <span @click="orderBy='holder_name', searchBank(),selectOption($t('filter.HolderName'))"
                      :class="{'bg-primarylight text-primary': btnText === $t('filter.HolderName')}"
                      class="text-gray-700 hover:bg-primarylight rounded-[7px] cursor-pointer my-1 block px-4  py-2 text-sm"
                      role="menuitem" tabindex="-1" id="menu-item-2">{{ $t('filter.HolderName') }}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <!-- -----------------------------------------new table design 5-21-2024------------------ -->
    <div style="box-shadow: 0px 1px 2px 0px #1018280D;" class="table-wrapper border border-pb rounded-[12px]">
      <table
        class="mn-w-800x mb-10 mt-0"
      >
        <tr class="lite-bold">
          <th class="bg-lightdeep">
            <div class="flex gap-4 items-center">
              <!-- <input type="checkbox"> -->
              Name
            </div>
          </th>
          <th class="bg-lightdeep">
            IBAN
          </th>
          <th class="bg-lightdeep">Swift code</th>
          <th class="bg-lightdeep">Bank Holder</th>
          <th class="bg-lightdeep">Bank</th>
          <th class="bg-lightdeep text-center">
            <div class="flex gap-2 justify-center items-center">
              <!-- <input type="checkbox"> -->
              Set as Default
            </div>
          </th>
          <th class="bg-lightdeep"></th>
        </tr>
        <tr class="border-t border-pb" v-for="(value, index) in bankList" :key="index">
          <td>
            <div class="flex font-bold capitalize gap-4 items-center">
              <!-- <input type="checkbox"> -->
              {{ value.name }}
            </div>
          </td>
          <td class="text-primary">
            {{ value.iban_number }}
          </td>
          <td class="text-primary">
            {{ value.swift_code }}
          </td>
          <td class="font-bold capitalize">{{ value.holder_name }}</td>
          <td>{{ value.bank_name }}</td>
          <td class="text-center"><input type="checkbox" :checked="value.is_default"></td>
          <td>
            <div class="flex gap-4">

              <img @click="deleteModal=true" class="action_img  cursor-pointer" src="~/assets/icon/delete.svg">
              <img @click="editing(value)" v-if="$can('update_financial')" class="action_img cursor-pointer"
                   src="~/assets/icon/edit-g.svg">
            </div>
          </td>
        </tr>
      </table>
     <GlobalPagination/>
    </div>
    <DeleteModal v-if="deleteModal" @closeModal="closeModal">
      <template v-slot:title>
        <h4>{{ $t('vendor.deletemessage') }}</h4>
      </template>
      <template v-slot:buttons>
        <div class="flex gap-4 justify-end">
          <button @click="deleteModal=false" class="p-2 border border-smooth rounded leading-3 w-[60px]">Quit</button>
          <button @click.prevent="deleting(value)"
                  class="p-2 border border-smooth bg-primary text-white  rounded leading-3 w-[60px] hover:text-primary">
            Agree
          </button>
        </div>
      </template>
    </DeleteModal>
    <!-- -----------------------------------------new table design end------------------ -->
    <!-- ---------------------------------------------------------------------------------------------- -->

    <!-- <div class="grid grid-cols-4 my-2 gap-8 py-4">
     <div v-for="(value, index) in bankList" :key="index" class="card rounded-3xl my-2">
       <div>
         <div class="bg-theem p-3 py-6 rounded-t-3xl flex  items-center justify-between">
           <div class="truncate">
             <h4 class="text-white font-bold truncate capitalize">{{ value.name }}</h4>
           </div>
             <div class="d-flex gap-2">

             <span v-if="value.is_default" class="bg-white shadow rounded-lg border border-smooth py-1 px-2 text-[11px] leading-3 text-theem capitalize">Default</span>
           </div>
         </div>
         <div class="flex gap-4 justify-between  p-4">
             <div class="flex items-start gap-1">
               <img class="w-4 h-4 mt-1" src="~/assets/icon/card.svg" alt="">
               <div>
                 <p>IBAN</p>
                 <p class="capitalize semi-bold text-primary text-[14px]">{{ value.iban_number }}</p>
               </div>
             </div>
             <div>
                 <p>SWIFT CODE</p>
                 <p class="capitalize text-primary semi-bold  text-[14px]">{{ value.swift_code }}</p>
               </div>
         </div>
         <div class="flex gap-4 justify-between  p-4">
             <div class="flex items-start gap-1">
               <img class="w-5 h-5 mt-1" src="~/assets/icon/profile.svg" alt="">
               <div>
                 <p>BANK HOLDER</p>
                 <p class="capitalize text-primary  semi-bold text-[14px]">{{ value.holder_name }}</p>
               </div>
             </div>

         </div>
         <div class="flex gap-4 justify-between  p-4">
             <div class="flex items-start gap-1">
               <img class="w-4 h-4 mt-1" src="~/assets/icon/bank-g.svg" alt="">
               <div>
                 <p>Bank</p>
                 <p class="capitalize text-primary semi-bold  text-[14px]">{{ value.bank_name }}</p>
               </div>
             </div>
       <div v-if="!value.is_default" >
           <p class="text-primary  text-[14px]">SET AS DEFAULT</p>
           <div class="text-center" >
             <input type="checkbox"  @change="SetDefaultBanks(value.id,$event)" :checked="value.is_default">
           </div>
         </div>
      </div>
   <div class="flex justify-between gap-4  p-4">
     <button  class="p-2 leading-3 px-6 rounded-lg bg-primary text-white hover:text-primary flex items-center gap-3"
      @click="editing(value)" v-if="$can('update_financial')"><img class="w-4 h-4" src="~/assets/icon/edit.svg" alt=""> Edit</button>
         <button v-if="!value.is_default" class="p-2 leading-3 rounded hover:border hover:border-smooth  hover:text-warning flex items-center gap-3 text-error border-0"
         @click="deleting(value)" ><img class="w-4 h-4" src="~/assets/icon/trash.svg" alt=""> Delete</button>
   </div>
     <DeleteModal v-if="deleteModal" @closeModal="closeModal">
           <template v-slot:title>
             <h4>{{ $t('vendor.deletemessage') }}</h4>
           </template>
           <template v-slot:buttons>
             <div class="flex gap-4 justify-end">
               <button @click="deleteModal=false" class="p-2 border border-smooth rounded leading-3 w-[60px]">Quit</button>
               <button @click.prevent="deleting(value)" class="p-2 border border-smooth bg-primary text-white  rounded leading-3 w-[60px] hover:text-primary">Agree</button>
             </div>
           </template>
         </DeleteModal> -->
<!--    </div>-->


<!--    </div>-->
<!--    </div>-->

    <!-- ---------------------------------------------------------------------------------------------- -->
    <!-- <div class="lg:grid lg:grid-cols-3    my-2 gap-4">
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


              </div>


            </div> -->
    <!-- -----------------modal------------ -->
    <template v-if="Cardmodal">
      <div class="fixed bg-modal  inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-black opacity-50"></div>
        <div class="z-50 bg-white p-6 relative rounded-md shadow w-full md:w-1/2 lg:w-2/3 xl:w-2/5">
          <svg @click="Cardmodal=false"
               class="w-4 h-4 text-gray-800 absolute ltr:right-3  rtl:left-3 cursor-pointer mt-[-10px]"
               aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
          <!-- Modal Content -->
          <ValidationObserver v-slot="{ invalid }">
            <div class="mb-4">
              <h4>Add Bank</h4>

              <form class="px-2" @submit.prevent="BankAction">

                <ValidationProvider name="name" class="w-full" rules="required" v-slot="{ errors }"
                                    :custom-messages="{required: `Enter Your ${$t('global.name')}`}">
                  <div class="input-wrapper">
                    <label for="">{{ $t('global.name') }}*</label>
                    <input type="text" placeholder="Enter name" v-model="bankData.name">
                    <span class="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>

                <ValidationProvider name="Bank name" class="w-full" rules="required" v-slot="{ errors }"
                                    :custom-messages="{required: `Enter Your ${$t('bank.bank_name')}`}">
                  <div class="input-wrapper">
                    <label for="">{{ $t('bank.bank_name') }}*</label>
                    <input type="text" placeholder="Enter Bank name" v-model="bankData.bank_name">
                    <span class="error">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>

                <div class="input-wrapper flex gap-4">
                  <ValidationProvider name="Iban" class="w-full" rules="required|max:24" v-slot="{ errors }"
                                      :custom-messages="{required: `Enter Your ${$t('bank.iban')}`}">
                    <div class="w-full input-wrapper">
                      <label class="w-full" for="">{{ $t('bank.iban') }}*</label>
                      <input type="text" placeholder="IBAN" v-model="bankData.iban_number">
                      <span class="error">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                </div>
                <div class="flex gap-4">
                  <ValidationProvider name="Account Number" class="w-full" rules="required|numeric" v-slot="{ errors }"
                                      :custom-messages="{required: `Enter Your ${$t('bank.account_number')}`, numeric: 'Enter Number Only'}">
                    <div class="input-wrapper w-full">
                      <label for="">{{ $t('bank.account_number') }}*</label>
                      <input type="text" placeholder="Enter Bank account number*" v-model="bankData.account_number">
                      <span class="error">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider name="holder name" class="w-full" rules="required" v-slot="{ errors }"
                                      :custom-messages="{required: `Enter Your ${$t('bank.bank_name')}`}">
                    <div class="input-wrapper w-full">
                      <label for="">{{ $t('bank.holder_name') }}*</label>
                      <input type="text" placeholder="Enter Bank account holder's name" v-model="bankData.holder_name">
                      <span class="error">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                </div>
                <div class="flex gap-4">
                  <ValidationProvider name="Swift" class="w-full" rules="required" v-slot="{ errors }"
                                      :custom-messages="{required: `Enter Your ${$t('bank.swift_code')}`}">
                    <div class="input-wrapper w-full">
                      <label for="">{{ $t('bank.swift_code') }}*</label>
                      <input type="text" placeholder="Swift/BIC code*" v-model="bankData.swift_code">
                      <span class="error">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                </div>
                <div class="input-wrapper w-full">
                  <div class="flex gap-1">
                    <input type="checkbox" v-model="bankData.is_default" :disabled="disabled">
                    <label for="">Set bank details as default</label>
                  </div>
                </div>
                <div class="flex justify-end gap-4">
                  <button @click="Cardmodal=false"
                          class="btn bg-smooth hover:text-primary  border-secondary mt-20">Cancel
                  </button>
                  <button class="btn bg-primary hover:text-primary text-white border-secondary mt-20"
                          :disabled="invalid">Save Change
                  </button>
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

.rounded-3xl {
  border-radius: 1.5rem !important;
}
</style>
<script>
import {mapActions, mapGetters} from "vuex";
import {ValidationObserver, ValidationProvider} from "vee-validate";
import bank from "@/mixin/bank";

export default {
  components: {ValidationObserver, ValidationProvider},
  mixins: [bank],
  data() {
    return {
      btnText:'name',
      dropDown: false,
      Cardmodal: false,
      bankData: {
        id: '',
        vendor_id: null,
        name: '',
        bank_name: '',
        holder_name: '',
        account_number: '',
        iban_number: '',
        swift_code: '',
        is_default: false,
      },
      deleteModal: false,
      orderOptions: {
        name: {title: this.$t('user.name')},
        email: {title: this.$t('fSale.email')},
        username: {title: this.$t('user.uName')},
        created_at: {title: this.$t('category.date')},
      },
      search: '',
      orderBy: '',
      orderbyType: 'asc'


    }
  },
  computed: {
    ...mapGetters('admin', ['profile']),
    ...mapGetters('bank', ['bankList'])
  },

  watch: {},

  methods: {
    ...mapActions('ui', ["setToastMessage", "setToastError"]),
    ...mapActions('bank', ['getVendorBank', 'storeVendorBank', 'vendorBankDelete', 'updateBank', 'putVendorBank', 'SetDefaultBank']),
    ...mapActions('common', ['swetAlertFire']),

    closeModal() {
      this.deleteModal = false

    },
    selectOption(option) {
      this.btnText = option;
      this.dropDown = false; // Close dropdown after selection
    },
    async SetDefaultBanks(id, e) {
      const res = await this.swetAlertFire({
        params: {
          title: this.$i18n.t('approvedModal.sure'),
          text: this.$i18n.t('approvedModal.revert'),
        }
      })
      if (res) {
        this.SetDefaultBank({
          params: {
            bank_id: id,
            is_default: e.target.checked,
          },

        })
        this.getAllVendorBank();
      } else {

      }
    },
    async searchBank() {
      let search = this.search
      await this.getVendorBank({
        params: {
          "vendor_id": this.profile.vendor_id,
          "search": search,
          "orderby": this.orderBy,
          "type": this.orderbyType,
        },
        api: "getVendorBank"
      })

    },

    async getAllVendorBank() {
      await this.getVendorBank({
        params: {
          "vendor_id": this.profile.vendor_id
        },
        api: "getVendorBank"
      })
    },
    shortDropdown() {
      this.dropDown = !this.dropDown
    }

  },
  async mounted() {
    this.bankData.vendor_id = this.profile.vendor_id

    try {
      await this.getAllVendorBank()

    } catch (e) {
      return this.$nuxt.error(e)
    }

  }

}
</script>

<style>
.swal2-popup .swal2-styled.swal2-cancel{
  line-height: 0px;
}
.swal2-popup .swal2-styled.swal2-confirm{
  line-height: 0px;
  background: #01a781;
}
</style>