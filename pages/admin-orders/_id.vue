<template>
    <div>
        <div class="flex justify-between border-b border-smooth pb-3">
            <div class="flex items-center gap-4">
                <h3 class="font-bold">Order <span>T240228164508</span></h3> <span class="bg-primarylight text-primary px-2 rounded-3xl font-bold text-[13px]">Pending</span>
            </div>
            <div>
                <span class="border-2 border-smooth text-smooth font-bold leading-5 p-2 rounded-lg uppercase" ><a href="">Download Invoice</a></span>
            </div>
        </div>
        <div class="flex justify-between py-4">
            <div class="flex gap-4">
                <div>
                    <p class="text-smoothlight">Created date</p>
                    <p class="text-smoothlight"><strong>28 Feb 2024, 08:28 PM</strong></p>
                </div>
                <div>
                    <p class="text-smoothlight">Payment method</p>
                    <p class="flex gap-4 items-center  text-[14px]"><img class="h-5 w-5" src="~/assets/icon/bank.svg"> <strong class="text-smoothlight">Bank Transfer</strong></p>
                </div>
                <div>
                  <p class="text-smoothlight">Payment Status</p>
                  <p class="text-theem"><span class="bg-theemlight  text-[14px]  px-2 rounded-3xl"><strong class="text-theem">Payment Pending Verification</strong></span></p>
                </div>
            </div>
            <div>
              <div class="text-end">
                <p class="text-smoothlight">Order Total</p>
                <p><strong class="text-[14px]">12345,88</strong> <span class="text-primary  text-[14px]">SAR</span></p>
                <a class="border-b border-smooth" href="">Show breakdown</a>
              </div>
            </div>
        </div>

        <div class="bg-smooth p-4 rounded-3xl">
            <div class="card p-4 rounded-3xl">
              <div class="border-b border-smooth pb-2">
                <p><strong>T240228164508S2</strong></p>
                <span>Shipment 1 of 2</span>
              </div>
              <div class="flex justify-between py-3 border-b border-smooth">
                  <div class="flex gap-4">
                    <p>Tradeling will update you on the delivery date once the <br>
                    payment has been successfully received</p>
                    <div>
                      <p>Shipment method</p>
                      <p>Express air freight </p>
                    </div>
                    <div>
                      <p>Shipment cost</p>
                      <p>489.35 <span class="text-primary">SAR</span> </p>
                    </div>
                    <div>
                      <p>Status</p>
                      <p><span class="bg-primarylight text-primary px-2 rounded-3xl font-bold text-[13px]">Pending</span></p>
                    </div>
                  </div>
                  <div>
                    <div class="text-end">
                      <p>Total</p>
                      <p>489.35 <span class="text-primary">SAR</span> </p>
                    </div>
                  </div>
              </div>
            </div>
        </div>
    </div>
</template>
