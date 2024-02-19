<template>
  <div class="tab-sidebar">
        <div class="title">
            <h4>{{ $t('customer.Details of Customer') }}</h4>
        </div>
        <div class="grid grid-cols-12 p-4 gap-4">
            <div class="col-span-2">
                <ul class="mb-0 list-none">
                    <a class="font-bold  px-2 py-3 block cursor-pointer leading-normal" @click="toggleTabs('profile')" v-bind:class="{'text-pink-600 bg-white border-white ltr:border-l-2 rtl:border-r-2': openTab !== 'profile', 'ltr:border-l-2 rtl:border-r-2 border-primary text-primary': openTab === 'profile'}">
                    {{ $t('customer.Profile') }}
                    </a>
                    <a class="font-bold  px-2 py-3 block cursor-pointer leading-normal" @click="toggleTabs('user')" :class="{'text-pink-600 bg-white border-white ltr:border-l-2 rtl:border-r-2': openTab !== 'user', 'ltr:border-l-2 rtl:border-r-2 border-primary text-primary': openTab === 'user'}">
                      {{ $t('customer.Users') }}
                    </a>
                    <a class="font-bold  px-2 py-3 block cursor-pointer leading-normal" @click="toggleTabs('orders')" :class="{'text-pink-600 bg-white border-white ltr:border-l-2 rtl:border-r-2': openTab !== 'orders', 'ltr:border-l-2 rtl:border-r-2 border-primary text-primary': openTab === 'orders'}">
                      {{ $t('customer.Orders') }}
                    </a>
                    <a class="font-bold  px-2 py-3 block cursor-pointer leading-normal" @click="toggleTabs('address')" :class="{'text-pink-600 bg-white border-white ltr:border-l-2 rtl:border-r-2': openTab !== 'address', 'ltr:border-l-2 rtl:border-r-2 border-primary text-primary': openTab === 'address'}">
                        {{ $t('customer.Address') }}
                    </a>
                    <a class="font-bold  px-2 py-3 block cursor-pointer leading-normal" @click="toggleTabs('payment')" :class="{'text-pink-600 bg-white border-white ltr:border-l-2 rtl:border-r-2': openTab !== 'payment', 'ltr:border-l-2 rtl:border-r-2 border-primary text-primary': openTab === 'payment'}">
                        {{ $t('customer.Payment') }}
                    </a>
                </ul>
            </div>
            <div class="col-span-10 ltr:border-l rtl:border-r border-smooth p-2 right-area">

                <div :class="{'hidden': openTab !== 'profile', 'block': openTab === 'profile'}">
                   <customer-profile :customer_id="$route.params.id"></customer-profile>
                </div>
                <div :class="{'hidden': openTab !== 'user', 'block': openTab === 'user'}">
                    <customer-user :customer_id="$route.params.id"></customer-user>
                </div>
                <div :class="{'hidden': openTab !== 'orders', 'block': openTab === 'orders'}">
                    <customer-orders :customer_id="$route.params.id"></customer-orders>
                </div>
                <div :class="{'hidden': openTab !== 'address', 'block': openTab === 'address'}">
                    <customer-address :customer_id="$route.params.id"></customer-address>
                </div>
                <div :class="{'hidden': openTab !== 'payment', 'block': openTab === 'payment'}">
                  <customer-payment></customer-payment>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            openTab: 'profile',
        }
    },
    methods:{
        toggleTabs: function(tabNumber){
       this.openTab = tabNumber
        },
    }
}
</script>
