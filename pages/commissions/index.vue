<template>
  <div>
    <div class="flex flex-col">
      <div class="flex justify-between my-5">
        <div class="text-primary"> {{ $t('polices.commissions' ) }}</div>
        <img class="action_img cursor-pointer"
             @click="showEditDescription=true"
             src="~/assets/icon/edit-g.svg">
      </div>
      <div v-html="siteSetting['commissions']"></div>
    </div>
    <ValidationObserver class="w-full" v-slot="{ invalid, handleSubmit }">
      <list-edit-page
        card-class="p-4"
        table-class="lg:border border-cardb rounded-[8px]"
        ref="listPage"
        list-api="getCommissions"
        btn-class="w-full lg:w-[100px]"
        set-api="setCommissions"
        gate="manage_commissions"
        method="post"
        :invalid="invalid"
        route-name="commissions"
        :name="$t('brand.shipRule')"
        :order-options="orderOptions"
        :another-data="{settings:settings}"
        @delete-bulk="deleteBulk"
        @list="itemList = $event"
        @res="getSettings"
      >
        <template v-slot:table-top>
          <h3 class="text-[25px] uppercase font-medium py-4">{{ $t('commissions.commissions') }}</h3>
        </template>

        <template v-slot:table="{list}">

          <tr class="lite-bold capitalize">
            <th>
              {{ $t('prod.category') }}
            </th>
            <th class="w-2/4">{{ $t('commissions.commission') }}%</th>
          </tr>

          <tr v-for="(value, index) in list" :key="index">

            <td>
              <input type="hidden" v-model="value.id">
              {{ value.title }}
            </td>
            <td>
              <ValidationProvider class="w-full"   v-if="$can('manage_commissions')" name="company_interest" :rules="{
        required:true,
        min_value: 0,
        max_value: 99
      }" v-slot="{ errors }"
                                  :custom-messages="{required: $t('global.req', { type: $t('prod.Average lead time(Days)')}) }">
                <input type="number" class="w-full" min="0"
                       max="99"
                       v-model="value.company_interest">
                <span class="error w-full">{{ errors[0] }}</span>
              </ValidationProvider>
              <span class="w-full"  v-else>{{ value.company_interest }}%</span>

            </td>


          </tr>
        </template>
        <template v-slot:aboveTable>
          <div class="lg:p-4 py-10">

          </div>
        </template>
      </list-edit-page>
    </ValidationObserver>
    <EditPolices v-if="$can('manage_ui_settings')"
                 type="commissions"
                 policeType="system"
                 api="setPolice"
                 :show-modal="showEditDescription"
                 @close="showEditDescription=false"
    ></EditPolices>
  </div>
</template>

<script>
import util from '~/mixin/util'
import bulkDelete from "~/mixin/bulkDelete";
import EditButtonIcon from "../../components/partials/EditButtonIcon.vue";
import ListEditPage from "../../components/partials/ListEditPage.vue";
import {mapActions, mapGetters} from "vuex";
import address from "@/mixin/address";
import {validate, ValidationObserver, ValidationProvider} from 'vee-validate';
import EditPolices from "../../components/EditPolices.vue";


export default {
  name: "categories",
  middleware: ['common-middleware', 'auth'],

  data() {
    return {
      showEditDescription: false,
      settings: {
        description: {ar: "", en: ''}
      },
      orderOptions: {
        title: {title: this.$t('index.title')},
        company_interest: {title: this.$t('commissions.commission')}
      },
    }
  },
  computed: {
    ...mapGetters('site-setting', ['siteSetting']),

    ...mapGetters('admin', ['profile']),


  },
  components: {
    EditPolices,
    ValidationObserver, ValidationProvider,
    ListEditPage,
    EditButtonIcon
  },
  mixins: [util, bulkDelete, address],
  methods: {
    closeModelAddAddress() {
      this.addressmodal = false
    },
    getSettings(res) {
      // this.settings = res?.settings
      // if (!this.settings.description)
      //   this.settings.description = {ar: "", en: ''}

    },


  },
  mounted() {


  }
}
</script>

<style scoped>
.w-3\/4 {
  width: 75% !important;
}

#fromTime {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

input[type="time"]::-webkit-calendar-picker-indicator {
  background-image: url('~/assets/icon/clock.svg'); /* Custom clock icon */

}

.rtl\:right-1:where([dir="rtl"], [dir="rtl"] *) {
  right: 1.25rem;
}
</style>
