<script>
import ListPage from "@/components/partials/ListPage.vue";
import customer from "@/mixin/customer";
import {mapGetters} from "vuex";

export default {
  name: 'CustomerAddress',
  components: {ListPage},
  middleware: ['common-middleware', 'auth'],
  mixins: [customer],
  props: {
    customer_id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      deleteModal: false,
      visibleAction: null,
      param: {
        "customer_id": this.customer_id
      },
    }
  },

  computed: {
    ...mapGetters('language', ['langCode'])
  },

  methods: {
    toggleAction(index) {
      this.visibleAction = this.visibleAction === index ? null : index;
    },
    closeModal() {
      this.deleteModal = false
    }
  }

}
</script>

<template>
  <div>
    <list-page
      :filter="false"
      ref="listPage"
      list-api="getCustomerAddress"
      delete-api="adminDeleteAddress"
      route-name="getCustomerAddress"
      :param="param"
      empty-store-variable="allCustomerOrders"
      :name="$t('title.prod')"
      @list="itemList = $event"
    >
      <template v-slot:table="{list}">
        <table>
          <thead>
          <tr>
            <th>{{ $t('customer.Address Name') }}</th>
            <th>{{ $t('customer.Address Type') }}</th>
            <th>{{ $t('customer.Country')}}</th>
            <th>{{ $t('customer.City') }}</th>
            <th>{{ $t('customer.Zip Code') }}</th>
            <th>{{ $t('customer.District') }}</th>
            <th>{{ $t('customer.Building No') }}.</th>
            <th>{{ $t('customer.Action') }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(value, index) in list" :key="index">
            <td>{{ value.address_name }}</td>
            <td>{{ value.type }}</td>
            <td>{{ value.country }}</td>
            <td>{{ value.city }}</td>
            <td>{{ value.zip }}</td>
            <td>{{ value.district }}</td>
            <td>{{ value.building_number }}</td>
            <td><div class="flex gap-4">
              <button @click="deleteModal=true">
                <svg class="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                </svg>
              </button>
            </div></td>
            <DeleteModal v-if="deleteModal" @closeModal="closeModal">
              <template v-slot:title>
                <h4>{{ $t('vendor.deletemessage') }}</h4>
              </template>
              <!-- -----------default slot------- -->
              <!-- -----------default slot------- -->
              <template v-slot:buttons>
                <div class="flex gap-4 justify-end">
                  <button @click="deleteModal=false" class="p-2 border border-smooth rounded leading-3 w-[60px]">Quit</button>
                  <button @click="$refs.listPage.deleteContentItem(value.id), deleteModal=false" class="p-2 border border-smooth bg-primary text-white  rounded leading-3 w-[60px] hover:text-primary">Agree</button>
                </div>
              </template>
            </DeleteModal>
          </tr>
          </tbody>
        </table>
      </template>
    </list-page>
  </div>
</template>

<style scoped>

</style>
