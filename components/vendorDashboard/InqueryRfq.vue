<template>
    <div class="p-4 card lg:h-[371px]">
        <div class="flex justify-between">
<<<<<<< Updated upstream
            <h4 class="text-[20px] font-medium">Inquiries and RFQs</h4>
            <NuxtLink :to="`/rfq`" class="flex gap-4 items-center">More <img class="w-5 h-5" src="~/assets/icon/next-g.svg" alt=""></NuxtLink>
=======
            <h4 class="text-[20px] font-semibold">Inquiries and RFQs</h4>
            <NuxtLink :to="`/rfq`" class="flex gap-4 items-center">More <img class="w-5 h-5  rtl:rotate-180" src="~/assets/icon/next-g.svg" alt=""></NuxtLink>
>>>>>>> Stashed changes
        </div>
        <div class="overflow-x-auto h-[240px] my-4 scroolbar">
            <table>
                <tbody>
                    <tr @click="goToMySuggestedRFQs" class="cursor-pointer">
                      <td  class="text-[13px] capitalize">
                        {{ $t('Dashboard.My suggested RFQs') }}
                    </td>
                     <td class="ltr:text-end rtl:text-start">
                       {{ inquiries_and_rfqs?.my_suggested_rfq }}
                     </td>
                    </tr>
                    <tr @click="goToPresentedRFQs" class="cursor-pointer">
                     <td  class="text-[13px] capitalize" >
                       {{ $t('Dashboard.Presented RFQs') }}
                    </td>
                     <td class="ltr:text-end rtl:text-start">{{ inquiries_and_rfqs?.presented_rfq }}</td>
                    </tr>
                    <tr @click="goToRejectedRFQs" class="cursor-pointer">
                     <td class="text-[13px] capitalize">
                       {{ $t('Dashboard.Rejected RFQs') }}
                    </td>
                     <td class="ltr:text-end rtl:text-start" >{{ inquiries_and_rfqs?.rejected_rfq }}</td>
                    </tr>
                    <tr @click="goNewNegotiationsRFQs" class="cursor-pointer">
                     <td  class="text-[13px] capitalize">
                       {{ $t('Dashboard.New negotiations') }}
                    </td>
                     <td class="ltr:text-end rtl:text-start">{{ inquiries_and_rfqs?.new_negotiations }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <NuxtLink :to="`/rfq`" class=""><button class="flex gap-2 items-center justify-center text-white bg-theem h-[42px] text-[13px] hover:text-theem"><img class="w-[11px] h-[11px]" src="~/assets/icon/reload.svg" alt=""> RFQs Market</button></NuxtLink>
        </div>
    </div>
</template>

<script>

import LazyImage from "../LazyImage.vue";

export default {
  name: "InquiriesAndRfq",
  components: {LazyImage},
  props: ['inquiries_and_rfqs'],

  data() {
    return {}
  },
  methods:{
    goToMySuggestedRFQs() {
      this.$router.push('/rfq/relevant');
    },
    goToPresentedRFQs() {
      this.$router.push('/rfq/my-list');
    },
    goToRejectedRFQs() {
      this.$router.push('/rfq/manage-quotes');
    },
    goNewNegotiationsRFQs() {
      this.$router.push('/message-center?tab=rfq');
    }
  }
}
</script>
