<script>
import ListPage from "@/components/partials/ListPage.vue";
import customer from "@/mixin/customer";
import {mapGetters} from "vuex";

export default {
  name: 'CustomerPayment',
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
      list-api="getCustomerPaymentCard"
      delete-api="DeleteCustomerPaymentCard"
      route-name="vendors"
      :param="param"
      empty-store-variable="allCustomerPaymentCard"
      :name="$t('title.prod')"
      @list="itemList = $event"
    >
      <template v-slot:table="{list}">
        <table>
          <thead>
          <tr>
<!--            <th>{{ $t('customer.Bank Name / Card Name') }}</th>-->
            <th>{{ $t('customer.Account / Holder name') }}</th>
            <th>{{ $t('customer.A / C / Card Number') }}</th>
<!--            <th>{{ $t('customer.Type') }}</th>-->
            <th>{{ $t('customer.Expire At') }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(value, index) in list" :key="index">
            <td>{{ value.holder_name }}</td>
            <td>{{ value.card_no }}</td>
            <td>{{ value.expired_at }}</td>
          </tr>

          </tbody>
        </table>
      </template>
    </list-page>
  </div>
</template>

<style scoped>

</style>
