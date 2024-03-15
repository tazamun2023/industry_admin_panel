<template>
  <table class="min-w-full text-left text-sm font-light">
    <thead class=" font-medium ">
    <tr>
      <th scope="col" class="p-2 w-[50px]">#</th>
      <th scope="col" class="p-2">{{$t('order.product')}}</th>
      <th scope="col" class="p-2">{{$t('order.quantity')}}</th>
      <th scope="col" class="p-2">{{$t('order.agreedPrice')}}</th>
      <th scope="col" class="p-2">{{$t('order.subtotal')}}</th>
      <th scope="col" class="p-2">{{$t('order.action')}}</th>
    </tr>
    </thead>
    <tbody>
    <slot></slot>
    </tbody>
  </table>
</template>
