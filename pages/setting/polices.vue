<template>
  <div class="tab-sidebar">
    <div class="title">
      <h4>{{ $t('polices.polices') }}</h4>
    </div>
    <div class="grid grid-cols-12 p-4 gap-4">
      <div class="col-span-2">
        <ul class="mb-0 list-none">
          <template v-for=" (police) in polices">


            <a class="font-bold  px-2 py-3   block cursor-pointer leading-normal"
               v-on:click="toggleTabs(police)"
               v-bind:class="{'text-pink-600 bg-white border-white ltr:border-l-2 rtl:border-r-2': openTab !==police, 'ltr:border-l-2 rtl:border-r-2 border-primary text-primary': openTab === police}">
              {{ $t('polices.' + police) }}
            </a>
          </template>


        </ul>
      </div>
      <div class="col-span-10 ltr:border-l rtl:border-r border-smooth p-2 right-area">
        <template v-for=" (police) in polices">
          <div v-bind:class="{'hidden': openTab !== police, 'block': openTab === police}">

            <div class="flex flex-col">
              <div class="flex justify-between my-5">
                <div> {{ $t('polices.' + police) }}</div>
                <img class="action_img cursor-pointer"
                     @click="showEditPolice=true"
                     src="~/assets/icon/edit-g.svg">
              </div>
              <div v-html="siteSetting[police]"></div>
            </div>
          </div>
        </template>

      </div>
    </div>
    <EditPolices v-if="$can('manage_ui_settings')"
                 :type="openTab"
                 policeType="system"
                 api="setPolice"
                 :show-modal="showEditPolice"
                 @close="showEditPolice=false"
    ></EditPolices>
  </div>
</template>

<script>

import {mapGetters} from "vuex";
import AddHelpAssistants from "../../components/AddHelpAssistants.vue";
import EditPolices from "../../components/EditPolices.vue";
import util from "~/mixin/util"

export default {
  components: {EditPolices, AddHelpAssistants},
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      showEditPolice: false,
      polices: [
        'privacy_polices',
        'return_polices',
        'vendors_terms_condition',
        'customers_terms_condition'],
      openTab: 'privacy_polices',
      openContentTab: 'privacy_polices',
    }
  },
  mixins: [util],
  computed: {
    ...mapGetters('site-setting', ['siteSetting']),
  },
  mounted() {
    this.openTab = this.$route.query.tap ?? 'privacy_polices'
  },
  methods: {
    toggleTabs: function (tabNumber) {
      this.openTab = tabNumber
      this.$router.push({
        query: {
          ...this.$route.query,
          tap: this.openTab
          // filter: this.checkedFilter.join(','),
        }
      })
    },

  },


}
</script>
