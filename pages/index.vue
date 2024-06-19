<template>
  <div class="dashboard">
    <h3 class="uppercase py-3">Dashboard</h3>
    <Profile :profileData="profileData" />
    <div class="lg:grid my-4 lg:grid-cols-2 gap-4">
      <div class="my-2">
        <BestSeller/>
      </div>
      <div class="my-2">
        <MyProducts/>
      </div>
    </div>
    <div class="lg:grid my-4 lg:grid-cols-2 gap-4">
      <div class="my-2">
        <LowStock/>
      </div>
      <div class="my-2">
        <VendorShortDetails/>
      </div>
    </div>
    <div class="lg:grid my-4 lg:grid-cols-2 gap-4">
      <div class="my-2">
        <InqueryRfq/>
      </div>
      <div class="my-2">
        <Brands/>
      </div>
    </div>
    <div class="my-4 gap-4">
      <Orders/>
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
import {mapGetters, mapActions} from 'vuex'
import util from '~/mixin/util'


export default {
  name: 'Index',
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      chartData: null,
      dashboard: null,
      profileData: null,
      chartMonth: null,
      fetching: false
    }
  },
  components: {
    OrderChart,
    OrderStatistic,
    Profile,
    BestSeller,
    MyProducts,
    LowStock,
    VendorShortDetails,
    InqueryRfq,
    Brands,
    Orders
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
