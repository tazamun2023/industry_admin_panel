<template>
  <list-page
    v-if="$can('invite')"
    :param="vendor_id"
    ref="listPage"
    list-api="getVendorUsers"
    delete-api="deleteVendors"
    route-name="vendor-users"
    :name="$t('user.name')"
    :order-options="orderOptions"
    gate="invite"
  >
    <template v-slot:table="{list}">
      <tr class="lite-bold">
        <th>{{ $t('user.name') }}</th>
        <th>{{ $t('user.uName') }}</th>
        <th>{{ $t('fSale.email') }}</th>
        <th>{{ $t('user.role') }}</th>
        <th>{{ $t('user.verified') }}</th>
        <th>{{ $t('title.ac') }}</th>
        <th>{{ $t('category.created') }}</th>
        <th>&nbsp;</th>
      </tr>

      <tr
        v-for="(value, index) in list"
        :key="index"
        :class="{'new-data': !parseInt(value.viewed)}"
      >
        <td class="">
          <nuxt-link
            class="link"
            :to="`/admins-vendors/${value.id}`"
          >
            <h5 class="mx-w-300x">{{ value.name }}</h5>
          </nuxt-link>
        </td>
        <td>{{ value.username }}</td>
        <td>{{ value.email }}</td>
<!--        <td>
          <span
            v-for="(i, n) in value.role"
            :key="n"
          >
            {{ i.name }}
          </span>
        </td>-->

        <td>{{ value.role[0] }}</td>

        <td>
          <span v-if="value.verified">{{ $t('user.verified') }}</span>
          <span v-else>{{ $t('user.verified') }}</span>
        </td>

        <td>
          <span v-if="value.active">{{ $t('prod.yes') }}</span>
          <span v-else>{{ $t('prod.no') }}</span>
        </td>

        <td>{{ value.created }}</td>
        <td>
          <button
            v-if="$can('invite')"
            @click.prevent="$refs.listPage.deleteItem(value.id)"
            class="border-0"
          >
            <DeleteButtonIcon/>
          </button>
          <button
            v-if="$can('invite')"
            @click.prevent="$refs.listPage.editItem(value.id)"
            class="border-0"
          >
            <EditButtonIcon/>
          </button>

        </td>
      </tr>
    </template>
  </list-page>
</template>

<script>
  import ListPage from "~/components/partials/ListPage";
  import util from '~/mixin/util'
import EditButtonIcon from "../../components/partials/EditButtonIcon.vue";
import DeleteButtonIcon from "../../components/partials/DeleteButtonIcon.vue";

  export default {
    name: "vendor-users",
    middleware: ['common-middleware', 'auth'],
    data() {
      return {
        orderOptions: {
          name: { title: this.$t('user.name') },
          email: { title: this.$t('fSale.email') },
          username: { title: this.$t('user.uName') },
          created_at: { title: this.$t('category.date') },
        },
        vendor_id: {
          vendor_id: 1
        }
      }
    },
    components: {
    ListPage,
    EditButtonIcon,
    DeleteButtonIcon
},
    mixins: [util],
    computed: {},
    methods: {},
    mounted() {
    }
  }
</script>

<style scoped>

</style>
