<template>
  <div class="p-4 card lg:h-[371px]">
    <div class="flex justify-between">
      <h4 class="text-[20px] font-medium">Low Stock</h4>
<!--      <a href="" class="flex gap-4 items-center">More <img class="w-5 h-5" src="~/assets/icon/next-g.svg" alt=""></a>-->
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
      <button
        @click="refreshStock"
        :class="['flex gap-2 items-center justify-center text-white bg-theem h-[42px] text-[13px]', { 'is-loading': isLoading }]">
        <svg
          :class="['w-[11px] h-[11px]', { 'animate-rotate': isLoading }]"
          viewBox="0 0 13 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 7C12 10.04 9.54 12.5 6.5 12.5C3.46 12.5 1.60999 9.44 1.60999 9.44M1.60999 9.44H4.09M1.60999 9.44V12.19M1 7C1 3.96 3.44 1.5 6.5 1.5C10.17 1.5 12 4.56 12 4.56M12 4.56V1.81M12 4.56H9.56"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"/>
        </svg>
        {{ $t('Dashboard.Refresh Stock') }}
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
    return {
      isLoading: false
    }
  },
  methods: {
    refreshStock() {
      this.isLoading = true;
      // Simulate an API call
      setTimeout(() => {
        this.isLoading = false;
      }, 2000); // Duration should match the animation duration
    }
  }
}
</script>
<style scoped>
/* Define the rotation animation */
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Animation class for the SVG icon */
.animate-rotate {
  animation: rotate 2s linear infinite;
}

/* Optional: Add styles to indicate loading state */
.is-loading {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
