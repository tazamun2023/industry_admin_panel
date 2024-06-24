<template>
  <div class="p-4 card">
      <div class="flex justify-between">
          <h4 class="text-[20px] font-medium">Orders</h4>
          <NuxtLink :to="`/orders`" class="flex gap-4 items-center">More <img class="w-5 h-5" src="~/assets/icon/next-g.svg" alt=""></NuxtLink>
      </div>
      <div>
          <div class="lg:flex grid grid-cols-2 justify-between my-4 gap-4">
              <div class="border h-[90px] w-full  border-cardb px-4 pb-3 pt-2 rounded-[12px]">
                  <p class="text-14px">Preparation</p>
                  <p class="text-semibold text-[24px] leading-4 pt-[15px]">{{ orderStatuses?.preparation }}</p>
              </div>
              <div class="border h-[90px] w-full hover:border-orange border-[#c4cdd5] px-4 pb-3 pt-2 rounded-[12px]">
                  <p class="text-14px text-orange">Waiting Acceptance</p>
                  <p class="text-semibold text-[24px] leading-4 pt-[15px]">{{ orderStatuses?.waitingAcceptance }}</p>
              </div>
              <div class="border h-[90px] w-full  hover:border-primary border-[#c4cdd5] px-4 pb-3 pt-2 rounded-[12px]">
                  <p class="text-14px text-primary">Delivered</p>
                  <p class="text-semibold text-[24px] leading-4 pt-[15px]">{{ orderStatuses?.delivered }}</p>
              </div>
              <div class="border h-[90px] w-full hover:border-prograss border-[#c4cdd5] px-4 pb-3 pt-2 rounded-[12px]">
                  <p class="text-14px text-prograss">Rejected</p>
                  <p class="text-semibold text-[24px] leading-4 pt-[15px]">{{ orderStatuses?.rejected }}</p>
              </div>
              <div class="border h-[90px] w-full border-[#c4cdd5] px-4 pb-3 pt-2 rounded-[12px]">
                  <p class="text-14px ">Ready to Ship</p>
                  <p class="text-semibold text-[24px] leading-4 pt-[15px]">{{ orderStatuses?.readyToShip }}</p>
              </div>
              <div class="border h-[90px] w-full hover:border-theem border-[#c4cdd5] px-4 pb-3 pt-2 rounded-[12px]">
                  <p class="text-14px text-theem">Out for delivery</p>
                  <p class="text-semibold text-[24px] leading-4 pt-[15px]">{{ orderStatuses?.outForDelivery }}</p>
              </div>
          </div>
      </div>
  </div>
</template>

<script>

export default {
  name: "OrderOverView",
  props: ['orderStatuses'],

  data() {
    return {}
  }
}
</script>
