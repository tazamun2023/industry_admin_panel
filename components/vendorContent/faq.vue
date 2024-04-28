<template>
  <list-page
    :filter="false"
    v-if="$can('view_content')"
    ref="listPage"
    list-api="FAQ"
    delete-api="FAQ"
    route-name="FAQ"
    empty-store-variable="FAQ"
    :name="$t('profile.faq')"
    gate="view_content"
    manage_gate="manage_content"
    :order-options="orderOptions"
    @delete-bulk="deleteBulk"
    @list="itemList = $event"
  >
    <template v-slot:table="{list}">
      <tr class="lite-bold">
        <th class="w-50x mx-w-50x">
          <input type="checkbox" @change="checkAll">
        </th>
        <th>{{ $t('global.sl') }}</th>
        <th v-if="!$store.state.admin.isVendor">{{ $t('global.vendor') }}</th>
        <th>{{ $t('global.question') }}</th>
        <th>{{ $t('global.answer') }}</th>
        <th>{{ $t('global.created') }}</th>
        <th>Action</th>
      </tr>

      <tr v-for="(value, index) in list" :key="index">
        <td class="w-50x mx-w-50x">
          <input type="checkbox" :value="value.id" v-model="cbList">
        </td>

        <td>{{ index+1 }}</td>
        <td v-if="!$store.state.admin.isVendor">{{ value.vendor?.local_name }}</td>
        <td>{{ value.local_questions }}</td>
        <td>{{ value.local_answers }}</td>

        <td>{{ value.created }}</td>
        <td>
          <button
            v-if="$can('manage_content')"
            @click="openDeleteModal(value.id)" class="border-0"><delete-button-icon/></button>
          <button
            v-if="$can('manage_content')"
            @click.prevent="$refs.listPage.editItem(value.id)" class="border-0"><edit-button-icon/></button>
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
import DeleteButtonIcon from "../../components/partials/DeleteButtonIcon.vue";
import EditButtonIcon from "../../components/partials/EditButtonIcon.vue";
import {mapGetters} from "vuex";
import vendor from "@/mixin/vendor";

export default {
  name: "VendorFaq",
  middleware: ['common-middleware', 'auth'],
  props: {
    vendorId: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      deleteModal:false,
      deleteId: null,
      param: {
        vendor_id: this.vendorId > 0 ? this.vendorId : this.$store.getters["admin/profile"].vendor_id

      },
      orderOptions: {
        created_at: { title: this.$t('category.date') },
        questions: { title: this.$t('global.question') },
        answers: { title: this.$t('global.answer') }
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
  }
}
</script>

<style scoped>

</style>
