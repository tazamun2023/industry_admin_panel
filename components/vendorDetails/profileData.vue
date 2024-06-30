<template>
  <div>
    <section class="w-full ">
      <div class="px-4 ">
        <div class="grid gap-6 grid-cols-5">
          <div class="flex my-2 col-span-5 md:col-span-3 gap-4">
            <div class="w-[200px]">
              <lazy-image v-if="vendor?.logo" class="profile-image  mx-auto"
                          :lazySrc="vendor?.logo"
                          :datasrc="vendor?.logo"
                          alt=""/>
<!--              <img v-if="vendor?.logo" class="mt-2 rounded-lg mx-auto" :src="vendor?.logo" alt="">-->
              <img v-else class="mt-2 rounded-lg mx-auto" src="~/assets/uploads/default-image.webp" alt="">
              <!--                      <embed src="~/assets/pdf/my.pdf" width="1440px" height="900px" />-->
              <!-- <lazy-image
                class="w-[100px] h-[100px] mt-2 rounded-lg mx-auto"
                :data-src="image"
                :alt="tt"
              /> -->
            </div>
            <div>

              <h3 class="font-bold py-2 flex gap-4"><span>{{ vendor?.company_name }}</span>
                <img v-if="vendor.verified" class="w-6 h-6" src="~/assets/icon/SVG.svg" alt=""></h3>
<!--              <span class="p-1 bg-smooth text-theem rounded-lg">{{ vendor?.subdomain }}</span>-->
              <p class="font-16px pb-3" v-html="vendor?.local_details"></p>
              <span @click="approval(vendor.id,1)"  v-if="vendor.complete_percent==100 && vendor.verified==0 && $can('manage_users')" class="flex items-center gap-2 bg-theem text-white px-3 py-1 rounded-lg w-[150px] ">
                <img class="w-4 h-4" src="~/assets/icon/paperclip-2.svg" alt=""> {{ $t('vendor.verify')  }} </span>
            </div>
          </div>
          <div  class=" col-span-5 md:col-span-2">
            <p><span class="text-primary">{{ $t('vendor.cr_number') }} .</span> <span>{{ vendor?.crNumber }}</span></p>
            <p class="font-16px flex gap-4 py-2"><img class="w-5 h-5" src="~/assets/icon/smsgreen.svg" alt="">
              <span>{{ vendor?.primary_email }}</span></p>
            <p class="font-16px flex gap-4 py-2"><img class="w-5 h-5" src="~/assets/icon/callgreen.svg" alt=""> <span> {{
                vendor?.primary_mobile
              }} </span></p>
            <p class="font-16px flex gap-4 py-2"><img class="w-5 h-5" src="~/assets/icon/locationgreen.svg" alt="">
              <span> {{ vendor?.city_name }},  {{ vendor?.contact_json?.area }}, {{ vendor?.contact_json?.street }}</span></p>
            <p class="font-16px flex gap-4 py-2"><img class="w-5 h-5" src="~/assets/icon/calendar-g.svg" alt=""> <span>Foundation Date</span>
              <span class="text-theem">{{ vendor?.founded_date }}</span></p>
            <p class="font-16px flex gap-4 py-2"><img class="w-5 h-5" src="~/assets/icon/calendar-g.svg" alt=""> <span>Production Start Date</span>
              <span class="text-theem">{{ vendor?.production_start_date }}</span></p>
            <div class="flex gap-6 py-3">
              <div>
                <a target="_target" :href="vendor?.links_json['facebook']">
                  <img class="" src="~/assets/icon/FaceBook-g.svg" alt="">
                </a>
              </div>
              <div>
                <a  target="_target" :href="vendor?.links_json['youtube']">
                  <img class="" src="~/assets/icon/YouTube-g.svg" alt="">
                </a>

              </div>
              <div>
                <a  target="_target" :href="vendor?.links_json['linkedin']">
                  <img class="" src="~/assets/icon/Linkeding.svg" alt="">
                </a>

              </div>
              <div>
                <a  target="_target" :href="vendor?.links_json['whatsapp']">
                  <img class="" src="~/assets/icon/Whatsupg.svg" alt="">
                </a>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>


</template>
<script>
import LazyImage from "../LazyImage.vue";
import {mapActions} from "vuex";

export default {
  name: 'VendorProfileData',
  components: {LazyImage},
  data() {
    return {
    }
  },

  props: {
    vendor: {
      type: Object,
      required: true
    },
    show_licence: {
      type: Boolean,
      default: true
    }
  },
  methods:{
    ...mapActions('vendor', ['changeVendorStatus']),
    ...mapActions('common', ['swetAlertFire']),
    async approval(val, status) {
      // alert(val)
      // this.approvedModal = false
      const app = await this.swetAlertFire({
        params: {
          title: this.$i18n.t('vendor.verify') ,
          text: this.$i18n.t('vendor.verify_message'),
        }
      });

      if (app) {
        const data = await this.changeVendorStatus({
          params: {'vendor_id': this.vendor.id, 'verified': status},
          api: "ChangeVendorApproved"
        })

      }
    },
  }


}
</script>
