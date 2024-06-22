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
            Last News
          </td>
          <td class="ltr:text-end rtl:text-start">{{ enhance?.last_news }}</td>
        </tr>
        <tr>
          <td class="text-[13px] capitalize">
            Videos
          </td>
          <td class="ltr:text-end rtl:text-start">{{ enhance?.last_videos }}</td>
        </tr>
        <tr>
          <td class="text-[13px] capitalize">
            Certificates
          </td>
          <td class="ltr:text-end rtl:text-start">{{ enhance?.last_certificate }}</td>
        </tr>
        <tr>
          <td class="text-[13px] capitalize">
            FAQs
          </td>
          <td class="ltr:text-end rtl:text-start">{{ enhance?.last_faq }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div>
      <button class="flex gap-2 items-center justify-center text-white bg-theem h-[42px] text-[13px]"><img
        class="w-[11px] h-[11px]" src="~/assets/icon/reload.svg" alt=""> Refresh Enhance
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'enhanceDetails',
  props: ['enhance']
}
</script>
