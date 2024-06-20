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
              {{  $t('address.address_name')  }}
            </div>
          </th>
          <th class="bg-lightdeep">
            {{ $t('address.type') }}
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
              {{ $t('address.set_default') }}
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
            {{ value?.type }}
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

    <!-- -----------------modal------------ -->
  <AddAddress  ></AddAddress>
    <!-- -----------------modal end------------ -->
  </div>
</template>

<script>
import ListPage from "@/components/partials/ListPage.vue";
import {mapActions, mapGetters} from "vuex";
import {ValidationObserver, ValidationProvider} from "vee-validate";
import address from "@/mixin/address";
import DeleteModal from "@/components/DeleteModal.vue";
import AddAddress from "../../components/AddAddress.vue";

export default {
  components: {
    AddAddress,
    ListPage, ValidationObserver, ValidationProvider,
    DeleteModal
  },
  mixins: [address],
  data() {
    return {
      deleteModal: false
    }
  },
  computed: {
    ...mapGetters('admin', ['profile']),

  },
  watch: {},
  methods: {
    ...mapActions('address', [ 'getVendorAddress',]),
    ...mapActions('common', [ 'swetAlertFire', 'setAddressDefault']),



    async getAllAddress() {
      await this.getVendorAddress({params: {'vendor_id': this.profile.id, ...this.$route.query,}, api: 'getVendorAddress'})
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


    closeModal() {
      this.deleteModal = false
    }

  },
  async mounted() {
    try {
      this.loading = true

      await this.getAllAddress();

      this.loading = false
    } catch (e) {
      return this.$nuxt.error(e)
    }


  }


}
</script>
