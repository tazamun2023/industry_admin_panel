<template>
  <list-page
    ref="listPage"
    list-api="getShippingRules"
    delete-api="deleteShippingRule"
    route-name="shipping-rules"
    empty-store-variable="allShippingRules"
    :name="$t('brand.shipRule')"
    gate="shipping_rule"
    :order-options="orderOptions"
    @delete-bulk="deleteBulk"
    @list="itemList = $event"
  >
    <template v-slot:table="{list}">
      <tr class="lite-bold">
        <th class="w-50x mx-w-50x">
          <input type="checkbox" @change="checkAll">
        </th>
        <th>{{ $t('index.title') }}</th>
        <th>{{ $t('category.created') }}</th>
        <th>&nbsp;</th>
      </tr>

      <tr v-for="(value, index) in list" :key="index">
        <td class="w-50x mx-w-50x">
          <input type="checkbox" :value="value.id" v-model="cbList">
        </td>
        <td class="">
          <nuxt-link
            class="link"
            :to="`/shipping-rules/${value.id}`"
          >
            <h5 class="mx-w-300x">{{ value.title }}</h5>
          </nuxt-link>
        </td>
        <td>{{ value.created }}</td>
        <td>
          <button
            v-if="$can('shipping_rule', 'delete')"
            @click.prevent="$refs.listPage.deleteItem(value.id)"
            class="border-0"
          >
            <delete-button-icon/></button>
          <button
            v-if="$can('shipping_rule', 'edit')"
            @click.prevent="$refs.listPage.editItem(value.id)"
            class="border-0"
          >
            <edit-button-icon/></button>

        </td>
      </tr>
    </template>
  </list-page>
</template>

<script>
  import ListPage from "~/components/partials/ListPage";
  import util from '~/mixin/util'
  import bulkDelete from "~/mixin/bulkDelete";
import DeleteButtonIcon from "../../components/partials/DeleteButtonIcon.vue";
import EditButtonIcon from "../../components/partials/EditButtonIcon.vue";

  export default {
    name: "categories",
    middleware: ['common-middleware', 'auth'],
    data() {
      return {
        orderOptions: {
          title: { title: this.$t('index.title') },
          created_at: { title: this.$t('category.date') }
        }
      }
    },
    components: {
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
