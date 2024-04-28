<template>
    <div class="tab-sidebar">
        <div class="title">
            <h4>Details of Vendor </h4>
        </div>
        <div class="grid grid-cols-12 p-4 gap-4">
            <div class="col-span-2">
                <ul class="mb-0 list-none">
                    <a class="font-bold  px-2 py-3   block cursor-pointer leading-normal" v-on:click="toggleTabs('profile')" v-bind:class="{'text-pink-600 bg-white border-white ltr:border-l-2 rtl:border-r-2': openTab !== 'profile', 'ltr:border-l-2 rtl:border-r-2 border-primary text-primary': openTab === 'profile'}">
                    Profile
                    </a>
                    <a class="font-bold  px-2 py-3   block cursor-pointer leading-normal" v-on:click="toggleTabs('users')" v-bind:class="{'text-pink-600 bg-white border-white ltr:border-l-2 rtl:border-r-2': openTab !== 'users', 'ltr:border-l-2 rtl:border-r-2 border-primary text-primary': openTab === 'users'}">
                        Users
                    </a>
                    <a class="font-bold  px-2 py-3   block cursor-pointer leading-normal" v-on:click="toggleTabs('products')" v-bind:class="{'text-pink-600 bg-white border-white ltr:border-l-2 rtl:border-r-2': openTab !== 'products', 'ltr:border-l-2 rtl:border-r-2 border-primary text-primary': openTab === 'products'}">
                        Products
                    </a>
                    <a class="font-bold  px-2 py-3   block cursor-pointer leading-normal" v-on:click="toggleTabs('address')" v-bind:class="{'text-pink-600 bg-white border-white ltr:border-l-2 rtl:border-r-2': openTab !== 'address', 'ltr:border-l-2 rtl:border-r-2 border-primary text-primary': openTab === 'address'}">
                        Address
                    </a>
                    <a class="font-bold  px-2 py-3   block cursor-pointer leading-normal" v-on:click="toggleTabs('banks')" v-bind:class="{'text-pink-600 bg-white border-white ltr:border-l-2 rtl:border-r-2': openTab !== 'banks', 'ltr:border-l-2 rtl:border-r-2 border-primary text-primary': openTab === 'banks'}">
                        Bank
                    </a>
                    <a class="font-bold  px-2 py-3   block cursor-pointer leading-normal" v-on:click="toggleTabs('content')" v-bind:class="{'text-pink-600 bg-white border-white ltr:border-l-2 rtl:border-r-2': openTab !== 'content', 'ltr:border-l-2 rtl:border-r-2 border-primary text-primary': openTab === 'content'}">
                        Content
                    </a>
                </ul>
            </div>
            <div class="col-span-10 ltr:border-l rtl:border-r border-smooth p-2 right-area">

               <div v-bind:class="{'hidden': openTab !== 'profile', 'block': openTab === 'profile'}">
                    <template>
                      <profile :vendor_id="$route.params.id" />
                  </template>
                </div>
                <div  v-if="openTab === 'users'" v-bind:class="{'hidden': openTab !== 'users', 'block': openTab === 'users'}">
                  <template>
                    <Users  :vendorId="$route.params.id"/>
                  </template>
                </div>
                <div v-if="openTab === 'products'" v-bind:class="{'hidden': openTab !== 'products', 'block': openTab === 'products'}">
                  <template>
<!--                     <Products :vendorId="$route.params.id"/>-->
                    <product-list api="getProducts"  :vendor-id="$route.params.id" :open-tab="`is_all_products`"></product-list>

                  </template>
                </div>
                <div  v-if="openTab === 'address'" v-bind:class="{'hidden': openTab !== 'address', 'block': openTab === 'address'}">
                    <template>
                     <Address :vendorId="$route.params.id"/>
                   </template>
                </div>
                <div v-if="openTab === 'banks'" v-bind:class="{'hidden': openTab !== 'banks', 'block': openTab === 'banks'}">
                    <template>
                      <Bank :vendorId="$route.params.id" />
                  </template>
                </div>
                <div  v-if="openTab === 'content'" v-bind:class="{'hidden': openTab !== 'content', 'block': openTab === 'content'}">
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
import ProductList from "../../components/product/product-list.vue";
export default{
  components:{ProductList, Bank, Content, Address, Products, Users, profile},
    data(){
        return{
            openTab:'profile',
            openContentTab: 'profile',
        }
    },
  mounted() {
    this.openTab=this.$route.query.tap??'profile'
  },
  methods:{
        toggleTabs: function(tabNumber){
       this.openTab = tabNumber
          this.$router.push({
            query: {
              ...this.$route.query,
              tap:this.openTab
              // filter: this.checkedFilter.join(','),
            }
          })
        },

    },



}
</script>
