<template>
  <div>
    <list-page
      ref="listPage"
      list-api="getVerifiedCustomers"
      route-name="customer"
      empty-store-variable="allVerifiedCustomers"
      :name="$t('title.prod')"
      @list="itemList = $event"
    >
      <template
        v-slot:table-top="{orderOptions}"
      >
        <customer-filter @filter="searchFilterData"></customer-filter>
      </template>
      <template v-slot:table="{list}">
        <table>
          <thead>
          <tr>
            <th>{{ $t('customer.Customer name') }}</th>
            <th>{{ $t('customer.Business Type') }}</th>
            <th>{{ $t('customer.Billing Email') }}</th>
            <th>{{ $t('customer.Building Number') }}</th>
            <th>{{ $t('customer.License Number') }}</th>
            <th>{{ $t('customer.License Expiry Date') }}</th>
            <th>{{ $t('customer.Country') }}</th>
            <th>{{ $t('customer.City') }}</th>
            <th>{{ $t('customer.status') }}</th>
            <th>{{ $t('customer.verified') }}</th>
            <th v-if="$can('manage_users')">{{ $t('customer.Action') }}</th>
          </tr>
          </thead>
          <tbody>

          <tr v-for="(value, index) in list" :key="index">
            <td>{{ value.company_name }}</td>
            <td>{{ value.business_type }}</td>
            <td>{{ value.billing_email }}</td>
            <td>{{ value.building_number }}</td>
            <td>{{ value.license_number }}</td>
            <td>{{ value.licence_expiry_date }}</td>
            <td>{{ value.country_id?.name }}</td>
            <td>{{ value.city_id?.name }}</td>
            <td class="status" :class="value.status===1?'active':'text-warning'">
              <span>{{ customerStatus(value.status) }}</span>
            </td>
            <td class="status" :class="value.verified===1?'active':'text-warning'">
              <span>{{ customerVerified(value.verified) }}</span>
            </td>
            <td>
              <div class="flex gap-4">
                <button
                  @click.prevent="$refs.listPage.editItem(value.id)" class="border-0"><edit-button-icon/></button>
                <button class="leading-4 text-[12px] w-[93px]" @click="approvedModal=true"> Un-Verified</button>
              </div>
            </td>
            <!-- ------------------approved modal---------------------- -->
            <template v-if="approvedModal">
              <div  class="fixed bg-modal  inset-0 z-50 flex items-center justify-center">
                <div class="absolute inset-0 bg-black opacity-50"></div>
                <div class="z-50 bg-white p-6 relative rounded-md shadow w-full md:w-1/2 lg:w-2/3 xl:w-1/5">
                  <svg @click="approvedModal=false" class="w-4 h-4 text-gray-800 absolute ltr:right-3  rtl:left-3 cursor-pointer mt-[-10px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <!-- Modal Content -->
                  <div class="mb-4">
                    <h4>Are you want to UnVerified?</h4>
                  </div>
                  <!-- Close Button -->
                  <div class="flex justify-end gap-4">
                    <button @click="approvedModal = false" class="p-2 border text-center rounded border-primary w-[50px] leading-3">No</button>
                    <button @click="approval(value.id)" class="p-2 border border-primary bg-primary text-center rounded text-white w-[50px] leading-3">Yes</button>
                  </div>

                </div>
              </div>
            </template>
            <!-- ------------------approved modal end---------------------- -->
          </tr>

          </tbody>
        </table>
      </template>
    </list-page>
  </div>
</template>
<script>
import * as util from "util";
import bulkDelete from "@/mixin/bulkDelete";
import {mapActions, mapGetters} from "vuex";
import ListPage from "@/components/partials/ListPage.vue";
import EditButtonIcon from "@/components/partials/EditButtonIcon.vue";

export default {
  name: 'VerifiedCustomer',
  mixins: [util, bulkDelete],
  components: {EditButtonIcon, ListPage},

  data() {
    return {
      visibleAction: null,
      approvedModal:false
    }
  },

  computed: {
    ...mapGetters('language', ['langCode'])
  },
  methods: {
    ...mapActions('customer', ['changeCustomerStatus']),
    ...mapActions('ui', ["setToastMessage", "setToastError"]),
    toggleAction(index) {
      this.visibleAction = this.visibleAction === index ? null : index;
    },
    customerVerified(verified) {
      return verified === 1 ? 'Verified' : 'Unverified'
    },
    customerStatus(status) {
      return status === 1 ? 'Active' : 'Deactivate'
    },

    async  approval(val){
      this.approvedModal = false
      const data =  await this.changeCustomerStatus({params:{'customer_id': val, 'verified': 0}, api:"ChangeCustomerApproved"})
      if (data.status == 200){
        this.setToastMessage(data.message)
      }else{
        this.setToastError(data.data.form.join(', '))
      }
      this.$router.go(0)
    },

    searchFilterData(search) {
      this.$router.push({
        query: {
          ...this.$route.query,
          page: 1,
          orderBy: 'created_at',
          orderByType: 'desc',
          ...search
        }
      })
    },
  }

}


</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
