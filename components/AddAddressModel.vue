<template>
  <custome-modal
    :title="` ${$t('address.Add Address') }  `"
    :show-modal="showModal"
    @close="closeAddressModel"
    size="lg">

    <div class="mx-2">
      <ValidationObserver v-slot="{ invalid }">
        <!-- Watch for changes in `invalid` and update `isInvalid` -->
        <template v-if="invalidWatcher(invalid)"></template>
        <form>
          <ValidationProvider name="Address Name" class="w-full" rules="required" v-slot="{ errors }"

                              :custom-messages="{required: `Enter Your ${$t('address.address_name')}`}">
            <div class="input-wrapper">
              <label for="">{{ $t('address.address_name') }}*</label>
              <input type="text" :placeholder="$t('address.address_name')" v-model="addressData.address_name">
              <span class="error">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <div class="input-wrapper  flex gap-5 items-center">
            <label class="font-bold" for="">{{ $t('address.type') }}*</label>
            <div class="flex start  gap-4">

              <div class="border border-smooth rounded  cursor-pointer border-smoth p-2" :class="{'bg-primary':
                    addressData.type === 'shipping'}" @click="addressData.type = 'shipping'">
                <p>{{ $t('address.Shipping') }}</p>
              </div>

              <div class="border border-smooth rounded  cursor-pointer border-smoth p-2"
                   :class="{'bg-primary': addressData.type === 'billing'}" @click="addressData.type ='billing'">
                <p>{{ $t('address.Billing') }}</p>
              </div>

              <div class="border  rounded border-smooth cursor-pointer p-2"
                   :class="{'bg-primary': addressData.type === 'both'}" @click="addressData.type ='both'">
                <p>{{ $t('address.Both') }}</p>
              </div>
              <span
                class="error"
                v-if="hasError"
              >
               {{ $t('address.isRequired', {type: $t('address.type')}) }}
            </span>
            </div>
          </div>


          <div class="input-wrapper flex gap-4">
            <ValidationProvider name="country" class="w-full" rules="required" v-slot="{ errors }"
                                :custom-messages="{required: `Enter Your ${$t('address.country')}`}">
              <div class="w-full input-wrapper">
                <label class="w-full" for="">{{ $t('address.country') }}*</label>
                <select class="p-2 border border-smooth rounded w-full" v-model="addressData.country_id" disabled>
                  <option value="">{{ $t('address.Select Country') }}</option>
                  <option :value="country.id" v-for="country in allCountries">{{ country.name }}</option>
                </select>
                <span class="error">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <ValidationProvider name="city" class="w-full" rules="required" v-slot="{ errors }"
                                :custom-messages="{required: `Enter Your ${$t('address.city')}`}">
              <div class="w-full input-wrapper">
                <label class="w-full" for="">{{ $t('address.city') }}*</label>
                <select class="p-2 border border-smooth rounded w-full" v-model="addressData.city_id">
                  <option value="">{{ $t('address.Select City') }}</option>
                  <option :value="city.id" v-for="city in allCitiesById">{{ city.name }}</option>
                </select>
                <span class="error">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </div>
          <div class="flex gap-4">
            <ValidationProvider name="email" class="w-full" rules="required" v-slot="{ errors }"
                                :custom-messages="{required: `Enter Your ${$t('address.email')}`}">
              <div class="input-wrapper w-full">
                <label for="">{{ $t('address.email') }}*</label>
                <input type="text" placeholder="Enter Email" v-model="addressData.email">
                <span class="error">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <ValidationProvider name="district" class="w-full" rules="required" v-slot="{ errors }"
                                :custom-messages="{required: `Enter Your ${$t('address.district')}`}">
              <div class="input-wrapper w-full">
                <label for="">{{ $t('address.district') }}*</label>
                <input type="text" placeholder="Enter district" v-model="addressData.district">
                <span class="error">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <ValidationProvider name="Building" class="w-full" rules="required|numeric" v-slot="{ errors }"
                                :custom-messages="{required: `Enter Your ${$t('address.building_no')}`, numeric: 'Enter Number'}">
              <div class="input-wrapper w-full">
                <label for="">{{ $t('address.building_no') }}*</label>
                <input type="text" placeholder="Enter Building/warehouse/office" v-model="addressData.building_number">
                <span class="error">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </div>
          <div class="flex gap-4">
            <ValidationProvider name="Street" class="w-full" rules="required" v-slot="{ errors }"
                                :custom-messages="{required: `Enter Your ${$t('address.street')}`}">
              <div class="input-wrapper w-full">
                <label for="">{{ $t('address.street') }}*</label>
                <input type="text" placeholder="Street name" v-model="addressData.street">
                <span class="error">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <div class="input-wrapper w-full">
              <label for="">{{ $t('address.phone_code') }}*</label>
              <div class="flex gap-2">
                <ValidationProvider tag="div" name="Phone Code" class="w-full phone-code" rules="required"
                                    v-slot="{ errors }"
                                    :custom-messages="{required: `Enter Your ${$t('address.phone_code')}`}">
                  <select class="p-2 border border-smooth rounded " v-model="addressData.phone_code" disabled>
                    <!-- <option :value="code.phonecode" v-for="code in phoneCode"  disabled > -->
                    <option>
                      {{ addressData.phone_code }}
                    </option>
                  </select>
                  <span class="error">{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider tag="div" name="phone" class="w-full" rules="required|numeric" v-slot="{ errors }"
                                    :custom-messages="{required: `Enter Your ${$t('address.phone')}`, numeric: 'Enter Number'}">
                  <input type="text" placeholder="Enter Address phone number" v-model="addressData.phone">
                  <span class="error">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>

          </div>
          <div class="flex gap-4">
            <ValidationProvider name="post" class="w-full" rules="required|numeric" v-slot="{ errors }"
                                :custom-messages="{required: `Enter Your ${$t('address.zipCode')}`, numeric: 'Enter Number'}">
              <div class="input-wrapper w-full">
                <label for="">{{ $t('address.zipCode') }}*</label>
                <input type="text" placeholder="Enter Post code" v-model="addressData.zip">
                <span class="error">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>


            <div class="input-wrapper w-full">
              <label for="">{{ $t('address.near') }}</label>
              <input type="text" :placeholder="$t('address.near')" v-model="addressData.nearest_landmark">
            </div>
          </div>
          <ValidationProvider name="type" class="w-full" rules="" v-slot="{ errors }">
            <div class="input-wrapper w-full">
              <div class="flex gap-1">
                <input type="checkbox" v-model="addressData.is_default">
                <label for="">{{ $t('address.set_default') }}</label>
              </div>
              <span class="error">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </form>
      </ValidationObserver>
    </div>
    <template v-slot:buttons>
      <button type="button" class="btn bg-primary hover:text-primary text-white border-secondary"
              @click="addressAction"
              :disabled="isInvalid">
        {{ $t('address.Save Change') }}
      </button>
    </template>

  </custome-modal>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import address from "@/mixin/address";
import {ValidationObserver, ValidationProvider} from "vee-validate";
import CustomeModal from "./CustomeModal.vue";

export default {
  components: {CustomeModal, ValidationObserver, ValidationProvider},
  props: ['address', 'showModal'],
  mixins: [address],

  data() {
    return {
      addressData: {
        id: '',
        vendor_id: '',
        email: '',
        phone: '',
        country_id: '',
        city_id: '',
        zip: '',
        address_name: '',
        district: '',
        street: '',
        building_number: '',
        nearest_landmark: '',
        type: '',
        is_default: '',
        default: '',
        phone_code: '966'
      },
      hasError: false,
      isInvalid: false,
      vendorCountryId: '',
    }
  },
  computed: {
    ...mapGetters('admin', ['profile']),
    ...mapGetters('address', ['addressList']),
    ...mapGetters('common', ['phoneCode', 'allCountries', 'allCitiesById']),
  },
  watch: {},
  methods: {
    ...mapActions('address', ['userAddressAction', 'getVendorAddress', 'userAddressDelete', 'updateAddress']),
    ...mapActions('ui', ["setToastMessage", "setToastError"]),
    ...mapActions('common', ['getCitiesById', 'getAllCountries', 'getPhoneCode']),
    selectdTypeAdddress(type) {
      this.addressData.type = type;
    },

    invalidWatcher(invalid) {
      this.isInvalid = invalid;
      return true; // Necessary to keep the template valid
    },
    async countrySelected() {
      // this.addressData.city_id = ""
      try {
        // if (this.allCitiesById.length == 0 || this.allCitiesById[0].country_code != this.address.country_code)
        {
          let country = this.allCountries.find(c =>
            c.iso.toLowerCase().includes(this.address.country_code.toLowerCase())
          );
          if (country)
            this.addressData.country_id = country.id
          else
            this.addressData.country_id = this.address.country_id;

          await this.getCitiesById({
            api: 'getAllCityById',
            mutation: 'SET_ALL_Cities',
            id: this.address.country_code ?? this.vendorCountryId ?? 'SA'
          })
          console.log('cit', this.address.city_name)

          let city = this.allCitiesById.find(c =>
            c.name_lang.en.toLowerCase().includes(this.address.city_name.toLowerCase()) ||
            c.name_lang.ar.toLowerCase().includes(this.address.city_name.toLowerCase())
          );

          if (city)
            this.addressData.city_id = city.id
          else
            this.addressData.city_id = this.address.city_id;
        }

      } catch (e) {
        return this.$nuxt.error(e)
      }

    },
    async getAllAddress() {
      await this.getVendorAddress({params: {'vendor_id': this.profile.id}, api: 'getVendorAddress'})
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
        address_name: '',
        district: '',
        street: '',
        building_number: '',
        nearest_landmark: '',
        type: '',
        is_default: 0,
        phone_code: '966'
      }
    },
    closeAddressModel() {
      console.log("close address modal")
      this.$emit('close')
      this.addressData = {}
    },
  },
  async mounted() {
    console.log("mmmmmmmmm")
    // this.clearForm();
    try {
      this.loading = true
      this.vendorCountryId = this.profile.country_id
      // await this.getAllAddress();
      // await this.getPhoneCode();
      if (this.allCountries.length == 0)
        await this.getAllCountries({
          api: 'getAllCountries',
          mutation: 'SET_ALL_COUNTRIES',
        });
      else {
        await this.countrySelected()

      }


      this.loading = false
    } catch (e) {
      return this.$nuxt.error(e)
    }
    this.addressData.country_id = this.vendorCountryId = this.profile.country_id;
    if (this.address) {
      this.addressData = {...this.addressData, ...this.address}
      // this.addressData.country_id = this.address.country_id;
      this.addressData.building_number = this.address.building_number;
      this.addressData.is_default = this.address.is_default == '1' ? true : false;
      this.addressData.street = this.address.street;
      this.addressData.phone_code = this.address.phone_code !== '' ? this.address.phone_code : '966'
      this.countrySelected(this.address.country_id);
    } else {
      this.addressData.country_id = this.profile.country_id;
      this.addressData.is_default = 0;
      this.countrySelected(this.addressData.country_id);
    }


  }
}
</script>


<style>
.phone-code {
  width: 30%;
}
</style>
