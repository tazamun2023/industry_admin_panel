<template>
    <div class="card p-4">
        <div class="title mb-2">
            <h4>All Vendors List</h4>
        </div>
        <div>
            <div class="w-full mb-4">
                <ul class="lg:flex mb-0 list-none rounded shadow flex-wrap mb-4 flex-row">
                <li class="-mb-px mr-2 last:mr-0   flex-auto text-center">
                <a class="font-bold uppercase px-2 py-1   block cursor-pointer leading-normal" 
                v-on:click="toggleTabs('all')" v-bind:class="{'text-pink-600 bg-white border-white border-b-2': openTab !== 'all', 'border-b-2 border-primary': openTab === 'all'}">
                  {{ $t('vendor.all') }}
                </a>
                </li>
                <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a class="font-bold uppercase px-2 py-1   block cursor-pointer leading-normal" v-on:click="toggleTabs('verified')" v-bind:class="{'text-pink-600 bg-white border-white border-b-2': openTab !== 'verified', 'border-b-2 border-primary': openTab === 'verified'}">
                  {{ $t('vendor.verified') }}
                </a>
                </li>
                <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a class="font-bold uppercase px-2 py-1   block cursor-pointer leading-normal" v-on:click="toggleTabs('not_verified')" v-bind:class="{'text-pink-600 bg-white border-white border-b-2': openTab !== 'not_verified', 'border-b-2 border-primary': openTab === 'not_verified'}">
                  {{ $t('vendor.not_verified') }}
                </a>
                </li>

            </ul>
            </div>

            <div v-if="openTab === 'all'" v-bind:class="{'hidden': openTab !== 'all', 'block': openTab === 'all'}">
                <template>
                 <vendor-all/>
                </template>
            </div>
            <div v-if="openTab === 'verified'" v-bind:class="{'hidden': openTab !== 'verified', 'block': openTab === 'verified'}">
                <template>
                    <vendor-approve />
                </template>
            </div>

            <div v-if="openTab === 'not_verified'" v-bind:class="{'hidden': openTab !== 'not_verified', 'block': openTab === 'not_verified'}">
                <template>
                  <vendor-not-verified />
                </template>
            </div>
        </div>

    </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ListPage from "@/components/partials/ListPage.vue";
import ProductFilter from "@/components/product/filter.vue";
import util from "@/mixin/util";
import bulkDelete from "@/mixin/bulkDelete";
import vendorFilter from "@/components/vendor/vendorFilter.vue";
import vendorApprove from "@/components/vendor/vendorApprove.vue";
import vendorNotVerified from "@/components/vendor/vendorNotVerified.vue";

export default{
  mixins: [util, bulkDelete],
  components: {ProductFilter, ListPage, vendorFilter, vendorApprove, vendorNotVerified},
    data(){
        return {
            searcBydateInput:false,
            openTab: 'all',
        }
    },
  computed:{
     ...mapGetters('vendor', ['vendorList'])
  },
    methods:{
      ...mapActions('vendor', ['getAllVendor']),

        SearchDate(index){
         this.searcBydateInput = index;
        },

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
   mounted() {
     this.openTab = this.$route.query.tap??'all'
   }
}
</script>
