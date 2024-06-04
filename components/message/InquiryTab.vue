<script>
import {mapActions, mapGetters} from "vuex";
import Pusher from "pusher-js";

export default {
  name: "InquiryTab",
  data() {
    return {
      is_loading: false,
      inquiries: [],
      activeInquiry: '',
      CurrentActiveInquiryData: '',
      searchQuery: '',
      formSubmitting: false
    }
  },

  methods: {
    activeInquiryData(data) {
      this.activeInquiry = data.id
      this.ActiveInquiryData = data
      this.CurrentActiveInquiryData = data
      this.$emit('activeInquiry', data.id);
      this.$emit('ActiveInquiryData', data);
      if (data.unread_message!==0){
        this.readMessage(data.id)
      }
    },
    truncateUserName(userName, maxLength = 15) {
      if (userName.length > maxLength) {
        return userName.substring(0, maxLength) + '...';
      }
      return userName;
    },
    readMessage(inquiry_id) {
      this.setRequest({
        params: {
          inquiry_id: inquiry_id,
        },
        api: 'readMessage'
      }).then(data => {
        // Enable pusher logging - don't include this in production
        Pusher.logToConsole = true;

        const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
          cluster: process.env.PUSHER_APP_CLUSTER
        });

        const channel = pusher.subscribe('chat');
        channel.bind('message', dataP => {
          try {
            this.is_loading = true
            this.fetchingData()
            this.is_loading = false

          } catch (e) {
            return this.$nuxt.error(e)
          }
        });
      })
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

    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
      cluster: process.env.PUSHER_APP_CLUSTER
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', dataP => {
      try {
        this.is_loading = true
        this.fetchingData()
        this.is_loading = false

      } catch (e) {
        return this.$nuxt.error(e)
      }
    });
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
           :class="inquirie?.inquirable_id===CurrentActiveInquiryData?.inquirable_id ?'bg-primarylight':''"
           class="w-full flex cursor-pointer gap-4 items-top p-1 border-t border-smooth  p-2">
        <!--        <img class="h-10 w-10"-->
        <!--             src="https://cfn-catalog-prod.tradeling.com/up/6329c4504efabf903adf35b1/90dffbf4ddc650b83efb80e40b39c7c3.jpg"-->
        <!--             alt="">-->
        <lazy-image
          class="h-10 w-10 object-cover rounded"
          :data-src="inquirie?.inquirable?.image"
          :alt="inquirie?.inquirable?.title"
        />
        <div class="w-full">
          <div class="flex justify-between">
            <span class="font-bold font-13px"
                  :class="inquirie?.inquirable_id===CurrentActiveInquiryData?.inquirable_id ?'text-primary':''">
               {{ truncateUserName(inquirie?.inquirable?.title, 60) }}
            </span>
            <span class="relative">
              {{ inquirie.customer_last_seen }}
              <span
                class="absolute bg-error text-white h-5 w-5 rounded-full text-[10px] text-center p-[3px] mt-[20px] ltr:right-[10px] rtl:left-[10px]"
                v-if="inquirie.unread_message">
                {{ inquirie.unread_message > 9 ? 9 : inquirie.unread_message }}
                <sup v-if="inquirie.unread_message > 9">+</sup>
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
            <span class=" font-12px">INQ{{ inquirie.inquirable_id }}</span>
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
            <span class="p-1 rounded bg-redlight text-red uppercase text-[12px]"
                  v-if="(inquirie.last_status==='rejected')">{{ $t('products.rejected') }}</span>
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
