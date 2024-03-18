<template>
  <div class="flex gap-4 my-10">
    <div class="relative">
      <input
        type="text"
        v-model="search.order_id"
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
    <select v-if="tap===1" class="p-2 border rounded border-smooth" name="" id="" v-model="search.order_status">
      <option value="">{{$t('order.statusOrder')}}</option>
      <option :value="item.value" v-for="(item,i) in orderStatus" :key="i">
        {{ $t(`status.${item?.name}`) }}
      </option>

    </select>
<!--    <select class="p-2 border rounded border-smooth" name="" id=""  v-model="search.paymentStatus"  @change="FilterOrder">-->
<!--      <option value="">{{$t('order.paymentStatus')}}</option>-->
<!--      <option :value="option.value" v-for="(option,i) in paymentStatuses" :key="i">-->
<!--        {{ $t(`order.${option.label}`) }}-->
<!--        </option>-->

<!--    </select>-->
<!--    <select class="p-2 border rounded border-smooth"  v-model="search.orderType" @change="FilterOrder">-->
<!--      <option value="">{{$t('order.paymentMthodType')}}</option>-->
<!--      <option v-for="orderType in orderTypes" :key="orderType.value" :value="orderType.value">{{-->
<!--          $t(`order.${orderType.label}`)-->
<!--        }}</option>-->
<!--    </select>-->
    <select class="p-2 border rounded border-smooth" name="" id="" v-model="search.sort_by" >
      <option value="">{{$t('order.sortFilter')}}</option>
      <option v-for="(sortBy,index) in sortOptions" :key="index" :value="sortBy.api">{{
          $t(`order.${sortBy.label}`)
        }}</option>
    </select>
    <div class="flex col-span-2">
      <a
        class="inline-block align-middle cursor-pointer text-center select-none border font-normal whitespace-no-wrap rounded py-2 px-3 leading-normal no-underline bg-red-600 hover:bg-red-700 long mb-auto  ml-4 mr-4"
        @click.prevent="FilterOrder">  {{ $t("app.Apply Filters") }} </a>
      <a
        class="inline-block align-middle cursor-pointer text-center select-none border font-normal whitespace-no-wrap rounded py-2 px-3 leading-normal no-underline bg-red-600 hover:bg-red-700 long mb-auto  ml-4 mr-4"
        @click.prevent="clearFilterData"> {{ $t("prod.clear_filter") }} </a>
    </div>
  </div>
</template>
<script>
import {mapActions} from "vuex";

export default {
  props: ['tap'],
  data() {
    return {
      search: {
        order_id: '',
        order_status: '',
        sort_by: '',
        invoice_status:'',
        tap:''
      },
      orderStatus: [
        {id: 1, name: "pendingGIT", value:"pending"},
        {id: 2, name: "approved",value:"approved"},
        {id: 3, name: "rejected" , value:"rejected"},
      ],
      paymentStatuses: [
        { value: 'pending', label: 'PendingUpload' },
        { value: 'pending', label: 'PendingVerification' },
        { value: 'paid', label: 'Paid' },
        { value: 'pending_payment', label: 'PendingPayment' }
      ],
      sortOptions: [
        { value: 'oldest', label: 'LastUpdateOldest', api:'last-updated-oldest' },
        { value: 'newest', label: 'LastUpdateNewest', api:'last-updated-newest' },
        { value: 'highest_price', label: 'PriceHighest', api:'price-high' },
        { value: 'lowest_price', label: 'PriceLowest', api:'price-low' }
      ],
      orderTypes: [
        { value: '', label: 'OrderType' },
        { value: 'cart_orders', label: 'CartOrders' },
        { value: 'negotiated_orders', label: 'NegotiatedOrders' }
      ]

    }
  },

  methods: {

    async FilterOrder() {
      if (this.search.order_id !=='' || this.search.order_status !=='' || this.search.invoice_status !=='' || this.search.sort_by !=='' ) {
        this.search.tap= this.tap === 1 ?  'all' : this.tap ===2 ? 'pending' : this.tap === 3 ? 'approved' : this.tap === 4 ? 'rejected' :'';
        if( this.tap === 1) {
          this.search.tap= this.search.order_status;
        }
        this.$emit('filter-update',this.search)
      } else {
        return false;
      }
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

