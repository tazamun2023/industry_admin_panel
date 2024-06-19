<template>
  <div :class="{loading: loading}">

    <div
      v-if="deleting"
      class="spinner-wrapper"
    >
      <spinner
        :radius="60"
        color="primary"
        class="mr-15"
      />
    </div>
    <slot name="tab-access-managment"></slot>
    <div v-if="filter">
      <slot
        name="table-top"
        v-bind:orderOptions="orderOptions"
      >
        <table-top
          :title="name"
          :gate="gate"
          :manage_gate="manage_gate"
          :add-button="addButton"
          :modal-button="modalButton"
          :order-by-options="orderOptions"
          @open-modal="openModal"
          @delete-bulk="deleteBulk"
        >
          <slot
            name="add-button"
          >
          </slot>
        </table-top>
      </slot>
    </div>

    <transition
      v-if="!gate || $can(gate)"
      name="fade" mode="out-in"
    >
      <div v-if="!loading">
        <div class="card">
          <div class="table-wrapper">
            <table class="lg:mn-w-600x">
              <slot
                name="table"
                v-bind:list="list"
              />
            </table>
          </div>
        </div>

        <!--        <div class="flex justify-between">-->
        <!--          <h5 class="mt-20 mt-sm-15">{{ resultText }}</h5>-->
        <pagination
          :total-page="totalPage"
        />
        <!--      </div>-->

      </div>
      <shimmer
        v-else
      />
    </transition>

  </div>
</template>

<script>
import Shimmer from '~/components/Shimmer'
import util from '~/mixin/util'
import {mapGetters, mapActions} from 'vuex'
import Pagination from "~/components/partials/Pagination"
import TableTop from "~/components/partials/TableTop"
import routeParamHelper from "~/mixin/routeParamHelper"
import Spinner from "~/components/Spinner"

export default {
  name: "ListPage",
  props: {
    addButton: {
      type: Boolean,
      default: true
    },
    modalButton: {
      type: Boolean,
      default: false
    },
    filter: {
      type: Boolean,
      default: true
    },
    name: {
      type: String,
      default: ''
    },
    param: {
      type: Object,
      default: null
    },
    gate: {
      type: String,
      default: null
    },
    manage_gate: {
      type: String,
      default: null
    },
    listApi: {
      type: String,
      default: ''
    },
    deleteApi: {
      type: String,
      default: ''
    },
    routeName: {
      type: String,
      default: ''
    },
    emptyStoreVariable: {
      type: String,
      default: null
    },
    orderOptions: {
      type: Object,
      default() {
        return {
          updated_at: {title: this.$t('category.date')},
          title: {title: this.$t('index.title')},
          status: {title: this.$t('category.status')}
        }
      }
    },
  },
  data() {
    return {
      deleting: false,
      loading: true,
      result: null,
    }
  },
  components: {
    Spinner,
    Pagination,
    TableTop,
    Shimmer
  },
  mixins: [util, routeParamHelper],
  computed: {
    resultText() {
      if (this.result) {
        if (this.result?.total > 0) {
          return this.$t('list.show', {from: this.result?.from, to: this.result?.to, total: this.result?.total})
        }
        return this.$t('list.noData', {data: this.name})
      }
      return this.$t('list.loadn') + '...'
    },
    list() {
      return this.result?.data
    },
    totalPage() {
      return this.result?.last_page
    },
    ...mapGetters('language', ['currentLanguage']),
  },
  methods: {
    openModal() {
      this.$emit('open-modal')
    },
    deleteBulk() {
      this.$emit('delete-bulk')
    },
    async fetchingData() {
      try {
        this.settingRouteParam()
        this.loading = true
        this.result = await this.getRequest({
          params: {
            ...this.param,
            ...this.$route.query,
            ...this.listParams,
            osama:'osama',
            ...{time_zone: this.timeZone}
          },
          api: this.listApi
        })
        this.$emit('list', this.list)

        this.loading = false
      } catch (e) {
        return this.$nuxt.error(e)
      }
    },
    editItem(id) {
      return this.$router.push(`/${this.routeName}/${id}`)
    },
    async deleteItem(id) {

      const res = await this.swetAlertFire({
        params: {
          title: this.$i18n.t('vendor.deletemessage') ,
          text: this.$i18n.t('approvedModal.revert'),
        }
      })
      if (res) {
        try {
          this.deleting = true
          await this.deleteData({params: id, api: this.deleteApi})
          this.emptyAllList(this.emptyStoreVariable)
          this.$emit('deleted')
          this.deleting = false
          await this.fetchingData()
        } catch (e) {
          return this.$nuxt.error(e)
        }
      }
    },
    async deleteItemInv(id, api) {
      const res = await this.swetAlertFire({
        params: {
          title: this.$i18n.t('approvedModal.sure'),
          text: this.$i18n.t('approvedModal.revert'),
        }
      })
      if (res) {
        this.deleting = true
        await this.deleteData({params: id, api: api})
        this.emptyAllList(this.emptyStoreVariable)
        this.$emit('deleted')
        this.deleting = false
        await this.fetchingData()
      }
    },

    async deleteItemWithModal(id) {
      try {
        this.deleting = true
        await this.deleteData({params: id, api: this.deleteApi})
        this.emptyAllList(this.emptyStoreVariable)
        this.$emit('deleted')
        this.deleting = false
        await this.fetchingData()
      } catch (e) {
        return this.$nuxt.error(e)
      }
    },
    async deleteContentItem(id) {
      try {
        this.deleting = true
        await this.deleteData({params: id, api: this.deleteApi})
        this.emptyAllList(this.emptyStoreVariable)
        this.$emit('deleted')
        this.deleting = false
        await this.fetchingData()
      } catch (e) {
        return this.$nuxt.error(e)
      }
    },

    async deleteBankItem(id, params) {

      // alert("sdfdf")

      try {
        this.deleting = true
        await this.deleteBank({
          id: id,
          params: {...params},
          api: 'DeleteVendorBank'
        })
        this.emptyAllList(this.emptyStoreVariable)
        this.$emit('deleted')
        this.deleting = false
        await this.fetchingData()
      } catch (e) {
        return this.$nuxt.error(e)
      }
    },

    ...mapActions('common', ['deleteData', 'getRequest', 'emptyAllList', 'deleteBank', 'swetAlertFire'])
  },
  mounted() {
    if (!this.gate || this.$can(this.gate)) {
      this.fetchingData()
    }
  }
}
</script>

<style scoped>

</style>
