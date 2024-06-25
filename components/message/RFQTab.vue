<script>
import {mapActions, mapGetters} from "vuex";
import LazyImage from "../LazyImage.vue";
import Pusher from 'pusher-js'

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
    ...mapGetters('rfq', ['activeRfqInquiries', 'activeInquiryData', 'isReadMessage', 'isFetchingRfqOffer']),
  },

  async mounted() {
    await this.fetchingData();


    Pusher.logToConsole = true;
    const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
      cluster: process.env.PUSHER_APP_CLUSTER
    });
    const vendorId = this.$store.$auth.user.user.vendor_id;
    const channel = pusher.subscribe(`chat${vendorId}`);
    channel.bind('message', pusherResponse => {
      if (pusherResponse.recipientUserId === vendorId) {
        this.fetchingData();
      }


    });
  },
  watch: {
    isReadMessage(newVal) {
      if (newVal) {
        this.handleReadMessage();
      }
    },
    isFetchingRfqOffer(newVal) {
      if (newVal) {
        this.handleReadMessage();
      }
    }
  },
  methods: {
    async handleReadMessage() {
      await this.fetchingData();
      this.clearIsReadMessage();
      this.clearIsFetchingRfq();
    },
    readMessage(inquiry_id) {
      this.setRequest({
        params: {
          inquiry_id: inquiry_id,
        },
        api: 'readMessage'
      }).then(data => {
        this.setIsReadMessage()
      })
    },
    activeParentInquiry(data) {
      if (this.activeRfqInquiry && !this.is_related_rfq) {
        this.activeRfqInquiry = false;
        this.ActiveInquiryData = false;
        this.clearActiveRfqData()
        this.clearActiveInquiriesOffers()
      } else {
        this.is_related_rfq = false;
        this.activeRfqInquiry = data.id;
        this.ActiveInquiryData = data;
        this.setActiveRfqInquiries(data);
      }

      // this.$emit('activeRfqInquiry', this.activeRfqInquiry);
      // this.$emit('ActiveRfqInquiryData', this.ActiveInquiryData);
    },

    truncateUserName(userName, maxLength = 15) {
      if (userName.length > maxLength) {
        return userName.substring(0, maxLength) + '...';
      }
      return userName;
    },
    async activeRelatedInquirie(data, index_sub) {
      if (this.$store.state.admin.isVendor && data.unread_message>0){
        this.readMessage(data.id)
        this.setIsReadMessage()
      }
      this.setInquiriesOfferIndex(index_sub)
      this.setActiveInquiriesOffer(data)
      this.activeRfqInquiry = data.id;
      this.ActiveInquiryData = data;
      this.is_related_rfq = true;
      this.is_active_inq = index_sub
      // this.$emit('activeRfqInquiry', this.activeRfqInquiry);
      // this.$emit('ActiveRfqInquiryData', this.ActiveInquiryData);
      // this.$emit('is_active_inq', this.is_active_inq);
      // console.log('activeInquiryData kk', this.activeRfqInquiries)
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
        // console.log('data.data', data)
        if (data) {
          await this.setActiveInquiriesOffer(data)
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
          this.rfqInquiries = data
          this.is_loading = false
        }))


      } catch (e) {
        return this.$nuxt.error(e)
      }
    },

    ...mapActions('common', ['getById', 'setById', 'setRequest', 'getRequest']),
    ...mapActions('rfq', ['setActiveInquiriesOffer', 'setActiveRfqInquiries', 'setInquiriesOfferIndex',
      'clearIsInquiriesOfferIndex', 'clearActiveRfqData', 'clearActiveInquiriesOffers', 'setIsReadMessage', 'clearIsFetchingRfq', 'clearIsReadMessage'
    ]),
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
      <transition-group name="list" tag="div">
      <div
        class="w-full  cursor-pointer  items-top border-t border-smooth"
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
             class="hidden border-l-2 border-l-primary border-t border-t-smooth">
          <div class="flex gap-4" @click="activeRelatedInquirie(related_inquirie, index_sub)"
               :class="related_inquirie?.id===activeInquiryData?.id && inquirie?.id===activeRfqInquiries?.id ?'bg-primarylight':''">
            <div class="flex gap-4 items-center">
              <img class="h-[10px] w-[38px]" src="~/assets/icon/rfqdirection.svg" alt="">
              <lazy-image
                class="h-6 w-6 object-cover rounded"
                :data-src="related_inquirie?.inquirable?.image"
                :alt="related_inquirie?.inquirable?.image"
              />
            </div>
            <div class="w-full">
              <div class="flex justify-between">
                <span class="font-bold  font-13px" :class="{ 'text-primary': activeRfqInquiry === index }">{{
                    related_inquirie.inquirable?.title
                  }}</span>

                <span class="relative ml-2">
                  {{ related_inquirie.created }}
                  <span
                    class="absolute bg-error text-white h-5 w-5 rounded-full text-[10px] text-center p-[3px] mt-[20px] ltr:right-[10px] rtl:left-[10px]"
                    v-if="related_inquirie.unread_message">
                    {{ related_inquirie.unread_message > 9 ? 9 : related_inquirie.unread_message }}
                    <sup v-if="related_inquirie.unread_message > 9">+</sup>
                  </span>
                </span>
              </div>
              <span class=" text-[12px]" v-if="$store.state.admin.isSuperAdmin">
          <!-- {{$t('prod.From')}} : -->
             {{ inquirie.user.name }} - {{ $t('prod.To') }} : {{ inquirie.vendor.name }}</span>
              <span class="text-[12px]" v-if="$store.state.admin.isVendor">
                <!-- {{ $t('prod.From') }} : -->
                 {{ truncateUserName(inquirie.user.name) }}
              </span>
              <div class="flex justify-between">
                <span class=" font-12px">INQ{{ related_inquirie.id }}</span>
                <span class="p-1 rounded  bg-theemlight text-theem uppercase font-12px"
                      v-if="(inquirie.last_status==='pending_response')">{{ $t('products.PENDING RESPONSE') }}</span>
                <span class="p-1 rounded  bg-theemlight text-theem uppercase font-12px"
                      v-if="(inquirie.last_status==='pending_agreement')">{{ $t('products.PENDING AGREEMENT') }}</span>
                <span class="p-1 rounded bg-redlight text-red uppercase text-[12px]"
                      v-if="(inquirie.last_status==='expired')">{{ $t('products.expired') }}</span>
                <span class="p-1 rounded bg-warninglight text-error uppercase text-[12px]"
                      v-if="(inquirie.last_status==='canceled')">{{ $t('products.canceled') }}</span>
                <span class="p-1 rounded bg-primarylight text-primary uppercase text-[12px]"
                      v-if="(inquirie.last_status==='approved')">{{ $t('products.approved') }}</span>
                <span class="p-1 rounded bg-primarylight text-primary uppercase text-[12px]"
                      v-if="(inquirie.last_status==='order_placed')">{{ $t('products.Order Placed') }}</span>
                <span class="p-1 rounded bg-redlight text-red uppercase text-[12px]"
                      v-if="(inquirie.last_status==='rejected')">{{ $t('products.rejected') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </transition-group>
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
.list-enter-active, .list-leave-active, .list-move {
  transition: all 0.3s ease;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.list-enter-to, .list-leave {
  opacity: 1;
  transform: translateY(0);
}
</style>


