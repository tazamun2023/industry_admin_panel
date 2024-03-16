<template>
    <div>
        <div class="card p-4">
           <div class="flex justify-between">

                <div>
                    <h4 class="font-bold">My address</h4>
                    <p>Provide information on your billing address and where you would like your items to be picked up from. <br> We need your stock pickup location details in order to calculate accurate shipping rates.</p>
                </div>
                <div>
                    <button @click="addAddress" class="p-2 leading-3 rounded bg-primary text-white hover:text-primary">Add Address</button>
                </div>
           </div>
        </div>
        <div class="grid grid-cols-3 my-2 gap-4">
            <div v-for="(value, index) in addressList" :key="index" class="card p-4 my-2">
                <div class="flex gap-4 py-2 justify-between">
                    <h4>{{ value.address_name }}</h4>
                    <div class="flex gap-4">
                        <button class="p-2 leading-3 rounded bg-smooth  hover:text-warning" @click="deleteModal=true" >Remove</button>
                    <button class="p-2 leading-3 rounded bg-primary text-white hover:text-primary" @click="editAddress(value)">Edit</button>
                    </div>
                </div>
                <div class="flex gap-2">
                    <svg class="w-6 h-6 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.8 14h0a7 7 0 1 0-11.5 0h0l.1.3.3.3L12 21l5.1-6.2.6-.7.1-.2Z"/>
                            </svg>
                    <p>{{ value.city }}, {{ value.country }}, {{ value.street }}, {{ value.district }}, {{ value.zip }}</p>
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
                        <p>{{ value.city }}</p>
                    </div>
                    <div class="flex py-2 gap-2">
                        <svg class="w-6 h-6  text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21v-9m3-4H7.5a2.5 2.5 0 1 1 0-5c1.5 0 2.9 1.3 3.9 2.5M14 21v-9m-9 0h14v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8ZM4 8h16a1 1 0 0 1 1 1v3H3V9a1 1 0 0 1 1-1Zm12.2-5c-3 0-5.5 5-5.5 5h5.5a2.5 2.5 0 0 0 0-5Z"/>
                        </svg>
                        <p>{{ value.country }}</p>
                    </div>
                </div>
              <DeleteModal v-if="deleteModal" @closeModal="closeModal">
                <template v-slot:title>
                  <h4>{{ $t('vendor.deletemessage') }}</h4>
                </template>
                <!-- -----------default slot------- -->
                <!-- -----------default slot------- -->
                <template v-slot:buttons>
                  <div class="flex gap-4 justify-end">
                    <button @click="deleteModal=false" class="p-2 border border-smooth rounded leading-3 w-[60px]">Quit</button>
                    <button @click.prevent="deleting(value)" class="p-2 border border-smooth bg-primary text-white  rounded leading-3 w-[60px] hover:text-primary">Agree</button>
                  </div>
                </template>
              </DeleteModal>
            </div>
        </div>


        <!-- -----------------modal------------ -->
      <template v-if="addressmodal">
    <div class="fixed bg-modal  inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="z-50 bg-white p-6 relative rounded-md shadow w-full md:w-1/2 lg:w-2/3 xl:w-2/5">
        <svg @click.prevent="closeAddressModel" class="w-4 h-4 text-gray-800 absolute ltr:right-3  rtl:left-3 cursor-pointer mt-[-10px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
        <!-- Modal Content -->
        <div class="mb-4">
            <h4>Add Address</h4>
          <div>
          <ValidationObserver  v-slot="{ invalid }">
            <form @submit.prevent="addressAction">
              <ValidationProvider name="Address Name" class="w-full" rules="required" v-slot="{ errors }" :custom-messages="{required: `Enter Your ${$t('address.address_name')}`}">
                <div class="input-wrapper">
                    <label for="">{{ $t('address.address_name') }}*</label>
                    <input type="text" :placeholder="$t('address.address_name')" v-model="addressData.address_name">
                  <span  class="error">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>

                <div class="input-wrapper">
                  <label class="font-bold"  for="">{{ $t('address.type') }}*</label>
                  <div class="flex start my-4 gap-4">

                    <div class="border border-smooth rounded  cursor-pointer border-smoth p-2" :class="{'bg-primary': addressData.type === 'shipping'}" @click="shipping">
                      <p>Shipping</p>
                    </div>

                    <div class="border border-smooth rounded  cursor-pointer border-smoth p-2" :class="{'bg-primary': addressData.type === 'billing'}" @click="billing">
                      <p>Billing</p>
                    </div>

                    <div class="border  rounded border-smooth cursor-pointer p-2" :class="{'bg-primary': addressData.type === 'both'}" @click="both">
                      <p>Both</p>
                    </div>
                    <span
                      class="error"
                      v-if="hasError"
                    >
               {{ $t('address.isRequired', {type: $t('address.type') }) }}
            </span>
                  </div>
                </div>


                <div class="input-wrapper flex gap-4">
                  <ValidationProvider name="country" class="w-full" rules="required" v-slot="{ errors }" :custom-messages="{required: `Enter Your ${$t('address.country')}`}">
                    <div class="w-full input-wrapper">
                        <label class="w-full" for="">{{ $t('address.country') }}*</label>
                        <select class="p-2 border border-smooth rounded w-full" v-model="addressData.country_id" disabled>
                            <option value="">Select Country</option>
                            <option :value="country.id" v-for="country in allCountries" >{{ country.name }}</option>
                        </select>
                      <span  class="error">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider name="city" class="w-full" rules="required" v-slot="{ errors }" :custom-messages="{required: `Enter Your ${$t('address.city')}`}">
                    <div class="w-full input-wrapper">
                        <label class="w-full" for="">{{ $t('address.city') }}*</label>
                        <select class="p-2 border border-smooth rounded w-full" v-model="addressData.city_id">
                            <option value="">Select City</option>
                            <option :value="city.id" v-for="city in allCitiesById">{{ city.name }}</option>
                        </select>
                      <span  class="error">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                </div>
                <div class="flex gap-4">
                  <ValidationProvider name="email" class="w-full" rules="required" v-slot="{ errors }" :custom-messages="{required: `Enter Your ${$t('address.email')}`}">
                    <div class="input-wrapper w-full">
                      <label for="">{{ $t('address.email') }}*</label>
                      <input type="text" placeholder="Enter Email" v-model="addressData.email">
                      <span  class="error">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>

                  <ValidationProvider name="district" class="w-full" rules="required" v-slot="{ errors }" :custom-messages="{required: `Enter Your ${$t('address.district')}`}">
                    <div class="input-wrapper w-full">
                      <label for="">{{ $t('address.district') }}*</label>
                      <input type="text" placeholder="Enter district" v-model="addressData.district">
                      <span  class="error">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>

                  <ValidationProvider name="Building" class="w-full" rules="required|numeric" v-slot="{ errors }" :custom-messages="{required: `Enter Your ${$t('address.building_no')}`, numeric: 'Enter Number'}">
                    <div class="input-wrapper w-full">
                        <label for="">{{ $t('address.building_no') }}*</label>
                        <input type="text" placeholder="Enter Building/warehouse/office" v-model="addressData.building_number">
                      <span  class="error">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                </div>
                <div class="flex gap-4">
                  <ValidationProvider name="Street" class="w-full" rules="required" v-slot="{ errors }" :custom-messages="{required: `Enter Your ${$t('address.street')}`}">
                    <div class="input-wrapper w-full">
                        <label for="">{{ $t('address.street') }}*</label>
                        <input type="text" placeholder="Street name" v-model="addressData.street">
                      <span  class="error">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>

                    <div class="input-wrapper w-full">
                        <label for="">{{ $t('address.phone_code') }}*</label>
                       <div class="flex gap-2">
                         <ValidationProvider name="Phone Code" class="w-full" rules="required" v-slot="{ errors }" :custom-messages="{required: `Enter Your ${$t('address.phone_code')}`}">
                         <select class="p-2 border border-smooth rounded " v-model="addressData.phone_code">
                           <option value="">Select Phone Code</option>
                           <option :value="code.phonecode" v-for="code in phoneCode">
                             {{ code.phonecode }}
                           </option>
                         </select>
                         <span  class="error">{{ errors[0] }}</span>
                       </ValidationProvider>
                     <ValidationProvider name="phone" class="w-full" rules="required|numeric" v-slot="{ errors }" :custom-messages="{required: `Enter Your ${$t('address.phone')}`, numeric: 'Enter Number'}">
                         <input type="text" placeholder="Enter Address phone number" v-model="addressData.phone">
                         <span  class="error">{{ errors[0] }}</span>
                      </ValidationProvider>
                       </div>
                    </div>

                </div>
                <div class="flex gap-4">
                  <ValidationProvider name="post" class="w-full" rules="required|numeric" v-slot="{ errors }" :custom-messages="{required: `Enter Your ${$t('address.zipCode')}`, numeric: 'Enter Number'}">
                    <div class="input-wrapper w-full">
                        <label for="">{{ $t('address.zipCode') }}*</label>
                        <input type="text" placeholder="Enter Post code" v-model="addressData.zip">
                      <span  class="error">{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                </div>

                <div class="input-wrapper w-full">
                        <label for="">{{ $t('address.near') }}</label>
                        <input type="text" :placeholder="$t('address.near')" v-model="addressData.nearest_landmark">
                    </div>
              <ValidationProvider name="type" class="w-full" rules="" v-slot="{ errors }">
                <div class="input-wrapper w-full">
                   <div class="flex gap-1">
                    <input type="checkbox" v-model="addressData.default">
                    <label for="">{{ $t('address.set_default') }}</label>
                   </div>
                  <span  class="error">{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
              <!-- Close Button -->
              <div class="flex justify-end gap-4">
                <button  @click.prevent="closeAddressModel" class="btn bg-smooth hover:text-primary  border-secondary mt-20">Cancel</button>
                <button class="btn bg-primary hover:text-primary text-white border-secondary mt-20" :disabled="invalid">Save Change</button>
              </div>
            </form>
            </ValidationObserver>
          </div>
        </div>

      </div>
    </div>
  </template>
        <!-- -----------------modal end------------ -->
    </div>
</template>

<script>
import ListPage from "@/components/partials/ListPage.vue";
import {mapActions, mapGetters} from "vuex";
import {ValidationObserver, ValidationProvider} from "vee-validate";
import address from "@/mixin/address";
import DeleteModal from "@/components/DeleteModal.vue";

export default{
  components: {ListPage, ValidationObserver, ValidationProvider, DeleteModal },
  mixins:[address],
    data(){
        return{
          addressmodal:false,
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
              default:false,
              phone_code:''
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
   ...mapActions('common', ['getCitiesById', 'getAllCountries', 'getPhoneCode']),

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

   closeAddressModel(){
     this.addressmodal = false
     this.addressData = {}
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
