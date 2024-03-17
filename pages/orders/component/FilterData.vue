<template>
  <div class="flex gap-4 my-10">
    <div class="relative">
      <input
        type="text"
        @input="FilterOrder" v-model="search.orderNumber"
        :placeholder="$t('order.orderId')"
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
    <select class="p-2 border rounded border-smooth" name="" id="" @change="FilterOrder" v-model="search.orderStatus">
      <option value="">{{$t('order.statusOrder')}}</option>
      <option :value="item.value" v-for="(item,i) in orderStatus" :key="i">
        {{ $t(`order.${item?.name}`) }}
      </option>

    </select>
    <select class="p-2 border rounded border-smooth" name="" id=""  v-model="search.paymentStatus"  @change="FilterOrder">
      <option value="">{{$t('order.paymentStatus')}}</option>
      <option :value="option.value" v-for="(option,i) in paymentStatuses" :key="i">
        {{ $t(`order.${option.label}`) }}
        </option>

    </select>
    <select class="p-2 border rounded border-smooth"  v-model="search.orderType" @change="FilterOrder">
      <option value="">{{$t('order.paymentMthodType')}}</option>
      <option v-for="orderType in orderTypes" :key="orderType.value" :value="orderType.value">{{
          $t(`order.${orderType.label}`)
        }}</option>
    </select>
    <select class="p-2 border rounded border-smooth" name="" id="" v-model="search.sortBy" @change="FilterOrder">
      <option value="">{{$t('order.sortFilter')}}</option>
      <option v-for="(sortBy,index) in sortOptions" :key="index" :value="sortBy.value">{{
          $t(`order.${sortBy.label}`)
        }}</option>
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
        {id: 1, name: "pendingApproval", value:"pending"},
        {id: 2, name: "readyForPickup",value:"pickup"},
        {id: 3, name: "rejected" , value:"rejected"},
      ],
      paymentStatuses: [
        { value: 'pending', label: 'PendingUpload' },
        { value: 'pending', label: 'PendingVerification' },
        { value: 'paid', label: 'Paid' },
        { value: 'pending_payment', label: 'PendingPayment' }
      ],
      sortOptions: [
        { value: '', label: 'SortBy' },
        { value: 'oldest', label: 'LastUpdateOldest' },
        { value: 'newest', label: 'LastUpdateNewest' },
        { value: 'highest_price', label: 'PriceHighest' },
        { value: 'lowest_price', label: 'PriceLowest' }
      ],
      orderTypes: [
        { value: '', label: 'OrderType' },
        { value: 'cart_orders', label: 'CartOrders' },
        { value: 'negotiated_orders', label: 'NegotiatedOrders' }
      ]

    }
  },

  methods: {
    ...mapActions('order', ['getOrder', 'getReasonsRejection', 'changeStatus', 'approveOrder']),
    FilterOrderStatus(filteredList) {
      if (this.search.orderStatus) {
        filteredList = filteredList.filter(order => {
          return order.status === this.search.orderStatus;
        });
      }
      return filteredList;
    },
    async FilterOrder() {
      let filteredList = this.orders;
      if (this.search.orderNumber) {
        const orderNumberRegExp = new RegExp(this.search.orderNumber, "i");
        filteredList = filteredList.filter(order => {
          return String(order.order_id).match(orderNumberRegExp);
        });
      }
      if (this.search.orderStatus) {
        filteredList = filteredList.filter(order => {
          return order.status === this.search.orderStatus;
        });
      }
      if (this.search.paymentStatus) {
        filteredList = filteredList.filter(order => {
          return order.payment_status === this.search.paymentStatus;
        });
      }
      if(this.search.orderStatus == '' && this.search.sortBy !== '') {
        this.search.orderStatus="pending";
        filteredList= this.FilterOrderStatus(filteredList)
      }
      switch (this.search.sortBy) {
        case "highest_price":
          filteredList = filteredList.sort((a, b) => b.order_total - a.order_total);
          break;
        case "lowest_price":
          filteredList =  filteredList.sort((a, b) => a.order_total - b.order_total);
          break;
        case "oldest":
          filteredList = filteredList.reverse();
          // filteredList = filteredList.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
          break;
        case "newest":
          filteredList = filteredList.reverse();
          // filteredList = filteredList.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          break;
        default:
          break;
      }
      this.$store.commit('order/SET_ORDER_DATA_SEARCHE', filteredList)
    },
    clearFilterData() {
      this.search.orderNumber= "";
      this.search.orderStatus= "";
      this.search.paymentStatus= "";
      this.search.sortBy= "";
      this.$emit('clear-filter')
    }
  }
}
</script>

