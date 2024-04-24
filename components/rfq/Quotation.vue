<script>

import util from "~/mixin/util"
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "Quotation",
  middleware: ['common-middleware', 'auth'],
  props: {
    rfq: Object,
    quote: Object,
    no: Number,
  },
  data() {
    return {}

  },
  mixins: [util],
  computed: {
    ...mapGetters('language', ['currentLanguage']),
  },
  methods: {
    openModel(id) {
      this.$emit('open', id)
    },
    openRejectModel(id) {
      this.$emit('open_reject', id)
    }
  },
  async mounted() {
  }
}
</script>

<template>

  <div class="my-4" :style="{direction:$t('app.dir')} ">
    <!--    <h4 class="font-bold pb-2 flex gap-2"><span>Quotation Received</span> <span-->
    <!--      class="font-10px border border-smooth p-1 rounded flex gap-1">-->
    <!--      <img class="h-2 w-2" src="~/assets/icon/grensign.svg" alt="">-->
    <!--      <span>{{-->
    <!--          no + 1-->
    <!--        }}</span></span></h4>-->
    <div class="my-4 flex items-center gap-4">
      <h3>{{ $t('rfq.QuotationReceived') }} </h3>
      <span class="text-xs text-primary border border-smooth px-2 rounded flex gap-1 items-center"><img class="h-2 w-2"
                                                                                                        src="~/assets/icon/gline.svg"
                                                                                                        alt="">{{
          no + 1
        }}</span>
    </div>
    <section class="card mx-auto p-6">
      <div class="w-full mb-8 overflow-hidden rounded-lg ">

        <div class="w-full overflow-x-auto">
          <div class="border border-smooth rounded-lg">
            <div class="border-b border-smooth">
              <div class="p-4 lg:flex justify-between">
                <p><span class="font-bold">{{ $t('rfq.QuoteID') }}</span> <span class="text-primaryn mx-3">{{ quote.id }}</span></p>
                <p><span class="font-bold">{{ $t('rfq.PriceValidUntil') }}</span> <span class="text-primary mx-3">{{
                    quote.expiry_date
                  }}</span></p>
                <p><span class="font-bold bg-graylight p-1 uppercase rounded">{{ $t('rfq.QuoteSubmitted') }}</span></p>
              </div>
            </div>
            <div class="border-b border-smooth">
              <div class="p-4 lg:flex justify-between">
                <p><span class="font-bold text-primary">{{ quote.vendor?.local_name }}</span></p>
                <p><span class="font-bold bg-graylight uppercase p-1 rounded">{{ $t('rfq.Verified') }}</span></p>
                <p></p>
              </div>
            </div>
            <!--            <div class="border-b border-smooth">-->
            <!--              <div class="p-4 gap-4">-->
            <!--                <button @click="openModel(quote.id)"-->
            <!--                        class="bg-primary p-2 leading-3 text-center uppercase text-white mx-2">-->
            <!--                  accept & checkout-->
            <!--                </button>-->
            <!--                <button class="border border-primary p-2 leading-3 text-center uppercase text-primary mx-2">-->
            <!--                  <nuxt-link :to="'/user/rfq/quote/'+quote.id">view quote</nuxt-link>-->
            <!--                </button>-->
            <!--                <button class="border border-primary p-2 leading-3 text-center uppercase text-primary mx-2">send counter-->
            <!--                  offer-->
            <!--                </button>-->
            <!--                <button @click="openRejectModel(quote.id)"-->
            <!--                        class="border border-red p-2 leading-3 text-center uppercase text-red mx-2">reject quote-->
            <!--                </button>-->
            <!--              </div>-->
            <!--            </div>-->
            <div class="border-b border-smooth">
              <div class="lg:grid grid-cols-2">
                <div class="ltr:border-r rtl:border-l border-smooth p-4">
                  <p><span class="font-bold">{{ $t('rfq.TotalPrice') }}</span> <span class="text-primary">{{ $t('rfq.Exclshipping') }}</span>
                  </p>
                  <p>{{
                      quote.total_target_price.toLocaleString($t('app.currency_local'), {
                        style: 'currency',
                        maximumFractionDigits: 0,
                        currency: 'SAR'
                      })
                    }}
                    <!-- <span class="text-primary">SAR</span> -->
                  </p>
                </div>
                <div class="p-4">
                  <p><span class="font-bold">{{ $t('rfq.TotalCost') }}</span> <span class="text-primary">{{
                    $t('rfq.Exclshipping') }}</span>
                  </p>
                  <p>{{
                      quote.total_target_price.toLocaleString($t('app.currency_local'), {
                        style: 'currency',
                        maximumFractionDigits: 0,
                        currency: 'SAR'
                      })
                    }}
                    <!-- <span class="text-primary">SAR</span> -->
                  </p>
                </div>
              </div>
            </div>
            <div class="gap-4 p-3">
              <div class="flex gap-4 my-3">
                <h3>{{ $t('rfq.ProductsQoute') }}</h3>
                <span class="text-xs text-primary border border-smooth px-2 rounded flex gap-1 items-center"><img
                  class="h-2 w-2" src="~/assets/icon/gline.svg" alt="">{{ quote.products.length }}</span>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div class="border border-smooth p-3 rounded-lg" v-for="product in quote.products">
                  <div class="flex gap-4 w-full">
                    <!--                    <lazy-image-->
                    <!--                      v-if="product.image"-->
                    <!--                      class="w-[30px] h-[30px]"-->
                    <!--                      :data-src="(product.image)"-->
                    <!--                      :alt=" product.name"-->
                    <!--                    />-->
                    <div class="w-full">
                      <nuxt-link :title="product.product.title" :to="productLink(product.product)"
                                 class="text-primary underline w-full">{{ product.product.title }}
                      </nuxt-link>
                      <div class="flex justify-between gap-4">
                        <p>{{ $t('rfq.Quentity') }}:</p>
                        <p>{{ product?.quantity ?? 0 }} <span class="text-primary"> {{
                            product.unit.name
                          }}</span></p>
                      </div>
                      <div class="flex justify-between gap-4">
                        <p class="flex justify-between"><strong>{{ $t('rfq.Unitprice') }}: </strong>
                          <span>
                            {{
                              product.target_price.toLocaleString($t('app.currency_local'), {
                                style: 'currency',
                                maximumFractionDigits: 0,
                                currency: 'SAR'
                              })
                            }}
                          </span></p>
                      </div>
                      <p class="flex justify-between"><strong>{{ $t('rfq.ShipingCost') }}:</strong> <span>{{
                          quote.total_target_price.toLocaleString($t('app.currency_local'), {
                            style: 'currency',
                            maximumFractionDigits: 0,
                            currency: 'SAR'
                          })
                        }}</span></p>
                      <div class="flex justify-between gap-4">
                        <p class="flex justify-between"><strong>{{ $t('rfq.Total') }}:</strong> <span>{{
                            quote.total_target_price.toLocaleString($t('app.currency_local'), {
                              style: 'currency',
                              maximumFractionDigits: 0,
                              currency: 'SAR'
                            })
                          }}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>

</template>

<style scoped>

</style>


