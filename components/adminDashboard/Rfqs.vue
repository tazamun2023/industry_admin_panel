<template>
  <div class="p-4">
    <div class="flex justify-between">
          <h4 class="text-[20px] font-semibold">RFQs</h4>
          <a href="" class="flex gap-4 text-[14px] font-semibold items-center">{{ $t('Dashboard.More') }} <img class="w-5 h-5  rtl:rotate-180" src="~/assets/icon/next-g.svg" alt=""></a>
      </div>
    <div class="overflow-x-auto min-h-[214px] my-4 scroolbar">
      <table>
        <tbody>
        <tr>
          <td class="text-[13px] px-4 capitalize">
            All RFQs
          </td>
          <td class="ltr:text-end px-4 rtl:text-start">{{ rfqs?.all_rfqs }}</td>
        </tr>
        <tr>
          <td class="text-[13px] px-4 capitalize">
            Pending
          </td>
          <td class="ltr:text-end px-4 rtl:text-start">{{ rfqs?.pending_rfqs }}</td>
        </tr>
        <tr>
          <td class="text-[13px] px-4 capitalize">
            Approve
          </td>
          <td class="ltr:text-end px-4 rtl:text-start">{{ rfqs?.approved_rfqs }}</td>
        </tr>
        <tr>
          <td class="text-[13px] px-4 capitalize">
            Quote Received
          </td>
          <td class="ltr:text-end px-4 rtl:text-start">{{ rfqs?.quote_received_rfqs }}</td>
        </tr>
        <tr>
          <td class="text-[13px] px-4 capitalize">
            Quote Accepted
          </td>
          <td class="ltr:text-end px-4 rtl:text-start">{{ rfqs?.quote_accepted_rfqs }}</td>
        </tr>
        <tr>
          <td class="text-[13px] px-4 capitalize">
            Cancelled
          </td>
          <td class="ltr:text-end px-4 rtl:text-start">{{ rfqs?.cancelled_rfqs }}</td>
        </tr>
        <tr>
          <td class="text-[13px] px-4 capitalize">
            Rejected
          </td>
          <td class="ltr:text-end px-4 rtl:text-start">{{ rfqs?.rejected_rfqs }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <!-- <div>
      <button class="flex gap-2 items-center justify-center text-white bg-theem h-[42px] text-[13px]"><img
        class="w-[11px] h-[11px]" src="~/assets/icon/reload.svg" alt=""> Refresh Enhance
      </button>
    </div> -->
  </div>
</template>

<script>

import LazyImage from "../LazyImage.vue";

export default {
  name: "AdminRfqs",
  components: {LazyImage},
  props: ['rfqs'],

  data() {
    return {}
  }
}
</script>
