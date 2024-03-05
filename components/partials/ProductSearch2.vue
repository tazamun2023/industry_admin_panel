<template>
  <div
    class="dropdown-wrapper input-wrapper product-search"
    v-outside-click="autoSuggestionClose"
  >
    <label>{{ $t('list.sp') }}</label>

    <div class="pos-rel">

      <div class="flex-auto">
        <div class="flex flex-wrap  relative flex flex-col min-w-0 rounded break-words">
          <div class="md:w-full pr-4 pl-4">
            <div class="flex mb-2">
              <input
                class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                type="text"
                v-model="searchedString"
                :placeholder="$t('list.sh')"
              >
              <button
                @click.prevent="search"
                class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded ml-2 mr-2 py-1 px-3 leading-normal no-underline bg-primary text-white hover:text-primary">
                <svg class="w-6 h-6 text-gray-800 " aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="md:w-full pr-4 pl-4">
            <div class="block w-full overflow-auto scrolling-touch overflow-y-auto h-96">
              <table id="conditionTable" class="hoverable whitespace-no-wrap">
                <thead>
                <tr>
                  <th style="width:2%"></th>
                  <th style="width:5%">Image</th>
                  <th style="width:30%">Product name</th>
                  <th style="width:5%">SKU</th>
                  <th style="width:5%">Unit Price</th>
                  <th style="width:5%">Status</th>
                  <th style="width:10%">Availability</th>
                </tr>
                </thead>
<!--                {{selectedProduct}}-->
                <tbody class="">
                <div class="suggestion-body">
                  <div
                    v-if="fetchingProductList"
                    class="spinner-wrapper"
                  >
                    <spinner
                      :radius="60"
                      color="primary"
                    />
                  </div>
                </div>
                <tr v-for="(product, index) in productList">
                  <td><input name="selectProduct"
                             @click="$emit('product-clicked',product)"
                             v-model="selectedProduct" type="radio" id="1" :value="product"></td>
                  <td>
                    <lazy-image
                      class="w-32 h-24 object-cover rounded"
                      :data-src="(product.image)"
                      :alt=" product.name"
                    />
                  </td>
                  <td><button style="overflow: hidden;text-overflow: ellipsis;    width: 100%; border: unset;">{{ product.title }}</button></td>
                  <td><span>{{ product.sku }}</span></td>
                  <td><span>191 SAR</span></td>
                  <td><span>{{ product.status }}</span></td>
                  <td><span>-</span></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div
            class="ptb-10 plr-15 dply-felx suggestion-footer"
            :class="{'ignore-click disabled': fetchingProductList || !productList.length}"
          >
            <p class="mx-w-50">{{ resultText }}</p>
            <div class="text-right dply-felx mlr--2-5">
              <button
                class="btn outline-btn mlr-2-5 dply-felx"
                @click.prevent="goNext(-1)"
              >
                <i
                  class="icon arrow-left"
                />
              </button>
              <button
                class="btn outline-btn mlr-2-5 dply-felx"
                @click.prevent="goNext(1)"
              >
                <i
                  class="icon arrow-right"
                />
              </button>
<!--              <button-->
<!--                class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded ml-2 mr-2 py-1 px-3 leading-normal no-underline bg-primary text-white hover:text-primary"-->
<!--                @click.prevent="$emit('product-clicked', selectedProduct)"-->
<!--              >-->
<!--                {{$t('rfq.selectProduct')}}-->
<!--              </button>-->
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import util from "~/mixin/util";
import {mapActions} from "vuex";
import Spinner from "~/components/Spinner";
import outsideClick from '~/directives/outside-click'
import {debounce} from 'debounce'
import LazyImage from "../LazyImage";

export default {
  name: 'ProductSearch2',
  data() {
    return {
      selectedProduct: null,
      productPage: 1,
      productData: null,
      autoSuggestionOpen: false,
      searchedString: '',
      fetchingProductList: false
    }
  },

  directives: {
    outsideClick
  },
  props: {},
  mixins: [util],
  components: {LazyImage, Spinner},
  computed: {
    productList() {
      return this.productData?.data || []
    },
    resultText() {
      if (this.productData) {
        if (this.productData?.total > 0) {
          return this.$t('list.show', {
            from: this.productData?.from,
            to: this.productData?.to,
            total: this.productData?.total
          })
        }
      }
    },
    totalPage() {
      return this.productData?.last_page
    },
    orderId() {
      return this.$route?.params?.id
    }
  },
  methods: {
    autoSuggestionClose() {
      this.autoSuggestionOpen = false
    },
    search() {
      this.productPage = 1
      this.fetchingData()
    },
    async openSuggestions() {
      if (!this.autoSuggestionOpen) {
        this.autoSuggestionOpen = true
      }

      if (this.productList.length === 0) {
        await this.fetchingData()
      }
    },
    goNext(data) {

      const nextPage = this.productPage + data
      if (nextPage <= this.totalPage && nextPage > 0) {
        this.productPage = nextPage
        this.fetchingData()
      }
    },
    async fetchingData() {
      this.fetchingProductList = true
      try {
        this.productData = await this.getRequest({
          params: {
            page: this.productPage,
            orderby: 'created_at',
            type: 'DESC',
            q: this.searchedString
          },
          api: 'getProducts'
        })

      } catch (e) {
        return this.$nuxt.error(e)
      }
      this.fetchingProductList = false
    },
    ...mapActions('common', ['getRequest'])
  },
  mounted() {
  }
}
</script>
<style lang="stylus">
@import '~/assets/styles/product-search.styl'
</style>
