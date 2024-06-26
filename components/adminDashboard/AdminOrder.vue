<template>
  <div class="p-4">
    <div class="flex justify-between">
          <h4 class="text-[20px] font-medium">Order</h4>
          <a href="" class="flex gap-4 text-[14px] font-semibold items-center">{{ $t('Dashboard.More') }} <img class="w-5 h-5" src="~/assets/icon/next-g.svg" alt=""></a>
      </div>
    <div class="overflow-x-auto min-h-[214px] my-4 scroolbar">
      <table>
        <tbody>
        <tr>
          <td class="text-[13px] px-4 capitalize">
            All Orders
          </td>
          <td class="ltr:text-end px-4 rtl:text-start">53</td>
        </tr>
        <tr>
          <td class="text-[13px] px-4 capitalize">
            Pending Approval
          </td>
          <td class="ltr:text-end px-4 rtl:text-start">55</td>
        </tr>
        <tr>
          <td class="text-[13px] px-4 capitalize">
            Pending Customer Approval
          </td>
          <td class="ltr:text-end px-4 rtl:text-start">6</td>
        </tr>
        <tr>
          <td class="text-[13px] px-4 capitalize">
            Approved
          </td>
          <td class="ltr:text-end px-4 rtl:text-start">43</td>
        </tr>
        <tr>
          <td class="text-[13px] px-4 capitalize">
            Ready to Ship
          </td>
          <td class="ltr:text-end px-4 rtl:text-start">33</td>
        </tr>
        <tr>
          <td class="text-[13px] px-4 capitalize">
            Out For Delivery
          </td>
          <td class="ltr:text-end px-4 rtl:text-start">4</td>
        </tr>
        <tr>
          <td class="text-[13px] px-4 capitalize">
            Delivered
          </td>
          <td class="ltr:text-end px-4 rtl:text-start">40</td>
        </tr>
        <tr>
          <td class="text-[13px] px-4 capitalize">
            Dispute
          </td>
          <td class="ltr:text-end px-4 rtl:text-start">40</td>
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

