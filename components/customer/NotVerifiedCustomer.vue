<script>
import * as util from "util";
import bulkDelete from "@/mixin/bulkDelete";
import {mapGetters} from "vuex";
import ListPage from "@/components/partials/ListPage.vue";

export default {
  name: 'VerifiedCustomer',
  mixins: [util, bulkDelete],
  components: {ListPage},

  data() {
    return {}
  },

  computed: {
    ...mapGetters('language', ['langCode'])
  },
  methods: {
    customerVerified(verified){
      return verified===1?'Verified':'Unverified'
    },
    customerStatus(status){
      return status===1?'Active':'Deactivate'
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

<template>
  <div>
    <list-page
      ref="listPage"
      list-api="getUnverifiedCustomers"
      route-name="vendors"
      empty-store-variable="allUnverifiedCustomers"
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
            <th><input type="checkbox"></th>
            <th>{{ $t('customer.Customer name')}}</th>
            <th>{{ $t('customer.Business Type')}}</th>
            <th>{{ $t('customer.Billing Email')}}</th>
            <th>{{ $t('customer.Building Number')}}</th>
            <th>{{ $t('customer.License Number')}}</th>
            <th>{{ $t('customer.License Expiry Date')}}</th>
            <th>{{ $t('customer.Country')}}</th>
            <th>{{ $t('customer.City')}}</th>
            <th>{{ $t('customer.status')}}</th>
            <th>{{ $t('customer.verified')}}</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>

          <tr v-for="(value, index) in list" :key="index">
            <td><input type="checkbox"></td>
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
                <nuxt-link :to="`${/customer/}${value.id}`" >
                  <svg class="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                       fill="currentColor" viewBox="0 0 20 18">
                    <path
                      d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                    <path
                      d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                  </svg>
                </nuxt-link>
              </div>
            </td>
          </tr>

          </tbody>
        </table>
      </template>
    </list-page>
  </div>
</template>

<style scoped>

</style>
