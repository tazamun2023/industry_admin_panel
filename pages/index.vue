<template>
  <div class="dashboard">
    <div class="flex justify-between items-center gap-4">
      <h3 class="uppercase text-[35px] font-semibold py-3">Dashboard</h3>
      <div>
        <p class="flex gap-4 items-center">Jan 01 - Jan 28 <img class="w-[16px]"
                                                                src="~/assets/icon/arrow-down-green.svg" alt=""></p>
      </div>
    </div>
    <!-- -------------------------------vendor panel--------------------------- -->
    <div v-if="$store.state.admin.isVendor">
      <profile-statistics :showProfile="false" :showLinks="true" :profileData="profileData"/>

      <div class="lg:grid my-4 lg:grid-cols-2 gap-4">
        <div class="my-2">
          <BestSeller :bestSelling="bestSelling"/>
        </div>
        <div class="my-2">
          <MyProducts :my_products="my_products"/>
        </div>
      </div>
      <div class="lg:grid my-4 lg:grid-cols-2 gap-4">
        <div class="my-2">
          <LowStock :lowStock="lowStock"/>
        </div>
        <div class="my-2">
          <VendorShortDetails :enhance="enhance"/>
        </div>
      </div>
      <div class="my-4 gap-4">
        <!--        <order-chart-->
        <!--          v-if="chartMonth"-->
        <!--          :chart-month="chartMonth"-->
        <!--          :monthly-order="monthlyOrder"-->
        <!--          @month-changed="monthChanged"-->
        <!--        />-->
        <SalesChart
          v-if="chartMonth"
          :chart-month="chartMonth"
          :monthly-order="monthlyOrder"
          @month-changed="monthChanged"
        />


      </div>
      <div class="lg:grid my-4 lg:grid-cols-2 gap-4">
        <div class="my-2">
          <InqueryRfq :inquiries_and_rfqs="inquiries_and_rfqs"/>
        </div>
        <div class="my-2">
          <Brands :brands="brands"/>
        </div>
      </div>
      <div class="my-2">
        <OrderOverview :orderStatuses="orderStatuses"/>
      </div>
      <div class="my-4 gap-4">
        <Orders :orders="orders"/>
      </div>
    </div>
    <!-- ----------------------------vendor panel end------------------------------- -->
    <!-- ----------------------------Admin panel end------------------------------- -->
    <div v-if="$store.state.admin.isSuperAdmin">
      <div>
        <shortStatics/>
      </div>
      <div class="my-2">
        <OrderUpdate/>
      </div>
      <div class="my-3 lg:grid lg:grid-cols-2 gap-4">
        <div class="card my-2">
          <User/>
        </div>
        <div class="card my-2">
          <Traffic/>
        </div>
      </div>
      <div class="my-3 lg:grid lg:grid-cols-2 gap-4">
        <div class="my-2 card">
          <admin-best-seller :bestSelling="bestSelling"/>
        </div>
        <div class="my-2  card">
          <admin-brand :brands="brands"/>
        </div>
      </div>
      <div class="my-3 lg:grid lg:grid-cols-2 gap-4">
        <div class="card my-2">
          <rfqs/>
        </div>
        <div class="card my-2">
          <customer/>
        </div>
      </div>
      <div class="my-3 lg:grid lg:grid-cols-2 gap-4">
        <div class="card my-2">
          <vendor/>
        </div>
        <div class="card my-2">
          <admin-order/>
        </div>
      </div>
      <div class="my-3 lg:grid lg:grid-cols-2 gap-4">
        <div class="my-2">
          <admin-product :my_products="my_products"/>
        </div>
        <div class="my-2">
          <withdrawn/>
        </div>
      </div>
      <div class="text-center p-4">
        <p class="text-primary text-[13px] font-bold">© 2024 Industry Export Directory. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script>
import OrderStatistic from '~/components/partials/OrderStatistic'
import OrderChart from '~/components/partials/OrderChart'
import Profile from '~/components/vendorDashboard/ProfileStatistics.vue'
import BestSeller from '~/components/vendorDashboard/BestSeller'
import MyProducts from '~/components/vendorDashboard/MyProducts'
import LowStock from '~/components/vendorDashboard/LowStock'
import VendorShortDetails from '~/components/vendorDashboard/VendorShortDetails'
import InqueryRfq from '~/components/vendorDashboard/InqueryRfq'
import Brands from '~/components/vendorDashboard/Brands'
import Orders from '~/components/vendorDashboard/Orders'
import OrderOverview from '~/components/vendorDashboard/OrderOverview'
import {mapGetters, mapActions} from 'vuex'
import util from '~/mixin/util'
import SalesChart from "../components/dashboard/SalesChart.vue";
import OrderUpdate from "~/components/adminDashboard/OrderUpdate.vue"
import shortStatics from "~/components/adminDashboard/shortStatics.vue";
import User from "~/components/adminDashboard/User.vue";
import Traffic from "~/components/adminDashboard/Traffic.vue";
import AdminBestSeller from '../components/adminDashboard/AdminBestSeller.vue'
import AdminBrand from '../components/adminDashboard/AdminBrand.vue'
import Rfqs from '../components/adminDashboard/Rfqs.vue'
import Customer from '../components/adminDashboard/Customer.vue'
import Vendor from '../components/adminDashboard/Vendor.vue'
import AdminProduct from '../components/adminDashboard/AdminProduct.vue'
import Withdrawn from '../components/adminDashboard/Withdrawn.vue'
import ProfileStatistics from "../components/vendorDashboard/ProfileStatistics.vue";

// import SalesChart from "../components/dashboard/SalesChart.vue";


export default {
  name: 'Index',
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      chartData: null,
      dashboard: null,
      profileData: null,
      brands: null,
      enhance: null,
      chartMonth: null,
      bestSelling: null,
      orderStatuses: null,
      my_products: null,
      lowStock: null,
      inquiries_and_rfqs: null,
      orders: null,
      fetching: false
    }
  },
  components: {
    ProfileStatistics,
    SalesChart,
    OrderChart,
    OrderStatistic,
    Profile,
    BestSeller,
    MyProducts,
    LowStock,
    VendorShortDetails,
    InqueryRfq,
    Brands,
    Orders,
    OrderOverview,
    OrderUpdate,
    shortStatics,
    User,
    Traffic,
    AdminBestSeller,
    AdminBrand,
    Rfqs,
    Customer,
    Vendor,
    AdminProduct,
    Withdrawn
  },
  mixins: [util],
  computed: {
    currencyPosition() {
      return this.setting?.currency_position
    },
    currencyIcon() {
      return this.setting?.currency_icon || '$'
    },
    monthlyOrder() {
      return this.chartData?.monthly_order || null
    },
    yearlyOrder() {
      return this.chartData?.yearly_order || null
    },
    usersCount() {
      return this.dashboard?.users || 0
    },
    productCount() {
      return this.dashboard?.products || 0
    },
    orderCount() {
      return this.dashboard?.orders || 0
    },
    orderAmount() {
      return (parseFloat(this.dashboard?.orders_amount || 0)).toFixed(2)
    },
    ...mapGetters('setting', ['setting'])
  },
  methods: {
    monthChanged(evt) {
      this.chartMonth = evt
      this.fetchingData()
    },
    async fetchingData() {
      try {

        this.chartData = null
        const data = await this.getRequest({
          params: {
            ...this.chartMonth,
            ...{time_zone: this.timeZone},
            ...{dashboard: !!this.dashboard}
          },
          api: 'dashboard'
        })

        if (data?.dashboard) {
          this.dashboard = data.dashboard
        }
        if (data?.profile) {
          this.profileData = data.profile
        }
        this.chartData = data.chart_data
        this.bestSelling = data.best_selling
        this.lowStock = data.lowStock
        this.inquiries_and_rfqs = data.inquiries_and_rfqs
        this.orders = data.orders
        this.brands = data.brands
        this.enhance = data.enhance
        this.my_products = data.my_products
        this.orderStatuses = data.orderStatuses

        /*await this.getDashboard({
          ...this.chartMonth,
          ...{time_zone: this.timeZone},
          ...{dashboard: !!this.dashboard}
        })*/


      } catch (e) {
        return this.$nuxt.error(e)
      }
    },
    ...mapActions('dashboard', ['getDashboard']),
    ...mapActions('common', ['getRequest'])
  },
  mounted() {
    let date = new Date()
    this.chartMonth = {
      year: date.getFullYear(),
      month: date.getMonth() + 1
    }
    this.fetchingData()


  }
}
</script>

<style lang="stylus">
@import "~/assets/styles/dashboard.styl";

.rounded-\[12px\] {
  border-radius: 12px !important;
}

</style>
<style scoped>
.dashboard >>> table td {
  color: #555F7E;
}

.dashboard >>> table p {
  color: #555F7E;
}

.dashboard >>> h4 {
  color: #1C2A53;
}

.dashboard >>> .text-semibold {
  font-weight: 600;
}
</style>
