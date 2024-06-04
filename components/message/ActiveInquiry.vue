<script>
import {mapActions, mapGetters} from "vuex";
import ReplyNewOffer from "@/components/message/ReplyNewOffer.vue";
import ImagePopup from "@/components/message/ImagePopup.vue";
import Pusher from 'pusher-js'
import da from "vue2-datepicker/locale/es/da";

export default {
  name: 'ActiveInquiry',
  components: {ReplyNewOffer,ImagePopup},

  props: {
    ActiveInquiryData: {},
    offer_index: {},
  },

  data() {
    return {
      showImageClicked: false,
      clickedImageUrl: null, // Store clicked image URL
      inserFile: false,
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
      fileName: '',
      file: '',
      image: '',
      url: '',
      fileExtension: '',
      message: '',
      expired_at: ''
    }

  },
  computed: {
    ...mapGetters('language', ['currentLanguage']),
  },

  methods: {
    showImagePopup(index) {
      console.log(index);
      this.clickedImageUrl = index
      this.showImageClicked = true;
    },
    handleFileUpload(event) {
      const selectedFile = event.target.files[0];

      if (selectedFile) {
        // Check if file size is more than 5MB (5 * 1024 * 1024 bytes)
        if (selectedFile.size > 5 * 1024 * 1024) {
          this.setToastError(this.$t('app.File size exceeds 5MB limit Please select a smaller file'))
          // alert("File size exceeds 5MB limit. Please select a smaller file.");
          return;
        }

        // Extract file name
        const fileName = selectedFile.name;
        const fileExtension = fileName.split('.').pop().toLowerCase();
        // Read file as a data URL
        const reader = new FileReader();
        reader.onload = () => {
          this.file = reader.result; // Set file as base64 string
        };
        reader.readAsDataURL(selectedFile);

        this.fileName = fileName; // Set file name
        this.fileExtension = fileExtension; // Set fileExtension
        this.inserFile = false;
      }
    },
    showTooltipDocs() {
      this.$refs.tooltipDocs.classList.remove('hidden');
    },
    hideTooltipDocs() {
      this.$refs.tooltipDocs.classList.add('hidden');
    },
    showTooltipImg() {
      this.$refs.tooltipImg.classList.remove('hidden');
    },
    showTooltipAddr() {
      this.$refs.tooltipAddr.classList.remove('hidden');
    },
    hideTooltipAddr() {
      this.$refs.tooltipAddr.classList.add('hidden');
    },
    hideTooltipImg() {
      this.$refs.tooltipImg.classList.add('hidden');
    },
    removeFile() {
      // Documents
      const inputElement = document.getElementById('Documents');
      if (inputElement) {
        inputElement.value = null;
      }
      this.file = ''
    },
    removeMediaFile() {
      const inputElement = document.getElementById('Photo');
      if (inputElement) {
        inputElement.value = null;
      }

      this.image = ''
    },
    handleImageUpload(event) {
      // console.log(event)
      const selectedFile = event.target.files[0];
      // console.log(selectedFile)
      if (selectedFile) {
        // Check if file size is more than 20MB (20 * 1024 * 1024 bytes)
        if (selectedFile.size > 20 * 1024 * 1024) {
          this.setToastError(this.$t('app.File size exceeds 20MB limit Please select a smaller file'))
          // alert("File size exceeds 20MB limit. Please select a smaller file.");
          return;
        }

        // Check if the file type is either an image or a video
        if (!selectedFile.type.startsWith('image/') && !selectedFile.type.startsWith('video/')) {
          alert("Unsupported file type. Please select an image or a video.");
          return;
        }
// Extract file name
        const fileName = selectedFile.name;
        const fileExtension = fileName.split('.').pop().toLowerCase();
        // Read file as a data URL
        const reader = new FileReader();
        reader.onload = () => {
          this.image = reader.result; // Set image as data URL
        };
        reader.readAsDataURL(selectedFile);
        this.fileName = fileName; // Set file name
        this.fileExtension = fileExtension; // Set fileExtension
        this.inserFile = false;
      }

    },
    insertFileToggle() {
      this.inserFile = !this.inserFile
    },
    sendNewOfferAfterCancel(index) {
      this.is_cancel_new_offer_customer = false
      this.is_send_new_offer_customer = index
      this.is_send_new_offer_index = index
      this.$emit('is_send_new_offer_index', index);
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messageContainer;
        container.scrollTop = container.scrollHeight;
      });
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
        });

        if (data) {
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
            message: this.message,
            file: this.file,
            image: this.image,
            fileExtension: this.fileExtension,
          },
          api: 'inquiriesOfferStore'
        }).then(data => {
          console.log(data)
          this.message = ''
          this.fetchingData();
          this.image = ''
          this.file = ''
          this.fileExtension = ''
        })
        this.is_loading = false

      } catch (e) {
        return this.$nuxt.error(e)
      }
    },
    acceptOfferModal(index) {
      this.is_click_accept = index
    },
    RejectOffer(offer) {
      this.setRequest({
        params: {
          offer_id: offer.id,
          inquiry_id: this.ActiveInquiryData.id,
          status: 'rejected',
          is_reply: 1,
          type: 'offer'
        },
        api: 'inquiriesOfferStore'
      }).then(data => {
        // this.setToastMessage(this.$t('products.success_inquires_send_msg'))
        this.$emit('is_send_new_offer', false);
        this.$emit('is_send_new_offer_vendor', false);
        this.is_after_send = false
      })
    },
    async acceptOffer(index, activeInquirie) {
      try {
        this.formSubmitting = true
        await this.setRequest({
          params: {
            product_id: this.ActiveInquiryData.inquirable?.id,
            quantity: this.activeInquiries?.inquiryOffers[index]?.offer?.quantity,
            visitor_id: this.ActiveInquiryData?.user?.id,
            price: this.activeInquiries?.inquiryOffers[index]?.offer?.price,
            type: 'inquires',
          },
          api: 'acceptInquiriesOffer'
        }).then(data => {
          console.log(data)
          // this.setToastMessage(this.$t('products.success_inquires_send_msg'))
          this.is_accept_offer = true
          // this.is_after_send = true
          this.is_accept_offer_index = index

          this.setRequest({
            params: {
              offer_id: activeInquirie.id,
              inquiry_id: this.ActiveInquiryData.id,
              product_id: this.ActiveInquiryData.product?.id ?? this.ActiveInquiryData?.inquirable?.id,
              status: 'approved',
              is_reply: 1,
              type: 'offer',
              expired_at: this.expired_at,
              price: this.activeInquiries?.inquiryOffers[index]?.offer?.price,
              quantity: this.activeInquiries?.inquiryOffers[index]?.offer?.quantity
            },
            api: 'inquiriesOfferStore'
          }).then(data => {
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
        this.scrollToBottom();
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
    this.scrollToBottom();

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
        }).then(data => {
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
                  <p class="">{{ $t('products.Last Seen') }}:  {{ ActiveInquiryData?.last_time }}</p>
                </div>
              </div>
            </div>
            <div class="h-[700px] overflow-y-scroll scrolly" ref="messageContainer">
              <!-- -------------------message card user--------------- -->
              <div v-for="(activeInquirie, index) in activeInquiries.inquiryOffers">
                <!--        vendor reply-->
                <div class="lg:grid lg:grid-cols-5 w-full" v-if="activeInquirie.is_reply===0">
                 <div class="col-span-2">
                  <div class="messenger  w-full" v-if="activeInquirie.offer.type==='offer'">
                    <div class="card rounded-lg shadow m-2 mb-0">
                      <div class="bg-graylight font-bold rounded-t p-2">OFF{{ activeInquirie.id }}</div>
                      <div class="p-4">

                        <a class="text-primary font-bold" href="">{{ activeInquiries?.inquirable?.title }}</a>
                        <div class="grid grid-cols-2 border-b p-2 border-smooth gap-2">
                          <div class="flex items-center gap-4">
                            <lazy-image
                              class="h-10 w-10 object-cover rounded"
                              :data-src="activeInquiries?.inquirable?.image"
                              :alt="activeInquirie?.product?.title"
                            />
                            <span class="" v-if="activeInquiries?.inquirable?.product_prices">{{
                                activeInquiries?.inquirable?.product_prices[0]?.selling_price
                              }} {{ $t('app.SAR') }}</span>
                          </div>
                          <div>
                            <div class="flex justify-between p-1">
                              <span>{{ $t('products.Quantity') }}</span>
                              <span class="uppercase"><span class="text-primary">{{
                                  activeInquirie?.offer?.quantity
                                }}</span>  {{ activeInquiries?.inquirable?.product_unit?.name }}</span>
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
                            <span><span class="font-bold">{{
                                activeInquirie.offer.price * activeInquirie.offer.quantity
                              }}</span> <span
                              class="text-primary"> SAR</span></span>
                          </div>
                        </div>

                        <div v-if="activeInquirie.status==='order_placed'">
                          <p class="p-2 bg-primarylight rounded">{{ $t('prod.Paid') }}</p>
                        </div>
                        <div v-else>
                        <!-- --------------end-------- -->
                        <div v-if="activeInquirie.status!=='canceled' && !is_send_new_offer_vendor">
                          <p class="p-2 bg-warninglight text-fullred rounded" v-if="activeInquirie.status==='rejected'">
                            {{ $t('prod.Rejected by Buyer') }}</p>
                          <p class="p-2 bg-error text-white rounded" v-else-if="activeInquirie.status==='expired'">
                            {{ $t('prod.Expired on') }} {{ activeInquirie?.offer?.expired_at }}</p>
                          <!--                          <p class="p-2 bg-primarylight rounded" v-else>{{ $t('products.Offer sent message') }}</p>-->
                          <div class="flex justify-end gap-4 pt-4">

                            <button @click="acceptOfferModal(index)"
                                    v-if="activeInquirie.status!=='approved' && activeInquirie.status!=='rejected' && !is_click_accept && activeInquirie.status !== 'expired' && $store.state.admin.isVendor"
                                    class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                              {{ $t('products.Accept Offer') }}
                            </button>

                            <button @click="RejectOffer(activeInquirie)"
                                    v-if="activeInquirie.status!=='rejected' && !is_click_accept && activeInquirie.status !== 'expired' && activeInquirie.status !== 'approved' && $store.state.admin.isVendor"
                                    class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                              {{ $t('prod.Reject') }}
                            </button>

                            <button @click="is_cancel_new_offer_customer=activeInquirie.id"
                                    v-if="activeInquirie.status ==='approved' && activeInquirie.status ==='pending_response' "
                                    class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                              {{ $t('prod.Cancel') }}
                            </button>

                            <button @click="isSendNewOfferVendor(index, activeInquirie)"
                                    v-if="!is_click_accept && $store.state.admin.isVendor"
                                    class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                              {{ $t('products.Send New Offer') }}
                            </button>
                          </div>
                        </div>
                        <!-- ---------end-------- -->
                        <!-- ---------------------- -->
                        <div v-if="is_cancel_new_offer_customer===activeInquirie.id">
                          <p class="p-2 bg-cancellight text-canceldeep rounded">{{ $t('products.Are you sure you want to cancel') }}</p>
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
                          <p class="p-2 bg-cancellight text-canceldeep rounded" v-if="activeInquirie.cancel_by === 0">{{ $t('prod.Canceled by Customer') }}</p>
                          <p class="p-2 bg-cancellight text-canceldeep rounded" v-if="activeInquirie.cancel_by === 1">{{ $t('prod.Canceled by Seller') }}</p>
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
                    <div class="messenger m-2 mb-0 ">
                      <div :class="{'bg-mbg':activeInquirie.offer.message}" class="p-4 rounded">
                        <p>{{ activeInquirie.offer.message }}</p>
                        <!-- ++++++++++++++++++++-----------------new design----------++++++++++++++++--------- -->
                        <!-- ------------------message with image---------- -->
                        <div>
                          <lazy-image
                            v-if="activeInquirie.image"
                            class="h-[280px] w-[280px] shadow rounded-[10px]"
                            :data-src="activeInquirie.image"
                            :alt="activeInquirie.offer.message"
                          />
                        </div>
                      </div>
                      <video class="w-full" controls v-if="activeInquirie.video">
                        <source
                          src="https://media.istockphoto.com/id/589001754/video/moai-at-ahu-tongariki-with-night-sky-and-milky-way-background-easter-island-chile.mp4?s=mp4-640x640-is&k=20&c=4Ti83sgRer_qC0r9-B9G6XB_WT2JLhGTOnH_rD6N0gI="
                          type="video/mp4">
                        <!-- Your browser does not support the video tag. -->
                      </video>

                      <!-- ------------------file---------- -->
                      <div class="my-2 cursor-pointer" v-if="activeInquirie.file">
                        <a
                          class="p-4 shadow-lg rounded-lg w-full border border-smooth"
                          v-if="activeInquirie.fileName"
                          :href="activeInquirie.file"
                          download
                          target="_blank"
                        >
                          {{ activeInquirie.fileName }}
                        </a>
                      </div>
                      <!-- -------++++++++++----------new design end---------+++++++++++++++---------- -->
                    </div>

                  </div>
                  <div>
                    <p class="text-xs text-smooth pb-2 px-4">
                    <!-- {{ activeInquirie.user?.username }}, -->
                    {{ activeInquirie.created }}</p>
                  </div>
                 </div>
                  <div class="col-span-2">

                  </div>
                  <!-- -------------------message card end--------------- -->

                </div>
                <div class="lg:grid lg:grid-cols-5 w-full" v-if="activeInquirie.is_reply===1">
                  <div class="col-span-3">

                  </div>
                  <div class="col-span-2">
                    <div class="messenger w-full" v-if="activeInquirie.offer.type==='offer'">
                    <div class="card rounded-lg shadow m-2 mb-0">
                      <div class="bg-graylight rounded-t p-2">OFF{{ activeInquirie.id }}</div>
                      <div class="p-4">
                        <a class="text-primary font-bold" href="">{{ activeInquiries?.inquirable?.title }}</a>
                        <div class="grid grid-cols-2 border-b p-2 border-smooth gap-2">
                          <div class="flex items-center gap-4">
                            <lazy-image
                              class="h-10 w-10 object-cover rounded"
                              :data-src="activeInquiries?.inquirable?.image"
                              :alt="activeInquirie?.inquirable?.title"
                            />
                            <span class="" v-if="activeInquiries?.inquirable?.product_prices">{{
                                activeInquiries?.inquirable?.product_prices[0]?.selling_price
                              }} {{ $t('app.SAR') }}</span>
                          </div>
                          <div>
                            <div class="flex justify-between p-1">
                              <span>{{ $t('products.Quantity') }}</span>
                              <span class="uppercase">
                                <span class="text-primary">{{
                                    activeInquirie?.offer?.quantity
                                  }}</span>  {{ activeInquiries?.inquirable?.product_unit?.name }}
                              </span>
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
                            <span><span
                              class="font-bold">{{ activeInquirie.offer.price * activeInquirie.offer.quantity }}</span> <span
                              class="text-primary"> SAR</span></span>
                          </div>
                        </div>
                        <!-- --------------end-------- -->
                        <div v-if="activeInquirie.status==='order_placed'">
                          <p class="p-2 bg-primarylight rounded">{{ $t('prod.Paid') }}</p>
                        </div>
                        <div v-else>
                          <div v-if="activeInquirie.status!=='canceled' && !is_send_new_offer_vendor">
                            <p class="p-2 bg-warninglight  text-fullred rounded" v-if="activeInquirie.status==='rejected'">
                              {{ $t('prod.Rejected') }}</p>
                            <p class="p-2 bg-error text-white rounded" v-else-if="activeInquirie.status==='expired'">
                              {{ $t('prod.Expired on') }} {{ activeInquirie?.offer?.expired_at }}</p>
                            <p class="p-2 bg-primarylight rounded" v-else>{{ $t('prod.Offer sent') }}
                              {{ activeInquirie?.offer?.expired_at }}</p>
                            <div class="flex justify-end gap-4 pt-4">
                              <button @click="is_cancel_new_offer_customer=activeInquirie.id"
                                      v-if="activeInquirie.status!=='rejected' && activeInquirie.status!=='expired' && $store.state.admin.isVendor && activeInquirie.status ==='approved' ||  activeInquirie.status ==='pending_response'"
                                      class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                                {{ $t('products.Cancel Offer') }}
                              </button>

                              <!--                            <button @click="acceptOffer(index)"-->
                              <!--                                    v-if="activeInquirie.status!=='approved'"-->
                              <!--                                    class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">-->
                              <!--                              {{ $t('products.Accept Offer') }}-->
                              <!--                            </button>-->
                              <button @click="isSendNewOfferVendor(index)"
                                      v-if="$store.state.admin.isVendor"
                                      class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                                {{ $t('products.Send New Offer') }}
                              </button>
                            </div>
                          </div>
                          <!-- ---------end-------- -->
                          <div class="my-1" v-if="is_cancel_new_offer_customer===activeInquirie.id">
                            <p class="p-2 bg-cancellight text-canceldeep rounded">{{ $t('products.Are you sure you want to cancel') }}</p>
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
                          <div v-if="activeInquirie.status==='canceled'">
                            <p class="p-2 bg-cancellight text-canceldeep rounded" v-if="activeInquirie.cancel_by === 0">{{ $t('prod.Canceled by Customer') }}</p>
                            <p class="p-2 bg-cancellight text-canceldeep rounded" v-if="activeInquirie.cancel_by === 1">{{ $t('prod.Canceled by Seller') }}</p>
                            <div class="flex justify-end gap-4 pt-4">
                              <button
                                v-if="$store.state.admin.isVendor"
                                @click="is_send_new_offer_vendor=index"
                                :disabled="!isLastOffer(index)"
                                :style="{ cursor: isLastOffer(index) ? '' : 'not-allowed' }"
                                class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                                {{ $t('products.Send New Offer') }}
                              </button>
                            </div>
                          </div>
                          <!-- ---------end-------- -->
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
                    <div class="messenger m-2 mb-0">
                      <div :class="{'bg-mbg':activeInquirie.offer.message}" class="p-4 rounded">

                        <p>{{ activeInquirie.offer.message }}</p>
                        <!-- ++++++++++++++++++++-----------------new design----------++++++++++++++++--------- -->
                        <!-- ------------------message with image---------- -->
                        <div>
                          <div  @click="showImagePopup(activeInquirie.image)">
                            <lazy-image

                            v-if="activeInquirie.image"
                            class="h-[280px] w-[280px] shadow rounded-[10px] mx-auto"
                            :data-src="activeInquirie.image"
                            :alt="activeInquirie.offer.message"
                          />
                          </div>
                          <ImagePopup :imageUrl="clickedImageUrl" :imageAlt="clickedImageUrl" v-if="showImageClicked" @closePopup="showImageClicked = false" />
                        </div>
                      </div>
                      <video class="w-full" controls v-if="activeInquirie.video">
                        <source
                          src="https://media.istockphoto.com/id/589001754/video/moai-at-ahu-tongariki-with-night-sky-and-milky-way-background-easter-island-chile.mp4?s=mp4-640x640-is&k=20&c=4Ti83sgRer_qC0r9-B9G6XB_WT2JLhGTOnH_rD6N0gI="
                          type="video/mp4">
                        <!-- Your browser does not support the video tag. -->
                      </video>

                      <!-- ------------------file---------- -->
                      <div class="my-2 cursor-pointer" v-if="activeInquirie.file">
                        <a
                          class="p-4 shadow-lg rounded-lg w-full border border-smooth"
                          v-if="activeInquirie.fileName"
                          :href="activeInquirie.file"
                          download
                          target="_blank"
                        >
                          {{ activeInquirie.fileName }}
                        </a>
                      </div>
                      <!-- -------++++++++++----------new design end---------+++++++++++++++---------- -->
                    </div>

                  </div>
                  <div>
                      <p class="text-xs text-smooth px-4 ltr:text-end rtl:text-start">
                    <!-- {{ activeInquirie.vendor?.name }}, -->
                     {{ activeInquirie.created }}
                  </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <!--           file-->
            <div class="p-4 border-t border-l border-smooth">
              <!--        <ValidationProvider class="w-full" name="message" rules="required" v-slot="{ errors }"-->
              <!--                            :custom-messages="{required: `${$t('products.Message')} is Required`}">-->
              <div class="flex gap-3 items-center">
                <label class="items-center cursor-pointer font-bold text-theem  py-1 text-sm" for="Documents"
                       tabindex="-1" id="menu-item-0">
                  <!-- <span class="hidden">Docs</span>
                  <img class="h-5 w-5" src="~/assets/icon/document-g.svg" alt=""> -->
                  <span class="hidden absolute  mt-[-18px]" ref="tooltipDocs">{{ $t('prod.Docs') }}</span>
                  <img class="h-5 w-5" src="~/assets/icon/document-g.svg" alt="" @mouseover="showTooltipDocs"
                       @mouseleave="hideTooltipDocs">
                  <input type="file" hidden name="Documents" id="Documents" @change="handleFileUpload">
                </label>
                <label class="items-center cursor-pointer font-bold text-theem  py-1 text-sm" for="Photo" tabindex="-1"
                       id="menu-item-1">
                  <span class="hidden absolute  mt-[-18px]" ref="tooltipImg">{{ $t('prod.Image and Video') }}</span>
                  <img class="h-5 w-5" src="~/assets/icon/gallery.svg" alt="" @mouseover="showTooltipImg"
                       @mouseleave="hideTooltipImg">
                  <input type="file" hidden name="Photo" id="Photo" accept="image/*,video/*"
                         @change="handleImageUpload($event)">
                </label>
<!--                <label @click="showListAddressModals(addressShippingSeleted, 'both')"-->
<!--                       class="items-center cursor-pointer font-bold text-theem  py-1 text-sm"-->
<!--                       for="address" tabindex="-3"-->
<!--                       id="menu-item-1">-->
<!--                  <span class="hidden absolute  mt-[-18px]" ref="tooltipAddr">{{ $t('app.Address') }}</span>-->
<!--                  <img class="h-5 w-5" src="~/assets/icon/plus.svg" alt="" @mouseover="showTooltipAddr"-->
<!--                       @mouseleave="hideTooltipAddr">-->
<!--                </label>-->
              </div>
              <div class="flex gap-4 items-center">
                <!-- ------------------------now its static for file need develop ------------------------- -->
                <div class="my-1" v-if="file">
                  <div>
                <span class="relative w-auto h-10" @click="removeFile">
                  <svg
                    class="w-3 h-3 text-red absolute ltr:right-0 rtl:left-0 top-[-2px] border border-red rounded-full bg-white cursor-pointer"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                    viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18 17.94 6M18 18 6.06 6"/>
                </svg>
                <span class="w-auto rounded shadow-lg p-2 d-flex items-center text-font-13px" v-if="fileName">
                    <svg width="20" height="20" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg"
                         class="h-5 w-5 mx-2" v-if="fileExtension==='doc'">
                      <path
                        d="M15.5 0C13.3687 0 11.625 1.74375 11.625 3.875V58.125C11.625 60.2562 13.3687 62 15.5 62H54.25C56.3812 62 58.125 60.2562 58.125 58.125V15.5L42.625 0H15.5Z"
                        fill="#E2E5E7"/>
                      <path d="M46.5 15.5H58.125L42.625 0V11.625C42.625 13.7563 44.3687 15.5 46.5 15.5Z"
                            fill="#B0B7BD"/>
                      <path d="M58.125 27.125L46.5 15.5H58.125V27.125Z" fill="#CAD1D8"/>
                      <path
                        d="M50.375 50.375C50.375 51.4406 49.5031 52.3125 48.4375 52.3125H5.8125C4.74687 52.3125 3.875 51.4406 3.875 50.375V31C3.875 29.9344 4.74687 29.0625 5.8125 29.0625H48.4375C49.5031 29.0625 50.375 29.9344 50.375 31V50.375Z"
                        fill="#50BEE8"/>
                      <path
                        d="M11.2101 46.5C10.6986 46.5 10.1406 46.219 10.1406 45.539V36.7408C10.1406 36.1828 10.6986 35.7798 11.2101 35.7798H14.7577C21.8373 35.7798 21.6804 46.5 14.8953 46.5H11.2101ZM12.1866 37.6688V44.609H14.7577C18.9408 44.609 19.1248 37.6688 14.7577 37.6688H12.1866Z"
                        fill="white"/>
                      <path
                        d="M27.6091 46.655C24.7436 46.779 21.7676 44.8725 21.7676 41.077C21.7676 37.2659 24.7416 35.3923 27.6091 35.3923C30.3197 35.5299 33.1543 37.4054 33.1543 41.077C33.1543 44.7505 30.3197 46.655 27.6091 46.655ZM27.4386 37.4073C25.7026 37.4073 23.8136 38.6318 23.8136 41.0789C23.8136 43.5124 25.7046 44.7524 27.4386 44.7524C29.2211 44.7524 31.1257 43.5124 31.1257 41.0789C31.1257 38.6299 29.2211 37.4073 27.4386 37.4073Z"
                        fill="white"/>
                      <path
                        d="M34.9775 41.0614C34.9775 38.0718 36.853 35.5007 40.4161 35.5007C41.7646 35.5007 42.8341 35.9037 43.9637 36.8802C44.3822 37.2658 44.4287 37.9478 44.0102 38.3818C43.5917 38.7519 42.9562 38.7073 42.5842 38.3353C41.9506 37.6688 41.2996 37.4847 40.4161 37.4847C38.031 37.4847 36.886 39.1742 36.886 41.0633C36.886 42.9853 38.0155 44.7504 40.4161 44.7504C41.2996 44.7504 42.1211 44.3919 42.8341 43.7583C43.3127 43.3863 43.9792 43.5704 44.2582 43.9444C44.5062 44.2854 44.6282 44.8588 44.0877 45.3994C43.0027 46.4088 41.7026 46.6103 40.4142 46.6103C36.667 46.6103 34.9775 44.0509 34.9775 41.0614Z"
                        fill="white"/>
                      <path
                        d="M48.4375 52.3125H11.625V54.25H48.4375C49.5031 54.25 50.375 53.3781 50.375 52.3125V50.375C50.375 51.4406 49.5031 52.3125 48.4375 52.3125Z"
                        fill="#CAD1D8"/>
                    </svg>

                  <svg width="20" height="20" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg"
                       class="h-5 w-5 mx-2" v-if="fileExtension==='pdf'">
                    <path
                      d="M15.5 0C13.3687 0 11.625 1.74375 11.625 3.875V58.125C11.625 60.2562 13.3687 62 15.5 62H54.25C56.3812 62 58.125 60.2562 58.125 58.125V15.5L42.625 0H15.5Z"
                      fill="#E2E5E7"/>
                    <path d="M46.5 15.5H58.125L42.625 0V11.625C42.625 13.7563 44.3687 15.5 46.5 15.5Z" fill="#B0B7BD"/>
                    <path d="M58.125 27.125L46.5 15.5H58.125V27.125Z" fill="#CAD1D8"/>
                    <path
                      d="M50.375 50.375C50.375 51.4406 49.5031 52.3125 48.4375 52.3125H5.8125C4.74687 52.3125 3.875 51.4406 3.875 50.375V31C3.875 29.9344 4.74687 29.0625 5.8125 29.0625H48.4375C49.5031 29.0625 50.375 29.9344 50.375 31V50.375Z"
                      fill="#F15642"/>
                    <path
                      d="M12.3203 36.7099C12.3203 36.1984 12.7233 35.6404 13.3724 35.6404H16.9509C18.9659 35.6404 20.7794 36.9889 20.7794 39.5735C20.7794 42.0225 18.9659 43.3865 16.9509 43.3865H14.3644V45.4325C14.3644 46.1145 13.9304 46.5001 13.3724 46.5001C12.8609 46.5001 12.3203 46.1145 12.3203 45.4325V36.7099ZM14.3644 37.5914V41.4509H16.9509C17.9894 41.4509 18.8109 40.5345 18.8109 39.5735C18.8109 38.4904 17.9894 37.5914 16.9509 37.5914H14.3644Z"
                      fill="white"/>
                    <path
                      d="M23.8136 46.5C23.3021 46.5 22.7441 46.221 22.7441 45.5409V36.7408C22.7441 36.1847 23.3021 35.7798 23.8136 35.7798H27.3612C34.4408 35.7798 34.2858 46.5 27.5007 46.5H23.8136ZM24.7901 37.6708V44.6109H27.3612C31.5443 44.6109 31.7303 37.6708 27.3612 37.6708H24.7901Z"
                      fill="white"/>
                    <path
                      d="M36.7966 37.7948V40.2573H40.7472C41.3052 40.2573 41.8632 40.8153 41.8632 41.3559C41.8632 41.8674 41.3052 42.2859 40.7472 42.2859H36.7966V45.539C36.7966 46.0815 36.4111 46.498 35.8686 46.498C35.1866 46.498 34.77 46.0815 34.77 45.539V36.7388C34.77 36.1828 35.1885 35.7778 35.8686 35.7778H41.3071C41.9891 35.7778 42.3921 36.1828 42.3921 36.7388C42.3921 37.2348 41.9891 37.7928 41.3071 37.7928H36.7966V37.7948Z"
                      fill="white"/>
                    <path
                      d="M48.4375 52.3125H11.625V54.25H48.4375C49.5031 54.25 50.375 53.3781 50.375 52.3125V50.375C50.375 51.4406 49.5031 52.3125 48.4375 52.3125Z"
                      fill="#CAD1D8"/>
                  </svg>
                  <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                       xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                       y="0px"
                       viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"
                       class="h-5 w-5 mx-2"
                       v-if="fileExtension==='xlsx'">
                    <path style="fill:#E4EAF8;" d="M102.079,25.119c0-9.446,7.656-17.102,17.102-17.102h256.534l85.511,85.511v393.353
                      c0,9.446-7.656,17.102-17.102,17.102H119.182c-9.446,0-17.102-7.656-17.102-17.102V25.119z"/>
                    <path style="fill:#AFB9D2;" d="M367.165,264.551H196.142c-9.446,0-17.102-7.656-17.102-17.102v-94.063
                      c0-9.446,7.656-17.102,17.102-17.102h171.023c9.446,0,17.102,7.656,17.102,17.102v94.063
                      C384.267,256.895,376.611,264.551,367.165,264.551z"/>
                    <path style="fill:#9BF57D;" d="M247.449,264.551h-51.307c-9.446,0-17.102-7.656-17.102-17.102v-94.063
                      c0-9.446,7.656-17.102,17.102-17.102h51.307V264.551z"/>
                    <path style="fill:#7DC86E;" d="M384.267,179.04H179.04v-25.653c0-9.446,7.656-17.102,17.102-17.102h171.023
                      c9.446,0,17.102,7.656,17.102,17.102V179.04z"/>
                    <g>
                      <path style="fill:#D5DCED;" d="M298.756,469.779H102.079V298.756h196.676c23.613,0,42.756,19.143,42.756,42.756v85.512
                        C341.511,450.636,322.369,469.779,298.756,469.779z"/>
                      <path style="fill:#D5DCED;"
                            d="M375.716,8.017v68.409c0,9.445,7.658,17.102,17.102,17.102h68.409L375.716,8.017z"/>
                    </g>
                    <path style="fill:#9BF57D;" d="M298.756,444.125H67.875c-9.446,0-17.102-7.656-17.102-17.102v-85.512
                      c0-9.446,7.656-17.102,17.102-17.102h230.881c9.446,0,17.102,7.656,17.102,17.102v85.512
                      C315.858,436.469,308.202,444.125,298.756,444.125z"/>
                    <path d="M466.896,87.859L381.384,2.347C379.882,0.844,377.842,0,375.716,0H119.182c-13.851,0-25.119,11.268-25.119,25.119v291.273
                      H67.875c-13.851,0-25.119,11.268-25.119,25.119v85.512c0,13.851,11.268,25.119,25.119,25.119h26.188v34.739
                      c0,13.851,11.268,25.119,25.119,25.119h324.944c13.851,0,25.119-11.268,25.119-25.119V93.528
                      C469.244,91.401,468.4,89.363,466.896,87.859z M383.733,27.37l58.141,58.141h-49.056c-5.01,0-9.086-4.076-9.086-9.086V27.37z
                       M58.789,427.023v-85.512c0-5.01,4.076-9.086,9.086-9.086h230.881c5.01,0,9.086,4.076,9.086,9.086v85.512
                      c0,5.01-4.076,9.086-9.086,9.086H67.875C62.865,436.109,58.789,432.033,58.789,427.023z M444.125,495.967H119.182
                      c-5.01,0-9.086-4.076-9.086-9.086v-34.739h188.66c13.851,0,25.119-11.268,25.119-25.119v-85.512
                      c0-13.851-11.268-25.119-25.119-25.119h-188.66V25.119c0-5.01,4.076-9.086,9.086-9.086h248.518v60.392
                      c0,13.851,11.268,25.119,25.119,25.119h60.392v385.336C453.211,491.891,449.135,495.967,444.125,495.967z"/>
                    <path d="M110.63,395.604l19.985,19.985c1.565,1.565,3.617,2.348,5.668,2.348c2.051,0,4.104-0.782,5.668-2.348
                      c3.131-3.131,3.131-8.207,0-11.337l-19.985-19.985l19.985-19.985c3.131-3.131,3.131-8.207,0-11.337
                      c-3.131-3.131-8.207-3.131-11.337,0l-19.985,19.985l-19.985-19.985c-3.131-3.131-8.207-3.131-11.337,0
                      c-3.131,3.131-3.131,8.207,0,11.337l19.985,19.985l-19.985,19.985c-3.131,3.131-3.131,8.207,0,11.337
                      c1.565,1.566,3.617,2.348,5.668,2.348c2.051,0,4.103-0.782,5.668-2.348L110.63,395.604z"/>
                    <path d="M170.489,417.937h42.756c4.427,0,8.017-3.589,8.017-8.017c0-4.427-3.589-8.017-8.017-8.017h-34.739v-43.29
                      c0-4.427-3.589-8.017-8.017-8.017s-8.017,3.589-8.017,8.017v51.307C162.472,414.348,166.061,417.937,170.489,417.937z"/>
                    <path d="M258.331,392.044c9.377,2.344,14.487,4.433,15.215,6.216c-1.252,1.285-5.961,3.644-13.27,3.644
                      c-8.088,0-13.28-2.791-14.145-3.991c-1.891-3.959-6.622-5.667-10.612-3.813c-4.015,1.866-5.757,6.634-3.891,10.648
                      c4.234,9.111,17.439,13.189,28.647,13.189c16.758,0,29.395-8.271,29.395-19.24c0-15.345-16.52-19.474-27.45-22.207
                      c-9.377-2.344-14.487-4.433-15.215-6.216c1.252-1.285,5.961-3.644,13.27-3.644c8.088,0,13.28,2.791,14.145,3.991
                      c1.891,3.96,6.622,5.668,10.612,3.813c4.015-1.866,5.757-6.634,3.891-10.648c-4.234-9.111-17.439-13.189-28.647-13.189
                      c-16.758,0-29.395,8.271-29.395,19.24C230.881,385.182,247.401,389.311,258.331,392.044z"/>
                    <path d="M367.165,128.267H196.142c-13.851,0-25.119,11.268-25.119,25.119v94.063c0,13.851,11.268,25.119,25.119,25.119h171.023
                      c13.851,0,25.119-11.268,25.119-25.119v-94.063C392.284,139.536,381.016,128.267,367.165,128.267z M255.466,213.779v-26.722h52.376
                      v26.722H255.466z M307.841,229.812v26.722h-52.376v-26.722H307.841z M187.056,187.056h52.376v26.722h-52.376V187.056z
                       M255.466,171.023v-26.722h52.376v26.722H255.466z M323.875,187.056h52.376v26.722h-52.376V187.056z M376.251,153.386v17.637
                      h-52.376v-26.722h43.29C372.175,144.301,376.251,148.376,376.251,153.386z M196.142,144.301h43.29v26.722h-52.376v-17.637
                      C187.056,148.376,191.132,144.301,196.142,144.301z M187.056,247.449v-17.637h52.376v26.722h-43.29
                      C191.132,256.534,187.056,252.459,187.056,247.449z M367.165,256.534h-43.29v-26.722h52.376v17.637
                      C376.251,252.459,372.175,256.534,367.165,256.534z"/>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                  </svg>


                  {{ fileName }}
                </span>

                </span>
                  </div>
                </div>
                <!-- ------------------------now its static for file need develop end ------------------------- -->
                <div v-if="image" class="my-1">
                  <div>
                    <span class="relative w-10 h-10" @click="removeMediaFile">
                      <svg
                        class="w-3 h-3 text-red absolute ltr:right-0 rtl:left-0 top-[-2px] border border-red rounded-full bg-white cursor-pointer"
                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                        viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18 17.94 6M18 18 6.06 6"/>
                    </svg>
                      <img v-if="fileExtension!=='mp4'" :src="image" alt="Uploaded Image"
                           class="w-10 h-10 object-cover rounded shadow-lg">
                      <video class="w-10 h-10 object-cover rounded shadow-lg" controls v-if="fileExtension==='mp4'">
                          <source
                            :src="image"
                            type="video/mp4">
                        <!-- Your browser does not support the video tag. -->
                        </video>
                    </span>
                  </div>
                </div>

              </div>
              <div class="flex gap-4">
                <input
                  :placeholder="$t('products.Message')"
                  class="w-full rounded-lg px-4"
                  type="text"
                  v-model="message"
                >

                <!--              <button-->
                <!--                @click="sendMessage"-->
                <!--                class="bg-theem w-[100px] text-center rounded-lg font-bold text-white leading-3 flex gap-2 mx-auto justify-center items-center px-2">-->
                <!--                <span>{{ $t('products.Send') }}</span> <img class="w-5 h-5" src="~/assets/icon/send-2.svg" alt="">-->
                <!--              </button>-->
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
.rottet {
  transform: rotate(45deg);
}
</style>
