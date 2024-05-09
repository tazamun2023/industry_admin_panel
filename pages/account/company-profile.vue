<template>

<!--    <div>
      <div class="card p-4" v-show="errors.length">
        <ul
          class="error-list mb-15"
        >
          <li
            class="mb-10"
          >
            {{ $t('forgotPassword.errorOccurred') }}
          </li>
          <li
            v-for="(value, index) in errors"
            :key="index"
          >
            {{ value }}
          </li>
        </ul>
      </div>
    </div>-->

  <div class="p-3" v-if="$can('edit_company')">
    <h3 class="py-2 text-[35px] text-black uppercase semi-bold">Company Profiles</h3>
    <ValidationObserver class="w-full card p-4" v-slot="{ invalid }">
    <form class="grid grid-cols-12 gap-6" @submit.prevent="fromSubmit">
         <div class="col-span-2">
          <ul class="px-3 py-4 tab-bg w-[251px] h-[726px] border-t border-smooth rounded-t-3xl">
        <li class="cursor-pointer block  flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-4  block leading-normal" v-on:click="toggleTabs(1, invalid)" >
            <div class="flex items-center gap-2">
              <span  class="rounded-full  p-[7px] text-[16px] w-[40px] h-[40px]" v-bind:class="{' border-primary border-2 text-primary': openTab !== 1, 'border-2 border-theem bg-theem text-white': openTab === 1}">1</span>
              <div class="ltr:text-start rtl:text-end">
                <span class="block">STEP 1</span>
              <span class="font-10px" v-bind:class="{'text-primary': openTab !== 1, 'text-theem': openTab === 1}">GENERAL INFO</span>
              </div>
            </div>
          </a>
        </li>
        <li class="cursor-pointer  block flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-4  block leading-normal" v-on:click="toggleTabs(2, invalid)">
            <div class="flex items-center gap-2">
              <span   class="rounded-full p-[7px] text-[16px] w-[40px] h-[40px]"  v-bind:class="{' border-primary border-2 text-primary': openTab !== 2, 'border-2 border-theem bg-theem text-white': openTab === 2}">2</span>
              <div class="ltr:text-start rtl:text-end">
                <span class="block">STEP 2</span>
              <span class="font-10px" v-bind:class="{'text-primary': openTab !== 2, 'text-theem': openTab === 2}">PRIMARY INFO</span>
              </div>
            </div>
          </a>
        </li>
        <li class="cursor-pointer  block flex-auto text-center" >
          <a class="text-xs font-bold  uppercase px-5 py-4  block leading-normal" v-on:click="toggleTabs(3, invalid)">
            <div class="flex items-center gap-2">
              <span  class="rounded-full  p-[7px] text-[16px] w-[40px] h-[40px]" v-bind:class="{' border-primary border-2 text-primary': openTab !== 3, 'border-2 border-theem bg-theem text-white': openTab === 3}">3</span>
              <div class="ltr:text-start rtl:text-end">
                <span class="block">STEP 3</span>
              <span class="font-10px" v-bind:class="{'text-primary': openTab !== 3, 'text-theem': openTab === 3}">LOCATION INFO</span>
              </div>
            </div>
          </a>
        </li>

        <li class="cursor-pointer  block flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-4  block leading-normal" v-on:click="toggleTabs(4, invalid)">
            <div class="flex items-center gap-2">
              <span class="rounded-full  p-[7px] text-[16px] w-[40px] h-[40px]"  v-bind:class="{' border-primary border-2 text-primary': openTab !== 4, 'border-2 border-theem bg-theem text-white': openTab === 4}">4</span>
              <div class="ltr:text-start rtl:text-end">
                <span class="block">STEP 4</span>
              <span class="font-10px" v-bind:class="{'text-primary': openTab !== 4, 'text-theem': openTab === 4}">SOCIAL INFO</span>
              </div>
            </div>
          </a>
        </li>

      </ul>

         </div>
      <div class="w-full col-span-10 px-[40px]">
        <div class="tab-content input-wrapper tab-space">

            <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
              <div class="p-4">
          <div class="title pb-4">
            <h4 class="uppercase text-primary text-[30px] font-bold">General Information</h4>
            <p class="text-normal">Please, provide company name, details, sub domain,
email, mobile, and CR number </p>
          </div>

          <div class="form-group">
            <lang-input :hasError="hasError" type="text" :title="$t('global.name')" :valuesOfLang="fromData.name" :IsReadOnly="true"
                  @updateInput="updateInput">
                </lang-input>

           <lang-input :hasError="hasError" type="textarea" :title="$t('vendor.details')" :valuesOfLang="fromData.details"
                  @updateInput="updateInput"></lang-input>


            <div class="input-wrapper mb-2">
              <label class="semi-bold" for="">{{ $t('vendor.subdomain') }}</label>
              <input type="text" placeholder="Slug" v-model="fromData.subdomain" readonly>
            </div>

            <div class="input-wrapper  mb-2">
              <label for="">{{ $t("vendor.email") }}</label>
              <div class="flex">
                <div class="w-full">
                  <ValidationProvider name="email" class="w-full" rules="email|required" v-slot="{ errors }">
                  <input type="text" placeholder="Email" v-model="fromData.contact_json.email">
                    <span  class="error">{{ errors[0] }}</span>
                </ValidationProvider>
                </div>
              </div>

            </div>


            <div class="input-wrapper  mb-2">
              <label for="">{{ $t("vendor.mobile") }}</label>
              <div class="flex">
                <div class="w-full">
                  <ValidationProvider class="w-full" name="Mobile" rules="numeric|required|min:11" v-slot="{ errors }">
                   <input type="text" placeholder="Mobile" v-model="fromData.contact_json.mobile">
                    <span  class="error">{{ errors[0] }}</span>
                   </ValidationProvider>
                </div>
              </div>

            </div>

            <ValidationProvider name="CR Number" class="w-full" rules="numeric|required" v-slot="{ errors }">
            <div class="input-wrapper  mb-2">
              <label for="">{{ $t('vendor.cr_number') }}</label>
              <input type="text" placeholder="CR Number" v-model="fromData.crNumber" :class="{invalid: errors[0]}" readonly>
              <span  class="error">{{ errors[0] }}</span>
            </div>
            </ValidationProvider>

            <ValidationProvider name="status" class="w-full" rules="numeric|required" v-slot="{ errors }">
            <div class="input-wrapper  mb-2">
              <label for="">{{ $t('vendor.status') }}</label>
              <select class="border border-smooth w-100 p-2 rounded" v-model="fromData.status">
                <option value="1" :selected="fromData.status">Enable</option>
                <option value="0" :selected="fromData.status === 0">Disable</option>
              </select>
              <span  class="error">{{ errors[0] }}</span>
            </div>
            </ValidationProvider>
            <div class="text-right">
              <button v-on:click="toggleTabs(2)" :disabled="invalid"  class="p-1 px-4 bg-primary rounded leading-3  text-white "><span class="flex justify-between gap-2"><span>Next</span> <img class="w-3 h-3" src="~/assets/icon/arrow-white.svg"></span></button>
            </div>
          </div>

        </div>

        <!-- --------------- -->
              </div>
              <div v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}">
                <div class="p-4">
          <div class="title pb-4">
            <h4 class="uppercase text-primary text-[30px] font-bold">Primary Information</h4>
            <p class="text-normal">Please, provide company logo, licence, foundation date,
              production start date, email, mobile, and facility </p>
          </div>





          <div class="form-group">
            <div  class="input-wrapper   mb-2">
              <label for="">Logo Upload</label>
              <div class="flex gap-4">
             <div class="file-wrapper w-1/4 h-[232px]   upload-block">
              <div class="border-dashed border border-smooth rounded h-[232px]">
              <img v-if="getLogo?.length === 0" class="w-full h-[232px] !important rounded" src="http://127.0.0.1:8000/uploads/default-image.webp" />
              <img v-else class="w-full h-[232px] !important rounded" :src="getLogo" />
            </div>
             </div>


          <upload-files class="w-full" accept="image/*"  @updateInput="saveLogoAttachment"></upload-files>

          </div>
            </div>
            <div  class="input-wrapper mb-2">
             <!-- component -->
             <label for="">Licence Upload</label>
             <div class="flex gap-4">
              <div class="file-wrapper  w-1/4 h-[232px] upload-block">
              <div class="border-dashed border border-smooth rounded h-[232px]">
                <img v-if="getLicence?.length === 0" class="w-full h-[232px] !important rounded" src="http://127.0.0.1:8000/uploads/default-image.webp" />
                <img v-else-if="fileExt === 'pdf'" class="w-fullh-[232px] !important rounded" src="@/assets/images/pdf.jpg" />
                <img v-else class="w-full h-[232px] !important" :src="getLicence" />
            </div>
             </div>
              <upload-files class="w-full" accept=".pdf,image/*"  @updateInput="saveLicenceAttachment"></upload-files>
             </div>

            </div>
            <div class="input-wrapper mb-2">
              <label for="">{{ $t('vendor.foundation_date') }}</label>
              <input type="date"  v-model="fromData.founded_date">

            </div>
            <div class="input-wrapper mb-2">
              <label for="">{{ $t('vendor.production_start') }}</label>
              <input type="date"  v-model="fromData.production_start_date">
            </div>

            <div class="input-wrapper  mb-2">
              <label for="">{{ $t("vendor.primary_email") }}</label>
                <div class="w-full">
                  <ValidationProvider name="email" class="w-full" rules="email|required" v-slot="{ errors }">
                  <input type="text" placeholder="Email" v-model="fromData.primary_email">
                <span v-if="errors.length" class="error">
                  {{ $t('global.req', { type: $t('vendor.primary_email')}) }}
                </span>
                </ValidationProvider>
                </div>
            </div>

            <div class="input-wrapper  mb-2">
              <label for="">{{ $t("vendor.primary_mobile") }}</label>
                <div class="w-full">
                  <ValidationProvider class="w-full" name="Mobile" rules="numeric|required" v-slot="{ errors }">
                   <input type="text" placeholder="Mobile" v-model="fromData.primary_mobile">
                    <span v-if="errors.length" class="error">
                      {{ $t('global.req', { type: $t('vendor.primary_mobile')}) }}
                    </span>
                   </ValidationProvider>
                </div>
            </div>

            <ValidationProvider class="w-full" name="Facility" rules="required" v-slot="{ errors }">
            <div class="input-wrapper  mb-2">
              <label for="">{{ $t("vendor.facility") }}</label>
              <select class="border border-smooth w-100 p-2 rounded" v-model="fromData.facility_type_id" >
                <option value="1">Individual</option>
                <option value="2">Establishment</option>
              </select>
              <span  class="error">{{ errors[0] }}</span>
            </div>
            </ValidationProvider>
            <div class="flex justify-between">
              <button v-on:click="toggleTabs(1)" class="p-1 px-2 bg-white border border-primary rounded leading-3  text-primary "><span class="flex justify-between gap-2"><img class="w-3 h-3" src="~/assets/icon/arowgreen.svg"><span>Privious</span> </span></button>
              <button v-on:click="toggleTabs(3)" :disabled="invalid"   class="p-1 px-4 bg-primary rounded leading-3  text-white "><span class="flex justify-between gap-2"><span>Next</span> <img class="w-3 h-3" src="~/assets/icon/arrow-white.svg"></span></button>
            </div>
          </div>

        </div>
        <!-- --------------- -->
              </div>
              <div v-bind:class="{'hidden': openTab !== 3, 'block': openTab === 3}">
                <div class="p-4">
          <div class="title pb-4">
            <h4 class="uppercase text-primary  text-[30px] font-bold">Location Information</h4>
            <p class="text-normal">Please, provide country, city, area,
              street, building information</p>
          </div>
          <div class="form-group">
            <div class="grid grid-cols-2 gap-4">
              <ValidationProvider class="w-full" name="Country" rules="required" v-slot="{ errors }">
              <div class="input-wrapper  mb-2">
                <label for="">{{ $t("vendor.country") }}</label>
                <select class="border border-smooth w-100 p-2 rounded" v-model="fromData.country_id" :disabled="true">
                  <option value="">Choose Country </option>
                  <option :value="countryList.id" v-for="countryList in allCountries" :selected="countryList.id === fromData.country_id">{{ countryList.name }}</option>
                </select>
                <span  class="error">{{ errors[0] }}</span>
              </div>
              </ValidationProvider>


              <ValidationProvider class="w-full" name="City" rules="required" v-slot="{ errors }">
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

            <ValidationProvider class="w-full" name="Area" rules="required" v-slot="{ errors }">
            <div class="input-wrapper mb-2">
              <label for="">{{  $t("vendor.area") }}</label>
              <input type="text" placeholder="Area name" v-model="fromData.contact_json.area">
              <span  class="error">{{ errors[0] }}</span>
            </div>
            </ValidationProvider>

            <ValidationProvider class="w-full" name="Street" rules="required" v-slot="{ errors }">
            <div class="input-wrapper mb-2">
              <label for="">{{ $t('vendor.street') }}</label>
              <input type="text"  placeholder="Street name" v-model="fromData.contact_json.street">
              <span  class="error">{{ errors[0] }}</span>
            </div>
            </ValidationProvider>

            <ValidationProvider class="w-full" name="Building" rules="required|numeric" v-slot="{ errors }">
            <div class="input-wrapper  mb-2">
              <label for="">{{ $t('vendor.building') }}</label>
              <input type="text" placeholder="Building name" v-model="fromData.contact_json.building">
              <span  class="error">{{ errors[0] }}</span>
            </div>
            </ValidationProvider>
            <div class="flex justify-between mt-[200px]">
              <button v-on:click="toggleTabs(2)" class="p-1 px-2 bg-white border border-primary rounded leading-3  text-primary "><span class="flex justify-between gap-2"><img class="w-3 h-3" src="~/assets/icon/arowgreen.svg"><span>Privious</span> </span></button>
              <button v-on:click="toggleTabs(4)" :disabled="invalid"   class="p-1 px-4 bg-primary rounded leading-3  text-white "><span class="flex justify-between gap-2"><span>Next</span> <img class="w-3 h-3" src="~/assets/icon/arrow-white.svg"></span></button>
            </div>

          </div>

                  </div>
                <!-- --------------- -->
              </div>

              <div v-bind:class="{'hidden': openTab !== 4, 'block': openTab === 4}">
                <div class="p-4">
          <div class="title pb-4">
            <h4 class="uppercase text-primary text-[30px] font-bold">Social Information</h4>
            <p class="text-normal">Please, provide whatsapp, facebook, linkedin,
              and youtube</p>
          </div>
          <div class="form-group">
            <div class="input-wrapper  mb-2">
              <ValidationProvider class="w-full" name="whatsapp" :rules="{ regex: /((ftp|https?):\/\/)?(www\.)?[a-z0-9\-\.]{3,}\.[a-z]{3}$/ }" v-slot="{ errors }" :custom-messages="{regex: $t('vendor.notValidUrl')}">
              <label for="">{{ $t('vendor.whatsapp') }}</label>
              <input type="text" placeholder="http://" v-model="fromData.links_json.whatsapp">
                <span  class="error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="input-wrapper mb-2">
              <ValidationProvider class="w-full" name="facebook" :rules="{ regex: /((ftp|https?):\/\/)?(www\.)?[a-z0-9\-\.]{3,}\.[a-z]{3}$/ }" v-slot="{ errors }" :custom-messages="{regex: $t('vendor.notValidUrl')}">
              <label for="">{{ $t('vendor.facebook') }}</label>
              <input type="text" placeholder="http://" v-model="fromData.links_json.facebook">
                <span  class="error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="input-wrapper mb-2">
              <ValidationProvider class="w-full" name="linkedin" :rules="{ regex: /((ftp|https?):\/\/)?(www\.)?[a-z0-9\-\.]{3,}\.[a-z]{3}$/ }" v-slot="{ errors }" :custom-messages="{regex: $t('vendor.notValidUrl')}">
              <label for="">{{ $t('vendor.linkedin') }} </label>
              <input type="text" placeholder="http://" v-model="fromData.links_json.linkedin">
                <span  class="error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="input-wrapper  mb-2">
              <ValidationProvider class="w-full" name="youtube" :rules="{ regex: /((ftp|https?):\/\/)?(www\.)?[a-z0-9\-\.]{3,}\.[a-z]{3}$/ }" v-slot="{ errors }" :custom-messages="{regex: $t('vendor.notValidUrl')}">
              <label for="">{{ $t('vendor.youtube') }}</label>
              <input type="text" placeholder="http://" v-model="fromData.links_json.youtube">
                <span  class="error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="input-wrapper flex justify-between mt-[200px] text-end mb-2">
              <button v-on:click="toggleTabs(3)" class="p-1 px-2 bg-white border border-primary rounded leading-3  text-primary "><span class="flex justify-between gap-2"><img class="w-3 h-3" src="~/assets/icon/arowgreen.svg"><span>Privious</span> </span></button>
              <button @click="submit = true" :disabled="invalid" class="btn bg-primary hover:text-primary text-white border-secondary mt-20" ><span class="flex gap-2"> <span>Save</span> <img class="h-3 w-3 mt-[15px]" src="~/assets/icon/archive-add.svg" alt=""></span></button>
            </div>
          </div>
        </div>
              </div>

          </div>
      </div>
    </form>
    </ValidationObserver>

  </div>

</template>
<script>
import vendor from "@/mixin/vendor";
import {mapActions, mapGetters} from "vuex";
import {ValidationObserver, ValidationProvider} from 'vee-validate';
import Modal from '~/components/Modal.vue';
import LangInput from "../../components/langInput.vue";


export default {
  middleware: ['common-middleware', 'auth'],
  mixins:[vendor],
  name:"company-profile",
  components:{
    ValidationProvider,
    ValidationObserver,
    Modal,
    LangInput
  },
  data(){
    return {
      openTab: 1,
      phoneModal: false,
      emailModal: false,
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
           email:[''],
           mobile:[''],
         },

           links_json:{
             whatsapp:'',
             facebook:'',
             linkedin:'',
             youtube:'',
           },
         logo: [],
         licence:[]

       },
      getLogo:[],
      getLicence:[],
      errors:[],
      hasError:false,
      submit: false,
      fileExt:''
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

      this.getLogo = this.vendorList.data.logo
      this.getLicence = this.vendorList.data.licence

      //getExtension name
      this.fileExt = this.getLicence.split('.').pop();


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
    ...mapGetters('common', ['allCountries', 'allCitiesById']),
    checkNameValue(){
      if(this.fromData.name.ar.length == 0 || this.fromData.name.en.length == 0 || this.fromData.details.ar.length == 0 || this.fromData.details.en.length == 0){
        this.hasError = true
        return true
      }else{
        return false
      }
    },

  },
  methods:{
    ...mapActions('vendor', ['submitData', 'getVendorData']),
    ...mapActions('common', ['getAllCountries', 'getCitiesById']),

    saveLogoAttachment(logo) {
      this.fromData.logo = logo
    },
    saveLicenceAttachment(attachments) {
      this.fromData.licence = attachments
    },
    toggleTabs: function(tabNumber, invalid){
      if(!this.fromData.name.ar.length > 0){
        this.hasError = true
      }
        this.openTab = tabNumber


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

    closeModal() {
      this.emailModal = false;
      this.phoneModal = false;
    },

    updateInput(input, language, value) {
       this.$set(input, language, value);
     },
  },

 async mounted() {
    if(!this.fromData.id){
      this.fromData.id = this.profile?.vendor_id
    }
   try {
     await this.getVendorData({  id: this.fromData.id, params:'', api:'getVendorProfile'})

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

<style scoped>
.container-c{
    min-width: 650px;
    max-width: 1200px;
}
.g_info > span{
  width: 100%;
}
.file-wrapper .file-input img{
  /* height: 178px; */
  width:100%;
}
.tab-bg{
 background-image: url('~/assets/images/cbg.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 100% 100%;
}
.font-10px{
  font-size: 10px;
}
/* .top-100px{
  top:400px !important;
} */
label{
  font-weight: 600;
}
</style>
