<template>
  <list-page
    v-if="$can('view_content')"
    ref="listPage"
    list-api="VideoGallery"
    delete-api="VideoGallery"
    :param="param"
    route-name="video"
    empty-store-variable="VideoGallery"
    :name="$t('profile.video')"
    gate="view_content"
    manage_gate="manage_content"
    :order-options="orderOptions"
    @delete-bulk="deleteBulk"
    @list="itemList = $event"
  >
    <template v-slot:table="{list}">
      <tr class="lite-bold">
        <th>{{ $t('global.sl') }}</th>
        <th>{{ $t('global.url') }}</th>
        <th>{{ $t('global.action') }}</th>
      </tr>

      <tr v-for="(value, index) in list" :key="index">
        <td>{{ index+1 }}</td>
        <td>{{ value.url }}</td>
        <td>
          <button
            v-if="$can('manage_content')"
            @click="openDeleteModal(value.id)"
            class="border-0"><delete-button-icon/>
          </button>
        </td>
      </tr>
      <DeleteModal  v-if="deleteModal" @closeModal="closeModal">
        <template v-slot:title>
          <h4>{{ $t('vendor.deletemessage') }}</h4>
        </template>
        <!-- -----------default slot------- -->
        <!-- -----------default slot------- -->
        <template v-slot:buttons>
          <div class="flex gap-4 pt-4 justify-end">
            <button @click="deleteModal=false" class="p-2 border border-smooth rounded leading-3 ">
              {{ $t('address.cancel') }}
            </button>
            <button @click="$refs.listPage.deleteItemWithModal(deleteId), deleteModal=false"
                    class="p-2 border border-smooth bg-primary text-white  rounded leading-3 hover:text-primary">
              {{ $t('category.delete') }}
            </button>
          </div>
        </template>
      </DeleteModal>
    </template>
  </list-page>
</template>

<script>
import ListPage from "~/components/partials/ListPage";
import util from '~/mixin/util'
import LazyImage from "~/components/LazyImage";
import bulkDelete from "~/mixin/bulkDelete";
import vendor from "@/mixin/vendor";
import {mapActions, mapGetters} from "vuex";
import DeleteButtonIcon from "../../components/partials/DeleteButtonIcon.vue";
import EditButtonIcon from "../../components/partials/EditButtonIcon.vue";

export default {
  name: "VendorVideos",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      deleteModal:false,
      deleteId: null,
      param: {
        vendor_id: this.vendorId > 0 ? this.vendorId : this.$store.getters["admin/profile"].vendor_id
      },
      orderOptions: {
        created_at: { title: this.$t('category.date') },
        url: { title: this.$t('global.url') }
      }
    }
  },
  components: {
    LazyImage,
    ListPage,
    DeleteButtonIcon,
    EditButtonIcon
  },
  mixins: [util, bulkDelete],
  computed: {
    ...mapGetters('admin', ['profile']),
    vendor() {
      return vendor
    }
  },
  methods: {
    openDeleteModal(id){
      this.deleteId = id,
        this.deleteModal = true
    },
    closeModal(){
      this.deleteModal = false
    }
  },
  mounted() {
    console.log(this.param.vendor_id)
  }
}
</script>

<style scoped>

</style>
