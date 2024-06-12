<template>
  <div>

    <list-page
      v-if="$can('view_addresses')"
      ref="listPage"
      list-api="getVendorAddress"
      delete-api="rejectReasons"
      route-name="rejection-reasons"
      :modalButton="true"
      empty-store-variable="rejectReasons"
      gate="view_addresses"
      @open-modal="addAddress"
      :title="$t('setting.rejection-reasons')"
      manage_gate="edit_addresses"
      @list="itemList = $event"
    >

      <template v-slot:table="{list}">
        <tr class="lite-bold">
          <th class="bg-lightdeep">
            <div class="flex gap-4 items-center">
              <input type="checkbox">
              Name
            </div>
          </th>
          <th class="bg-lightdeep">
            {{ $t('address.country') }}
          </th>
          <th class="bg-lightdeep">{{ $t('address.city') }}</th>
          <th class="bg-lightdeep">{{ $t('fSale.phone') }}</th>
          <th class="bg-lightdeep">{{ $t('address.near') }}</th>
          <th class="bg-lightdeep text-center">
            <div class="flex gap-2 justify-center items-center">
              <input type="checkbox">
              Set as Default
            </div>
          </th>
          <th class="bg-lightdeep"></th>
        </tr>

        <tr v-for="(value, index) in list" :key="index">
          <td>
            <div class="flex font-bold capitalize gap-4 items-center">
              <input type="checkbox">
              {{ value.address_name }}
            </div>
          </td>
          <td class="text-primary">
            {{ value?.country }}
          </td>
          <td class="text-primary">
            {{ value?.city }}
          </td>
          <td class="font-bold capitalize">{{ value?.phone }}</td>
          <td>{{ value?.nearest_landmark }}</td>
          <td class="text-center"><input @change="setDeaultAddress(value,$event)" :checked="value.default > 0"
                                         type="checkbox"></td>
          <td>
            <div class="flex gap-4">
              <img v-show="value.default == 0" @click="deleting(value)" class="action_img  cursor-pointer"
                   src="~/assets/icon/delete.svg">
              <img @click="editAddress(value)" v-if="$can('edit_addresses')" class="action_img cursor-pointer"
                   src="~/assets/icon/edit-g.svg">
            </div>
          </td>
        </tr>
      </template>
    </list-page>
    <DeleteModal v-if="deleteModal" @closeModal="closeModal">
      <template v-slot:title>
        <h4>{{ $t('vendor.deletemessage') }}</h4>
      </template>
      <!-- -----------default slot------- -->
      <!-- -----------default slot------- -->
      <template v-slot:buttons>
        <div class="flex gap-4 justify-end">
          <button @click="deleteModal=false" class="p-2 border border-smooth rounded leading-3 w-[60px]">
            {{ $t('address.Quit') }}
          </button>
          <button @click.prevent="deleting(value)"
                  class="p-2 border border-smooth bg-primary text-white  rounded leading-3 w-[60px] hover:text-primary">
            {{ $t('address.Agree') }}
          </button>
        </div>
      </template>
    </DeleteModal>

    <!-- -----------------modal------------ -->

    <template v-if="addressmodal || confirmAddAddress">
      <div class="fixed bg-modal  inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-black opacity-50"></div>
        <div class="z-50 bg-white p-6 relative rounded-md shadow w-full md:w-1/2 lg:w-2/3 xl:w-2/5">
          <svg @click.prevent="closeAddressModel"
               class="w-4 h-4 text-gray-800 absolute ltr:right-3  rtl:left-3 cursor-pointer mt-[-10px]"
               aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
          <div class="mb-4">
            <h4>{{ $t('address.Add Address') }}</h4>
            <div>
              <google-map v-if="addressmodal" @cancel="addressmodal = !addressmodal" :dataAddressUpdate="addressData"
                          @confirm="confirmAddressAdd"/>

              <AddAddressModel :show-modal="confirmAddAddress" :address="addressData" @close="closeAddressModel"/>
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
import AddAddressModel from "../../components/AddAddressModel.vue";
import GoogleMap from "../../components/GoogleMap.vue";

export default {
  components: {
    GoogleMap,
    AddAddressModel,
    ListPage, ValidationObserver, ValidationProvider,
    DeleteModal
  },
  mixins: [address],
  data() {
    return {
      addressmodal: false,
      AddAddress: false,
      confirmAddAddress: false,
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
        is_default: false,

        phone_code: '',
        lat: '',
        lng: ''
      },
      hasError: false,
      vendorCountryId: '',
      deleteModal: false
    }
  },
  computed: {
    ...mapGetters('admin', ['profile']),
    ...mapGetters('address', ['addressList']),
    ...mapGetters('common', ['phoneCode', 'allCountries', 'allCitiesById']),
    ...mapGetters('language', ['langCode'])
  },
  watch: {},
  methods: {
    ...mapActions('address', ['userAddressAction', 'getVendorAddress', 'userAddressDelete', 'updateAddress']),
    ...mapActions('ui', ["setToastMessage", "setToastError"]),
    ...mapActions('common', ['getCitiesById', 'getAllCountries', 'getPhoneCode', 'swetAlertFire', 'setAddressDefault']),


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
    async getAllAddress() {
      await this.getVendorAddress({params: {'vendor_id': this.profile.id}, api: 'getVendorAddress'})
    },

    closeAddressModel() {
      this.addressmodal = false
      this.confirmAddAddress = false
      this.addressData = {}
    },
    async setDeaultAddress(v, e) {
      const res = await this.swetAlertFire({
        params: {
          title: this.$i18n.t('approvedModal.sure'),
          text: this.$i18n.t('approvedModal.revert'),
        }
      })
      if (res) {
        this.setAddressDefault({
          params: {
            id: v.id,
            name: v.name,
            street: v?.street,
            district: v?.district,
            phone: v?.phone,
            address_name: v?.address_name,
            default: v?.default,
            email: v?.email,
            zip: v?.zip,
            country_id: v?.country_id,
            lat: v?.lat,
            lng: v?.lng,
            city_id: v?.city_id,
            is_default: e.target.checked,
            building_number: v?.building_number,
            type: v?.type,
            nearest_landmark: v?.nearest_landmark,
            phone_code: v?.phone_code,
          }
        })
      } else {
        return false
      }
    },

    confirmAddressAdd(data) {
      this.addressData.lat = data.lat
      this.addressData.lng = data.lng
      this.addressData.address_name = data.address_name
      this.addressData.street = data.street
      this.confirmAddAddress = true
      this.addressmodal = false
    },

    closeModal() {
      this.deleteModal = false
    }

  },
  async mounted() {
    try {
      this.loading = true
      this.vendorCountryId = this.profile.country_id
      await this.getAllAddress();
      // if (this.phoneCode.length == 0)
      await this.getPhoneCode()
      await this.getAllCountries({api: 'getAllCountries', mutation: 'SET_ALL_COUNTRIES'})
        .then(() => {
          this.countrySelected()
        })
      this.loading = false
    } catch (e) {
      return this.$nuxt.error(e)
    }


  }


}
</script>
