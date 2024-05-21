<template>
  <div class="flex gap-4 my-4">
    <div class="relative">
      <input type="text" v-model="search.order_id" :placeholder="$t('orderDetails.Search by orderId')"
             class="ltr:pl-8 rtl:pr-8 py-2 border border-cardb rounded-lg w-full focus:outline-none focus:border-primary"/>
      <div class="absolute inset-y-0 ltr:left-1  rtl:right-1  flex items-center pointer-events-none">
        <!-- Search Icon -->
        <svg class="w-6 h-6 text-smooth" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
             viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
        </svg>
      </div>
    </div>
    <div class="relative">
      <multi-select :old_selected="search.order_status" :disabled="tap !== 'all'"
                    :options="$can('view_main_orders')  ? orderStatusAdmin : orderStatus"
                    @checked="onCheck" :selected-all="true" label="name"
                    :title="$t(`multiSelect.orderStatus`)" :disabled-data="isTap"></multi-select>
      <select class="p-2 border rounded-[10px] capitalize border-cardb" name="" id="status"
              v-model="search.invoice_status"
              v-if="invoice_status">
        <option value="">{{ $t('order.paymentStatus') }}</option>
        <option :value="option.value" v-for="(option, i) in paymentStatuses" :key="i">
          {{ $t(`paymentStatus.${option.value}`) }}
        </option>
      </select>
      <label class="absolute ltr:right-1 rtl:left-1 mt-[-28px]" for="status"><img class="w-4"
                                                                                  src="~/assets/icon/arrow-down-green.svg"
                                                                                  alt=""></label>
    </div>
    <!--    <select class="p-2 border rounded border-cardb"  v-model="search.orderType" @change="FilterOrder">-->
    <!--      <option value="">{{$t('order.paymentMthodType')}}</option>-->
    <!--      <option v-for="orderType in orderTypes" :key="orderType.value" :value="orderType.value">{{-->
    <!--          $t(`order.${orderType.label}`)-->
    <!--        }}</option>-->
    <!--    </select>-->
    <div class="relative">
      <select class="p-2 border h-[44px] capitalize rounded-[10px] border-cardb" name="" id="" v-model="search.sort_by">
        <option value="">{{ $t('order.sortFilter') }}</option>
        <option v-for="(sortBy, index) in sortOptions" :key="index" :value="sortBy.api">{{
            $t(`order.${sortBy.label}`)
          }}
        </option>
      </select>
      <label class="absolute ltr:right-1 rtl:left-1 mt-[15px]" for="status"><img class="w-4"
                                                                                 src="~/assets/icon/arrow-down-green.svg"
                                                                                 alt=""></label>
    </div>
    <div class="flex col-span-2">
      <a
        class="inline-block align-middle cursor-pointer text-center select-none border leading-[25px] border-cardb h-[44px] font-normal whitespace-no-wrap rounded-[10px] py-2 px-3 no-underline bg-red-600 hover:bg-red-700 long mb-auto  ml-4 mr-4"
        @click.prevent="FilterOrder"> {{ $t("app.Apply Filters") }} </a>
      <a
        class="inline-block align-middle cursor-pointer text-center select-none border leading-[25px] border-cardb h-[44px] font-normal whitespace-no-wrap rounded-[10px] py-2 px-3  no-underline bg-red-600 hover:bg-red-700 long mb-auto  ml-4 mr-4"
        @click.prevent="clearFilterData"> {{ $t("prod.clear_filter") }} </a>
    </div>
  </div>
</template>
<script>
import {mapActions} from "vuex";
import MultiSelect from '../../../components/partials/MultiSelect.vue';

export default {
  components: {MultiSelect},
  props: ['tap', 'invoice_status'],
  data() {
    return {
      search: {
        order_id: '',
        order_status: [],
        sort_by: '',
        invoice_status: '',
        tap: ''
      },
      orderStatus: [
        {id: 1, name: "all", value: "all"},
        {id: 2, name: "order placed", value: "placed"},
        {id: 3, name: "received", value: "received"},
        {id: 4, name: "partial received", value: "partial_received"},
        {id: 5, name: "delivered", value: "delivered"},
        {id: 6, name: "partial delivered", value: "partial_delivered"},
        {id: 7, name: "pending cancellation", value: "pending_cancellation"},
        {id: 8, name: "cancelled", value: "cancelled"},
        {id: 9, name: "ready to ship", value: "ready_to_ship"},
        {id: 10, name: "order picked", value: "order_picked"},
        {id: 11, name: "out for pickup", value: "out_for_pickup"},
        {id: 12, name: "out for delivery", value: "out_for_delivery"},
        {id: 13, name: "out for delivery", value: "out_for_delivery"},
        {id: 14, name: "dispute", value: "dispute"},
        {id: 15, name: "in transit", value: "in_transit"},
      ],
      orderStatusAdmin: [
        {id: 1, name: "all", value: "all"},
        {id: 2, name: "order placed", value: "placed"},
        {id: 3, name: "pending", value: "pending"},
        {id: 4, name: "in progress", value: "in_progress"},
        {id: 5, name: "delivered", value: "delivered"},
        {id: 8, name: "reject", value: "reject"},
        {id: 9, name: "approved", value: "approved"},
      ],
      paymentStatuses: [
        {value: 'pending', label: 'pending'},
        {value: 'check_payment', label: 'check payment'},
        {value: 'partial_payment', label: 'partial payment'},
        {value: 'full_payment', label: 'full payment'}
      ],
      sortOptions: [
        {value: 'oldest', label: 'LastUpdateOldest', api: 'last-updated-oldest'},
        {value: 'newest', label: 'LastUpdateNewest', api: 'last-updated-newest'},
        {value: 'highest_price', label: 'PriceHighest', api: 'price-high'},
        {value: 'lowest_price', label: 'PriceLowest', api: 'price-low'}
      ],
      orderTypes: [
        {value: '', label: 'OrderType'},
        {value: 'cart_orders', label: 'CartOrders'},
        {value: 'negotiated_orders', label: 'NegotiatedOrders'}
      ]

    }
  },
  computed: {
    isTap() {
      return this.tap ?? 'all';
    }
  },
  watch: {
    tap() {
      this.typeTap();
    }
  },
  methods: {
    onCheck(val) {
      this.search.order_status = val;
    },
    async FilterOrder() {
      if (this.search.order_id !== '' || this.search.order_status !== '' || this.search.invoice_status !== '' || this.search.sort_by !== '') {
        this.search.tap = this.tap ?? 'all'
        this.search.tap = this.isTap;

        this.$emit('filter-update', this.search)
      } else {
        return false;
      }
    },
    clearFilterData() {
      this.search.order_id = "";
      this.search.order_status = "";
      this.search.invoice_status = "";
      this.search.sort_by = "";
      this.$emit('clear-filter')
    },
    typeTap() {
      // this.search.order_status = this.tap
    }
  },
  mounted() {
    this.typeTap();

    this.search.order_id = this.$route.query.order_id ?? ''
    if (this.$route.query.tap === 'all') {
      this.search.order_status = this.$route.query.order_status ?? []
    } else {
      this.search.order_status = []
      // this.$route.query.order_status = [];
    }
    this.search.sort_by = this.$route.query.sort_by ?? ''
    this.search.invoice_status = this.$route.query.invoice_status ?? ''
    this.search.tap = this.$route.query.tap ?? ''

    console.log("this.$route.query.order_status")
    console.log(this.search)
    console.log(this.$route.query.order_status)

  }
}
</script>

<style>
.custom-select {
  min-width: 260px;
}

.ltr\:pl-8:where([dir="ltr"], [dir="ltr"] *) {
  padding-left: 2rem !important;
}

.rtl\:pr-8:where([dir="rtl"], [dir="rtl"] *) {
  padding-right: 2rem !important;
}

.border-cardb {
  --tw-border-opacity: 1;
  border-color: rgb(196, 205, 213) !important;
}

/* Hide the default appearance of the select box */
select {
  appearance: none; /* For modern browsers */
  -webkit-appearance: none; /* For Safari and Chrome */
  -moz-appearance: none; /* For Firefox */
}

</style>
