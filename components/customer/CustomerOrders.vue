<script>
import ListPage from "@/components/partials/ListPage.vue";
import customer from "@/mixin/customer";
import {mapGetters} from "vuex";

export default {
  name: 'CustomerOrders',
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
      param: {
        "customer_id": this.customer_id
      },
      deleteModal: false
    }
  },

  computed: {
    ...mapGetters('language', ['langCode'])
  },

  methods: {
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
      list-api="getCustomerOrders"
      delete-api="DeleteCustomerOrders"
      route-name="vendors"
      :param="param"
      empty-store-variable="allCustomerOrders"
      :name="$t('title.prod')"
      @list="itemList = $event"
    >
      <template v-slot:table="{list}">
        <table>
          <thead>
          <tr>
            <th>{{ $t('customer.Order No') }}.</th>
            <th>{{ $t('customer.Status')}}</th>
            <th>{{ $t('customer.Quantity') }}</th>
            <th>{{ $t('customer.Total amount') }}</th>
            <th>{{ $t('customer.Order date') }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(value, index) in list" :key="index">
            <td>{{ value.order }}</td>
            <td>{{ value.status }}</td>
            <td>3</td>
            <td>{{ value.currency }} {{ value.total_amount }}</td>
            <td>{{ value.created_at }}</td>
          </tr>
          </tbody>
        </table>
      </template>
    </list-page>
  </div>
</template>

<style scoped>

</style>
