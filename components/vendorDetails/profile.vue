<template>
  <div>
    <section>
          <div class="px-4">
            <div class="grid gap-6 grid-cols-5">
                <div class="flex col-span-3 gap-4">
                    <div class="w-[200px]">
<!--                      <img class="w-[100px] h-[100px] mt-2 rounded-lg mx-auto" :src="vendorInfo.vendor?.image" alt="">-->
                      <img class="mt-2 rounded-lg mx-auto" src="~/assets/icon/blogo.svg" alt="">
                      <!-- <lazy-image
                        class="w-[100px] h-[100px] mt-2 rounded-lg mx-auto"
                        :data-src="image"
                        :alt="tt"
                      /> -->
                    </div>
                    <div>

                      <h3 class="font-bold py-2 flex gap-4"><span>{{ vendorList?.name[currentLanguage.code] }}</span> <img class="w-6 h-6" src="~/assets/icon/SVG.svg" alt=""></h3>
                      <span class="p-1 bg-smooth text-theem rounded-lg">{{ vendorList?.subdomain }}</span>
                      <p class="font-16px pb-3" v-html="vendorList?.details[currentLanguage.code]"></p>
                      <span class="flex items-center gap-2 bg-theem text-white px-3 py-1 rounded-lg w-[150px] mt-[50px]"><img class="w-4 h-4" src="~/assets/icon/paperclip-2.svg" alt=""> Show Licence</span>
                    </div>
                </div>
                <div class="col-span-2">
                  <p><span class="text-primary">CR No.</span> <span>{{ vendorList?.crNumber }}</span></p>
                  <p  class="font-16px flex gap-4 py-2"><img class="w-5 h-5" src="~/assets/icon/smsgreen.svg" alt=""> <span>{{ vendorList?.primary_email }}</span></p>
                  <p  class="font-16px flex gap-4 py-2"><img class="w-5 h-5" src="~/assets/icon/callgreen.svg" alt=""> <span> {{ vendorList?.primary_mobile }} </span></p>
                  <p  class="font-16px flex gap-4 py-2"><img class="w-5 h-5" src="~/assets/icon/locationgreen.svg" alt=""> <span> jeddah,Soudi Arabia</span></p>
                  <p  class="font-16px flex gap-4 py-2"><img class="w-5 h-5" src="~/assets/icon/calendar-g.svg" alt=""> <span>Foundation Date</span> <span class="text-theem">{{ vendorList?.founded_date }}</span></p>
                  <p  class="font-16px flex gap-4 py-2"><img class="w-5 h-5" src="~/assets/icon/calendar-g.svg" alt=""> <span>Production Start Date</span> <span class="text-theem">{{ vendorList?.production_start_date }}</span></p>
                <div class="flex gap-6 py-3">
                  <div>
                    <img class="" src="~/assets/icon/FaceBook-g.svg" alt="">
                  </div>
                  <div>
                    <img class="" src="~/assets/icon/YouTube-g.svg" alt="">
                  </div>
                  <div>
                    <img class="" src="~/assets/icon/Linkeding.svg" alt="">
                  </div>
                  <div>
                    <img class="" src="~/assets/icon/Whatsupg.svg" alt="">
                  </div>
                </div>
                </div>
            </div>
          </div>
        </section>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import {ValidationObserver, ValidationProvider} from "vee-validate";
import LangInput from "../../components/langInput.vue";
import vendor from "@/mixin/vendor";
import axios from "axios";

export default {
  name:'profile',
  mixins:[vendor],
  components:{ValidationObserver, ValidationProvider,LangInput},
   data(){
     return {
       fromData:{
         logo:[],
         licence:[]
       },
       errors:[],
       hasError:false,
       submit: false
     }
   },
  props:{
        vendor_id:{
            type:String,
            required:true
        }
  },

    watch:{

    },
  computed:{
    ...mapGetters('admin', ['profile']),
    ...mapGetters('vendor', ['vendorList']),
    ...mapGetters('common', ['allCountries', 'allCitiesById']),
    ...mapGetters('language', ['currentLanguage'])

  },
  methods:{
    ...mapActions('vendor', ['submitData', 'getAdminVendorData']),
    ...mapActions('common', ['getAllCountries', 'getCitiesById']),

    async downloadItem({ url, label }) {
      const response = await axios.get(url, { responseType: "blob" });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = label;
      link.click();
      URL.revokeObjectURL(link.href);
    },

    async countrySelected() {
      let countryId = this.vendorList.country_id;
      if(countryId){
        try {
          await  this.getCitiesById({id: countryId,api: 'getAllCityById', mutation: 'SET_ALL_Cities' })
        } catch (e) {
          return this.$nuxt.error(e)
        }
      }
    },
    updateInput(input, language, value) {
      this.$set(input, language, value);
      },
  },

  async mounted() {

    try {
      await this.getAdminVendorData({ id: this.vendor_id, params:'', api:'getVendor'})

      await this.getAllCountries({api: 'getAllCountries', mutation: 'SET_ALL_COUNTRIES'}).then(()=>{
        this.countrySelected()
      })
    } catch (e) {
      return this.$nuxt.error(e)
    }
  }
}
</script>
