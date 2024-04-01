<template>
  <list-page
    v-if="$can('view_content')"
    ref="listPage"
    list-api="FAQ"
    delete-api="FAQ"
    route-name="FAQ"
    empty-store-variable="FAQ"
    :name="$t('color.color')"

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
import DeleteButtonIcon from "../../components/partials/DeleteButtonIcon.vue";
import EditButtonIcon from "../../components/partials/EditButtonIcon.vue";

export default {
  name: "brands",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
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
  computed: {},
  methods: {},
  mounted() {
  }
}
</script>

<style scoped>

</style>
