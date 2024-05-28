<script>
import {mapActions, mapGetters} from "vuex";
import ReplyNewOffer from "@/components/message/ReplyNewOffer.vue";
import Pusher from 'pusher-js'
import da from "vue2-datepicker/locale/es/da";
export default {
  name: 'ActiveInquiry',
  components: {ReplyNewOffer},

  props: {
    ActiveInquiryData: {},
    offer_index: {},
  },

  data() {
    return {
      inserFile:false,
      is_send_new_offer: false,
      is_accept_offer: false,
      formSubmitting: false,
      is_accept_offer_index: '',
      is_send_new_offer_customer: false,
      is_send_new_offer_index: false,
      is_send_new_offer_vendor: false,
      is_cancel_new_offer_customer: false,
      is_click_accept: false,
      is_loading: false,
      activeInquiries: [],
      test: [],
      message: '',
      expired_at: ''
    }

  },
  computed: {
    ...mapGetters('language', ['currentLanguage']),
  },

  methods:{
    insertFileToggle(){
      this.inserFile = !this.inserFile
    },
    sendNewOfferAfterCancel(index) {
      this.is_cancel_new_offer_customer = false
      this.is_send_new_offer_customer = index
      this.is_send_new_offer_index = index
      this.$emit('is_send_new_offer_index', index);
    },
    async cancelOffer(offer_id) {
      // cancelOffer
      try {
        this.is_loading = true
        const data = await this.setRequest({
          params: {
            offer_id: offer_id,
            status: 'canceled',
          },
          api: 'cancelOffer',
          requiredToken: true
        })
        if (data?.status === 200) {
          this.is_send_new_offer = false
          this.is_cancel_new_offer_customer = false
          await this.fetchingData();
        } else {
          this.errors = data?.data?.form
        }
        this.is_loading = false

      } catch (e) {
        return this.$nuxt.error(e)
      }
    },
    async sendMessage() {

      // cancelOffer
      try {
        this.is_loading = true
        // const data = await this.postRequest({
        //   params: {
        //     user_token: await this.getUserToken(),
        //     inquiry_id: this.ActiveInquiryData.id,
        //     status: '',
        //     type: 'message',
        //     message: this.message
        //   },
        //   api: 'sendOffer',
        //   requiredToken: true
        // })
        await this.setRequest({
          params: {
            inquiry_id: this.ActiveInquiryData.id,
            status: '',
            type: 'message',
            message: this.message
          },
          api: 'inquiriesOfferStore'
        }).then(data=>{
          console.log(data)
          this.message = ''
          this.fetchingData();
        })
        this.is_loading = false

      } catch (e) {
        return this.$nuxt.error(e)
      }
    },
    acceptOfferModal(index){
      this.is_click_accept = index
    },
    RejectOffer(offer){
      this.setRequest({
        params: {
          offer_id: offer.id,
          inquiry_id: this.ActiveInquiryData.id,
          status: 'rejected',
          is_reply: 1,
          type: 'offer'
        },
        api: 'inquiriesOfferStore'
      }).then(data=>{
        // this.setToastMessage(this.$t('products.success_inquires_send_msg'))
        this.$emit('is_send_new_offer', false);
        this.$emit('is_send_new_offer_vendor', false);
        this.is_after_send = false
      })
    },
    async acceptOffer(index, activeInquirie){
      try {
        this.formSubmitting = true
        await this.setRequest({
          params: {
            product_id: this.ActiveInquiryData.inquirable?.id,
            quantity: this.activeInquiries?.inquiryOffers[index]?.offer?.quantity,
            visitor_id: this.ActiveInquiryData?.user?.id,
            price: this.activeInquiries?.inquiryOffers[index]?.offer?.price ,
            type: 'inquires',
          },
          api: 'acceptInquiriesOffer'
        }).then(data=>{
          console.log(data)
          // this.setToastMessage(this.$t('products.success_inquires_send_msg'))
          this.is_accept_offer = true
          // this.is_after_send = true
          this.is_accept_offer_index = index

          this.setRequest({
            params: {
              offer_id: activeInquirie.id,
              inquiry_id: this.ActiveInquiryData.id,
              product_id: this.ActiveInquiryData.product?.id??this.ActiveInquiryData?.inquirable?.id,
              status: 'approved',
              is_reply: 1,
              type: 'offer',
              expired_at: this.expired_at,
              price: this.activeInquiries?.inquiryOffers[index]?.offer?.price ,
              quantity: this.activeInquiries?.inquiryOffers[index]?.offer?.quantity
            },
            api: 'inquiriesOfferStore'
          }).then(data=>{
            // this.setToastMessage(this.$t('products.success_inquires_send_msg'))
            this.$emit('is_send_new_offer', false);
            this.$emit('is_send_new_offer_vendor', false);
            this.is_after_send = false
            this.is_click_accept = false
          })
        })
        this.formSubmitting = false
      } catch (e) {
      return this.$nuxt.error(e)
    }

      // acceptInquiriesOffer
    },
    isLastOffer(index) {
      return index === this.activeInquiries.inquiryOffers.length - 1;
    },
    getTodayFormattedDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    sendNewOffer(ev) {
      this.is_send_new_offer = ev;
      this.is_send_new_offer_customer = ev;
      this.$emit('is_send_new_offer_index', ev);
      this.fetchingData();
      this.ActiveInquiryData = this.activeInquiries
    },
    isSendNewOfferVendor(ev, activeInquirie) {
      console.log('activeInquirie', activeInquirie)
      this.is_send_new_offer_vendor = ev;
      this.is_send_new_offer_customer = ev;
      this.$emit('is_send_new_offer_index', ev);
      this.fetchingData();
      this.ActiveInquiryData = this.activeInquiries
    },
    clickCancelOffer(ev) {
      this.is_cancel_new_offer_customer = false
      this.is_send_new_offer_customer = false
      this.is_send_new_offer_vendor = false
    },

    async fetchingData() {
      try {
        this.is_loading = true;
        const data = await this.getRequest({
          params: {
            inquiry_id: this.ActiveInquiryData?.id,
          },
          api: 'activeInquiries',
        });
        this.activeInquiries = data;
      } catch (e) {
        this.$nuxt.error(e);
      } finally {
        this.is_loading = false;
      }
    },


    ...mapActions('common', ['getById', 'setById', 'setRequest', 'getRequest']),
  },

  mounted() {
    this.fetchingData();

    this.$watch('ActiveInquiryData', (newValue, oldValue) => {
      if (newValue !== oldValue) {
        this.fetchingData(); // Fetch data again when ActiveInquiryData changes
      }
    });


    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    const pusher = new Pusher('933de91b2f4d1fa5191a', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', dataP => {
      try {
        this.is_loading = true
          this.getRequest({
          params: {
            inquiry_id: dataP.message.inquiry_id,
          },
          api: 'activeInquiries'
        }).then(data =>{
            this.activeInquiries = data
        })

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
    <div v-if="activeInquiries">
      <div class="relative  min-w-0 break-words w-full rounded">
        <div class="flex-auto">
          <div class="tab-content tab-space">
            <div class="border-b  border-smooth">
              <div class="flex py-1 px-4 justify-between items-center">
                <div class="flex gap-4 items-center">
                  <lazy-image
                    class="w-[38px] h-[38px] object-cover rounded"
                    :data-src="activeInquiries?.vendor?.logo"
                    :alt="activeInquiries?.vendor?.local_name"
                  />
                  <span>{{ ActiveInquiryData?.user?.name }}</span>
                </div>
                <div>
                  <p class="text-smooth">{{ $t('products.Last Seen') }}: March 15, 2024 3:25 PM</p>
                </div>
              </div>
            </div>
            <div class="h-[700px] overflow-y-scroll scrolly">
              <!-- -------------------message card user--------------- -->
              <div v-for="(activeInquirie, index) in activeInquiries.inquiryOffers">
                <!--        vendor reply-->
                <div class="lg:grid lg:grid-cols-2 w-full" v-if="activeInquirie.is_reply===0">
                  <p class="text-xs text-smooth py-2 px-4">
                    {{ activeInquirie.user?.username }}, {{ activeInquirie.created }}</p>
                  <div class="messenger  w-full" v-if="activeInquirie.offer.type==='offer'">
                    <div class="card rounded-lg shadow m-2">
                      <div class="bg-graylight font-bold rounded-t p-2">OFF{{ activeInquirie.id }}</div>
                      <div class="p-4">
                        <a class="text-primary font-bold" href="">{{ activeInquiries?.inquirable?.title }}</a>
                        <div class="grid grid-cols-2 border-b p-2 border-smooth gap-2">
                          <div class="flex items-center gap-4">
                            <lazy-image
                              class="h-10 w-10 object-cover rounded"
                              :data-src="activeInquirie?.product?.image"
                              :alt="activeInquirie?.product?.title"
                            />
                            <span class="text-smooth" v-if="activeInquiries?.inquirable?.product_prices"><del>{{activeInquiries?.inquirable?.product_prices[0]?.selling_price }} {{ $t('app.SAR') }}</del></span>
                          </div>
                          <div>
                            <div class="flex justify-between p-1">
                              <span>{{ $t('products.Quantity') }}</span>
                              <span><span class="text-primary">{{
                                  activeInquirie?.offer?.quantity
                                }}</span> {{ activeInquiries.offer?.unit?.name }}</span>
                            </div>
                            <div class="flex justify-between p-1">
                              <span>{{ $t('products.Unit target price') }}</span>
                              <span><span class="font-bold">{{
                                  activeInquirie.offer.price
                                }}</span> <span
                                class="text-primary">{{ $t('app.SAR') }}</span></span>
                            </div>
                          </div>
                        </div>
                        <div class="grid grid-cols-2 p-2">
                          <div></div>
                          <div class="text-end flex justify-between">
                            <span>{{ $t('products.Total Price excl VAT') }}</span>
                            <span><span class="font-bold">{{   activeInquirie.offer.price * activeInquirie.offer.quantity }}</span> <span
                              class="text-primary"> SAR</span></span>
                          </div>
                        </div>
                        <!-- --------------end-------- -->
                        <div v-if="activeInquirie.status!=='canceled' && !is_send_new_offer_vendor">
                          <p class="p-2 bg-warning rounded" v-if="activeInquirie.status==='rejected'">{{ $t('prod.Rejected by Buyer') }}</p>
                          <p class="p-2 bg-error text-white rounded" v-else-if="activeInquirie.status==='expired'">{{ $t('prod.Expired on') }} {{ activeInquirie?.offer?.expired_at }}</p>
<!--                          <p class="p-2 bg-primarylight rounded" v-else>{{ $t('products.Offer sent message') }}</p>-->
                          <div class="flex justify-end gap-4 pt-4">
<!--                            <button @click="acceptOffer(index)"-->
<!--                                    class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">-->
<!--                              {{ $t('products.Accept Offer') }}-->
<!--                            </button>-->
<!--                            acceptOffer(index, activeInquirie)-->

                            <button @click="acceptOfferModal(index)"
                                    v-if="activeInquirie.status!=='approved' && activeInquirie.status!=='rejected' && !is_click_accept && activeInquirie.status !== 'expired'"
                                    class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                              {{ $t('products.Accept Offer') }}
                            </button>

                            <button @click="RejectOffer(activeInquirie)"
                                    v-if="activeInquirie.status!=='rejected' && !is_click_accept && activeInquirie.status !== 'expired'"
                                    class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                              {{ $t('prod.Reject') }}
                            </button>

<!--                            <button @click="is_cancel_new_offer_customer=activeInquirie.id"-->
<!--                                    class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">-->
<!--                              {{ $t('prod.cancel') }}-->
<!--                            </button>-->

                            <button @click="isSendNewOfferVendor(index, activeInquirie)"
                                    v-if="!is_click_accept"
                                    class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                              {{ $t('products.Send New Offer') }}
                            </button>
                          </div>
                        </div>
                        <!-- ---------end-------- -->
                        <!-- ---------------------- -->
                        <div v-if="is_cancel_new_offer_customer===activeInquirie.id">
                          <p class="p-2 bg-warning rounded">{{ $t('products.Are you sure you want to cancel')}}</p>
                          <div class="flex justify-end gap-4 pt-4">
                            <button @click="is_cancel_new_offer_customer=false"
                                    class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                              {{ $t('products.No')}}
                            </button>
                            <button @click="cancelOffer(activeInquirie.id)"
                                    class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                              {{  $t('products.Cancel')}}
                            </button>
                          </div>
                        </div>
                        <!-- ---------end-------- -->
                        <!-- ---------------------- -->
                        <div v-if="activeInquirie.status==='canceled'">
                          <p class="p-2 bg-warning rounded">{{ $t('prod.Canceled by Buyer') }}</p>
                          <div class="flex justify-end gap-4 pt-4">
<!--                            <button @click="is_send_new_offer_vendor=index"-->
<!--                                    class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">-->
<!--                              {{ $t('products.Send New Offer') }}-->
<!--                            </button>-->
                          </div>
                        </div>
                        <!-- ---------end-------- -->
                        <!-- -------------- -->
                        <div class="flex justify-between gap-4 pt-4" v-if="is_click_accept===index">
                          <p class="w-50">{{ $t('prod.Validate until') }}</p>
                          <input
                            class="p-2 rounded"
                            :placeholder="$t('prod.Validate until')"
                            type="date"
                            :min="getTodayFormattedDate()"
                            v-model="expired_at"
                          >
                        </div>
                        <div class="flex justify-end gap-4 pt-2" v-if="is_click_accept===index">
                          <button @click="is_click_accept=false"
                                  class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                            {{ $t('products.Cancel') }}
                          </button>
                          <button
                            :disabled="!expired_at"
                            @click="acceptOffer(index, activeInquirie)"
                            class="border-2 border-primary px-2 h-[34px] leading-3 bg-primary text-white font-bold">
                            {{ $t('products.Confirm') }}
                          </button>
                        </div>
                        <ReplyNewOffer
                          v-if="is_send_new_offer_vendor===index"
                          :ActiveInquiryData="activeInquirie"
                          @is_send_new_offer="sendNewOffer"
                          :is_send_new_offer_vendor="is_send_new_offer_vendor"
                          :offer_index="offer_index"
                          @is_send_new_offer_vendor="isSendNewOfferVendor"
                          @is_cancel="clickCancelOffer"
                        />

                        <!-- ---------------------- -->
                      </div>
                    </div>

                  </div>
                  <!--        vendor reply-->
                  <!-- -------------------message --------------- -->
                  <div class="w-full" v-if="activeInquirie.offer.type==='message'">
                    <div class="messenger m-2 bg-smooth p-4 rounded">
                      <p>{{ activeInquirie.offer.message }}</p>
                    </div>
<!--                    <p class="text-xs text-smooth py-2 text-end px-4">****, January 15, 2024 6:48 PM</p>-->
                  </div>
                  <!-- -------------------message card end--------------- -->

                </div>
                <div class="lg:grid lg:grid-cols-2 w-full" v-if="activeInquirie.is_reply===1">
                  <div class="messenger w-full" v-if="activeInquirie.offer.type==='offer'">
                    <div class="card rounded-lg shadow m-2">
                      <div class="bg-graylight rounded-t p-2">OFF{{ activeInquirie.id }}</div>
                      <div class="p-4">
                        <a class="text-primary font-bold" href="">{{ activeInquiries?.inquirable?.title }}</a>
                        <div class="grid grid-cols-2 border-b p-2 border-smooth gap-2">
                          <div class="flex items-center gap-4">
                            <lazy-image
                              class="h-10 w-10 object-cover rounded"
                              :data-src="activeInquirie?.product?.image"
                              :alt="activeInquirie?.product?.title"
                            />
                            <span class="text-smooth" v-if="activeInquiries?.inquirable?.product_prices"><del>{{activeInquiries?.inquirable?.product_prices[0]?.selling_price }} {{ $t('app.SAR') }}</del></span>
                          </div>
                          <div>
                            <div class="flex justify-between p-1">
                              <span>{{ $t('products.Quantity') }}</span>
                              <span><span class="text-primary">{{
                                  activeInquirie?.offer?.quantity
                                }}</span> {{ activeInquiries.offer?.unit?.name }}</span>
                            </div>
                            <div class="flex justify-between p-1">
                              <span>{{ $t('products.Unit target price') }}</span>
                              <span><span class="font-bold">{{
                                  activeInquirie.offer.price
                                }}</span> <span
                                class="text-primary">{{ $t('app.SAR') }}</span></span>
                            </div>
                          </div>
                        </div>
                        <div class="grid grid-cols-2 p-2">
                          <div></div>
                          <div class="text-end flex justify-between">
                            <span>{{ $t('products.Total Price excl VAT') }}</span>
                            <span><span class="font-bold">{{ activeInquirie.offer.price * activeInquirie.offer.quantity}}</span> <span
                              class="text-primary"> SAR</span></span>
                          </div>
                        </div>
                        <!-- --------------end-------- -->
                        <div v-if="activeInquirie.status!=='canceled' && !is_send_new_offer_vendor">
                          <p class="p-2 bg-warning text-white rounded" v-if="activeInquirie.status==='rejected'">{{ $t('prod.Rejected') }}</p>
                          <p class="p-2 bg-error text-white rounded" v-else-if="activeInquirie.status==='expired'">{{ $t('prod.Expired on') }} {{ activeInquirie?.offer?.expired_at }}</p>
                          <p class="p-2 bg-primarylight rounded" v-else>{{ $t('prod.Offer sent') }} {{  activeInquirie?.offer?.expired_at }}</p>
                          <div class="flex justify-end gap-4 pt-4">
                            <button @click="is_cancel_new_offer_customer=activeInquirie.id"
                                    v-if="activeInquirie.status!=='rejected' && activeInquirie.status!=='expired'"
                                    class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                              {{ $t('products.Cancel Offer') }}
                            </button>
<!--                            <button @click="acceptOffer(index)"-->
<!--                                    v-if="activeInquirie.status!=='approved'"-->
<!--                                    class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">-->
<!--                              {{ $t('products.Accept Offer') }}-->
<!--                            </button>-->
                            <button @click="isSendNewOfferVendor(index)"
                                    class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                              {{ $t('products.Send New Offer') }}
                            </button>
                          </div>
                        </div>
                        <!-- ---------end-------- -->
                        <!-- ---------------------- -->
                        <div v-if="is_cancel_new_offer_customer===activeInquirie.id">
                          <p class="p-2 bg-warning rounded">{{ $t('products.Are you sure you want to cancel')}}</p>
                          <div class="flex justify-end gap-4 pt-4">
                            <button @click="is_cancel_new_offer_customer=false"
                                    class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                              {{ $t('products.No')}}
                            </button>
                            <button @click="cancelOffer(activeInquirie.id)"
                                    class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                              {{  $t('products.Cancel')}}
                            </button>
                          </div>
                        </div>
                        <!-- ---------end-------- -->
                        <!-- ---------------------- -->
                        <div v-if="activeInquirie.status==='canceled'">
                          <p class="p-2 bg-warning rounded">{{ $t('products.Cancelled Well let Seller know') }}</p>
                          <div class="flex justify-end gap-4 pt-4">
                            <button @click="is_send_new_offer_vendor=index"
                                    :disabled="!isLastOffer(index)"
                                    :style="{ cursor: isLastOffer(index) ? '' : 'not-allowed' }"
                                    class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                              {{ $t('products.Send New Offer') }}
                            </button>
                          </div>
                        </div>
                        <!-- ---------end-------- -->
                        <!-- -------------- -->

                        <ReplyNewOffer
                          v-if="is_send_new_offer_vendor===index"
                          :ActiveInquiryData="activeInquirie"
                          @is_send_new_offer="sendNewOffer"
                          :is_send_new_offer_vendor="is_send_new_offer_vendor"
                          :offer_index="offer_index"
                          @is_send_new_offer_vendor="isSendNewOfferVendor"
                          @is_cancel="clickCancelOffer"
                        />

                        <!-- ---------------------- -->
                      </div>
                    </div>

                  </div>
                  <!--        vendor reply-->
                  <!-- -------------------message --------------- -->
                  <div class="messenger w-full" v-if="activeInquirie.offer.type==='message'">

                    <div class="messenger m-2 bg-smooth p-4 rounded">
                      <p>{{ activeInquirie.offer.message }}</p>
                    </div>
                  </div>
                  <p class="text-xs text-smooth text-end px-4">
                    {{ activeInquirie.vendor?.name }}, {{ activeInquirie.created }}
                  </p>
                </div>

              </div>
            </div>
            <!--    <ValidationObserver v-slot="{ invalid }">-->
            <div class="p-4 border-t border-l border-smooth">
              <!--        <ValidationProvider class="w-full" name="message" rules="required" v-slot="{ errors }"-->
              <!--                            :custom-messages="{required: `${$t('products.Message')} is Required`}">-->
              <div class="flex gap-4">
                <div class="relative inline-block text-left">
                  <div v-if="inserFile" class="absolute  mt-[-185px] w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div class="py-1" role="none">
                      <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                      <label class="flex items-center  cursor-pointer gap-3 font-bold text-theem px-4 py-2 text-sm" for="Documents" tabindex="-1" id="menu-item-0"><img class="h-5 w-5" src="~/assets/icon/document-g.svg" alt="">Documents <input type="file" hidden name="" id="Documents"></label>
                      <label class="flex items-center  cursor-pointer gap-3 font-bold text-theem px-4 py-2 text-sm" for="Photo" tabindex="-1" id="menu-item-1"><img class="h-5 w-5" src="~/assets/icon/gallery.svg" alt=""> Photo & videos <input type="file" hidden name="" id="Photo"></label>
                      <label class="flex items-center  cursor-pointer gap-3 font-bold text-theem px-4 py-2 text-sm" for="menuitem" tabindex="-1" id="menu-item-2"><img class="h-5 w-5" src="~/assets/icon/camera.svg" alt=""> Camera</label>
                      <label class="flex items-center  cursor-pointer gap-3 font-bold text-theem px-4 py-2 text-sm" for="menuitem" tabindex="-1" id="menu-item-2"><img class="h-5 w-5" src="~/assets/icon/paperclip.svg" alt=""> Links</label>
                    </div>
                  </div>
                  <img @click="insertFileToggle" :class="{ rottet: inserFile }" class="cursor-pointer" id="menu-button" src="~/assets/icon/plus-g.svg" alt="">
                </div>
                <input
                  :placeholder="$t('products.Message')"
                  class="w-full rounded-lg px-4"
                  type="text"
                  v-model="message"
                >

                <button
                  @click="sendMessage"
                  :class="['bg-theem', 'w-[100px]', 'text-center', 'rounded-lg', 'font-bold', 'text-white', 'leading-3', 'flex', 'gap-2', 'mx-auto', 'justify-center', 'items-center', 'px-2', { 'opacity-50 cursor-not-allowed': formSubmitting }]"
                  :disabled="formSubmitting"
                >
                  <img v-if="!formSubmitting" class="w-5 h-5" src="~/assets/icon/send-2.svg" alt="">
                  <img v-else class="w-5 h-5" src="~/assets/icon/loading.svg" alt="">
                  <span>{{ formSubmitting ? $t('products.Sending') : $t('products.Send') }}</span>
                </button>
              </div>
              <!--      <span class="error">{{ errors[0] }}</span>-->
              <!--        </ValidationProvider>-->
            </div>
            <!--    </ValidationObserver>-->
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="is_loading">
      <spinner
        :radius="60"
        color="primary"
        class="mr-15 justify-center"
      />
    </div>
    <div v-else>
      no data
    </div>
  </div>
</template>

<style scoped>
.rottet{
  transform: rotate(45deg);
}
</style>
