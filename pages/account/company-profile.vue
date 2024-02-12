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

  <div>
    <ValidationObserver class="w-full" v-slot="{ invalid }">
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
              <!-- <ValidationProvider class="w-full" name="Name Arabic" rules="max:30|required" v-slot="{ errors }">
            <div class="input-wrapper w-full mb-2">
              <label for="">{{ $t('global.name') }}</label>
                <input class="w-full" type="text" v-model="fromData.name.ar" >
                <span v-if="errors.length" class="error">
                {{ $t('global.req', { type: $t('vendor.name')}) }}
              </span>
            </div>
              </ValidationProvider> -->


            <!-- <ValidationProvider name="Name English" class="w-full" rules="max:30|required" v-slot="{ errors }">
            <div class="input-wrapper w-full mb-2">
              <label for="">{{ $t('global.name') }}</label>
                <input type="text" v-model="fromData.name.en" >
              <span  class="error">{{ errors[0] }}</span>
            </div>
            </ValidationProvider> -->

            <!-- <ValidationProvider class="w-full"  name="Details English" rules="max:30|required" v-slot="{ errors }">
            <div class="input-wrapper mb-2">
              <label for="">{{ $t("vendor.details") }}</label>
              <textarea  placeholder="Details English" v-model="fromData.details.en" name="" id="" cols="3" rows="3"></textarea>
              <span v-if="errors.length" class="error">
                {{ $t('global.req', { type: $t('vendor.details')}) }}
              </span>
            </div>
            </ValidationProvider>


            <ValidationProvider name="Details Arabic" class="w-full" rules="max:30|required" v-slot="{ errors }">
              <div class="input-wrapper mb-2">
                <label for="">{{ $t("vendor.details") }}</label>
                <textarea placeholder="Details Arabic" v-model="fromData.details.ar" name="" id="" cols="3" rows="3"></textarea>
                <span v-if="errors.length" class="error">
                {{ $t('global.req', { type: $t('vendor.details')}) }}
              </span>
              </div>
            </ValidationProvider> -->


            <div class="input-wrapper mb-2">
              <label for="">{{ $t('vendor.subdomain') }}</label>
              <input type="text" placeholder="Slug" v-model="fromData.subdomain" readonly>
            </div>
<!--
            <ValidationProvider name="email" class="w-full" rules="email|required" v-slot="{ errors }">
            <div class="input-wrapper  mb-2">
              <label for="">{{ $t('vendor.email') }}</label>
                <input type="text" :placeholder="$t('vendor.email')" v-model="fromData.contact_json.email" >
              <span  class="error">{{ errors[0] }}</span>
            </div>
            </ValidationProvider>

            <ValidationProvider name="email" class="w-full" rules="numeric|required" v-slot="{ errors }">
            <div class="input-wrapper  mb-2">
              <label for="">{{ $t('vendor.mobile') }}</label>
              <input type="text" :placeholder="$t('vendor.mobile')" v-model="fromData.contact_json.mobile">
              <span  class="error">{{ errors[0] }}</span>
            </div>
            </ValidationProvider> -->
            <div class="input-wrapper  mb-2">
              <label for="">{{ $t("vendor.email") }}</label>
              <div class="flex">
                <div class="w-full">
                  <ValidationProvider name="email" class="w-full" rules="email|required" v-slot="{ errors }">
                  <input type="text" placeholder="Email" v-model="fromData.contact_json.email">
                <span v-if="errors.length" class="error">
                  {{ $t('global.req', { type: $t('vendor.email')}) }}
                </span>
                </ValidationProvider>
                </div>
                <div class="p-2">
                  <svg @click="emailModal=true" class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
              </svg>
                </div>
              </div>

            </div>



            <div class="input-wrapper  mb-2">
              <label for="">{{ $t("vendor.mobile") }}</label>
              <div class="flex">
                <div class="w-full">
                  <ValidationProvider class="w-full" name="Mobile" rules="numeric|required" v-slot="{ errors }">
                   <input type="text" placeholder="Mobile" v-model="fromData.contact_json.mobile">
                    <span v-if="errors.length" class="error">
                      {{ $t('global.req', { type: $t('vendor.mobile')}) }}
                    </span>
                   </ValidationProvider>
                </div>
                <div class="p-2">
                  <svg @click="phoneModal=true" class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
              </svg>
                </div>
              </div>

            </div>

            <ValidationProvider name="email" class="w-full" rules="numeric|required" v-slot="{ errors }">
            <div class="input-wrapper  mb-2">
              <label for="">{{ $t('vendor.cr_number') }}</label>
              <input type="text" placeholder="CR Number" v-model="fromData.crNumber">
              <span  class="error">{{ errors[0] }}</span>
            </div>
            </ValidationProvider>

            <ValidationProvider name="email" class="w-full" rules="numeric|required" v-slot="{ errors }">
            <div class="input-wrapper  mb-2">
              <label for="">{{ $t('vendor.status') }}</label>
              <select class="border border-smooth w-100 p-2 rounded" v-model="fromData.status">
                <option value="1">Enable</option>
                <option value="2">Disable</option>
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
          <div class="form-group">
            <div  class="input-wrapper   mb-2">
              <label for="">Logo Upload</label>
              <div class="flex gap-4">
             <div class="file-wrapper logo-upload upload-block">
              <div class="file-input mt-20">
              <img class="w-full h-[181px] !important" src="http://127.0.0.1:8000/uploads/default-image.webp" />
            </div>
             </div>
            
             
<!--              <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-primary rounded-lg shadow-lg tracking-wide uppercase border border-smooth cursor-pointer hover:bg-primary hover:text-white">
                  <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span class="mt-2 text-base leading-normal">Select a file</span>
                  <input type='file' class="hidden"  />
              </label>-->
          <upload-files  @updateInput="saveLogoAttachment"></upload-files>

          </div>
            </div>
            <div  class="input-wrapper mb-2">
             <!-- component -->
             <label for="">Licence Upload</label>
             <div class="flex gap-4">
              <div class="file-wrapper logo-upload upload-block">
              <div class="file-input mt-20">
              <img class="w-full h-[181px] !important" src="http://127.0.0.1:8000/uploads/default-image.webp" />
            </div>
             </div>
              <upload-files  @updateInput="saveLicenceAttachment"></upload-files>
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

          </div>
        </div>
        <!-- --------------- -->
        <div class="card p-4">
          <div class="title">
            <h4>Location Information</h4>
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

            <ValidationProvider class="w-full" name="Building" rules="required" v-slot="{ errors }">
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
    <Modal :showModal="emailModal" @closeModal="closeModal">
      <template v-slot:default>
      <section>
        <div class="flex gap-4">
          <h4>Add Primary Email</h4>
          <svg
            @click="addEmail"
              class="w-6 h-6 cursor-pointer"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
            </svg>
        </div>

        <div v-for="(email, index) in emails" :key="index" class="flex my-2">
          <input type="email" v-model="emails[index]">
          <div class="p-2 flex">
            <svg  @click="removeEmail(index)" class="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/>
          </svg>
            <svg
            @click="addEmail"
              class="w-6 h-6 cursor-pointer"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
            </svg>

          </div>
        </div>
      </section>
    </template>
    <template v-slot:buttons>
     <div class="flex gap-4 border-t border-smooth w-full pt-2 justify-end">
      <button  @click="emailModal = false" class="p-2 border border-primary leading-3">Cancell</button>
      <button class="p-2 border border-primary bg-primary text-white leading-3">Save Change</button>
     </div>
    </template>
   </Modal>
   <!-- -----------------primary mobile---------------- -->
   <Modal :showModal="phoneModal" @closeModal="closeModal">
      <section>
        <div class="flex gap-4">
          <h4>Add Primary Phone</h4>
          <svg
            @click="addPhone"
              class="w-6 h-6 cursor-pointer"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
            </svg>
        </div>

        <div v-for="(phone, index) in phones" :key="index" class="flex my-2">
          <input type="number" v-model="phones[index]">
          <div class="p-2 flex">
            <svg  @click="removePhone(index)" class="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/>
  </svg>
            <svg
            @click="addPhone"
              class="w-6 h-6 cursor-pointer"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
            </svg>

          </div>
        </div>
      </section>
      <template v-slot:buttons>
     <div class="flex gap-4 border-t border-smooth w-full pt-2 justify-end">
      <button @click="phoneModal = false" class="p-2 border border-primary leading-3">Cancell</button>
      <button class="p-2 border border-primary bg-primary text-white leading-3">Save Change</button>
     </div>
    </template>
   </Modal>
  </div>

</template>
<script>
import vendor from "@/mixin/vendor";
import {mapActions, mapGetters} from "vuex";
import {ValidationObserver, ValidationProvider} from 'vee-validate';
import { extend } from 'vee-validate';
import Modal from '~/components/Modal.vue';
import LangInput from "../../components/langInput.vue";

  extend('min', {
    validate(value, { length }) {
      return value.length >= length;
    },
    params: ['length'],
    message: 'The {_field_} field must have at least {length} characters'
  });



export default {

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
      emails:[''],
      phones:[''],
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
           email:[],
           mobile:[],
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
      errors:[],
      hasError:false
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

    saveLogoAttachment(logo) {
      this.fromData.logo = logo
    },
    saveLicenceAttachment(attachments) {
      this.fromData.licence = attachments
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
    addEmail() {
      // Add a new email input field
      this.emails.push('');
      // this.newEmail = ''; // Clear the value of the new email field
    },
    removeEmail(index) {
      // Remove the email input field at the specified index
      this.emails.splice(index, 1);
    },

    addPhone() {
      // Add a new email input field
      this.phones.push('');
      // this.newEmail = ''; // Clear the value of the new email field
    },
    removePhone(index) {
      // Remove the email input field at the specified index
      this.phones.splice(index, 1);
    },
    updateInput(input, language, value) {
       this.$set(input, language, value);
     },
  },

 async mounted() {
    if(!this.fromData.id){
      this.fromData.id = this.profile?.id
    }
   try {
     await this.getVendorData({  id: this.fromData.id, params:'', api:'getVendor'})

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

<style>
.container-c{
    min-width: 650px;
    max-width: 1200px;
}
.g_info > span{
  width: 100%;
}
.file-wrapper .file-input img{
  height: 178px;
  width:100%;
}
</style>
