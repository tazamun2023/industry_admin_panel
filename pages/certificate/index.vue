<template>
  <list-page
    v-if="$can('view_content')"
    ref="listPage"
    list-api="Certificate"
    delete-api="Certificate"
    :param="param"
    route-name="certificate"
    empty-store-variable="Certificate"
    :name="$t('color.color')"
    gate="view_content"
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
        <td>{{ value.local_title }}</td>
        <td>
          <img :src="value.file" :alt="value.local_title">
        </td>
        <td>
          <button
            v-if="$can('manage_content')"
            @click.prevent="$refs.listPage.deleteItem(value.id)" class="border-0"><delete-button-icon/></button>
          <button
            v-if="$can('manage_content')"
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
import EditButtonIcon from "../../components/partials/EditButtonIcon.vue";
import DeleteButtonIcon from "../../components/partials/DeleteButtonIcon.vue";

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
    EditButtonIcon,
    DeleteButtonIcon
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
