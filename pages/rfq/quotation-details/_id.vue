<script>
import util from "@/mixin/util";
import {mapActions} from "vuex";
import RFQProducts from "../../../components/rfq/RFQProducts.vue";
import RfqDetails from "../../../components/rfq/RfqDetails.vue";

export default {
  name: "QuotationDetails",
  components: {RfqDetails, RFQProducts},
  middleware: ['common-middleware', 'auth'],
  mixins: [util],
  data() {
    return {
      quotation: null,
      loading: false
    }
  },
  computed: {
    id() {
      return this.$route?.params?.id
    }
  },

  async mounted() {
    await this.fetchingData()
  },

  methods:{
    async fetchingData() {
      try {
        this.loading = true
        this.quotation = Object.assign({}, await this.getById({
          id: this.id,
          params: {time_zone: this.timeZone},
          api: 'getRfqQuotation'
        }))
        this.loading = false
      } catch (e) {
        return this.$nuxt.error(e)
      }
    },


    ...mapActions('common', ['setRequest', 'getById', 'setById']),
  }

}
</script>

<template>
  <div>
    <div v-if="quotation && $can('view_quotation')">

      <div class="card my-4 p-4">
        <h4 class="font-bold pb-2">{{ $t('rfq.RFQ Details') }}</h4>
        <rfq-details :rfq="quotation.rfq"></rfq-details>
      </div>
      <div class="card my-4 p-4">
        <h4 class="font-bold pb-2">{{ $t('rfq.Quote Details') }}</h4>
        <div class="flex justify-between">
          <div>
            <p class="font-bold">{{ $t('rfq.Quote Id') }}</p>
            <p>Q{{ quotation.id }}</p>
            <!--            <p>{{ $store.state.admin.profile.username }}</p>-->
          </div>
          <div>
            <p class="font-bold">{{ $t('rfq.Status') }}</p>
            <p class="uppercase">{{ quotation?.status }}</p>
          </div>
          <div>
            <p class="font-bold">{{ $t('rfq.Price Valid Until') }}</p>
            <p>{{ quotation?.valid_until }}</p>
          </div>
          <div>
            <p class="font-bold">{{ $t('rfq.Quotes Submitted')}}</p>
            <p>{{ quotation?.created }}</p>
          </div>
        </div>
      </div>
      <div class="card my-4 p-4">
        <h4 class="font-bold pb-2">{{ $t('rfq.Products in your quote') }}</h4>
        <div class="flex flex-col overflow-x-auto">
          <div class="sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div class="overflow-x-auto">
                <table
                  class="min-w-full text-start text-sm font-light text-surface">
                  <thead
                    class="border-b border-neutral-200 font-medium">
                  <tr>
                    <th scope="col" class="px-3 py-1">#</th>
                    <th scope="col" class="px-3 py-1">{{ $t('rfq.Product') }}({{quotation?.products?.length}})</th>
<!--                    <th scope="col" class="px-3 py-1">{{ $t('rfq.Category') }}</th>-->
                    <th scope="col" class="px-3 py-1">{{ $t('rfq.Quantity') }}</th>
                    <th scope="col" class="px-3 py-1">{{ $t('rfq.Unit Offer Price') }}</th>
                    <th scope="col" class="px-3 py-1">{{ $t('rfq.Total Offer Price')}}</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr class="border-neutral-200" v-for="(product, index) in quotation.products" :key="index">
                    <td class="whitespace-nowrap px-3 py-1 font-medium">{{  index }}</td>
                    <td class="whitespace-nowrap px-3 py-1">
                      <div class="flex gap-4 items-center" v-if="product.product.image">
                        <img class="w-20 h-20" :src="product.product.image" :alt="product.product.title">
                        <a class="underline text-primary" href="">{{ product?.product?.title }}</a>
                      </div>
                    </td>
<!--                    <td class="whitespace-nowrap px-3 py-1">{{ product.name }}</td>-->
                    <td class="whitespace-nowrap px-3 py-1">{{ product.quantity }} {{ product.unit?.name }}</td>
                    <td class="whitespace-nowrap px-3 py-1">SAR {{ product.total_offer_price }}</td>
                    <td class="whitespace-nowrap px-3 py-1">SAR {{  product?.total }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="text-end">
                <p class="capitalize">{{ $t('rfq.total_quoted_price_ex_vat') }}: <span class="text-primary">SAR {{ quotation?.total_target_price }}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h4 class="font-bold pb-2">Additional Information</h4>
      <div class="card my-4 p-4">
        <h4 class="font-bold pb-2">{{ $t('rfq.Additional Details') }}</h4>
        <div>
          <p>{{ quotation.additional_details }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <h3>something went wrong. Try again in a few minutes</h3>
    </div>
  </div>
</template>


<style scoped>

</style>
