<template>
  <div>
    <div>
      <list-page
        :filter="false"
        ref="listPage"
        list-api="getNotApprovalVendor"
        route-name="vendors"
        empty-store-variable="allProducts"
        :name="$t('title.prod')"
        @list="itemList = $event"
      >
        <template v-slot:table="{list}">
          <div class="table-wrapper">
            <table>
              <thead>
              <tr>
                <th><input type="checkbox" name="" id=""></th>
                <th>Sl</th>
                <th>Logo</th>
                <th>Company Name</th>
                <th>Email</th>
                <th>Primary Phone</th>
                <th>Foundation Date</th>
                <th>Production Date</th>
                <th>Location</th>
                <th>Number of Products</th>
                <th>Approved</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(value, index) in list" :key="index">

                <td><input type="checkbox" name="" id=""></td>
                <td>1</td>
                <td><a class="text-primary" href=""><img src="https://cfn-catalog-prod.tradeling.com/up/6329c4504efabf903adf35b1/960590de34aa9587df59041183754f83.jpg" alt=""></a></td>
                <td>
                  <a class="text-primary" v-if="langCode === 'ar'"  href="">{{ value.name.ar }}</a>
                  <a class="text-primary" v-else  href="">{{ value.name.en }}</a>
                </td>
                <td>{{ value.primary_email }}</td>
                <td>{{ value.primary_mobile }}</td>
                <td>{{ value.founded_date }}</td>
                <td>{{ value.production_start_date }}</td>
                <td>{{ value.city_name }}</td>
                <td>{{ value.total_product }}</td>

                <td
                  class="status"
                  :class="{active: value.verified == 1 }"
                >
                  <span>{{ VendorApproval(value.verified) }}</span>
                </td>
                <td
                  class="status"
                  :class="{active: value.status == 1 }"
                >
                  <span>{{ VendorStatus(value.status) }}</span>
                </td>
                <td>
                  <div class="flex gap-4">
                    <svg @click="approvedModal=true" class="w-4 h-4 cursor-pointer text-warning" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm9-3a1.5 1.5 0 0 1 2.5 1.1 1.4 1.4 0 0 1-1.5 1.5 1 1 0 0 0-1 1V14a1 1 0 1 0 2 0v-.5a3.4 3.4 0 0 0 2.5-3.3 3.5 3.5 0 0 0-7-.3 1 1 0 0 0 2 .1c0-.4.2-.7.5-1Zm1 7a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z" clip-rule="evenodd"/>
                    </svg>
                    <nuxt-link to="/vendors/1" >
                      <svg class="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                        <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                      </svg>
                    </nuxt-link>


                  </div>
                </td>
                <!-- ------------------approved modal---------------------- -->
                <template v-if="approvedModal">
                  <div  class="fixed bg-modal  inset-0 z-50 flex items-center justify-center">
                    <div class="absolute inset-0 bg-black opacity-50"></div>
                    <div class="z-50 bg-white p-6 relative rounded-md shadow w-full md:w-1/2 lg:w-2/3 xl:w-1/5">
                      <svg @click="approvedModal=false" class="w-4 h-4 text-gray-800 absolute ltr:right-3  rtl:left-3 cursor-pointer mt-[-10px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                      <!-- Modal Content -->
                      <div class="mb-4">
                        <h4>Are you want to Aprroved?</h4>
                      </div>
                      <!-- Close Button -->
                      <div class="flex justify-end gap-4">
                        <button @click="approvedModal = false" class="p-2 border text-center rounded border-primary w-[50px] leading-3">No</button>
                        <button @click="approval(value.id)" class="p-2 border border-primary bg-primary text-center rounded text-white w-[50px] leading-3">Yes</button>
                      </div>

                    </div>
                  </div>
                </template>
                <!-- ------------------approved modal end---------------------- -->
              </tr>

              </tbody>
            </table>
          </div>
        </template>

      </list-page>
    </div>

  </div>
</template>
<script >
import ListPage from "@/components/partials/ListPage.vue";
import util from "@/mixin/util";
import bulkDelete from "@/mixin/bulkDelete";
import {mapActions, mapGetters} from "vuex";
import Service from "@/services/service";


export default {
  name : "vendorNotVerified",
  components: {ListPage},
  mixins: [util, bulkDelete],
  data(){
    return {
      approvedModal:false

    }
  },
  computed:{
       ...mapGetters('language', ['langCode']),

  },
  methods:{
    ...mapActions('vendor', ['changeVendorStatus']),
  async  approval(val){
      this.approvedModal = false
   const data =  await this.changeVendorStatus({params:{'vendor_id': val, 'status': 1}, api:"ChangeVendorApproved"})
    this.$router.go(0)
    },
    searchFilterData(search){
      this.$router.push({
        query: {
          ...this.$route.query,
          page: 1,
          orderBy: 'created_at',
          orderByType: 'desc',
          ...search
        }
      })
    },
  }
}
</script>
