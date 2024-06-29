<template>
  <div>
    <list-page
      v-if="$can('view_addresses')"
      ref="listPage"
      list-api="getVendorAddress"
      delete-api="userAddressDelete"
      route-name="rejection-reasons"
      :modalButton="true"
      empty-store-variable="rejectReasons"
      gate="view_addresses"
      @open-modal="addAddress"
      :title="$t('setting.rejection-reasons')"
      manage_gate="edit_addresses"
      @list="setVendorAddress( $event)"

    >
      <template v-slot:table="{list}">
        <tr class="lite-bold">
          <th class="bg-lightdeep">
            <div class="flex gap-4 items-center">
              <!-- <input type="checkbox"> -->
              {{ $t('address.address_name') }}
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
              <!-- <input type="checkbox"> -->
              {{ $t('address.set_default') }}
            </div>
          </th>
          <th class="bg-lightdeep"></th>
        </tr>

        <tr v-for="(value, index) in addressList" :key="index">
          <td>
            <div class="flex font-bold capitalize gap-4 items-center">
              <!-- <input type="checkbox"> -->
              {{ value.address_name }}
            </div>
          </td>
          <td class="text-primary">{{ value?.type }}</td>
          <td class="text-primary">{{ value?.country }}</td>
          <td class="text-primary">{{ value?.city }}</td>
          <td class="font-bold capitalize">{{ value?.phone }}</td>
          <td>{{ value?.nearest_landmark }}</td>
          <td class="text-center">
            <input @change="setDefault(value,$event)" :disabled="value.default || !$can('edit_addresses')"  :checked="value.default" :value="value.default" type="checkbox">
          </td>
          <td>
            <div class="flex gap-4">
              <button
                v-if="$can('edit_addresses') && value.default == 0 && list.length>1"
                @click.prevent="$refs.listPage.deleteItem(value.id)" class="border-0 p-0">
                <delete-button-icon/>
              </button>
              <button class="border-0 p-0" @click="editAddress(value)" v-if="$can('edit_addresses')">
                <img  class="action_img cursor-pointer"
                   src="~/assets/icon/edit-g.svg">
              </button>
            </div>
          </td>
        </tr>
      </template>
    </list-page>
    <AddAddress></AddAddress>
  </div>
</template>
<script>
import ListPage from "@/components/partials/ListPage.vue";
import {mapActions, mapGetters} from "vuex";
import address from "@/mixin/address";
import AddAddress from "../../components/AddAddress.vue";
import DeleteButtonIcon from "../../components/partials/DeleteButtonIcon.vue";

export default {
  components: {
    DeleteButtonIcon,
    AddAddress,
    ListPage,
  },
  mixins: [address],
  data() {
    return {
      deleteModal: false
    }
  },
  computed: {
    ...mapGetters('admin', ['profile']),
    ...mapGetters('address', ['addressList']),
  },
  methods: {
    ...mapActions('common', ['swetAlertFire', 'setAddressDefault']),
    ...mapActions('address', ['setVendorAddress', 'setDefaultAddress',]),
    async setDefault(v, e) {
      await this.setDefaultAddress({id: v.id, default: !e.target.checked})
      const res = await this.swetAlertFire({
        params: {
          title: this.$i18n.t('approvedModal.sure'),
          text: this.$i18n.t('approvedModal.revert'),
        }
      })
      if (res) {
        await this.setAddressDefault({params: {id: v.id, is_default: e.target.checked,}})
        this.$refs.listPage.fetchingData()
      } else {
        await this.setDefaultAddress(v)
        return false
      }
    },
  },
  async mounted() {
  }
}
</script>
