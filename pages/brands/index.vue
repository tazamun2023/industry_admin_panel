<template>
  <list-page
    v-if="$can('view_brands')"
    ref="listPage"
    list-api="getBrands"
    delete-api="deleteBrand"
    route-name="brands"
    empty-store-variable="allBrands"
    :name="$t('brand.brand')"
    gate="view_brands"
    manage_gate="manage_brands"
    :order-options="orderOptions"
    @delete-bulk="deleteBulk"
    @list="itemList = $event"
    :addButton="$store.state.admin.isVendor"
  >
    <template v-slot:table="{list}">
      <tr class="lite-bold">
        <th class="w-50x mx-w-50x">
          <input type="checkbox" @change="checkAll">
        </th>
        <th>{{ $t('index.title') }}</th>
        <th>{{ $t('category.slug') }}</th>
        <th>{{ $t('prod.vendor_name') }}</th>
        <th>{{ $t('category.featured') }}</th>
        <th>{{ $t('prod.show') }}</th>
        <th>{{ $t('prod.status') }}</th>
        <th>{{ $t('category.created') }}</th>
        <th>&nbsp;</th>
      </tr>

      <tr v-for="(value, index) in list" :key="index">
        <td class="w-50x mx-w-50x">
          <input type="checkbox" :value="value.id" v-model="cbList">
        </td>
        <td class="">
          <nuxt-link
            :to="`/brands/${value.id}`"
            class="dply-felx j-left link"
          >
            <lazy-image
              class="mr-20"
              :data-src="(value.image)"
              :alt="value.title"
            />
            <h5 class="mx-w-300x">{{ value.title }}</h5>
          </nuxt-link>

        </td>

        <td>
          {{ value.slug }}
        </td>

        <td>
          {{ value.vendor_name }}
        </td>

        <td
          class="status"
          :class="{active: value.featured == 1 }"
        >
          <span>{{ getFeatured(value.featured) }}</span>
        </td>
        <td
          class="status"
          :class="{active: value.status == 1 }"
        >
          <span>{{ getStatus(value.status) }}</span>
        </td>
        <td
          class="status"
          :class="{active: value.approved_status.name === 'Approved' }"
        >
          <span>{{ value.approved_status.name }}</span>
        </td>
        <td>{{ value.created }}</td>
        <td>
          <button
          class="border-0"
            v-if="$can('manage_brands')"
            @click.prevent="$refs.listPage.deleteItem(value.id)"><delete-button-icon/></button>
          <button
          class="border-0"
            v-if="$can('manage_brands')"
            @click.prevent="$refs.listPage.editItem(value.id)"><edit-button-icon/></button>
          <button class="border-0" v-if="$can('manage_brands') && $store.state.admin.isSuperAdmin" @click.prevent="changeStatus(value.id, 'approved')">Approved</button>
          <button class="border-0" v-if="$can('manage_brands')  && $store.state.admin.isSuperAdmin" @click.prevent="changeStatus(value.id, 'reject')">Reject</button>
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
  import {mapActions} from "vuex";

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
    ListPage,
    DeleteButtonIcon,
    EditButtonIcon
},
    mixins: [util, bulkDelete],
    computed: {},
    methods: {
      async changeStatus(id, status) {
        try {
          this.setById({ id: id, params: { status: status }, api: 'doApprovedBrand' })
            .then(() => {
              this.$refs.listPage.fetchingData();
            })
            .catch(error => {
              // Handle errors
              console.error("Error:", error);
            });
        } catch (error) {
          console.error("Error:", error);
        }
      },


      ...mapActions('common', ['setById']),
      ...mapActions('ui', ["setToastMessage", "setToastError"]),
    },
    mounted() {
    }
  }
</script>


