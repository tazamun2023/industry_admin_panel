<script>

import util from "~/mixin/util"
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "RFQProducts",
  middleware: ['common-middleware', 'auth'],
  props: {
    rfq: '',

  },
  data() {
    return {}

  },
  mixins: [util],
  computed: {
    ...mapGetters('language', ['currentLanguage']),
  },
  methods: {},
  async mounted() {
  }
}
</script>

<template>
  <section class="mx-auto" v-if="rfq?.products?.length > 0">
    <div class="w-full mb-8 overflow-hidden rounded-lg ">
      <div class="w-full overflow-x-auto">
        <table class="w-full">
          <thead>
          <tr class="text-md font-semibold tracking-wide text-start bg-smooth uppercase border-b border-smooth">
            <th class="px-4 py-3 ">{{ $t("products.Products") }}</th>
            <th class="px-4 py-3 ">{{ $t("products.Category") }}</th>
            <th class="px-4 py-3">{{ $t('products.Quantity') }}</th>
            <th class="px-4 py-3">{{ $t('products.Unit Target Price') }}</th>
            <th class="px-4 py-3">{{ $t('products.Total target price') }}</th>
          </tr>
          </thead>
          <tbody class="bg-white">

          <tr v-for="product in rfq.products" class="">
            <td class="px-4 border-smooth text-start border py-3">
              <div class="flex justify-start text-sm">
                <div class="relative w-8 h-8 mr-3 rounded-full md:block">
<!--                  <lazy-image class="object-cover w-full h-full rounded-full"-->
<!--                              :data-src="getThumbImageURL(product.image)"-->
<!--                              :alt=" product.name"-->
<!--                  />-->
                  <img :src="getThumbImageURL(product.image)" alt="">
                  <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                </div>
                <div>
                  <!--                          <p class="font-semibold text-black">احزمة الاوزان و المقاومة للتمارين</p>-->
                  <nuxt-link v-if="product.product_id>0"
                             :title="product.title"

                             :to="productLink(product.product)"
                             class="font-semibold text-primary"
                  >{{ product.name }}
                  </nuxt-link>
                  <a v-else
                     class="font-semibold text-primary"
                  >{{ product.name }}
                  </a>
                </div>
              </div>
            </td>
            <td class="border text-start border-smooth px-4 text-sm">Category name static</td>
            <td class="border text-start border-smooth px-4 text-sm">{{ product.quantity }} {{ product.unit?.name }}</td>
            <td class="border text-start border-smooth px-4 text-sm">
              {{
                product.target_price.toLocaleString($t('app.currency_local'), {
                  style: 'currency',
                  maximumFractionDigits: 0,
                  currency: 'SAR'
                })
              }}
            </td>
            <td class="border text-start border-smooth px-4 text-sm">
              <p> <span style="line-height: inherit;">
                {{
                  product.total_target_price.toLocaleString($t('app.currency_local'), {
                    style: 'currency',
                    maximumFractionDigits: 0,
                    currency: 'SAR'
                  })
                }}
                  </span></p>
            </td>
          </tr>

          <tr>
            <td class="px-4 border-smooth border py-3 text-end" colspan="3">
              <p><strong class="font-18px text-end">{{ $t('rfq.RFQ Total Value') }}</strong> <span class="text-primary">(Excl.VAT)</span></p>
            </td>
            <td class="px-4 border-smooth border py-3 font-bold" colspan="3">
              {{
                rfq?.total_target_price?.toLocaleString($t('app.currency_local'), {
                  style: 'currency',
                  maximumFractionDigits: 0,
                  currency: 'SAR'
                })
              }}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<style scoped>
.text-end{
  text-align: end !important;
}
</style>
