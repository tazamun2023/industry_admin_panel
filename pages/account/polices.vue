<template>
  <div class="tab-sidebar">

    <div class="flex flex-col mx-5 ">
      <div class="flex justify-between mt-6  mb-2">
        <div>
          <h4>{{ $t('polices.return_polices') }}</h4>
          <p class="text-[.75em] mx-2 text-accent">{{ $t('polices.minWords', {count: 30}) }}</p>
        </div>

        <div class="flex justify-between">


          <img class="action_img cursor-pointer"
               @click="showEditPolice=true"
               src="~/assets/icon/edit-g.svg">
        </div>


      </div>
      <hr>
      <div v-if="return_polices" class="my-5">
        <h4 class="text-primary my-1">{{ $t('polices.LastUpdate') }}: {{ return_polices?.updated_at }}</h4>
        <div v-html="return_polices.police[$t('app.local')]"></div>

      </div>

    </div>


    <EditPolices v-if="$can('edit_company')"
                 policeType="vendor"
                 type="return_polices"
                 api="setVendorPolice"
                 :show-modal="showEditPolice"
                 @close="showEditPolice=false"
    ></EditPolices>
  </div>
</template>

<script>

import {mapGetters} from "vuex";
import EditPolices from "../../components/EditPolices.vue";
import util from "~/mixin/util"

export default {
  components: {EditPolices},
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      showEditPolice: false,

    }
  },
  mixins: [util],
  computed: {
    ...mapGetters('admin', ['return_polices', 'profile']),
  },
  mounted() {
  },
  methods: {},


}
</script>
