<template>
  <tbody>
  <tr class=" " v-for="(item,index) in subItems" :key="index" >
    <td class="whitespace-nowrap p-2 font-medium">{{index + 1}}</td>
    <td class="whitespace-nowrap p-2">
      <div class="flex items-center gap-4">
        <LazyImage
          :data-src="item.product.image"
          :title="item.product.title"
          :alt="item.product.title"
          class="w-10 h-10"
        />
        <div>
          <a >{{item.product.title.slice(0,30)}} ....</a>
          <p>{{$t('vendor.sku')}}:{{item.product.title.sku}}</p>
        </div>
      </div>

    </td>
    <td class="whitespace-nowrap p-2">{{ item?.quantity }}</td>
    <td class="whitespace-nowrap p-2">{{ $t('app.SAR') }} {{ item?.price }} / {{ $t('brand.price') }}</td>
    <td class="whitespace-nowrap p-2">{{ $t('app.SAR') }} {{ item?.total_price }}</td>
  </tr>
  </tbody>
</template>
<script >
import LazyImage from "../../../components/LazyImage.vue";

export  default  {
  name:"tr-sub-items",
  components: {LazyImage},
  props:['subItems']
}
</script>
