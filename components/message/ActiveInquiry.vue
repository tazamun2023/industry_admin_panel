<script>
import {mapActions, mapGetters} from "vuex";
import ReplyNewOffer from "@/components/message/ReplyNewOffer.vue";
import Pusher from 'pusher-js'
export default {
  name: 'ActiveInquiry',
  components: {ReplyNewOffer},

  props: {
    ActiveInquiryData: {},
    offer_index: {},
  },

  data() {
    return {
      is_send_new_offer: false,
      is_send_new_offer_customer: false,
      is_send_new_offer_index: false,
      is_send_new_offer_vendor: false,
      is_cancel_new_offer_customer: false,
      is_loading: false,
      activeInquiries: [],
      test: [],
      message: ''
    }

  },
  computed: {
    ...mapGetters('language', ['currentLanguage']),
  },

  methods:{
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
        const data = await this.postRequest({
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
        const data = await this.postRequest({
          params: {
            user_token: await this.getUserToken(),
            inquiry_id: this.ActiveInquiryData.id,
            status: '',
            type: 'message',
            message: this.message
          },
          api: 'sendOffer',
          requiredToken: true
        })
        if (data?.status === 200) {
          // this.setToastMessage(this.$t('products.Message Sent'))
          this.message = ''
          await this.fetchingData();
        } else {
          this.errors = data?.data?.form
        }
        this.is_loading = false

      } catch (e) {
        return this.$nuxt.error(e)
      }
    },

    sendNewOffer(ev) {
      this.is_send_new_offer = ev;
      this.is_send_new_offer_customer = ev;
      this.$emit('is_send_new_offer_index', ev);
      this.fetchingData();
      this.ActiveInquiryData = this.activeInquiries
    },
    isSendNewOfferVendor(ev) {
      this.is_send_new_offer_vendor = ev;
      this.is_send_new_offer_customer = ev;
      this.$emit('is_send_new_offer_index', ev);
      this.fetchingData();
      this.ActiveInquiryData = this.activeInquiries
    },
    clickCancelOffer(ev) {
      this.is_cancel_new_offer_customer = false
      this.is_send_new_offer_customer = false
      console.log('ec')
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
<!--              <div class="d-flex py-1 px-4 justify-between items-center">-->
<!--                <div class="d-flex gap-4 items-center">-->
<!--                  <lazy-image-->
<!--                    class="w-[38px] h-[38px] object-cover rounded"-->
<!--                    :data-src="activeInquiries?.vendor?.logo"-->
<!--                    :alt="activeInquiries?.vendor?.local_name"-->
<!--                  />-->
<!--                  &lt;!&ndash;                <img class="w-[38px] h-[38px]" src="~/assets/icon/sellersvg.svg" alt="">&ndash;&gt;-->
<!--                  <a :href="`/vendor/` + ActiveInquiryData?.vendor?.subdomain"-->
<!--                     target="_blank">{{ ActiveInquiryData?.vendor?.name }}</a>-->
<!--                </div>-->
<!--                <div>-->
<!--                  <p class="text-smooth">{{ $t('products.Last Seen') }}: March 15, 2024 3:25 PM</p>-->
<!--                </div>-->
<!--              </div>-->
              <div class="flex py-1 px-4 justify-between items-center">
                <div class="flex gap-4 items-center">
                  <lazy-image
                    class="w-[38px] h-[38px] object-cover rounded"
                    :data-src="activeInquiries?.vendor?.logo"
                    :alt="activeInquiries?.vendor?.local_name"
                  />
<!--                  <img class="w-[38px] h-[38px]" src="~/assets/icon/sellersvg.svg" alt="">-->
                  <span>{{ ActiveInquiryData?.user?.name }}</span>
                </div>
                <div>
                  <p class="text-smooth">Last Seen: March 15, 2024 3:25 PM</p>
                </div>
              </div>
            </div>
            <div class="h-[700px] overflow-y-scroll scrolly">
              <!-- -------------------message card user--------------- -->
              <div v-for="(activeInquirie, index) in activeInquiries.inquiryOffers">
                <!--        customer offer send-->
                <div class="lg:grid lg:grid-cols-2 w-full" v-if="activeInquirie.is_reply===0">

                  <p class="text-xs text-smooth py-2 px-4" v-if="activeInquirie.offer.type==='offer'">
                    {{ activeInquirie.user?.username }}, {{ activeInquirie.created }}</p>
                  <div class="messenger  w-full" v-if="activeInquirie.offer.type==='offer'">
                    <div class="card rounded-lg shadow m-2">
                      <div class="bg-graylight rounded-t p-2">OFF{{ activeInquirie.id }}</div>
                      <div class="p-4">
                        <a class="text-primary font-bold" href="">{{ activeInquirie?.product?.title }}</a>
                        <div class="grid grid-cols-2 border-b p-2 border-smooth gap-2">
                          <div class="flex items-center gap-4">
                            <!--                          <img class="w-7 h-7"-->
                            <!--                               :src="activeInquirie?.product?.image"-->
                            <!--                               alt=""-->
                            <!--                          >-->
                            <lazy-image
                              class="h-10 w-10 object-cover rounded"
                              :data-src="activeInquirie?.product?.image"
                              :alt="activeInquirie?.product?.title"
                            />
                            <span class="text-smooth" v-if="activeInquirie.product?.product_prices[0]"><del>{{
                                activeInquirie.product?.product_prices[0]?.selling_price
                              }} {{ $t('app.SAR') }}</del></span>
                          </div>
                          <div>
                            <div class="flex justify-between p-1">
                              <span>{{ $t('products.Quantity') }}</span>
                              <span><span class="text-primary">{{
                                  activeInquirie?.offer?.quantity
                                }}</span> {{ activeInquirie?.unit?.name }}</span>
                            </div>
                            <div class="flex justify-between p-1">
                              <span>{{$t('products.Unit target price')}}</span>
                              <span><span class="font-bold">{{
                                  activeInquirie.offer.price / activeInquirie.offer.quantity
                                }}</span> <span
                                class="text-primary">{{ $t('app.SAR') }}</span></span>
                            </div>
                          </div>
                        </div>
                        <div class="grid grid-cols-2 p-2">
                          <div></div>
                          <div class="text-end flex justify-between">
                            <span>{{$t('app.Total Price excl VAT')}}</span>
                            <span><span class="font-bold">{{ activeInquirie.offer.price }}</span> <span
                              class="text-primary"> {{ $t('app.SAR') }}</span></span>
                          </div>
                        </div>
                        <!-- --------------end-------- -->
                        <div v-if="!is_cancel_new_offer_customer && activeInquirie.status!=='canceled'">
                          <p class="p-2 bg-primarylight rounded">
                            {{ $t('products.Offer sent message') }}
                          </p>
                          <div class="flex justify-end gap-4 pt-4">
                            <button @click="is_cancel_new_offer_customer=activeInquirie.id"
                                    class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                              {{ $t('products.Cancel Offer') }}
                            </button>
                            <button @click="sendNewOffer(index)"
                                    class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                              {{ $t('products.Send New Offer') }}
                            </button>
                          </div>
                        </div>
                        <!-- ---------end-------- -->
                        <!-- ---------------------- -->

                        <div v-if="is_cancel_new_offer_customer===activeInquirie.id">
                          <p class="p-2 bg-warning rounded">
                            {{ $t('products.Are you sure you want to cancel') }}
                          </p>
                          <div class="flex justify-end gap-4 pt-4">
                            <button @click="is_cancel_new_offer_customer=false"
                                    class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                              {{ $t('products.No') }}
                            </button>
                            <button @click="cancelOffer(activeInquirie.id)"
                                    class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                              {{ $t('products.Cancel') }}
                            </button>
                          </div>
                        </div>
                        <!-- ---------end-------- -->
                        <!-- ---------------------- -->
                        <div v-if="activeInquirie.status==='canceled'">
                          <p class="p-2 bg-warning rounded">{{ $t("products.Cancelled Well let Seller know") }}</p>
                          <div class="flex justify-end gap-4 pt-4">
                            <button @click="sendNewOfferAfterCancel(index)"
                                    class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                              {{ $t('products.Send New Offer') }}
                            </button>
                          </div>
                        </div>
                        <!-- ---------end-------- -->
                        <!-- -------------- -->
                        <!--                      <div v-if="sendNew">-->
                        <!--                        <p class="p-2 bg-warninglight rounded">Sending a new offer will withdraw your-->
                        <!--                          existing offer. Do you still want to send a new offer?</p>-->
                        <!--                        <div class="flex justify-end gap-4 pt-4">-->
                        <!--                          <button @click="offerSent=true,sendNew=false"-->
                        <!--                                  class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">-->
                        <!--                            No-->
                        <!--                          </button>-->
                        <!--                          <button @click="sendNew=false,sendNewForm=true"-->
                        <!--                                  class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">-->
                        <!--                            Send New Offer-->
                        <!--                          </button>-->
                        <!--                        </div>-->
                        <!--                      </div>-->
                        <!-- ---------------------- -->
                        <!-- -------------- -->

                        <ReplyNewOffer
                          v-if="is_send_new_offer_customer===index"
                          :customer="true"
                          :ActiveInquiryData="ActiveInquiryData"
                          @is_send_new_offer="sendNewOffer"
                          @is_cancel="clickCancelOffer"
                          :is_send_new_offer_customer="is_send_new_offer_customer"
                          :offer_index="offer_index"
                        />
                        <!-- ---------------------- -->
                      </div>
                    </div>
                  </div>

                  <div class="lg:grid lg:grid-cols-2 w-full" v-if="activeInquirie.offer.type==='message'">
                    <div class="messenger m-2 bg-smooth p-4 rounded">
                      <p>{{ activeInquirie.offer.message }}</p>
                    </div>
                  </div>
                  <p class="text-xs text-smooth py-2 text-end px-4"
                     v-if="activeInquirie.offer.type==='message'">{{ activeInquirie.user?.username }},
                    {{ activeInquirie.created }}</p>
                </div>
                <!--        customer offer send-->
                <!--        vendor reply-->
                <div class="lg:grid lg:grid-cols-2 w-full" v-if="activeInquirie.is_reply===1">
                  <div class="messenger  w-full">
                    <div class="card rounded-lg shadow m-2">
                      <div class="bg-graylight rounded-t p-2">OFF{{ activeInquirie.id }}</div>
                      <div class="p-4">
                        <a class="text-primary font-bold" href="">{{ activeInquirie?.product?.title }}</a>
                        <div class="grid grid-cols-2 border-b p-2 border-smooth gap-2">
                          <div class="flex items-center gap-4">
                            <!--                          <img class="w-7 h-7"-->
                            <!--                               :src="activeInquirie?.product?.image"-->
                            <!--                               alt=""-->
                            <!--                          >-->
                            <lazy-image
                              class="h-10 w-10 object-cover rounded"
                              :data-src="activeInquirie?.product?.image"
                              :alt="activeInquirie?.product?.title"
                            />
                            <span class="text-smooth"><del>{{
                                activeInquirie.product?.product_prices[0]?.selling_price
                              }} {{ $t('app.SAR') }}</del></span>
                          </div>
                          <div>
                            <div class="flex justify-between p-1">
                              <span>{{ $t('products.Quantity') }}</span>
                              <span><span class="text-primary">{{
                                  activeInquirie?.offer?.quantity
                                }}</span> {{ activeInquiries.offer?.unit?.name }}</span>
                            </div>
                            <div class="flex justify-between p-1">
                              <span>Unit target price</span>
                              <span><span class="font-bold">{{
                                  activeInquirie.offer.price / activeInquirie.offer.quantity
                                }}</span> <span
                                class="text-primary">{{ $t('app.SAR') }}</span></span>
                            </div>
                          </div>
                        </div>
                        <div class="grid grid-cols-2 p-2">
                          <div></div>
                          <div class="text-end flex justify-between">
                            <span>{{ $t('products.Total Price excl VAT') }}</span>
                            <span><span class="font-bold">{{ activeInquirie.offer.price }}</span> <span
                              class="text-primary"> SAR</span></span>
                          </div>
                        </div>
                        <!-- --------------end-------- -->
                        <div v-if="activeInquirie.status!=='canceled'">
                          <p class="p-2 bg-primarylight rounded">{{ $t('products.Offer sent message') }}</p>
                          <div class="flex justify-end gap-4 pt-4">
                            <button @click="is_cancel_new_offer_customer=activeInquirie.id"
                                    class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                              {{ $t('products.Cancel Offer') }}
                            </button>
                            <button @click="isSendNewOfferVendor(index)"
                                    class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                              {{ $t('products.Send New Offer') }}
                            </button>
                          </div>
                        </div>
                        <!-- ---------end-------- -->
                        <!-- ---------------------- -->
                        <div v-if="is_cancel_new_offer_customer===activeInquirie.id">
                          <p class="p-2 bg-warning rounded">Are you sure you want to cancel? You can send
                            a counter offer.</p>
                          <div class="flex justify-end gap-4 pt-4">
                            <button @click="is_cancel_new_offer_customer=false"
                                    class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                              No
                            </button>
                            <button @click="cancelOffer"
                                    class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                              Cancel
                            </button>
                          </div>
                        </div>
                        <!-- ---------end-------- -->
                        <!-- ---------------------- -->
                        <div v-if="activeInquirie.status==='canceled'">
                          <p class="p-2 bg-warning rounded">Cancelled. We'll let Seller know .</p>
                          <div class="flex justify-end gap-4 pt-4">
                            <button @click="is_send_new_offer_vendor=index"
                                    class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                              Send New Offer
                            </button>
                          </div>
                        </div>
                        <!-- ---------end-------- -->
                        <!-- -------------- -->
<!--                        <div v-if="is_send_new_offer">-->
<!--                          <p class="p-2 bg-warninglight rounded">Sending a new offer will withdraw your-->
<!--                            existing offer. Do you still want to send a new offer?</p>-->
<!--                          <div class="flex justify-end gap-4 pt-4">-->
<!--                            <button @click="offerSent=true,sendNew=false"-->
<!--                                    class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">-->
<!--                              No-->
<!--                            </button>-->
<!--                            <button @click="sendNew=false,sendNewForm=true"-->
<!--                                    class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">-->
<!--                              Send New Offer-->
<!--                            </button>-->
<!--                          </div>-->
<!--                        </div>-->
                        <!-- ---------------------- -->
                        <!-- -------------- -->
                        <ReplyNewOffer
                          v-if="is_send_new_offer_vendor===index"
                          :ActiveInquiryData="ActiveInquiryData"
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
                  <p class="text-xs text-smooth text-end px-4">
                    {{ activeInquirie.vendor?.name }}, {{ activeInquirie.created }}
                  </p>
                </div>
                <!--        vendor reply-->
                <!-- -------------------message --------------- -->
                <!--                <div class="lg:grid lg:grid-cols-2 w-full">-->

                <!--                  <div class="messenger m-2 bg-smooth p-4 rounded">-->
                <!--                    <p>Good Morning Good Morning Good Morning Good Morning Good Morning Good Morning Good-->
                <!--                      Morning Good Morning Good Morning Good Morning</p>-->
                <!--                  </div>-->
                <!--                  <p class="text-xs text-smooth py-2 text-end px-4">****, January 15, 2024 6:48 PM</p>-->
                <!--                </div>-->
                <!-- -------------------message card end--------------- -->
              </div>
            </div>
            <!--    <ValidationObserver v-slot="{ invalid }">-->
            <div class="p-4 border-t border-l border-smooth">
              <!--        <ValidationProvider class="w-full" name="message" rules="required" v-slot="{ errors }"-->
              <!--                            :custom-messages="{required: `${$t('products.Message')} is Required`}">-->
              <div class="flex gap-4">
                <input
                  :placeholder="$t('products.Message')"
                  class="w-full rounded-lg px-4"
                  type="text"
                  v-model="message"
                >

                <button
                  @click="sendMessage"
                  class="bg-theem w-[100px] text-center rounded-lg font-bold text-white leading-3 flex gap-2 mx-auto justify-center items-center px-2">
                  <span>{{ $t('products.Send') }}</span> <img class="w-5 h-5" src="~/assets/icon/send-2.svg" alt="">
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
        class="mr-15"
      />
    </div>
    <div v-else>
      no data
    </div>
  </div>
</template>

<style scoped>

</style>
