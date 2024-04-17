<template >
  <div class="fixed bg-modal  inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <div class="z-50 bg-white p-6 relative rounded-md shadow w-full md:w-1/2 lg:w-2/3 xl:w-2/5">
      <slot></slot>
      <!-- Modal Content -->
      <div class="mb-4">
        <h4>Add Address</h4>
        <div>
          <ValidationObserver  v-slot="{ invalid }">
            <form @submit.prevent="addressAction">
              <ValidationProvider name="Address Name" class="w-full" rules="required" v-slot="{ errors }"
              
              :custom-messages="{required: `Enter Your ${$t('address.address_name')}`}">
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
              <div class="flex justify-end gap-4">
                <button type="button" @click.prevent="$emit('close')" class="btn bg-smooth hover:text-primary  border-secondary mt-20">Cancel</button>
                <button class="btn bg-primary hover:text-primary text-white border-secondary mt-20" :disabled="invalid">Save Change</button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import address from "@/mixin/address";
import {ValidationObserver, ValidationProvider} from "vee-validate";

export default{
  components: { ValidationObserver, ValidationProvider },
  props:['address'],
  mixins: [address],

  data(){
    return{
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
    }
  },
  computed:{
    ...mapGetters('admin', ['profile']),
    ...mapGetters('address', ['addressList']),
    ...mapGetters('common', ['phoneCode', 'allCountries', 'allCitiesById']),
  },
  watch:{

  },
  methods:{
    ...mapActions('address', ['userAddressAction', 'getVendorAddress', 'userAddressDelete', 'updateAddress']),
    ...mapActions('ui', ["setToastMessage", "setToastError"]),
    ...mapActions('common', ['getCitiesById', 'getAllCountries', 'getPhoneCode']),
    selectdTypeAdddress(type) {
     this.addressData.type= type;
    },
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

    clearForm() {
      this.addressData = {
        id: '',
        email: '',
        name: '',
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
        default:0,
        phone_code:''
      }
    },
    closeAddressModel(){
      this.$emit('close')
      this.addressData = {}
    },
  },
  async mounted() {
    // this.clearForm();
    try {
      this.loading = true
      await  this.getAllAddress();
      await this.getPhoneCode();
      await this.getAllCountries({
       api:'getAllCountries',
       mutation:'SET_ALL_COUNTRIES',
            });
      this.loading = false
    } catch (e) {
      return this.$nuxt.error(e)
    }
    this.addressData.country_id = this.vendorCountryId = this.profile.country_id;
    if(this.address){
      this.addressData = {...this.addressData, ...this.address}
      this.addressData.city_id = this.address.city_id;
      this.addressData.country_id = this.address.country_id;
      this.addressData.building_number = this.address.building_number;
      this.addressData.default= this.address.default ? 1 : 0;
      this.countrySelected(this.address.city_id);
    } else {
      this.addressData.country_id = this.profile.country_id;
      this.addressData.default=0;
      this.countrySelected(this.addressData.city_id);
    }


  }
}
</script>
