<template>
  <list-page
    v-if="$can('brand', 'view')"
    ref="listPage"
    list-api="getBrands"
    delete-api="deleteBrand"
    route-name="unit"
    empty-store-variable="allBrands"
    :name="$t('unit.unit')"
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
        <th>{{ $t('index.title') }}</th>
        <th>{{ $t('unit.code') }}</th>
        <th>{{ $t('unit.type') }}</th>
        <th>{{ $t('unit.status') }}</th>
        <th>{{ $t('unit.created') }}</th>
        <th>&nbsp;</th>
      </tr>

      <tr v-for="(value, index) in list" :key="index">
        <td class="w-50x mx-w-50x">
          <input type="checkbox" :value="value.id" v-model="cbList">
        </td>
        <td class="">
          <nuxt-link
            :to="`/units/${value.id}`"
            class="dply-felx j-left link"
          >

            <h5 class="mx-w-300x">Unit name</h5>
          </nuxt-link>

        </td>
<td>001</td>

        <td>KG</td>
        <td
          class="status"
          :class="{active: value.status == 1 }"
        >
          <span>{{ getStatus(value.status) }}</span>
        </td>
        <td>{{ value.created }}</td>
        <td>
          <button
            v-if="$can('brand', 'edit')"
            @click.prevent="$refs.listPage.editItem(value.id)" class="lite-btn">{{ $t('category.edit') }}</button>
          <button
            v-if="$can('brand', 'delete')"
            @click.prevent="$refs.listPage.deleteItem(value.id)" class="delete-btn lite-btn">{{ $t('category.delete') }}</button>
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

export default {
  name: "brands",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      orderOptions: {
        title: { title: this.$t('index.title') },
        featured: { title: this.$t('category.featured') },
        created_at: { title: this.$t('category.date') },
        status: { title: this.$t('category.status') }
      }
    }
  },
  components: {
    LazyImage,
    ListPage
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
