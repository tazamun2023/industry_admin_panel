<template>
  <div>
    <div>
      <list-page
        ref="listPage"
        list-api="getApprovalVendor"
        route-name="vendors"
        empty-store-variable="allProducts"
        :name="$t('title.prod')"
        @list="itemList = $event"
      >
        <template
          v-slot:table-top="{orderOptions}"
        >
          <vendor-filter @filter="searchFilterData" />

        </template>
        <template v-slot:table="{list}">
          <div class="table-wrapper">
            <table>
              <thead>
              <tr>
                <th>{{ $t('vendor.sl') }}</th>
                <th>{{ $t('vendor.logo') }}</th>
                <th>{{ $t('vendor.company_name') }}</th>
                <th>{{ $t('vendor.email') }}</th>
                <th>{{ $t('vendor.primary_mobile') }}</th>
                <th>{{ $t('vendor.foundation_date') }}</th>
                <th>{{ $t('vendor.production_start') }}</th>
                <th>{{ $t('vendor.location') }}</th>
                <th>{{ $t('vendor.number_product') }}</th>
                <th>{{ $t('vendor.verify') }}</th>
                <th>{{ $t('vendor.status') }}</th>
                <th>{{ $t('vendor.action') }}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(value, index) in list" :key="index">
                <td>{{ index+1 }}</td>
                <td><a class="text-primary" href=""><img :src="value.logo" alt=""></a></td>
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
                  <span v-if="value.verified">{{ $t('util.verify') }}</span>
                  <span v-else>{{ $t('util.notVerify') }}</span>
                </td>
                <td
                  class="status"
                  :class="{ active: value.status == 1 }"
                >
                  <span v-if="value.status">{{ $t('util.active') }}</span>
                  <span v-else>{{ $t('util.deactive') }}</span>
                </td>
                <td>
                  <div class="flex gap-4">
                    <button
                   @click.prevent="$refs.listPage.editItem(value.id)" class="border-0"><edit-button-icon/></button>
                   <button class="leading-4 text-[12px] w-[93px]" @click="approval(value.id)" > Un-Verified</button>
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
                        <h4>Are you want to UnVerified?</h4>
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
import EditButtonIcon from '../partials/EditButtonIcon.vue';

export default {
  name : "vendorApprove",
  components: {ListPage,EditButtonIcon},
  mixins: [util, bulkDelete],
  data(){
    return {
      visibleAction:null,
      approvedModal:false
    }
  },
  computed:{
    ...mapGetters('language', ['langCode'])
  },
  methods:{
    ...mapActions('vendor', ['changeVendorStatus']),
    ...mapActions('ui', ["setToastMessage", "setToastError"]),
    ...mapActions('common', ['swetAlertFire']),
    async  approval(id){
      // this.approvedModal = false
      const app = await this.swetAlertFire({
        params: {
          title: this.$i18n.t('approvedModal.sure'),
          text: this.$i18n.t('approvedModal.revert'),
        }
      });

      if (app) {
        const data =  await this.changeVendorStatus({params:{'vendor_id': id, 'verified': 0}, api:"ChangeVendorApproved"})
      if (data.status == 200){
        this.setToastMessage(data.message)
      }else{
        this.setToastError(data.data.form.join(', '))
      }
      }
     
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

    toggleAction(index){
      this.visibleAction = this.visibleAction === index ? null : index;
    },
  }
}
</script>
