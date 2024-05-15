<script>

import EditButtonIcon from "@/components/partials/EditButtonIcon.vue";
import DeleteButtonIcon from "@/components/partials/DeleteButtonIcon.vue";
import ListPage from "@/components/partials/ListPage.vue";
import LazyImage from "@/components/LazyImage.vue";
import util from "@/mixin/util";
import bulkDelete from "@/mixin/bulkDelete";
import {mapActions} from "vuex";

export default {
  name: 'AllBrand',
  props:{
    api: {
      type: String,
      default: "getBrands"
    },
    param: {
      type: String,
      default: "all"
    },
    openTab: {
      type: Number,
      default: 1
    }
  },
  components: {
    LazyImage,
    ListPage,
    DeleteButtonIcon,
    EditButtonIcon
  },
  data() {
    return {
      openTab: 1,
      orderOptions: {
        title: { title: this.$t('index.title') },
        featured: { title: this.$t('category.featured') },
        created_at: { title: this.$t('category.date') },
        status: { title: this.$t('category.status') }
      }
    }
  },
  mixins: [util, bulkDelete],
  computed: {},
  methods: {
    toggleTabs: function (tabNumber) {
      this.openTab = tabNumber
    },
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

<template>
  <div>
    <ul class="flex mb-0 list-none flex-wrap pt-3 w-100 pb-4 flex-row">
      <li class="-mb-px mr-2 last:mr-0 cursor-pointer  flex-auto text-center">
        <NuxtLink class="text-xs font-bold uppercase px-5 py-3  block leading-normal"
                  @click="toggleTabs(1)"
                  :to="`/brands/all`"
                  :class="{'bg-white border-white border-b-2': openTab !== 1, 'border-b-2 border-primary': openTab === 1}">
          {{ $t('prod.All') }}
        </NuxtLink>
      </li>
      <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
        <NuxtLink class="text-xs font-bold uppercase px-5 py-3  block leading-normal"
                  @click="toggleTabs(2)"
                  :to="`/brands/approved`"
                  :class="{'bg-white border-white border-b-2': openTab !== 2, 'border-b-2 border-primary': openTab === 2}">
          {{ $t('prod.Approved') }}
        </NuxtLink>
      </li>
      <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
        <NuxtLink class="text-xs font-bold uppercase px-5 py-3  block leading-normal"
                  @click="toggleTabs(3)"
                  :to="`/brands/reject`"
                  :class="{'bg-white border-white border-b-2': openTab !== 3, 'border-b-2 border-primary': openTab === 3}">
          {{ $t('prod.Reject') }}
        </NuxtLink>
      </li>
    </ul>
    <list-page
      v-if="$can('view_brands')"
      ref="listPage"
      :list-api="api"
      :param="{param}"
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
  </div>

</template>

<style scoped>

</style>
