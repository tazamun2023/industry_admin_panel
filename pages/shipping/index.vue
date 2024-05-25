<template>
  <list-edit-page
    ref="listPage"
    list-api="getSaShipping"
    delete-api="deleteShippingRule"
    set-api="storeSaFreeShipping"
    method="post"
    route-name="shipping-rules"
    empty-store-variable="allShippingRules"
    :name="$t('brand.shipRule')"
    :order-options="orderOptions"
    @delete-bulk="deleteBulk"
    @list="itemList = $event"
  >
    <template v-slot:table-top>

      <p class="button primary-btn">{{ $t('shipping.est') }}</p>
    </template>

    <template v-slot:table="{list}">
      <tr class="lite-bold">
        <th class="">
          {{ $t('shipping.free_shipping') }}
        </th>
        <th>{{ $t('city.city') }}</th>
        <th>{{ $t('shipping.est_days') }}</th>
        <th>{{ $t('shipping.est_hours') }}</th>
        <!--        <th>{{ $t('shipping.price') }}</th>-->
      </tr>

      <tr v-for="(value, index) in list" :key="index">
        <td>
          <input type="checkbox" :value="1" v-model="value.status">
        </td>
        <td>
          <input type="hidden" v-model="value.id">
          {{ value.city_name }}
        </td>
        <td><input type="number" min="0" :disabled="!value.status" v-model="value.est_days"></td>
        <td><input type="number" min="0" :disabled="!value.status" max="23" v-model="value.est_hours"></td>
        <!--        <td><input type="number" v-model="value.default_price"></td>-->

      </tr>
    </template>

  </list-edit-page>
</template>

<script>
import ListPage from "~/components/partials/ListPage";
import util from '~/mixin/util'
import bulkDelete from "~/mixin/bulkDelete";
import DeleteButtonIcon from "../../components/partials/DeleteButtonIcon.vue";
import EditButtonIcon from "../../components/partials/EditButtonIcon.vue";
import ListEditPage from "../../components/partials/ListEditPage.vue";
import {mapActions} from "vuex";

export default {
  name: "categories",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      orderOptions: {
        title: {title: this.$t('index.title')},
        created_at: {title: this.$t('category.date')}
      }
    }
  },
  components: {
    ListEditPage,
    ListPage,
    DeleteButtonIcon,
    EditButtonIcon
  },
  mixins: [util, bulkDelete],
  computed: {},
  methods: {





  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
