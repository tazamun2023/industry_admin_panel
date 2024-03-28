<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "InquiryTab",
  data() {
    return {
      is_loading: false,
      inquiries: [],
      activeInquiry: '',
      searchQuery: '',
      formSubmitting: false
    }
  },

  methods: {
    activeInquiryData(data) {
      this.activeInquiry = data.id
      this.ActiveInquiryData = data
      this.$emit('activeInquiry', data.id);
      this.$emit('ActiveInquiryData', data);
    },
    searchInquiries() {
      // this.filteredInquiries()
    },

    async fetchingData() {
      try {
        this.is_loading = true
        await this.getRequest({
          params: {},
          api: 'getAllInquiries',
          requiredToken: true,
          lang: this.currentLanguage,
        }).then((data => {
          this.inquiries = data
          this.$emit('currentInq', this.inquiries);
          this.is_loading = false
        }))


      } catch (e) {
        return this.$nuxt.error(e)
      }
    },

    ...mapActions('common', ['getById', 'setById', 'setRequest', 'getRequest']),
    // ...mapGetters('language', ['langCode', 'currentLanguage', 'languages']),
  },

  computed: {
    filteredInquiries() {
      return this.inquiries.filter(inquiry =>
        inquiry.product?.title?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        inquiry.inquirable_id?.toString().toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        inquiry.user?.name?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    ...mapGetters('language', ['currentLanguage']),
  },


  async mounted() {
    this.is_loading = true
    await this.fetchingData()
    this.is_loading = false
  }
}
</script>

<template>
  <div>
    <!-- Inquiry tab content goes here -->
    <div class="w-full p-2">
      <form class="relative">
        <img class="w-6 h-6 ltr:ml-2 rtl:mr-2 mt-2  absolute" src="~/assets/icon/search-normal.svg" alt="">
        <input class="w-full rounded px-8" type="text" placeholder="Search" v-model="searchQuery">
      </form>
    </div>
    <div v-if="inquiries.length > 0">
      <div v-for="(inquirie, index) in filteredInquiries" :key="inquirie.id"
           @click="activeInquiryData(inquirie)"
           class="w-full flex cursor-pointer gap-4 items-top p-1 border-t border-smooth my-2 p-2">
        <!--        <img class="h-10 w-10"-->
        <!--             src="https://cfn-catalog-prod.tradeling.com/up/6329c4504efabf903adf35b1/90dffbf4ddc650b83efb80e40b39c7c3.jpg"-->
        <!--             alt="">-->
        <lazy-image
          class="h-10 w-10 object-cover rounded"
          :data-src="inquirie?.product?.image"
          :alt="inquirie?.product?.title"
        />
        <div>
          <div class="flex justify-between">
            <span class="font-bold  font-13px" :class="{ 'text-theem': activeInquiry === index }">
               {{ inquirie?.product?.title }}
            </span>
            <span class="text-smooth">{{ inquirie.offers[inquirie.offers.length - 1].created }}</span>
          </div>
          <span class="text-smooth text-[12px]">From : {{ inquirie.user.name }}</span>
          <div class="flex justify-between">
            <span class="text-smooth  font-12px">INQ{{ inquirie.inquirable_id }}</span>
            <span class="p-1 rounded text-smooth bg-theemlight text-theem uppercase font-12px"
                  v-if="(inquirie.offers[inquirie.offers.length - 1].status==='pending_response')">PENDING RESPONSE</span>
            <span class="p-1 rounded text-smooth bg-theemlight text-theem uppercase font-12px"
                  v-if="(inquirie.offers[inquirie.offers.length - 1].status==='pending_agreement')">PENDING AGREEMENT</span>
            <span class="p-1 rounded bg-redlight text-red uppercase text-[12px]"
                  v-if="(inquirie.offers[inquirie.offers.length - 1].status==='expired')">expired</span>
            <span class="p-1 rounded bg-warninglight text-error uppercase text-[12px]"
                  v-if="(inquirie.offers[inquirie.offers.length - 1].status==='canceled')">canceled</span>
            <span class="p-1 rounded bg-primarylight text-primary uppercase text-[12px]"
                  v-if="(inquirie.offers[inquirie.offers.length - 1].status==='approved')">approved</span>
            <span class="p-1 rounded bg-redlight text-red uppercase text-[12px]"
                  v-if="(inquirie.offers[inquirie.offers.length - 1].status==='rejected')">rejected</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="is_loading" class="spinner-wrapper">
      <spinner
        :radius="60"
        color="primary"
        class="mr-15"
      />
    </div>
    <div v-else>
      No data found
    </div>
  </div>
</template>

<style scoped>

</style>
