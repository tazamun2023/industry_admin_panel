<template>
  <div class="p-4 card lg:h-[371px]">
    <div class="flex justify-between">
      <p>Enhance your company's presence and increase buyer confidence in your products through your information
        center.</p>
    </div>
    <div class="overflow-x-auto min-h-[214px] my-4 scroolbar">
      <table>
        <tbody>
        <tr>
          <td class="text-[13px] capitalize">
            {{ $t('Dashboard.Last News')}}
          </td>
          <td class="ltr:text-end rtl:text-start">{{ $t('Dashboard.Since')}} {{ enhance?.last_news }}</td>
        </tr>
        <tr>
          <td class="text-[13px] capitalize">
            {{ $t('Dashboard.Videos')}}
          </td>
          <td class="ltr:text-end rtl:text-start">{{ $t('Dashboard.Since')}} {{ enhance?.last_videos }}</td>
        </tr>
        <tr>
          <td class="text-[13px] capitalize">
            {{ $t('Dashboard.Certificates')}}
          </td>
          <td class="ltr:text-end rtl:text-start">{{ $t('Dashboard.Since')}} {{ enhance?.last_certificate }}</td>
        </tr>
        <tr>
          <td class="text-[13px] capitalize">
            {{ $t('Dashboard.FAQs')}}
          </td>
          <td class="ltr:text-end rtl:text-start">{{ $t('Dashboard.Since')}} {{ enhance?.last_faq }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div>
      <button
        @click="refreshEnhance"
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
        {{ $t('Dashboard.Refresh Enhance') }}
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'enhanceDetails',
  props: ['enhance'],
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    refreshEnhance() {
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
