<template>
  <div>
    <div class="relative flex flex-col min-w-0 break-words  w-full mb-6 rounded">
      <div class="flex-auto ">
        <div class="tab-content input-wrapper tab-space">
          <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
            <all-brand :api="`getBrands`" :param="`all`" :open-tab="1"></all-brand>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ListPage from "~/components/partials/ListPage";
  import util from '~/mixin/util'
  import LazyImage from "~/components/LazyImage";
  import bulkDelete from "~/mixin/bulkDelete";
import DeleteButtonIcon from "../../components/partials/DeleteButtonIcon.vue";
import EditButtonIcon from "../../components/partials/EditButtonIcon.vue";
  import {mapActions} from "vuex";
  import AllBrand from "@/components/brand/AllBrand.vue";

  export default {
    name: "brands",
    middleware: ['common-middleware', 'auth'],
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
    components: {
      AllBrand,
    LazyImage,
    ListPage,
    DeleteButtonIcon,
    EditButtonIcon
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


