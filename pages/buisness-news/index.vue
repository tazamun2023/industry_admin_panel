<template>
  <list-page
    v-if="$can('brand', 'view')"
    ref="listPage"
    list-api="NEWS"
    delete-api="NEWS"
    :param="param"
    route-name="buisness-news"
    empty-store-variable="NEWS"
    :name="$t('bnews.news')"
    gate="brand"
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
        <th>{{ $t('global.title') }}</th>
        <th>{{ $t('global.image') }}</th>
        <th>{{ $t('global.action') }}</th>
      </tr>

      <tr v-for="(value, index) in list" :key="index">
        <td class="w-50x mx-w-50x">
          <input type="checkbox" :value="value.id" v-model="cbList">
        </td>

        <td>{{ index+1 }}</td>
        <td v-if="!$store.state.admin.isVendor">{{ value.vendor?.local_name }}</td>
        <td>{{ value._title }}</td>
        <td>
          <img :src="value.image" :alt="value._title">
        </td>
        <td>
          <button
            v-if="$can('brand', 'delete')"
            @click.prevent="$refs.listPage.deleteItem(value.id)" class="border-0" ><delete-button-icon/></button>
          <button
            v-if="$can('brand', 'edit')"
            @click.prevent="$refs.listPage.editItem(value.id)" class="border-0"><edit-button-icon/></button>

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
  name: "FaqNews",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      param: {
        vendor_id: this.$store.getters["admin/profile"].vendor_id
      },
      orderOptions: {
        created_at: { title: this.$t('category.date') },
        id: { title: "id" }
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
  methods: {},
  mounted() {
  }
}
</script>

<style scoped>

</style>
