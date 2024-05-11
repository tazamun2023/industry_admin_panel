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
                      <h3 class="font-bold py-2 flex gap-4"><span> Company Name  </span> <img class="w-6 h-6" src="~/assets/icon/SVG.svg" alt=""></h3>
                      <span class="p-1 bg-smooth text-theem rounded-lg">subDomain Name</span>
                      <p class="font-16px pb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore </p>
                      <span class="flex items-center gap-2 bg-theem text-white px-3 py-1 rounded-lg w-[150px] mt-[50px]"><img class="w-4 h-4" src="~/assets/icon/paperclip-2.svg" alt=""> Show Licence</span>
                    </div>
                </div>
                <div class="col-span-2">
                  <p><span class="text-primary">CR No.</span> <span>123456789</span></p>
                  <p  class="font-16px flex gap-4 py-2"><img class="w-5 h-5" src="~/assets/icon/smsgreen.svg" alt=""> <span> example@email.com </span></p>
                  <p  class="font-16px flex gap-4 py-2"><img class="w-5 h-5" src="~/assets/icon/callgreen.svg" alt=""> <span> +966 55555555 </span></p>
                  <p  class="font-16px flex gap-4 py-2"><img class="w-5 h-5" src="~/assets/icon/locationgreen.svg" alt=""> <span> jeddah,Soudi Arabia</span></p>
                  <p  class="font-16px flex gap-4 py-2"><img class="w-5 h-5" src="~/assets/icon/calendar-g.svg" alt=""> <span>Foundation Date</span> <span class="text-theem">29 Fab 2024</span></p>
                  <p  class="font-16px flex gap-4 py-2"><img class="w-5 h-5" src="~/assets/icon/calendar-g.svg" alt=""> <span>Production Start Date</span> <span class="text-theem">29 Fab 2024</span></p>
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
         id:'',
         name: {'ar':'', 'en':''},
         details:{'ar':'', 'en':''},
         subdomain:'',
         crNumber:'',
         status:'',
         founded_date:'',
         production_start_date:'',
         primary_email:'',
         primary_mobile:'',
         facility_type_id:'',
         country_id:'',
         city_id:'',
         contact_json:{
           area:'',
           street:'',
           building:'',
           email:[],
           mobile:[],
         },

         links_json:{
           whatsapp:'',
           facebook:'',
           linkedin:'',
           youtube:'',
         },
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
      vendorList(){
        this.fromData.name.ar = this.vendorList?.data.name.ar
        this.fromData.name.en = this.vendorList?.data.name.en
        this.fromData.details.ar = this.vendorList?.data.details.ar
        this.fromData.details.en = this.vendorList?.data.details.en
        this.fromData.subdomain = this.vendorList?.data.subdomain
        this.fromData.crNumber = this.vendorList?.data.crNumber
        this.fromData.status = this.vendorList?.data.status
        this.fromData.founded_date = this.vendorList?.data.founded_date
        this.fromData.production_start_date = this.vendorList.data.production_start_date
        this.fromData.primary_email = this.vendorList.data.primary_email
        this.fromData.primary_mobile = this.vendorList.data.primary_mobile
        this.fromData.facility_type_id = this.vendorList.data.facility_type_id
        this.fromData.country_id = this.vendorList.data.country_id
        this.fromData.city_id = this.vendorList.data.city_id
        this.fromData.logo = this.vendorList.data.logo
        this.fromData.licence = this.vendorList.data.licence
        this.fromData.contact_json.area = this.vendorList.data.contact_json.area
        this.fromData.contact_json.street = this.vendorList.data.contact_json.street
        this.fromData.contact_json.building = this.vendorList.data.contact_json.building
        this.fromData.contact_json.email = this.vendorList.data.contact_json.email
        this.fromData.contact_json.mobile = this.vendorList.data.contact_json.mobile
        this.fromData.links_json.whatsapp = this.vendorList.data.links_json.whatsapp
        this.fromData.links_json.facebook = this.vendorList.data.links_json.facebook
        this.fromData.links_json.linkedin = this.vendorList.data.links_json.linkedin
        this.fromData.links_json.youtube = this.vendorList.data.links_json.youtube

      }
    },
  computed:{
    ...mapGetters('admin', ['profile']),
    ...mapGetters('vendor', ['vendorList']),
    ...mapGetters('common', ['allCountries', 'allCitiesById'])

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
      let countryId = this.fromData.country_id;
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
    if(!this.fromData.id){
      this.fromData.id = this.vendor_id
    }
    try {
      await this.getAdminVendorData({ id: this.vendor_id, params:'', api:'getVendor'})

      await this.getAllCountries({api: 'getAllCountries', mutation: 'SET_ALL_COUNTRIES'}).then(()=>{
        this.fromData.country_id= this.vendorList.data.country_id
        this.countrySelected()
      })
    } catch (e) {
      return this.$nuxt.error(e)
    }
  }
}
</script>
