<template>
  <div>

  <ValidationObserver v-slot="{ invalid }">
    <form @submit.prevent="fromSubmit">
      <div class="grid grid-cols-2 container-c mx-auto gap-4">
        <div class="card p-4">
          <div class="title">
            <h4>General Information</h4>
          </div>

          <div class="form-group">
            <lang-input :hasError="hasError" type="text" :title="$t('global.name')" :valuesOfLang="fromData.name"
                  @updateInput="updateInput">
                </lang-input>
            <lang-input :hasError="hasError" type="textarea" :title="$t('vendor.details')" :valuesOfLang="fromData.details"
                  @updateInput="updateInput"></lang-input>
            <!-- <ValidationProvider class="w-full" name="Name Arabic" rules="max:30|required" v-slot="{ errors }" :custom-messages="{required: $t('global.req', { type: $t('global.name')})}">
              <div class="input-wrapper mb-2">
                <label for="">{{ $t('global.name') }}</label>
                <input type="text" v-model="fromData.name.ar" >
                <span  class="error">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <ValidationProvider class="w-full"  name="Name English" rules="max:30|required" v-slot="{ errors }" :custom-messages="{required: $t('global.req', { type: $t('global.name')})}">
              <div class="input-wrapper mb-2">
                <label for="">{{ $t('global.name') }}</label>
                <input type="text" v-model="fromData.name.en" >
                <span  class="error">{{ errors[0] }}</span>
              </div>
            </ValidationProvider> -->
<!--
            <ValidationProvider class="w-full"  name="Details English" rules="max:30|required" v-slot="{ errors }" :custom-messages="{required: $t('global.req', { type: $t('vendor.details')})}">
              <div class="input-wrapper mb-2">
                <label for="">{{ $t("vendor.details") }}</label>
                <input type="text" placeholder="Details English" v-model="fromData.details.en">
                <span  class="error">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>


            <ValidationProvider class="w-full"  name="Details Arabic" rules="max:30|required" v-slot="{ errors }" :custom-messages="{required: $t('global.req', { type: $t('vendor.details')})}">
              <div class="input-wrapper mb-2">
                <label for="">{{ $t("vendor.details") }}</label>
                <input type="text" placeholder="Details Arabic" v-model="fromData.details.ar">
                <span  class="error">{{ errors[0] }}</span>
              </div>
            </ValidationProvider> -->


            <div class="input-wrapper mb-2">
              <label for="">{{ $t('vendor.subdomain') }}</label>
              <input type="text" placeholder="Slug" v-model="fromData.subdomain" readonly>
            </div>

            <ValidationProvider class="w-full"  name="email" rules="email|required" v-slot="{ errors }" :custom-messages="{required: $t('global.req', { type: $t('vendor.email')})}">
              <div class="input-wrapper  mb-2">
                <label for="">{{ $t('vendor.email') }} 1</label>
                <input type="text" :placeholder="$t('vendor.email')" v-model="fromData.contact_json.email" >
                <span  class="error">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <ValidationProvider class="w-full"  name="email" rules="email|required" v-slot="{ errors }" :custom-messages="{required: $t('global.req', { type: $t('vendor.email')})}">
              <div class="input-wrapper  mb-2">
                <label for="">{{ $t('vendor.email') }} 2</label>
                <input type="text" :placeholder="$t('vendor.email')" v-model="fromData.contact_json.email" >
                <span  class="error">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <ValidationProvider class="w-full"  name="email" rules="numeric|required" v-slot="{ errors }" :custom-messages="{required: $t('global.req', { type: $t('vendor.mobile')})}">
              <div class="input-wrapper  mb-2">
                <label for="">{{ $t('vendor.mobile') }} 1</label>
                <input type="text" :placeholder="$t('vendor.mobile')" v-model="fromData.contact_json.mobile">
                <span  class="error">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <ValidationProvider class="w-full"  name="email" rules="numeric|required" v-slot="{ errors }" :custom-messages="{required: $t('global.req', { type: $t('vendor.mobile')})}">
              <div class="input-wrapper  mb-2">
                <label for="">{{ $t('vendor.mobile') }} 2</label>
                <input type="text" :placeholder="$t('vendor.mobile')" v-model="fromData.contact_json.mobile">
                <span  class="error">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <ValidationProvider class="w-full"  name="email" rules="numeric|required" v-slot="{ errors }" :custom-messages="{required: $t('global.req', { type: $t('vendor.cr_number')})}">
              <div class="input-wrapper  mb-2">
                <label for="">{{ $t('vendor.cr_number') }}</label>
                <input type="text" placeholder="CR Number" v-model="fromData.crNumber">
                <span  class="error">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <ValidationProvider class="w-full"  name="email" rules="numeric|required" v-slot="{ errors }" :custom-messages="{required: $t('global.req', { type: $t('vendor.status')})}">
              <div class="input-wrapper  mb-2">
                <label for="">{{ $t('vendor.status') }}</label>
                <select class="border border-smooth w-100 p-2 rounded" v-model="fromData.status">
                  <option value="1" :selected="fromData.status">Enable</option>
                  <option value="0" :selected="fromData.status === 0">Disable</option>
                </select>
                <span  class="error">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </div>
        </div>
        <!-- --------------- -->
        <div class="card p-4">
          <div class="title">
            <h4>Primary Information</h4>
          </div>
          <div class="form-group p-2">
            <div  class="input-wrapper mb-2">
             <!-- component -->
             <div class="flex gap-4 mb-4">
              <label for="">Logo Upload</label>
              <div class="file-wrapper logo-upload upload-block">
              <div class="file-input mt-20">
                <img v-if="fromData.logo?.length === 0" class="w-full h-[181px] !important" src="http://127.0.0.1:8000/uploads/default-image.webp" />
                <img v-else class="w-full h-[181px] !important" :src="fromData.logo" />
            </div>
             </div>
             </div>
          <!-- <div class="flex w-full items-center justify-center bg-grey-lighter">
              <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-primary rounded-lg shadow-lg tracking-wide uppercase border border-smooth cursor-pointer hover:bg-primary hover:text-white">
                  <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span class="mt-2 text-base leading-normal">Select a file</span>
                  <input type='file' class="hidden" />
              </label>
          </div> -->
            </div>
            <div  class="input-wrapper mb-2">
             <!-- component -->
             <div class="flex gap-4 mb-4 justify-between">
              <label for="">Licence Upload</label>
             <button class="border border-smooth p-2 leading-3">
               <a
                 href="#"
                 @click.prevent="
                  downloadItem({
                    url: fromData.licence,
                    label: 'licence.pdf',
                  })
                "
               >
                 Download Licences
               </a>
             </button>
             </div>



            </div>
            <div class="input-wrapper mb-2">
              <label for="">{{ $t('vendor.foundation_date') }}</label>
              <input type="date"  v-model="fromData.founded_date" readonly>

            </div>
            <div class="input-wrapper mb-2">
              <label for="">{{ $t('vendor.production_start') }}</label>
              <input type="date"  v-model="fromData.production_start_date"  readonly>
            </div>

            <ValidationProvider class="w-full"  name="email" rules="email|required" v-slot="{ errors }" :custom-messages="{required: $t('global.req', { type: $t('vendor.email')})}">
              <div class="input-wrapper  mb-2">
                <label for="">{{ $t("vendor.primary_email") }}</label>
                <input type="text" placeholder="Email" v-model="fromData.primary_email">
                <span  class="error">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <ValidationProvider class="w-full"  name="Mobile" rules="numeric|required" v-slot="{ errors }" :custom-messages="{required: $t('global.req', { type: $t('vendor.primary_mobile')})}">
              <div class="input-wrapper  mb-2">
                <label for="">{{ $t("vendor.primary_mobile") }}</label>
                <input type="text" placeholder="Mobile" v-model="fromData.primary_mobile">
                <span  class="error">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>


            <ValidationProvider class="w-full"  name="Facility" rules="required" v-slot="{ errors }" :custom-messages="{required: $t('global.req', { type: $t('vendor.facility')})}">
              <div class="input-wrapper  mb-2">
                <label for="">{{ $t("vendor.facility") }}</label>
                <select class="border border-smooth w-100 p-2 rounded" v-model="fromData.facility_type_id" >
                  <option value="1">Individual</option>
                  <option value="2">Establishment</option>
                </select>
                <span  class="error">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

          </div>
        </div>
        <!-- --------------- -->
        <div class="card p-4">
          <div class="title">
            <h4>Location Information</h4>
          </div>
          <div class="form-group">
            <div class="grid grid-cols-2 gap-4">
              <ValidationProvider class="w-full" name="Country" rules="required" v-slot="{ errors }" :custom-messages="{required: $t('global.req', { type: $t('vendor.country')})}">
                <div class="input-wrapper  mb-2">
                  <label for="">{{ $t("vendor.country") }}</label>
                  <select class="border border-smooth w-100 p-2 rounded" v-model="fromData.country_id" :disabled="true">
                    <option value="">Choose Country </option>
                    <option :value="countryList.id" v-for="countryList in allCountries" :selected="countryList.id === fromData.country_id">{{ countryList.name }}</option>
                  </select>
                  <span  class="error">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>


              <ValidationProvider class="w-full" name="City" rules="required" v-slot="{ errors }" :custom-messages="{required: $t('global.req', { type: $t('vendor.city')})}">
                <div class="input-wrapper  mb-2">
                  <label for="">{{ $t("vendor.city") }}</label>
                  <select class="border border-smooth w-100 p-2 rounded" v-model="fromData.city_id">
                    <option value="">Choose City </option>
                    <option :value="cityList.id" v-for="cityList in allCitiesById" :selected="cityList.id === fromData.city_id">{{ cityList.name }}</option>
                  </select>
                  <span  class="error">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </div>

            <ValidationProvider class="w-full" name="Area" rules="required" v-slot="{ errors }" :custom-messages="{required: $t('global.req', { type: $t('vendor.area')})}">
              <div class="input-wrapper mb-2">
                <label for="">{{  $t("vendor.area") }}</label>
                <input type="text" placeholder="Area name" v-model="fromData.contact_json.area">
                <span  class="error">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <ValidationProvider class="w-full" name="Street" rules="required" v-slot="{ errors }" :custom-messages="{required: $t('global.req', { type: $t('vendor.street')})}">
              <div class="input-wrapper mb-2">
                <label for="">{{ $t('vendor.street') }}</label>
                <input type="text"  placeholder="Street name" v-model="fromData.contact_json.street">
                <span  class="error">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <ValidationProvider class="w-full" name="Building" rules="required" v-slot="{ errors }" :custom-messages="{required: $t('global.req', { type: $t('vendor.building')})}">
              <div class="input-wrapper  mb-2">
                <label for="">{{ $t('vendor.building') }}</label>
                <input type="text" placeholder="Building name" v-model="fromData.contact_json.building">
                <span  class="error">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>


          </div>
        </div>
        <!-- --------------- -->
        <div class="card p-4">
          <div class="title">
            <h4>Social Information</h4>
          </div>
          <div class="form-group">
            <div class="input-wrapper  mb-2">
              <label for="">{{ $t('vendor.whatsapp') }}</label>
              <input type="url" placeholder="Whatsapp number" v-model="fromData.links_json.whatsapp">
            </div>
            <div class="input-wrapper mb-2">
              <label for="">{{ $t('vendor.facebook') }}</label>
              <input type="url" placeholder="http://" v-model="fromData.links_json.facebook">
            </div>
            <div class="input-wrapper mb-2">
              <label for="">{{ $t('vendor.linkedin') }} </label>
              <input type="url" placeholder="http://" v-model="fromData.links_json.linkedin">
            </div>
            <div class="input-wrapper  mb-2">
              <label for="">{{ $t('vendor.youtube') }}</label>
              <input type="url" placeholder="http://" v-model="fromData.links_json.youtube">
            </div>
            <div class="input-wrapper text-end mb-2">
              <button class="btn bg-primary hover:text-primary text-white border-secondary mt-20" :disabled="invalid">Save Change</button>
            </div>
          </div>
        </div>

      </div>
    </form>
  </ValidationObserver>
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
       hasError:false
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
    ...mapActions('vendor', ['submitData', 'getVendorData']),
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
      await this.getVendorData({  id: this.vendor_id, params:'', api:'getVendor'})

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
