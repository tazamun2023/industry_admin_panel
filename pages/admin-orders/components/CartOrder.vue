<template>
  <div class="my-4 card p-4">
    <div class="flex gap-4 justify-between">
      <div class="flex gap-4 w-3/4 justify-between">
        <div>
          <p class="text-smoothlight">{{ $t('address.order') }}</p>
          <p class="font-medium text-[14px]">{{ order?.order_id }}</p>
        </div>
        <div>
          <p  class="text-smoothlight">{{ $t('setting.od') }}</p>
          <p class="font-medium  text-[14px]">{{ order?.created_at }}</p>
        </div>
        <div>
          <p  class="text-smoothlight">{{ $t('order.paymentMethod') }}</p>
          <p class="font-medium flex gap-4 items-center capitalize text-[14px]"><img class="h-5 w-5" src="~/assets/icon/bank.svg">
            {{$t(`paymentMethod.${order?.payment_method}`)}}</p>
        </div>
        <div>
          <p class="text-smoothlight">{{ $t('order.status') }}</p>
          <p class="font-medium text-primary"><span class="bg-primarylight  text-[14px] capitalize  px-2 rounded-3xl"> {{ order?.status }}</span></p>
        </div>
        <div>
          <p class="text-smoothlight">{{ $t('order.payment') }}</p>
          <p class="font-medium text-theem"><span class="bg-theemlight  text-[14px] capitalize px-2 rounded-3xl">{{order?.payment_status}}</span></p>
        </div>
      </div>
      <div class="flex gap-4">
        <div>
          <p>{{ $t('order.total') }}</p>
          <price-with-curency-format :price="order?.total" ></price-with-curency-format>
        </div>
      </div>
    </div>
    <div class="my-3 flex gap-4 justify-between">
      <div class="flex gap-4">
        <LazyImage
          v-for="(item,index) in order.sub_order_items"
          :key="index"
          :data-src="item.product.image"
          :title="item.product.title"
          :alt="item.product.title"
          class="w-10 h-10 shadow p-1 rounded"
        />
<!--        <img class="w-10 h-10 shadow p-1 rounded" src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/6329c4504efabf903adf35b1/22c16b848350c059205ae09040a27a81.jpg" alt="">-->
      </div>
      <div>
        <div class="flex items-center gap-8">
        <slot></slot>
          <a class="border-2 border-theem px-2 cursor-pointer py-3.5 rounded-lg  text-white bg-theem  leading-3 uppercase font-bold"
           @click="$router.push('admin-orders/'+order.order_id)"
          >
            {{$t('order.ViewOrder')}}
          </a>
        </div>
      </div>
    </div>

  </div>
</template>
<script >
import LazyImage from "../../../components/LazyImage.vue";

export  default {
  components: {LazyImage},
 props:['order'],

  middleware: ['common-middleware', 'auth'],
}
</script>
