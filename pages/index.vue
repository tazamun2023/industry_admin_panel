<template>
  <div  class="dashboard">
      <h3 class="uppercase py-3">Dashboard</h3>
      <!-- -------------------------------vendor panel--------------------------- -->
      <div v-if="$store.state.admin.isVendor">
    <Profile :profileData="profileData" />

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
          <OrderOverview/>
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
        <OrderUpdate
          v-if="chartMonth"
          :chart-month="chartMonth"
          :monthly-order="monthlyOrder"
          @month-changed="monthChanged"
          />
        </div>
        <div class="my-2 grid grid-cols-2 gap-4">
          <div>
            <User/>
          </div>
          <div>
            <Traffic/>
          </div>
        </div>
        <div class="my-3 grid grid-cols-2 gap-4">
          <div>
            <admin-best-seller :bestSelling="bestSelling"/>
          </div>
          <div>
            <admin-brand :brands="brands"/>
          </div>
        </div>
        <div class="my-4 grid grid-cols-2 gap-4">
          <div>
            <rfqs/>
           </div>
          <div>
            <customer/>
          </div>
        </div>
        <div class="my-4 grid grid-cols-2 gap-4">
          <div>
            <vendor/>
           </div>
          <div>
            <admin-order/>
          </div>
        </div>
        <div class="my-4 grid grid-cols-2 gap-4">
          <div>
            <admin-product :my_products="my_products"/>
           </div>
          <div>
           <withdrawn/>
          </div>
        </div>
       </div>
  </div>
</template>

<script>
  import OrderStatistic from '~/components/partials/OrderStatistic'
  import OrderChart from '~/components/partials/OrderChart'
  import Profile from '~/components/vendorDashboard/Profile'
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
  import OrderUpdate from "../components/dashboard/OrderUpdate.vue";
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
        my_products: null,
        lowStock: null,
        inquiries_and_rfqs: null,
        orders: null,
        fetching: false
      }
    },
    components: {
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

          if(data?.dashboard) {
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
