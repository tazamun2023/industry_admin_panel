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
    <slot v-if="!gate || $can(gate)" name="aboveTable"/>
    <div v-if="filter">
      <slot
        name="table-top"
        v-bind:orderOptions="orderOptions"
      >

      </slot>
    </div>
    <transition
      v-if="!gate || $can(gate)"
      name="fade" mode="out-in"
    >
      <div v-if="!loading">
        <div :class="cardClass" class="card">
          <div class="table-wrapper">
            <form
              @submit.prevent="formSubmit"
              :class="{'has-error': hasError}"
            >
              <div :class="tableClass">
                <table class="mn-w-600x">
                  <slot
                    name="table"
                    v-bind:list="list"
                  />
                </table>
                <!-- ----------------------- -->
                <!-- <GlobalPagination/> -->
                <!-- ----------------------- -->
              </div>
              <slot name="checkboxArea"/>
              <div
                class="dply-felx j-right single-btn my-2"
              >

                <ajax-button
                  :class="btnClass"
                  name="save"
                  :disabled="invalid"
                  class="primary-btn w-full"
                  :text="$t('setting.sv')"
                  :fetching-data="formSubmitting "
                />
              </div>
            </form>
          </div>
        </div>
        <!--        <div class="flex justify-between">-->
        <!--          <h5 class="mt-20 mt-sm-15">{{ resultText }}</h5>-->
        <!--          <pagination-->
        <!--            :total-page="totalPage"-->
        <!--          />-->
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
import GlobalPagination from "~/components/GlobalPagination"

export default {
  name: "ListEditPage",
  props: {
    cardClass: {
      type: String,
      default: ''
    },
    btnClass: {
      type: String,
      default: ''
    },
    tableClass: {
      type: String,
      default: ''
    },
    addButton: {
      type: Boolean,
      default: true
    },
    method: {
      type: String,
      default: 'post'
    },

    setApi: {
      type: String,
      default: ''
    },
    modalButton: {
      type: Boolean,
      default: false
    },
    filter: {
      type: Boolean,
      default: true
    },
    invalid: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    param: {
      type: Object,
      default: function _default() {
        return {};
      }
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

    anotherData: {
      type: Object,
      default: function _default() {
        return {};
      }
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
          created_at: {title: this.$t('category.date')},
          title: {title: this.$t('index.title')},
          status: {title: this.$t('category.status')}
        }
      }
    },
  },
  data() {
    return {
      formSubmitting: false,
      deleting: false,
      hasError: false,
      loading: true,
      result: null,
      res: null,
    }
  },
  components: {
    Spinner,
    Pagination,
    TableTop,
    Shimmer,
    GlobalPagination
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
    ...mapActions('common', ['getById', 'setById']),

    formSubmit() {
      if (this.emitBeforeSubmit) {
        this.$emit('before-submit')
      } else {
        this.checkForm()
      }
    },
    async checkForm() {
      if (this.invalid)
        return
      // if (this.validationKeys.findIndex((i) => {
      //   const parts = i.split(".");
      //   if (i.includes("."))
      //     return (!this.result[parts[0]][parts[1]])
      //   else
      //     return (!this.result[i])
      // }) > -1) {
      //   this.hasError = true
      //   return false
      // }

      // this.redirectingEnable(event.submitter.name)
      this.formSubmitting = true
      try {

        const data = await this.setById({
          id: this.id,
          params: {data: this.result.data, ...this.anotherData},
          api: this.setApi,
          method: this.method
        })
        if (data.status = 200) {

          this.emptyAllList(this.emptyStoreVariable)

          this.saveResponce(data.data)

        } else {
          this.$refs["formWrapper"].scrollIntoView({behavior: "smooth"})
        }
      } catch (e) {
        return this.$nuxt.error(e)
      }
      this.formSubmitting = false

    },
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
        var result = await this.getRequest({
          params: {
            ...this.param,
            ...this.$route.query,
            ...this.listParams,
            ...{time_zone: this.timeZone}
          },
          api: this.listApi
        })
        this.saveResponce(result)

        this.loading = false
      } catch (e) {
        return this.$nuxt.error(e)
      }
    },
    saveResponce(res) {
      console.log("res")
      console.log(res)
      if (this.listApi === 'getSaShipping')
        this.result = res.cities
      else if (this.listApi === 'getCommissions')
        this.result = res.categories
      else
        this.result = res
      this.$emit('list', this.list)
      this.$emit('res', res)
    },

    editItem(id) {
      return this.$router.push(`/${this.routeName}/${id}`)
    },
    async deleteItem(id) {
      if (confirm(this.$t('admin.dltMsg'))) {
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

      alert("sdfdf")

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

    ...mapActions('common', ['deleteData', 'getRequest', 'emptyAllList', 'deleteBank'])
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
