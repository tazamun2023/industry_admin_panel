<template>
  <tbody>
  <tr class=" " v-for="(item,index) in subItems" :key="index" >
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
    <td class="whitespace-nowrap p-2">
      <select class="p-3 border border-smooth rounded" name="" id="">
        <option value="">{{ $t('order.available') }}</option>
        <option value="">{{ $t('order.noAvailable') }}</option>
      </select>
    </td>
  </tr>
  </tbody>
</template>
<script >
import LazyImage from "../../../components/LazyImage.vue";
import PriceWithCurencyFormat from "../../../components/priceWithCurencyFormat.vue";

export  default  {
  name:"tr-sub-items",
  components: {PriceWithCurencyFormat, LazyImage},
  props:['subItems']
}
</script>
