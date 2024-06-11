<script>
import {mapActions, mapGetters} from "vuex";
import LazyImage from "../LazyImage.vue";

export default {
  name: "RFQTab",
  components: {LazyImage},
  props: {
    // ActiveInquiryData: {}
  },
  data() {
    return {
      rfqInquiries: [],
      activeRfqInquiry: '',
      is_active_inq: '',
      searchQuery: '',
      formSubmitting: false,
      is_related_rfq: false,
      is_loading: false,
      ActiveInquiryData: []
    }
  },

  computed: {
    filteredInquiries() {
      return this.rfqInquiries.filter(inquiry =>
        inquiry.inquirable?.title?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        inquiry.rfq_id?.toString().toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        inquiry.user?.name?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },

    ...mapGetters('language', ['currentLanguage']),
    ...mapGetters('rfq', ['activeRfqInquiries', 'activeInquiryData']),
  },

  async mounted() {
    this.is_loading=true
    await this.getRequest({
      params: {
        // user_token: await this.getUserToken(),
      },
      api: 'getAllInquiriesRfqs',
      lang: this.currentLanguage,
    }).then(data => {
      this.rfqInquiries = data
      // this.$emit('currentInq', this.inquiries);

      this.is_loading=false
    })
  },

  methods: {
    activeParentInquiry(data) {
      if (this.activeRfqInquiry && !this.is_related_rfq) {
        this.activeRfqInquiry = false;
        this.ActiveInquiryData = false;
      } else {
        this.activeRfqInquiry = data.id;
        this.ActiveInquiryData = data;
        this.setActiveRfqInquiries(data);
      }

      // this.$emit('activeRfqInquiry', this.activeRfqInquiry);
      // this.$emit('ActiveRfqInquiryData', this.ActiveInquiryData);
    },
    async activeRelatedInquirie(data, index_sub) {
      this.setActiveInquiriesOffer(data)
      this.activeRfqInquiry = data.id;
      this.ActiveInquiryData = data;
      this.is_related_rfq = true;
      this.is_active_inq = index_sub
      // this.$emit('activeRfqInquiry', this.activeRfqInquiry);
      // this.$emit('ActiveRfqInquiryData', this.ActiveInquiryData);
      // this.$emit('is_active_inq', this.is_active_inq);
      await this.fetchingOfferData()
    },

    async fetchingOfferData() {
      try {
        this.formSubmitting = true
        const data = await this.getRequest({
          params: {
            inquiry_id: this.activeInquiryData?.id,
            tab: this.activeTab
          },
          api: 'activeInquiries',
          requiredToken: true
        });
        if (data?.status === 200) {
          await this.setActiveInquiriesOffer(data.data)
        } else {
          this.errors = data?.data?.form
        }
        this.formSubmitting = false

      } catch (e) {
        return this.$nuxt.error(e)
      }
    },

    async fetchingData() {
      try {
        this.is_loading = true
        await this.getRequest({
          params: {},
          api: 'getAllInquiriesRfqs',
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
    ...mapActions('rfq', ['setActiveInquiriesOffer', 'setActiveRfqInquiries']),
  }
}
</script>

<template>
  <div>
    <!-- RFQ tab content goes here -->
    <div class="w-full p-2">
      <form class="relative">
        <img class="w-6 h-6 ltr:ml-2 rtl:mr-2 mt-2  absolute" src="~/assets/icon/search-normal.svg"
             alt="">
        <input class="w-full rounded px-8" type="text" :placeholder="$t('products.Search')" v-model="searchQuery">
      </form>
    </div>
    <!-- ------------------ -->
    <div v-if="rfqInquiries.length > 0">
      <div
        class="w-full  cursor-pointer  items-top border-t border-smooth my-2"
        v-for="(inquirie, index) in filteredInquiries" :key="inquirie.id"
        @click="activeParentInquiry(inquirie)"
      >
        <div class="flex gap-4 p-2 items-center" :class="inquirie?.id===activeRfqInquiries?.id ?'bg-primarylight':''">
          <lazy-image
            class="h-10 w-10 object-cover rounded"
            :data-src="inquirie?.inquirable?.image"
            :alt="inquirie?.inquirable?.image"
          />

          <div>
            <p class="font-bold uppercase">RFQ{{ inquirie.rfq_id }}</p>
            <p>{{ inquirie?.inquirable?.title }}</p>
          </div>
        </div>
        <div :class="{ 'block': activeRfqInquiry === inquirie.id || is_related_rfq }"
             v-for="(related_inquirie, index_sub) in inquirie.related_inquiries"
             class="p-2 hidden border-l-2 border-l-primary border-t border-t-smooth">
          <div class="flex gap-4" @click="activeRelatedInquirie(related_inquirie, index_sub)" :class="related_inquirie?.id===activeInquiryData?.id && inquirie?.id===activeRfqInquiries?.id ?'bg-primarylight':''">
            <div class="flex gap-4 items-center">
              <img class="h-[10px] w-[38px]" src="~/assets/icon/rfqdirection.svg" alt="">
              <lazy-image
                class="h-6 w-6 object-cover rounded"
                :data-src="related_inquirie.inquirie?.inquirable?.image"
                :alt="related_inquirie.inquirie?.inquirable?.image"
              />
            </div>
            <div>
              <div class="flex justify-between">
                <span class="font-bold  font-13px" :class="{ 'text-primary': activeRfqInquiry === index }">{{ related_inquirie.inquirable?.title }}</span>
                <span class="text-smooth">{{ related_inquirie.created }}</span>
              </div>
              <span class="text-smooth font-12px">From : {{ related_inquirie.user?.name }}</span>
              <div class="flex justify-between">
                <span class="text-smooth  font-12px">INQ{{ related_inquirie.id }}</span>
                <span
                  class="p-1 rounded text-smooth bg-theemlight text-theem uppercase text-[12px]">PENDING AGREEMENT</span>
              </div>
            </div>
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
      <p>No inquiries found.</p>
    </div>
    <!-- ----------------------- -->
  </div>
</template>

<style scoped>

</style>
