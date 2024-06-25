<script>

import EditButtonIcon from "@/components/partials/EditButtonIcon.vue";
import DeleteButtonIcon from "@/components/partials/DeleteButtonIcon.vue";
import ListPage from "@/components/partials/ListPage.vue";
import LazyImage from "@/components/LazyImage.vue";
import util from "@/mixin/util";
import bulkDelete from "@/mixin/bulkDelete";
import {mapActions} from "vuex";
import SwitchToggle from '../SwitchToggle.vue';

export default {
  name: 'AllBrand',
  props: {
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
    EditButtonIcon,
    SwitchToggle
  },
  data() {
    return {
      openTab: 1,
      visibleDropdown: false,
      is_reject_modal: false,
      brand_id: "",
      orderOptions: {
        title: {title: this.$t('index.title')},
        featured: {title: this.$t('category.featured')},
        created_at: {title: this.$t('category.date')},
        approved_status: {title: this.$t('category.status')}
      }
    }
  },
  mixins: [util, bulkDelete],
  computed: {},
  methods: {
    isRejected(id) {
      this.is_reject_modal = !this.is_reject_modal;
      this.brand_id = id
    },
    toggleDropdown(index) {
      this.visibleDropdown = this.visibleDropdown === index ? null : index;
    },

    toggleTabs: function (tabNumber) {
      this.openTab = tabNumber
    },
    async changeStatus(id, status) {
      try {
        this.setById({id: id, params: {status: status}, api: 'doApprovedBrand'})
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
    updateReject(data) {
      const index = this.itemList.findIndex(item => item.id === this.brand_id)
      if (index !== -1) {

        if (this.openTab === 3)
          this.itemList.splice(index, 1)
        else
          this.itemList[index].approved_status = data.approved_status

      }
      // return this.$router.push(`/rfq`)
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
                  :to="`/brands/pending`"
                  :class="{'bg-white border-white border-b-2': openTab !== 3, 'border-b-2 border-primary': openTab === 3}">
          {{ $t('prod.Pending') }}
        </NuxtLink>
      </li>
      <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
        <NuxtLink class="text-xs font-bold uppercase px-5 py-3  block leading-normal"
                  @click="toggleTabs(4)"
                  :to="`/brands/reject`"
                  :class="{'bg-white border-white border-b-2': openTab !== 4, 'border-b-2 border-primary': openTab === 4}">
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
          <td>
            <div class="flex flex-col">
              <p class="text-nowrap"> {{ value.created }}</p>
              <p class="text-nowrap"> {{ value.updated_at }}</p>
            </div>

          </td>
          <td>
            <div class="flex gap-4" v-if="$can('manage_brands') && $store.state.admin.isVendor">
              <li class="cursor-pointer" @click.prevent="$refs.listPage.editItem(value.id)">
                <edit-button-icon v-if="$can('manage_brands') && $store.state.admin.isVendor"/>
              </li>
              <li v-if="$can('manage_brands') && $store.state.admin.isVendor" class="cursor-pointer"
                  @click.prevent="$refs.listPage.deleteItem(value.id)">
                <delete-button-icon/>
              </li>
            </div>

            <button v-if="$can('manage_brands') && $store.state.admin.isSuperAdmin" id="dropdownDefaultButton"
                    @click="toggleDropdown(index)"
                    class="bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 relative"
                    type="button">{{ $t('prod.action') }}
              <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m1 1 4 4 4-4"/>
              </svg>
            </button>
            <div id="dropdown"
                 v-outside-click="toggleDropdown"
                 class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute ml-[-50px]"
                 v-if="visibleDropdown === index"
            >
              <ul class="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton">
                <li
                  class="block px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                  v-if="$can('manage_brands') && $store.state.admin.isVendor"
                  @click.prevent="$refs.listPage.editItem(value.id)"
                >
                  {{ $t('prod.Edit') }}
                </li>
                <li
                  class="block px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                  v-if="$can('manage_brands')  && $store.state.admin.isSuperAdmin"
                  @click.prevent="isRejected(value.id)"

                >
                  {{ $t('prod.Reject') }}
                </li>

                <li
                  class="block px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                  v-if="$can('approve_products') && $store.state.admin.isSuperAdmin"
                  @click.prevent="changeStatus(value.id, 'approved')"
                >
                  {{ $t('prod.Approved') }}
                </li>
                <li
                  class="block px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                  @click.prevent="$refs.listPage.deleteItem(value.id)"
                  v-if="$can('approve_products') && $store.state.admin.isVendor"
                >
                  {{ $t('prod.Delete') }}
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </template>
    </list-page>

    <reject-reason v-if="is_reject_modal"
                   :show-modal="is_reject_modal"
                   :has_others="false"
                   :is-radio="false"
                   :title="brand_id"
                   get-api="RejectReasons"
                   set-api="setRejectBrand"
                   :set-id="brand_id"
                   type="Brands"
                   @update="updateReject"
                   @close="is_reject_modal=false"></reject-reason>
  </div>

</template>

<style scoped>

</style>
