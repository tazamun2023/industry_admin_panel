<script>
import * as util from "util";
import bulkDelete from "@/mixin/bulkDelete";
import {mapGetters} from "vuex";
import ListPage from "@/components/partials/ListPage.vue";
import EditButtonIcon from '../partials/EditButtonIcon.vue';

export default {
  name: 'VerifiedCustomer',
  mixins: [util, bulkDelete],
  components: {ListPage,EditButtonIcon},

  data() {
    return {
      visibleAction: null,
    }
  },

  computed: {
    ...mapGetters('language', ['langCode'])
  },
  methods: {
    toggleAction(index) {
      this.visibleAction = this.visibleAction === index ? null : index;
    },
    customerVerified(verified) {
      return verified === 1 ? 'Verified' : 'Unverified'
    },
    customerStatus(status) {
      return status === 1 ? 'Active' : 'Deactivate'
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
              <button
            v-if="$can('manage_users')"
            @click.prevent="$refs.listPage.editItem(value.id)" class="border-0"><edit-button-icon/></button>
              <!--              <div class="flex gap-4">-->
              <!--                <nuxt-link :to="`${/customer/}${value.id}`">-->
              <!--                  <svg class="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"-->
              <!--                       fill="currentColor" viewBox="0 0 20 18">-->
              <!--                    <path-->
              <!--                      d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>-->
              <!--                    <path-->
              <!--                      d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>-->
              <!--                  </svg>-->
              <!--                </nuxt-link>-->
              <!--              </div>-->
              <!-- <button id="dropdownDefaultButton" @click="toggleAction(index)"
                      class="bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 relative"
                      type="button">{{ $t('prod.action') }}
                <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 10 6">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m1 1 4 4 4-4"/>
                </svg>
              </button> -->
              <!-- <div id="dropdown"
                   class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute ml-[-50px]"
                   v-if="visibleAction === index"
              >
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton">
                  <nuxt-link
                    class="block px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white"
                    :to="`${/customer/}${value.id}`">
                    Edit
                  </nuxt-link>
                </ul>
              </div> -->
            </td>
          </tr>

          </tbody>
        </table>
      </template>
    </list-page>
  </div>
</template>

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
