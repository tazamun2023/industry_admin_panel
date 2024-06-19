<template>
  <div class="p-4 card lg:h-[371px]">
    <div class="flex justify-between">
      <h4 class="text-[20px] font-medium">Low Stock</h4>
      <a href="" class="flex gap-4 items-center">More <img class="w-5 h-5" src="~/assets/icon/next-g.svg" alt=""></a>
    </div>
    <div class="overflow-x-auto h-[240px] my-4 scroolbar">
      <table>
        <thead>
        <tr>
          <th class="text-[14px] capitalize">Product</th>
          <th class="text-[14px] capitalize">Qty</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(data, index) in lowStock" :key="data.id">
          <td class="text-[13px] capitalize">
            <div class="flex items-center gap-4">
              <lazy-image
                class="w-[36px] h-[36px] rounded-full"
                :data-src="data.thumb_image"
                :alt="data.name"
              />
              <p>{{ data.name }}</p>
            </div>
          </td>
          <td>{{ data.available_quantity }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div>
      <button class="flex gap-2 items-center justify-center text-white bg-theem h-[42px] text-[13px]"><img
        class="w-[11px] h-[11px]" src="~/assets/icon/reload.svg" alt=""> Refresh Stock
      </button>
    </div>
  </div>
</template>

<script>

import LazyImage from "../LazyImage.vue";

export default {
  name: "LowStock",
  components: {LazyImage},
  props: ['lowStock'],

  data() {
    return {}
  }
}
</script>
