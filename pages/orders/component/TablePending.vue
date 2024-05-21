<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        <div class="overflow-hidden">
  <table class="min-w-full text-left text-sm font-light">
    <thead class=" font-medium ">
    <tr>
      <th scope="col" class="p-2 w-[50px]">#</th>
      <th scope="col" class="p-2">{{$t('orderDetails.product')}}</th>
      <th scope="col" class="p-2">{{$t('orderDetails.quantity')}}</th>
      <th scope="col" class="p-2">{{$t('orderDetails.agreed_price')}}</th>
      <th scope="col" class="p-2">{{$t('orderDetails.subtotal')}}</th>
      <th scope="col" class="p-2" >{{$t('global.status')}}</th>
    </tr>
    </thead>
<!--    <tbody>-->
    <slot></slot>
<!--    </tbody>-->
  </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export  default  {
  props: {
    action:{
      type: Boolean,
      default: true,
    },

  }
}
</script>
