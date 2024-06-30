<template>
  <list-page
    v-if="$can('view_content')"
    ref="listPage"
    list-api="NEWS"
    delete-api="NEWS"
    :param="param"
    route-name="buisness-news"
    empty-store-variable="NEWS"
    :name="$t('bnews.news')"
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
        <th v-if="$store.state.admin.isSuperAdmin">{{ $t('global.vendor') }}</th>
        <th>{{ $t('global.title') }}</th>
        <th>{{ $t('global.image') }}</th>
        <th>{{ $t('category.created') }}</th>
        <th>{{ $t('global.action') }}</th>
      </tr>

      <tr v-for="(value, index) in list" :key="index">
        <td class="w-50x mx-w-50x">
          <input type="checkbox" :value="value.id" v-model="cbList">
        </td>

        <td>{{ index + 1 }}</td>
        <td v-if="$store.state.admin.isSuperAdmin">{{ value.vendor?.name }}</td>
        <td>{{ value._title }}</td>

        <td>
          <lazy-image
            class="mr-20"
            :data-src="value.image"
            :alt="value._title"
          />
<!--          <img :src="value.image" :alt="value._title">-->
        </td>
        <td>
          <div class="flex flex-col">
            <p class="text-nowrap"> {{ value.created }}</p>
            <p class="text-nowrap"> {{ value.updated_at }}</p>
          </div>

        </td>
        <td>
          <button
            v-if="$can('manage_content')"
            @click="$refs.listPage.deleteItem(value.id)" class="border-0">
            <delete-button-icon/>
          </button>

          <button
            v-if="$can('manage_content')"
            @click.prevent="$refs.listPage.editItem(value.id)" class="border-0">
            <edit-button-icon/>
          </button>

        </td>
      </tr>
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
  name: "BusinessNews",
  middleware: ['common-middleware', 'auth'],
  props: {
    vendorId: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      deleteModal: false,
      deleteId: null,
      param: {
        vendor_id: this.vendorId > 0 ? this.vendorId : this.$store.getters["admin/profile"].vendor_id
      },
      orderOptions: {
        created_at: {title: this.$t('category.date')},
        title: {title: this.$t('global.title')}
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

  mounted() {
    console.log("This is vendor id: "+ this.param.vendor_id)
  }
}
</script>

<style scoped>

</style>
