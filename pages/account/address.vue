<template>
       <check-validity :gate="'view_addresses'">
        <div class="card p-4">
           <div class="flex justify-between">

                <div>
                    <h4 class="font-bold">{{ $t('address.My address') }}</h4>
                    <p>{{ $t('address.Provide_information') }} <br>
                       {{ $t('address.Weneed') }}</p>
                </div>
                <div>
                    <button  v-if="$can('edit_addresses')" @click="addAddress" class="p-2 leading-3 rounded bg-primary text-white hover:text-primary">Add Address</button>
                </div>
           </div>
        </div>
        <div class="grid grid-cols-5 my-2 gap-4">
            <div v-for="(value, index) in addressList?.data" :key="index" class="card my-2">
              <div>
          <div class="bg-primary p-3 rounded-t-lg">
           <div class="truncate">
            <h3 class="text-white truncate capitalize">{{value.address_name}}</h3>
           </div>
            <div class="d-flex gap-2">
            <!-- <span v-show="value.is_default" class="bg-white shadow rounded-lg border border-smooth py-1 px-2 text-[11px] leading-3 text-theem capitalize">Default</span> -->
            <span class="bg-white shadow rounded-lg border border-smooth py-1 px-2 text-[11px] leading-3 text-theem capitalize">
              {{ value.type }}</span>
          </div>
          </div>
          <div class="flex gap-4 justify-between  p-3">
              <div class="flex items-start gap-1">
                <img class="w-4 h-4 mt-1" src="~/assets/icon/flag.svg" alt="">
                <div>
                  <p>{{ $t('address.country') }}</p>
                  <p class="font-bold capitalize text-primary">{{ value?.country }}</p>
                </div>
              </div>
              <div>
                  <p>{{ $t('address.city') }}</p>
                  <p class="font-bold capitalize text-primary">{{value?.street}}  {{ value?.district }}  {{ value?.zip }}</p>
                </div>
          </div>
          <div class="flex gap-4 justify-between  p-3">
              <div class="flex items-start gap-1">
                <img class="w-4 h-4 mt-1" src="~/assets/icon/phone-g.svg" alt="">
                <div>
                  <p>{{ $t('fSale.phone') }}.</p>
                  <p class="font-bold capitalize text-primary">{{value?.phone}}</p>
                </div>
              </div>

          </div>
          <div class="flex gap-4 justify-between  p-3">
              <div class="flex items-start gap-1">
                <img class="w-4 h-4 mt-1" src="~/assets/icon/locationgreen.svg" alt="">
                <div>
                  <p>{{ $t('address.near') }}</p>
                  <p class="font-bold capitalize text-primary">{{value?.nearest_landmark}}</p>
                </div>
              </div>
              <!-- <div v-show="!parseInt(value.default)">
                  <p class="text-primary">SET AS DEFAULT</p>
                  <div class="text-center">
                    <input type="checkbox" name="" id="">
                  </div>
                </div> -->
          </div>
          <div class="flex gap-4  p-3">
                        <button class="p-2 leading-3 rounded hover:border hover:border-smooth 
                         hover:text-warning flex items-center gap-3 text-error" @click="deleting(value)" >
                         <img class="w-4 h-4" src="~/assets/icon/trash.svg" alt=""> {{ $t('address.Remove')}}</button>
                    <button v-if="$can('edit_addresses')" class="p-2 leading-3 rounded bg-primary text-white
                     hover:text-primary flex items-center gap-3" @click="editAddress(value)"><img class="w-4 h-4" 
                     src="~/assets/icon/edit.svg" alt=""> {{ $t('address.Edit')}}</button>
          </div>
      </div>
                <!-- <div class="flex gap-4 py-2 justify-between">
                    <h4>{{ value?.address_name }}</h4>
                    <div class="flex gap-4">
                        <button class="p-2 leading-3 rounded bg-smooth  hover:text-warning" @click="deleteModal=true" >Remove</button>
                    <button v-if="$can('edit_addresses')" class="p-2 leading-3 rounded bg-primary text-white hover:text-primary" @click="editAddress(value)">Edit</button>
                    </div>
                </div>
                <div class="flex gap-2">
                    <svg class="w-6 h-6 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.8 14h0a7 7 0 1 0-11.5 0h0l.1.3.3.3L12 21l5.1-6.2.6-.7.1-.2Z"/>
                            </svg>
                    <p>{{ value.city }}, {{ value?.country }}, {{ value?.street }}, {{ value?.district }}, {{ value.zip }}</p>
                </div>
                <div class="flex gap-4  justify-between">
                    <div class="flex py-2 gap-2">
                        <svg class="w-5 h-5 mt-1  text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 4a2.6 2.6 0 0 0-2 .9 6.2 6.2 0 0 0-1.8 6 12 12 0 0 0 3.4 5.5 12 12 0 0 0 5.6 3.4 6.2 6.2 0 0 0 6.6-2.7 2.6 2.6 0 0 0-.7-3L18 12.9a2.7 2.7 0 0 0-3.8 0l-.6.6a.8.8 0 0 1-1.1 0l-1.9-1.8a.8.8 0 0 1 0-1.2l.6-.6a2.7 2.7 0 0 0 0-3.8L10 4.9A2.6 2.6 0 0 0 8 4Z"/>
                        </svg>
                        <p>{{ value.phone }}</p>
                    </div>
                    <div class="flex py-2 gap-2">
                        <svg class="w-6 h-6  text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 18-7 3 7-18 7 18-7-3Zm0 0v-5"/>
                        </svg>
                        <p>{{ value?.city }}</p>
                    </div>
                    <div class="flex py-2 gap-2">
                        <svg class="w-6 h-6  text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21v-9m3-4H7.5a2.5 2.5 0 1 1 0-5c1.5 0 2.9 1.3 3.9 2.5M14 21v-9m-9 0h14v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8ZM4 8h16a1 1 0 0 1 1 1v3H3V9a1 1 0 0 1 1-1Zm12.2-5c-3 0-5.5 5-5.5 5h5.5a2.5 2.5 0 0 0 0-5Z"/>
                        </svg>
                        <p>{{ value?.country }}</p>
                    </div>
                </div> -->
              <DeleteModal v-if="deleteModal" @closeModal="closeModal">
                <template v-slot:title>
                  <h4>{{ $t('vendor.deletemessage') }}</h4>
                </template>
                <!-- -----------default slot------- -->
                <!-- -----------default slot------- -->
                <template v-slot:buttons>
                  <div class="flex gap-4 justify-end">
                    <button @click="deleteModal=false" class="p-2 border border-smooth rounded leading-3 w-[60px]">
                      {{ $t('address.Quit')}}</button>
                    <button @click.prevent="deleting(value)" 
                    class="p-2 border border-smooth bg-primary text-white  rounded leading-3 w-[60px] hover:text-primary">
                    {{ $t('address.Agree')}}</button>
                  </div>
                </template>
              </DeleteModal>
            </div>
        </div>


        
        <!-- -----------------modal------------ -->
   
  <template v-if="addressmodal || confirmAddAddress">
    <div class="fixed bg-modal  inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="z-50 bg-white p-6 relative rounded-md shadow w-full md:w-1/2 lg:w-2/3 xl:w-2/5">
        <svg @click.prevent="closeAddressModel" class="w-4 h-4 text-gray-800 absolute ltr:right-3  rtl:left-3 cursor-pointer mt-[-10px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
        <div class="mb-4">
            <h4>{{ $t('address.Add Address')}}</h4>
          <div>
            <google-map v-if="addressmodal" @cancel="addressmodal = !addressmodal" :dataAddressUpdate="addressData"
            @confirm="confirmAddressAdd" />
            <AddAddressModel v-if="confirmAddAddress" :address="addressData" @close="closeAddressModel" />
      </div>
         </div>
        </div>
      </div>
     </template>
        <!-- -----------------modal end------------ -->
    </check-validity>
</template>

<script>
import ListPage from "@/components/partials/ListPage.vue";
import {mapActions, mapGetters} from "vuex";
import {ValidationObserver, ValidationProvider} from "vee-validate";
import address from "@/mixin/address";
import DeleteModal from "@/components/DeleteModal.vue";
import GoogleMap from '@/components/GoogleMap.vue';
import AddAddressModel from "@/components/AddAddressModel.vue";

export default{
  components: {ListPage, ValidationObserver, ValidationProvider,
     DeleteModal, GoogleMap,AddAddressModel },
  mixins:[address],
    data(){
        return{
          addressmodal:false,
          AddAddress: false,
      confirmAddAddress: false,
          addressData : {
              id: '',
              vendor_id:'',
              email: '',
              phone: '',
              country_id: '',
              city_id: '',
              zip: '',
              address_name:'',
              district:'',
              street:'',
            building_number:'',
              nearest_landmark:'',
              type:'',
              is_default:false,

              phone_code:'',
              lat:'',
              lng:''
          },
          hasError:false,
          vendorCountryId: '',
          deleteModal:false
        }
    },
  computed:{
    ...mapGetters('admin', ['profile']),
    ...mapGetters('address', ['addressList']),
    ...mapGetters('common', ['phoneCode', 'allCountries', 'allCitiesById']),
    ...mapGetters('language', ['langCode'])
  },
  watch:{

  },
 methods:{
   ...mapActions('address', ['userAddressAction', 'getVendorAddress', 'userAddressDelete', 'updateAddress']),
   ...mapActions('ui', ["setToastMessage", "setToastError"]),
   ...mapActions('common', ['getCitiesById', 'getAllCountries', 'getPhoneCode','swetAlertFire']),

   
   countrySelected() {
     this.addressData.city_id = ""
     try {
       this.getCitiesById({
         api: 'getAllCityById',
         mutation: 'SET_ALL_Cities',
         id: this.vendorCountryId
       })
     } catch (e) {
       return this.$nuxt.error(e)
     }

   },
   async getAllAddress(){
     await this.getVendorAddress({params:{'vendor_id': this.profile.id}, api:'getVendorAddress'})
   },
   
   closeAddressModel() {
      this.addressmodal = false
      this.confirmAddAddress = false
      this.addressData = {}
    },

   confirmAddressAdd(data) {
      this.addressData.lat = data.lat
      this.addressData.lng = data.lng
      this.addressData.address_name= data.address_name
      this.addressData.street= data.street
      this.confirmAddAddress = true
      this.addressmodal= false
    },

   closeModal(){
     this.deleteModal = false
   }

 },
  async mounted() {
    try {
      this.loading = true
      this.vendorCountryId = this.profile.country_id
      await  this.getAllAddress();
      // if (this.phoneCode.length == 0)
    await this.getPhoneCode()
    await this.getAllCountries({api: 'getAllCountries', mutation: 'SET_ALL_COUNTRIES'})
      .then(()=>{
         this.countrySelected()
      })
      this.loading = false
  } catch (e) {
    return this.$nuxt.error(e)
  }


  }


}
</script>
