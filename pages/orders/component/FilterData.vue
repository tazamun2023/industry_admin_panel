<template>
  <div class="flex gap-4 my-10">
    <div class="relative">
      <input
        type="text"
        @input="FilterOrder" v-model="search.orderNumber"
        :placeholder="$t('order.order')"
        class="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:border-primary"
      />
      <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <!-- Search Icon -->
        <svg class="w-6 h-6 text-smooth" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
             viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
        </svg>
      </div>
    </div>
    <select class="p-2 border rounded border-smooth" name="" id="">
      <option value="">Action</option>
      <option value="" v-for="(item,i) in orderStatus" :key="i">
        {{ item?.name }}
      </option>

    </select>
    <select class="p-2 border rounded border-smooth" name="" id=""  v-model="search.paymentStatus">
      <option value="" v-for="(option,i) in paymentStatuses" :key="i">{{ option.text }}</option>

    </select>
    <select class="p-2 border rounded border-smooth"  v-model="search.orderType">
      <option v-for="orderType in orderTypes" :key="orderType.value" :value="orderType.value">{{ orderType.label }}</option>
    </select>
    <select class="p-2 border rounded border-smooth" name="" id="" v-model="search.sortSelected">
      <option v-for="sortBy in sortOptions" :key="sortBy.value" :value="sortBy.value">{{ sortBy.label }}</option>
    </select>
    <div class="flex col-span-2">
      <a
        class="inline-block align-middle cursor-pointer text-center select-none border font-normal whitespace-no-wrap rounded py-2 px-3 leading-normal no-underline bg-red-600 hover:bg-red-700 long mb-auto  ml-4 mr-4"
        @click.prevent="clearFilterData"> {{ $t("prod.clear_filter") }} </a>
    </div>
  </div>
</template>
<script>
import {mapActions} from "vuex";

export default {
  props: ['orders'],
  data() {
    return {
      search: {
        orderNumber: "",
        orderStatus: "",
        sortBy: "",
        orderType:"",
        sortSelected:"",
        paymentStatus:""
      },
      orderStatus: [
        {id: 1, name: "Pending approval"},
        {id: 1, name: "Ready for pickup"},
        {id: 1, name: "Rejected"},
        {id: 1, name: "Rejected"}
      ],
      paymentStatuses: [
        { value: '', label: 'All' },
        { value: 'pending_upload', label: 'Pending Upload' },
        { value: 'pending_verification', label: 'Pending Verification' },
        { value: 'paid', label: 'Paid' },
        { value: 'pending_payment', label: 'Pending Payment' }
      ],
      sortOptions: [
        { value: '', label: 'Sort By' },
        { value: 'oldest', label: 'Last Update (Oldest)' },
        { value: 'newest', label: 'Last Update (Newest)' },
        { value: 'highest_price', label: 'Price (Highest)' },
        { value: 'lowest_price', label: 'Price (Lowest)' }
      ],
      orderTypes: [
        { value: '', label: 'Order Type' },
        { value: 'all', label: 'All' },
        { value: 'cart_orders', label: 'Cart Orders' },
        { value: 'negotiated_orders', label: 'Negotiated Orders' }
      ]

    }
  },

  methods: {
    ...mapActions('order', ['getOrder', 'getReasonsRejection', 'changeStatus', 'approveOrder']),
    async FilterOrder() {
      let previousList = this.orders;
      let filteredList = this.orders;
      if (this.search.orderNumber) {
        const orderNumberRegExp = new RegExp(this.search.orderNumber, "i");
        filteredList = filteredList.filter(order => {
          return String(order.order_id).match(orderNumberRegExp);
        });
      }
      if (this.search.paymentStatus) {
        filteredList = filteredList.filter(order => {
          return order.payment_status === this.search.paymentStatus;
        });
      }
      switch (this.search.sortBy) {
        case "Price":
          filteredList = filteredList.sort((a, b) => a.order_total - b.order_total);
          break;
        case "Date":
          filteredList = filteredList.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
          break;
        case "Desc":
          filteredList = filteredList.reverse();
          break;

        default:
          break;
      }
      if (filteredList.length === 0 && this.search.orderNumber === "") {
        this.getOrder();
        return;
      }
      this.$store.commit('order/SET_ORDER_DATA_SEARCHE', filteredList)
    },
    clearFilterData() {
      this.search.orderNumber= "";
      this.search.orderStatus= "";
      this.search.sortBy= "";
      this.$emit('clear-filter')
    }
  }
}
</script>

