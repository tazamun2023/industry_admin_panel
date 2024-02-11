<template>
    <div class="tab-sidebar">
        <div class="title">
            <h4>Details of Vendor</h4>
        </div>
        <div class="grid grid-cols-12 p-4 gap-4">
            <div class="col-span-2">
                <ul class="mb-0 list-none">
                    <a class="font-bold  px-2 py-3   block cursor-pointer leading-normal" v-on:click="toggleTabs(1)" v-bind:class="{'text-pink-600 bg-white border-white ltr:border-l-2 rtl:border-r-2': openTab !== 1, 'ltr:border-l-2 rtl:border-r-2 border-primary text-primary': openTab === 1}">
                    Profile
                    </a>
                    <a class="font-bold  px-2 py-3   block cursor-pointer leading-normal" v-on:click="toggleTabs(2)" v-bind:class="{'text-pink-600 bg-white border-white ltr:border-l-2 rtl:border-r-2': openTab !== 2, 'ltr:border-l-2 rtl:border-r-2 border-primary text-primary': openTab === 2}">
                        Users
                    </a>
                    <a class="font-bold  px-2 py-3   block cursor-pointer leading-normal" v-on:click="toggleTabs(3)" v-bind:class="{'text-pink-600 bg-white border-white ltr:border-l-2 rtl:border-r-2': openTab !== 3, 'ltr:border-l-2 rtl:border-r-2 border-primary text-primary': openTab === 3}">
                        Products
                    </a>
                    <a class="font-bold  px-2 py-3   block cursor-pointer leading-normal" v-on:click="toggleTabs(4)" v-bind:class="{'text-pink-600 bg-white border-white ltr:border-l-2 rtl:border-r-2': openTab !== 4, 'ltr:border-l-2 rtl:border-r-2 border-primary text-primary': openTab === 4}">
                        Address
                    </a>
                    <a class="font-bold  px-2 py-3   block cursor-pointer leading-normal" v-on:click="toggleTabs(5)" v-bind:class="{'text-pink-600 bg-white border-white ltr:border-l-2 rtl:border-r-2': openTab !== 5, 'ltr:border-l-2 rtl:border-r-2 border-primary text-primary': openTab === 5}">
                        Bank
                    </a>
                    <a class="font-bold  px-2 py-3   block cursor-pointer leading-normal" v-on:click="toggleTabs(6)" v-bind:class="{'text-pink-600 bg-white border-white ltr:border-l-2 rtl:border-r-2': openTab !== 6, 'ltr:border-l-2 rtl:border-r-2 border-primary text-primary': openTab === 6}">
                        Content
                    </a>
                </ul>
            </div>
            <div class="col-span-10 ltr:border-l rtl:border-r border-smooth p-2 right-area">

                <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
                    <template>
                      <profile :vendor_id="$route.params.id" />
                  </template>
                </div>
                <div v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}">
                  <template>
                    <Users />
                  </template>
                </div>
                <div v-bind:class="{'hidden': openTab !== 3, 'block': openTab === 3}">
                  <template>
                     <Products />
                  </template>
                </div>
                <div v-bind:class="{'hidden': openTab !== 4, 'block': openTab === 4}">
                    <template>
                     <Address />
                   </template>
                </div>
                <div v-bind:class="{'hidden': openTab !== 5, 'block': openTab === 5}">
                    <template>
                      <Bank :vendorId="$route.params.id" />
                  </template>
                </div>
                <div v-bind:class="{'hidden': openTab !== 6, 'block': openTab === 6}">
                  <template>
                       <Content />
                  </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import profile from "@/components/vendorDetails/profile.vue";
import Users from "@/components/vendorDetails/users.vue";
import Products from "@/components/vendorDetails/products.vue";
import Address from "@/components/vendorDetails/address.vue";
import Content from "@/components/vendorDetails/content.vue";
import Bank from "@/components/vendorDetails/bank.vue";
export default{
  components:{Bank, Content, Address, Products, Users, profile},
    data(){
        return{
            openTab:1,
            openContentTab: 1,
        }
    },
    methods:{
        toggleTabs: function(tabNumber){
       this.openTab = tabNumber
        },

    },


}
</script>
