<template>
  <div>
    <list-page
      v-if="$can('view_financial')"
      ref="listPage"
      list-api="getVendorBank"
      delete-api="DeleteVendorBank"
      route-name="rejection-reasons"
      :modalButton="true"
      empty-store-variable="rejectReasons"
      gate="view_financial"
      @open-modal="addPayment"
      :title="$t('setting.rejection-reasons')"
      manage_gate="update_financial"
      @list="itemList = $event"
      :order-options="orderOptions"
    >
      <template v-slot:table="{list}">
        <tr class="lite-bold">
          <th class="bg-lightdeep">
            <div class="flex gap-4 items-center">
              <!-- <input type="checkbox"> -->
              {{ $t('global.name') }}
            </div>
          </th>
          <th class="bg-lightdeep">
            {{ $t('bank.iban') }}
          </th>
          <th class="bg-lightdeep">{{ $t('bank.swift_code') }}</th>
          <th class="bg-lightdeep">{{ $t('bank.holder_name') }}</th>
          <th class="bg-lightdeep">{{ $t('bank.bank_name') }}</th>
          <th class="bg-lightdeep text-center">
            <div class="flex gap-2 justify-center items-center">
              <!-- <input type="checkbox"> -->
              {{ $t('address.set_default') }}
            </div>
          </th>
          <th class="bg-lightdeep"></th>
        </tr>
        <tr class="border-t border-pb" v-for="(value, index) in list" :key="index">
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
          <td class="text-center">
            <input type="checkbox"
                   :checked="value.is_default"
                   @change="isDefault(value.id, $event)"
            >
          </td>
          <td>
            <div class="flex gap-4">
              <button
                v-if="$can('update_financial') && value.is_default == 0 "
                @click.prevent="$refs.listPage.deleteItem(value.id)" class="border-0 p-0">
                <delete-button-icon/>
              </button>
              <img @click="editing(value)" v-if="$can('update_financial')" alt="Edit" class="action_img cursor-pointer"
                   src="~/assets/icon/edit-g.svg">
            </div>
          </td>
        </tr>
      </template>
    </list-page>
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
                    <label for=""> {{ $t('address.set_default') }}</label>
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
  </div>

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
import GlobalPagination from "../../components/GlobalPagination.vue";
import DeleteModal from "../../components/DeleteModal.vue";
import ListPage from "../../components/partials/ListPage.vue";
import DeleteButtonIcon from "../../components/partials/DeleteButtonIcon.vue";

export default {
  components: {DeleteButtonIcon, ListPage, DeleteModal, GlobalPagination, ValidationObserver, ValidationProvider},
  data() {
    return {

      btnText: 'name',
      dropDown: false,
      Cardmodal: false,
      current_bank_id: '',
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
        name: {title: this.$t('filter.name')},
        bank_name: {title: this.$t('filter.BankName')},
        holder_name: {title: this.$t('filter.HolderName')},
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
    ...mapActions('common', ['swetAlertFire', 'deleteData']),
    async BankAction() {

      if(this.bankData.id){
        const data = await this.putVendorBank({
          id: this.bankData.id,
          params:{
            ...this.bankData,
          },
          api:"getVendorBank"
        })
        this.Cardmodal = false

        if(data?.status === 200){
          this.setToastMessage(data.message)
          this.getAllVendorBank()
        } else if(data?.status === 201) {
          this.setToastError(data.data?.form?.join(', '))
        }

      }else{
        const data = await this.storeVendorBank({
          params:{
            ...this.bankData,
          },
          api:"getVendorBank"
        })


        if(data?.status === 200){
          //  this.$store.commit('bank/SET_VENDOR_BANK_DATA', {...this.bankData})
          this.getAllVendorBank()
          this.setToastMessage(data.message)
          this.Cardmodal = false

        } else if(data?.status >  200) {
          this.getAllVendorBank()
          this.setToastError(data.data?.form?.join(', '))

        }

      }
    },
    closeModal() {
      this.deleteModal = false
    },

    async isDefault(id, event) {
      await this.SetDefaultBanks(id, event.target.checked);
    },
    selectOption(option) {
      this.btnText = option;
      this.dropDown = false; // Close dropdown after selection
    },
    async SetDefaultBanks(id, is_default) {

      const res = await this.swetAlertFire({
        params: {
          title: this.$i18n.t('approvedModal.sure'),
          text: this.$i18n.t('approvedModal.revert'),
        }
      });

      if (res) {
        try {
          await this.SetDefaultBank({
            params: {
              bank_id: id,
              is_default: is_default
            },

          })
          await this.getAllVendorBank();
        } catch (e) {
          console.log(e)
        }
      }
    },

    shortDropdown() {
      this.dropDown = !this.dropDown
    },

    deleting() {

    }

  },
  async mounted() {


  }

}
</script>

<style>
.swal2-popup .swal2-styled.swal2-cancel {
  line-height: 0px;
}

.swal2-popup .swal2-styled.swal2-confirm {
  line-height: 0px;
  background: #01a781;
}
</style>
