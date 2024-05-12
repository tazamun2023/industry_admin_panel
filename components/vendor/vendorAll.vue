<template>
    <div>
      <list-page
        ref="listPage"
        list-api="getVendor"
        route-name="vendors"
        empty-store-variable="allProducts"
        :name="$t('title.prod')"
        @list="itemList = $event"
      >
        <template
          v-slot:table-top="{orderOptions}"
        >
          <vendor-filter @filter="searchFilterData" />

        </template>
        <template v-slot:table="{list}">
          <div class="table-wrapper">
            <table>
              <thead>
              <tr>
                <th>{{ $t('vendor.sl') }}</th>
                <th>{{ $t('vendor.logo') }}</th>
                <th>{{ $t('vendor.company_name') }}</th>
                <th>{{ $t('vendor.email') }}</th>
                <th>{{ $t('vendor.primary_mobile') }}</th>
                <th>{{ $t('vendor.foundation_date') }}</th>
                <th>{{ $t('vendor.production_start') }}</th>
                <th>{{ $t('vendor.location') }}</th>
                <th>{{ $t('vendor.number_product') }}</th>
                <th>{{ $t('vendor.verify') }}</th>
                <th>{{ $t('vendor.status') }}</th>
                <th>{{ $t('vendor.action') }}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(value, index) in list" :key="index">
                <td>{{ index+1 }}</td>
                <td><a class="text-primary" href=""><img :src="value.logo" alt=""></a></td>
                <td>
                  <a class="text-primary" v-if="langCode === 'ar'"  href="">{{ value.name.ar }}</a>
                  <a class="text-primary" v-else  href="">{{ value.name.en }}</a>
                </td>
                <td>{{ value.primary_email }}</td>
                <td>{{ value.primary_mobile }}</td>
                <td>{{ value.founded_date }}</td>
                <td>{{ value.production_start_date }}</td>
                <td>{{ value.city_name }}</td>
                <td>{{ value.total_product }}</td>

                <td
                  class="status"
                  :class="{active: value.verified == 1 }"
                >
                  <span v-if="value.verified">{{ $t('util.verify') }}</span>
                  <span v-else>{{ $t('util.notVerify') }}</span>
                </td>
                <td
                  class="status"
                  :class="{ active: value.status == 1 }"
                >
                  <span v-if="value.status">{{ $t('util.active') }}</span>
                  <span v-else>{{ $t('util.deactive') }}</span>
                </td>
                <td>
                  <button
                   @click.prevent="$refs.listPage.editItem(value.id)" class="border-0"><edit-button-icon/></button>
                  <!-- <button id="dropdownDefaultButton" @click="toggleAction(index)"
                          class="bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 relative"
                          type="button">{{ $t('prod.action') }}
                    <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 10 6">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 4 4 4-4"/>
                    </svg>
                  </button>
                  <div id="dropdown"
                       class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute ml-[-50px]"
                       v-if="visibleAction === index"
                  >
                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownDefaultButton">
                      <nuxt-link
                        class="block px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white"
                        :to="`${/vendors/}${value.id}`">
                        Edit
                      </nuxt-link>
                    </ul>
                  </div> -->

                </td>
              </tr>

              </tbody>
            </table>
          </div>
        </template>

      </list-page>
    </div>
</template>
<script >
import ListPage from "@/components/partials/ListPage.vue";
import util from "@/mixin/util";
import bulkDelete from "@/mixin/bulkDelete";
import {mapGetters} from "vuex";
import EditButtonIcon from '../partials/EditButtonIcon.vue';

export default {
  name : "vendorAll",
  components: {ListPage,EditButtonIcon},
  mixins: [util, bulkDelete],
  data(){
    return {
      visibleAction: null,
    }
  },
  computed:{
    ...mapGetters('language', ['langCode'])
  },
  methods:{
    searchFilterData(search){
      this.$router.push({
        query: {
          ...this.$route.query,
          page: 1,
          orderBy: 'created_at',
          orderByType: 'desc',
          ...search
        }
      })
    },
    toggleAction(index){
      this.visibleAction = this.visibleAction === index ? null : index;
    },
  }
}
</script>
