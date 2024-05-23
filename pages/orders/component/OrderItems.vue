<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table class="min-w-full text-left text-sm font-light">
            <thead class=" font-medium ">
            <tr>
              <th scope="col" class="p-2 w-[50px]">#</th>
              <th scope="col" class="p-2">{{ $t('orderDetails.product') }}</th>
              <th scope="col" class="p-2">{{ $t('orderDetails.quantity') }}</th>
              <th scope="col" class="p-2">{{ $t('orderDetails.agreed_price') }}</th>
              <th scope="col" class="p-2">{{ $t('orderDetails.subtotal') }}</th>
              <th scope="col" v-if="show_taxes" class="py-3 px-6">{{ $t('orderDetails.commission_percentage') }}</th>
              <th scope="col" v-if="show_taxes" class="py-3 px-6">{{ $t('orderDetails.commission_subtotal') }}</th>
              <th scope="col" class="p-2">{{ $t('global.status') }}</th>

            </tr>
            </thead>
            <tbody>
            <template v-for="(item,index) in order.sub_order_items" >
              <tr class="">
                <td class="whitespace-nowrap p-2 font-medium">{{ index + 1 }}</td>
                <td class="whitespace-nowrap p-2">
                  <div class="flex gap-4">
                    <LazyImage :data-src="item.product?.image" :title="item.product.title"
                               :alt="item.product.title" class="w-10 h-10"/>
                    <div>
                      <a href="">{{ item.product.title.slice(0, 30) }}</a>
                      <p>{{ $t('vendor.sku') }}: {{ item.product.sku }}</p>
                    </div>
                  </div>

                </td>
                <td class="whitespace-nowrap p-2">{{ item?.quantity }}</td>
                <td class="whitespace-nowrap p-2">
                  <price-with-curency-format :price="item?.price "></price-with-curency-format>

                </td>
                <td class="whitespace-nowrap p-2">
                  <price-with-curency-format :price="item?.total_price "></price-with-curency-format>
                </td>
                <td v-if="show_taxes" class="whitespace-nowrap p-2">
                  <price-with-curency-format :price="item?.total_price "></price-with-curency-format>
                </td>
                <td v-if="show_taxes" class="whitespace-nowrap p-2">
                  <price-with-curency-format :price="item?.total_price "></price-with-curency-format>
                </td>
                <td v-if="!change_status" class="whitespace-nowrap p-2">
                  {{ item?.status ? $t('order.available') : $t('order.noAvailable') }}
                </td>

                <td v-else class="whitespace-nowrap p-2">
                  <select @change="handleSelectChange($event,item)"
                          class="p-3 border border-smooth rounded">
                    <option
                      :selected="selectedOrdersall && selectedOrdersall?.sub_order_items[index]?.status == 'available' ? true : false"
                      value="1">
                      {{ $t('order.available') }}
                    </option>
                    <option
                      :selected="selectedOrdersall && selectedOrdersall?.sub_order_items[index]?.status == 'unavailable' ? true : false"
                      value="0">
                      {{ $t('order.noAvailable') }}
                    </option>
                  </select>
                </td>
              </tr>
              <tr
                v-if="change_status && subItemSelected && subItemSelected?.order.product?.id == item?.product?.id && subItemSelected?.availabilityStatus == 0">
                <td colspan="6">
                  <div class="py-2 w-50 mx-auto">
                    <label class="w-full text-warning capitalize py-2" for="">{{
                        $t('orderReject.selectRejectionReason')
                      }}</label>
                    <div class="flex gap-4">
                      <select class="p-4 w-full border border-smooth rounded" v-model="subItemSelected.reject_reasons">
                        <option :value="reason.id" v-for="(reason, index) in reasonsRejection" :key="index">
                          {{ reason.description }}
                        </option>
                      </select>
                      <button
                        @click="saveProductUnAvaliable(item.product_id)"
                        class="py-4 m-0 rounded h-[52px] w-[80px] leading-5 bg-primary text-white hover:text-primary">

                        {{ $t('orderReject.save') }}
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>


</template>
<script>

import TrSubItems from "./TrSubItem.vue";
import LazyImage from "../../../components/LazyImage.vue";
import PriceWithCurencyFormat from "../../../components/priceWithCurencyFormat.vue";

export default {
  components: {PriceWithCurencyFormat, LazyImage, TrSubItems,},
  props: ['order', 'change_status', 'selectedOrdersall', 'show_taxes', 'subItemSelected', 'reasonsRejection'],
  data() {
    return {
      hasError: false,
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    saveProductUnAvaliable(id) {

      this.$emit('save', id)
    },

    handleSelectChange(event, subItem) {
      this.$emit('selectChange', event.target.value, subItem)
    },


  }
}
</script>
