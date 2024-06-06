<template>
  <div class="lg:w-[300px] w-[256px] justify-end flex gap-4 items-center">
    <img v-if="sortByType == 'asc'" @click="dropdownSelected(true, {key:'desc'})" class="w-7 h-7"
         src="~/assets/icon/frame.svg" alt="">
    <img v-if="sortByType == 'desc'" @click="dropdownSelected(true, {key:'asc'})" class="w-7 h-7 rotate-180"
         src="~/assets/icon/frame.svg" alt="">

    <div class="relative inline-block text-left">
      <div class="lg:min-w-[156px]">
        <button @click="shortDropdown" type="button"
                class="inline-flex w-full justify-between  capitalize items-center text-[13px] lg:gap-4 gap-1 px-1 rounded-[10px] bg-white p-1  text-sm font-semibold text-primary shadow-sm"
                id="menu-button" aria-expanded="true" aria-haspopup="true">
          <img style="background: #01A78133;" class="w-8 h-8 bg-primary p-2 rounded"
               src="~/assets/icon/setting-5.svg" alt="">
          {{ btnText }}
          <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
      <div v-if="dropDown"
           class="absolute right-0 z-10 mt-2 w-[156px] origin-top-right rounded-md bg-white shadow-lg   focus:outline-none"
           role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
        <div class="py-1 px-2" role="none">
          <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
          <span v-for="(option ,index) in orderByOptions"
                @click="()=>{sortBy=index;dropdownSelected(false, {key:index})}"
                :class="{'bg-primarylight text-primary': sortBy === index}"
                class="hover:bg-primarylight block rounded-[7px] cursor-pointer my-1 px-4 py-2 text-sm "
                role="menuitem"
                tabindex="-1" id="menu-item-0">{{ option.title }}</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import tableHelper from '~/mixin/tableHelper'
import Dropdown from "~/components/Dropdown"

export default {
  name: 'TableTop',
  data() {
    return {
      dropDown: false,
      btnText: '',
      orderTypeObj: {
        asc: {title: this.$t('dataPage.asc')},
        desc: {title: this.$t('dataPage.desc')}
      },
    }
  },
  props: {
    orderByOptions: {
      type: Object,
      default() {
        return null
      }
    }
  },
  mixins: [tableHelper],
  components: {
    Dropdown,
  },
  computed: {},
  methods: {
    shortDropdown() {
      this.dropDown = !this.dropDown
    }

  },
  // btnText this.$route.query.order_status
  mounted() {
    this.btnText = this.orderByOptions[this.$route.query.orderby]?.title ?? ''
  },
  beforeCreate() {
  },
  destroyed() {
  },
  created() {
  }
}
</script>

