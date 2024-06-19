<template>
  <div>
    <div class="">
      <h3 class="uppercase text-[18px] font-semibold">{{ title }}</h3>
    </div>

    <div class="w-full flex gap-4 items-center">
      <slot
        name="add-button"
      >
        <div class="hidden lg:block xl:block" v-if="modalButton">
          <button
            class="flex w-[156px] hover:bg-primary gap-4 bg-primary text-white px-4 items-center"
            @click="openModal">
            <img class="w-7 h-7" src="~/assets/icon/add-square.svg" alt="">
            <span v-html="$t('app.Add')"></span>
          </button>
        </div>
        <div v-else class="hidden lg:block xl:block">
          <nuxt-link
            v-if=" (gate && $can(manage_gate)) && addButton"
            :to="addRoute"

            class="flex h-[42px] w-[156px]  hover:bg-primary rounded-md gap-4 bg-primary text-white px-4 items-center"
          >
            <img class="w-7 h-7" src="~/assets/icon/add-square.svg" alt="">
            <span v-html="$t('app.Add')"></span>
          </nuxt-link>

        </div>


      </slot>
      <div v-if="enableSearch" class="related w-full">
        <img src="~/assets/icon/search-normal.svg" alt=""
             class="w-4 h-4 absolute ltr:ml-[14px] rtl:mr-[14px] mt-[13px]">
        <input type="text" placeholder="Search" class="lg:w-full w-[237px] px-34px"
               v-model="search" @change="makeSearch">
      </div>

      <table-sort
        class="mt-0"
        :order-by-options="orderByOptions"
      />


    </div>
    <!-- ---------------------mobile button---------- -->
    <slot
        name="add-button"
      >
    <div class="lg:hidden xl:hidden my-2" v-if="modalButton">

          <button
            class="flex w-full hover:bg-primary gap-4 justify-center bg-primary text-white px-4 items-center"
            @click="openModal">
            <img class="w-7 h-7" src="~/assets/icon/add-square.svg" alt="">
            <span v-html="$t('app.Add')"></span>
          </button>
        </div>
    <div v-else class="w-full mt-4 lg:hidden xl:hidden">
      <nuxt-link
        v-if=" (gate && $can(manage_gate))"
        :to="addRoute"
        class="flex justify-center h-[42px] w-full hover:bg-primary rounded-md gap-4 bg-primary text-white px-4 items-center"
      >
        <img class="w-7 h-7" src="~/assets/icon/add-square.svg" alt="">
        <span v-html="$t('app.Add')"></span>
      </nuxt-link>
    </div>
    </slot>
  </div>
</template>

<script>
import tableHelper from '~/mixin/tableHelper'
import Dropdown from "~/components/Dropdown"
import TableSort from "~/components/partials/TableSort"
import InlinePopOver from "../InlinePopOver";

export default {
  name: 'TableTop',
  data() {
    return {}
  },
  props: {
    addButton: {
      type: Boolean,
      default: true
    },
    modalButton: {
      type: Boolean,
      default: false
    },
    enableSearch: {
      type: Boolean,
      default: true
    },
    resetRoute: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
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
    orderByOptions: {
      type: Object,
      default() {
        return null
      }
    }
  },
  mixins: [tableHelper],
  components: {
    InlinePopOver,
    Dropdown,
    TableSort
  },
  computed: {
    addRoute() {
      // Removing the trailing slash
      // return this.$route.path.replace(/^\/brands(\/.*)?$/, "/brands/add");
      return `${this.$route.path.replace(/\/$/, "")}/add`
    }
  },
  methods: {
    openModal() {
      this.$emit('open-modal')
    },
    deleteBulk() {
      this.$refs.bulkDelete.closePop()
      this.$emit('delete-bulk')
    }
  },
  beforeCreate() {
  },
  destroyed() {
  },
  created() {
  }
}
</script>

