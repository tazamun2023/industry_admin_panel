<template>
    <div class="card p-4">
        <div class="title mb-2">
            <h4>All Vendors List</h4>
        </div>
        <div>
            <div class="w-50 mb-4">
                <ul class="lg:flex mb-0 list-none rounded shadow flex-wrap mb-4 flex-row">
                <li class="-mb-px mr-2 last:mr-0   flex-auto text-center">
                <a class="font-bold uppercase px-2 py-1   block cursor-pointer leading-normal" v-on:click="toggleTabs(1)" v-bind:class="{'text-pink-600 bg-white border-white border-b-2': openTab !== 1, 'border-b-2 border-primary': openTab === 1}">
                   All
                </a>
                </li>
                <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a class="font-bold uppercase px-2 py-1   block cursor-pointer leading-normal" v-on:click="toggleTabs(2)" v-bind:class="{'text-pink-600 bg-white border-white border-b-2': openTab !== 2, 'border-b-2 border-primary': openTab === 2}">
                  Verified
                </a>
                </li>
                <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a class="font-bold uppercase px-2 py-1   block cursor-pointer leading-normal" v-on:click="toggleTabs(3)" v-bind:class="{'text-pink-600 bg-white border-white border-b-2': openTab !== 3, 'border-b-2 border-primary': openTab === 3}">
                    Not Verified
                </a>
                </li>

            </ul>
            </div>

            <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
                <template>
                 <vendor-all/>
                </template>

            </div>
            <div v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}">
                <template>
                    <vendor-approve />
                </template>
            </div>

            <div v-bind:class="{'hidden': openTab !== 3, 'block': openTab === 3}">
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
            openTab: 1,
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
    },
    },
 /* async mounted() {
     await this.getAllVendor({params:'', api:'getVendor'})
   }*/
}
</script>
