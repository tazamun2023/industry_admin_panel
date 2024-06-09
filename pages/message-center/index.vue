<template>
  <div>
    <div>
      <div class="flex justify-between py-4">
        <div>
          <h3 class="test-theem uppercase font-bold">{{ $t('products.Message') }}</h3>
        </div>
        <div>
          <div class="bg-theemlight p-1 rounded-lg">
            <p class="font-bold"><span class="mx-1">{{ $t('products.Seller Message') }}</span> <span
              class="bg-theem text-white p-2  rounded-lg">{{ ActiveInquiryData.count }}</span></p>
          </div>
        </div>
      </div>

      <!-- Tab buttons -->
      <div>
        <div class="lg:grid lg:grid-cols-4 border mb-6 border-smooth rounded">
          <div>
            <div class="ltr:border-r rtl:border-l rtl:pl-1 border-smooth">
              <ul class="flex mb-0 list-none flex-wrap  flex-row border-b border-smooth">
                <li class="-mb-px mr-2 last:mr-0 cursor-pointer  flex-auto text-center">
                  <div
                    class="text-xs font-bold uppercase px-2 py-3  block leading-normal"
                    :class="{'text-pink-600 bg-white border-smooth border-b': activeTab !== 'inquiry', 'border-b border-primary text-primary': activeTab === 'inquiry'}"
                    @click="activeTab = 'inquiry'"
                  > Inquiries
                  </div>
                </li>
                <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
                  <div
                    class="text-xs font-bold uppercase px-2 py-3  block leading-normal"
                    :class="{'text-pink-600 bg-white border-smooth border-b': activeTab !== 'rfq', 'border-b border-primary  text-primary': activeTab === 'rfq'}"
                    @click="activeTab = 'rfq'"
                  > RFQs
                  </div>
                </li>
                <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
                  <div
                    class="text-xs font-bold uppercase px-2 py-3  block leading-normal"
                    :class="{'text-pink-600 bg-white border-smooth border-b': activeTab !== 'shipping', 'border-b border-primary  text-primary': activeTab === 'shipping'}"
                    @click="activeTab = 'shipping'"
                  > Shipping
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <!-- --------------tab-left----list--------------- -->
              <div class="relative min-w-0 break-words w-full rounded">
                <div class="flex-auto">
                  <div class="tab-content tab-space ltr:border-r h-[700px] scrolly rtl:border-l border-smooth">
                    <InquiryTab
                      v-if="activeTab === 'inquiry'"
                      @activeInquiry="activeInquiryEvent"
                      @ActiveInquiryData="activeInquiryEventData"
                      @currentInq="currentInq"
                    />

                    <!-- ---------------------------------rfq side------------------------------------------------ -->

                    <RFQTab
                      v-if="activeTab === 'rfq'"
                      @activeRfqInquiry="activeRfqInquiryEvent"
                      @ActiveRfqInquiryData="ActiveRfqInquiryEventData"
                      @currentRfqInq="currentRfqInq"
                      @is_active_inq="isActiveInq"
                    />
                    <!-- ------------------------------------------------------------ -->
                    <div v-else-if="activeTab === 'shipping'">
                      <!-- RFQ tab content goes here -->
                      <div class="w-full p-2">
                        <form class="relative" action="">
                          <img class="w-6 h-6 ltr:ml-2 rtl:mr-2 mt-2  absolute" src="~/assets/icon/search-normal.svg"
                               alt="">
                          <input class="w-full rounded px-8" type="text" placeholder="Search">
                        </form>
                      </div>
                      <div @click="activeShipping = 1"
                           class="w-full flex cursor-pointer gap-4 items-top p-1 border-t border-smooth my-2 p-2">
                        <img class="h-10 w-10"
                             src="https://cfn-catalog-prod.tradeling.com/up/6329c4504efabf903adf35b1/90dffbf4ddc650b83efb80e40b39c7c3.jpg"
                             alt="">
                        <div>
                          <div class="flex justify-between">
                            <span class="font-bold  font-13px" :class="{ 'text-theem': activeShipping === 1 }" href="">Apple Watch Series 9 45mm Aluminum Case GPS Band Midnight...</span>
                            <span class="text-smooth">2:17pm</span>
                          </div>
                          <span class="text-smooth text-[12px]">From : Sender Name</span>
                          <div class="flex justify-between">
                            <span class="text-smooth  text-[12px]">To: End Location</span>
                            <span class="p-1 rounded text-smooth bg-theemlight text-theem uppercase text-[12px]">PENDING AGREEMENT</span>
                          </div>
                        </div>
                      </div>
                      <div @click="activeShipping = 2"
                           class="w-full flex cursor-pointer gap-4 items-top p-1 border-t border-smooth my-2 p-2">
                        <img class="h-10 w-10"
                             src="https://cfn-catalog-prod.tradeling.com/up/6329c4504efabf903adf35b1/90dffbf4ddc650b83efb80e40b39c7c3.jpg"
                             alt="">
                        <div>
                          <div class="flex justify-between">
                            <span class="font-bold  font-13px" :class="{ 'text-theem': activeShipping === 2 }" href="">Apple Watch Series 9 45mm Aluminum Case GPS Band Midnight...</span>
                            <span class="text-smooth">2:17pm</span>
                          </div>
                          <span class="text-smooth text-[12px]">From : Sender Name</span>
                          <div class="flex justify-between">
                            <span class="text-smooth  text-[12px]">To: End Location</span>
                            <span class="p-1 rounded text-smooth bg-theemlight text-theem uppercase text-[12px]">PENDING AGREEMENT</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- --------------tab-left----list end--------------- -->
            </div>
          </div>
          <div class="col-span-3">
            <!-- Tab content -->
            <div class="relative min-w-0 break-words w-full rounded">
              <div class="flex-auto">
                <div class="tab-content tab-space">
                  <ActiveInquiry
                    v-if="ActiveInquiryData && activeTab === 'inquiry'"
                    :ActiveInquiryData="ActiveInquiryData"
                    :offer_index="offer_index"
                    @update-data="UpdateActiveInquiryData"
                    @is_send_new_offer_index="isClickNewOfferIndex"
                    />

                  <ActiveRFQ
                    v-if="ActiveRfqInquiryData && activeTab === 'rfq'"
                    :activeRFQData="ActiveRfqInquiryData"
                    :is_active_inq="is_active_inq"
                    :offer_index="offer_index"
                    @update-data="UpdateActiveInquiryData"
                    @is_send_new_offer_index="isClickNewOfferIndex"
                  />
                  <div v-if="activeTab === 'shipping'">
                    <!-- RFQ tab content goes here -->
                    <div class="relative  min-w-0 break-words w-full rounded">
                      <div class="flex-auto">
                        <div class="tab-content tab-space">
                          <div v-if="activeShipping === 1">
                            <div class="border-b  border-smooth">
                              <div class="flex py-1 px-4 justify-between items-center">
                                <div class="flex gap-4 items-center">
                                  <img class="w-[38px] h-[38px]" src="~/assets/icon/sellersvg.svg" alt="">
                                  <span>Seller name</span>
                                </div>
                                <div>
                                  <p class="text-smooth">Last Seen: March 15, 2024 3:25 PM</p>
                                </div>
                              </div>
                            </div>
                            <div class="h-[700px] overflow-y-scroll scrolly">
                              <!-- -------------------message card user--------------- -->
                              <div class="lg:grid lg:grid-cols-2 w-full">
                                <p class="text-xs text-smooth py-2 px-4">****, January 15, 2024 6:48 PM</p>
                                <div class="messenger  w-full">
                                  <div class="card rounded-lg shadow m-2">
                                    <div class="bg-graylight rounded-t p-2">OFF5205701</div>
                                    <div class="p-4">
                                      <a class="text-primary font-bold" href="">Xiaomi Redmi 13C 256GB 8GB Clover Green
                                        UAE Version + Wiko Buds</a>
                                      <div class="grid grid-cols-2 border-b p-2 border-smooth gap-2">
                                        <div class="flex items-center gap-4">
                                          <img class="w-7 h-7"
                                               src="https://cfn-catalog-prod.tradeling.com/up/6329c4504efabf903adf35b1/90dffbf4ddc650b83efb80e40b39c7c3.jpg"
                                               alt="">
                                          <span class="text-smooth"><del>11 SAR</del></span>
                                        </div>
                                        <div>
                                          <div class="flex justify-between p-1">
                                            <span>Quantity</span>
                                            <span><span class="text-primary">3</span> Packet</span>
                                          </div>
                                          <div class="flex justify-between p-1">
                                            <span>Unit target price</span>
                                            <span><span class="font-bold">10</span> <span
                                              class="text-primary">SAR</span></span>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="grid grid-cols-2 p-2">
                                        <div></div>
                                        <div class="text-end flex justify-between">
                                          <span>Total Price excl. VAT</span>
                                          <span><span class="font-bold">30 </span> <span
                                            class="text-primary"> SAR</span></span>
                                        </div>
                                      </div>
                                      <!-- --------------end-------- -->
                                      <div v-if="offerSent">
                                        <p class="p-2 bg-warninglight rounded">Rejected By Customer</p>
                                        <div class="flex justify-end gap-4 pt-4">
                                          <!-- <button @click="offerSent=false,cancelOffer=true " class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">Cancel Offer</button> -->
                                          <button @click="offerSent=false,sendNew=true "
                                                  class="border-2 cursor-not-allowed pointer-events-none border-smooth  px-2 h-[34px] leading-3 text-smooth font-bold">
                                            Send New Offer
                                          </button>
                                        </div>
                                      </div>
                                      <!-- ---------end-------- -->
                                      <!-- ---------------------- -->
                                      <div v-if="cancelOffer">
                                        <p class="p-2 bg-warning rounded">Are you sure you want to cancel? You can send
                                          a counter offer.</p>
                                        <div class="flex justify-end gap-4 pt-4">
                                          <button @click="offerSent=true,cancelOffer=false"
                                                  class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                                            No
                                          </button>
                                          <button @click="cancelOffer=false,cancelledOffer=true"
                                                  class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                                            Cancel
                                          </button>
                                        </div>
                                      </div>
                                      <!-- ---------end-------- -->
                                      <!-- ---------------------- -->
                                      <div v-if="cancelledOffer">
                                        <p class="p-2 bg-warning rounded">Cancelled. We'll let Seller know.</p>
                                        <div class="flex justify-end gap-4 pt-4">
                                          <button @click="cancelledOffer=false,sendNewForm=true "
                                                  class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                                            Send New Offer
                                          </button>
                                        </div>
                                      </div>
                                      <!-- ---------end-------- -->
                                      <!-- -------------- -->
                                      <div v-if="sendNew">
                                        <p class="p-2 bg-warninglight rounded">Sending a new offer will withdraw your
                                          existing offer. Do you still want to send a new offer?</p>
                                        <div class="flex justify-end gap-4 pt-4">
                                          <button @click="offerSent=true,sendNew=false"
                                                  class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                                            No
                                          </button>
                                          <button @click="sendNew=false,sendNewForm=true"
                                                  class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                                            Send New Offer
                                          </button>
                                        </div>
                                      </div>
                                      <!-- ---------------------- -->
                                      <!-- -------------- -->
                                      <div v-if="sendNewForm">
                                        <p class="font-bold">Send new offer</p>
                                        <div class="bg-darklight p-4">
                                          <div class="flex justify-between gap-4 pt-4">
                                            <p>How many Piece</p>
                                            <div class="flex border-smooth bg-white rounded my-2 border">
                                              <button class="w-14  text-center  p-0 border-0"><img
                                                class="w-3 h-3 mx-auto" src="~/assets/icon/plus.svg" alt=""></button>
                                              <input
                                                class="w-[102px]  p-2 border-t-0 border-b-0 rounded-none  text-center"
                                                value="1" type="text">
                                              <button class="w-14  text-center  p-0 border-0"><img
                                                class="w-3 h-1 mx-auto" src="~/assets/icon/minus.svg" alt=""></button>
                                            </div>
                                          </div>
                                          <div class="flex justify-between gap-4 pt-4">
                                            <p class="w-50">Unit target price</p>
                                            <input class="w-50 p-2 rounded" placeholder="Target price in SAR"
                                                   type="text">
                                          </div>

                                        </div>
                                        <p class="text-end font-bold py-2">Total Price excl. VAT <span
                                          class="text-primary">SAR 0</span></p>
                                        <div class="flex justify-end gap-4 pt-2">
                                          <button @click="offerSent=true,sendNewForm=false"
                                                  class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                                            Cancel
                                          </button>
                                          <button
                                            class="border-2 border-primary px-2 h-[34px] leading-3 bg-primary text-white font-bold">
                                            Confirm
                                          </button>
                                        </div>
                                      </div>
                                      <!-- ---------------------- -->
                                    </div>
                                  </div>

                                </div>
                              </div>
                              <!-- -------------------message card end--------------- -->
                              <!-- -------------------message card ansrwed--------------- -->
                              <div class="lg:grid lg:grid-cols-2 w-full">
                                <div class="messenger  w-full">
                                  <div class="card rounded-lg shadow m-2">
                                    <div class="bg-graylight rounded-t p-2">OFF5205701</div>
                                    <div class="p-4">
                                      <a class="text-primary font-bold" href="">Xiaomi Redmi 13C 256GB 8GB Clover Green
                                        UAE Version + Wiko Buds</a>
                                      <div class="grid grid-cols-2 border-b p-2 border-smooth gap-2">
                                        <div class="flex items-center gap-4">
                                          <img class="w-7 h-7"
                                               src="https://cfn-catalog-prod.tradeling.com/up/6329c4504efabf903adf35b1/90dffbf4ddc650b83efb80e40b39c7c3.jpg"
                                               alt="">
                                          <span class="text-smooth"><del>11 SAR</del></span>
                                        </div>
                                        <div>
                                          <div class="flex justify-between p-1">
                                            <span>Quantity</span>
                                            <span><span class="text-primary">3</span> Packet</span>
                                          </div>
                                          <div class="flex justify-between p-1">
                                            <span>Unit target price</span>
                                            <span><span class="font-bold">10</span> <span
                                              class="text-primary">SAR</span></span>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="grid grid-cols-2 p-2">
                                        <div></div>
                                        <div class="text-end flex justify-between">
                                          <span>Total Price excl. VAT</span>
                                          <span><span class="font-bold">30 </span> <span
                                            class="text-primary"> SAR</span></span>
                                        </div>
                                      </div>
                                      <!-- --------------end-------- -->
                                      <div v-if="offerSent">
                                        <p class="p-2 bg-warninglight rounded">Rejected by user</p>
                                        <div class="flex justify-end gap-4 pt-4">
                                          <!-- <button @click="offerSent=false,cancelOffer=true " class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">Cancel Offer</button> -->
                                          <button @click="offerSent=false,sendNew=true "
                                                  class="border-2 cursor-not-allowed pointer-events-none border-smooth  px-2 h-[34px] leading-3 text-smooth font-bold">
                                            Send New Offer
                                          </button>
                                        </div>
                                      </div>
                                      <!-- ---------end-------- -->
                                      <!-- ---------------------- -->
                                      <div v-if="cancelOffer">
                                        <p class="p-2 bg-warning rounded">Are you sure you want to cancel? You can send
                                          a counter offer.</p>
                                        <div class="flex justify-end gap-4 pt-4">
                                          <button @click="offerSent=true,cancelOffer=false"
                                                  class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                                            No
                                          </button>
                                          <button @click="cancelOffer=false,cancelledOffer=true"
                                                  class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                                            Cancel
                                          </button>
                                        </div>
                                      </div>
                                      <!-- ---------end-------- -->
                                      <!-- ---------------------- -->
                                      <div v-if="cancelledOffer">
                                        <p class="p-2 bg-warning rounded">Cancelled. We'll let Seller know.</p>
                                        <div class="flex justify-end gap-4 pt-4">
                                          <button @click="cancelledOffer=false,sendNewForm=true "
                                                  class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                                            Send New Offer
                                          </button>
                                        </div>
                                      </div>
                                      <!-- ---------end-------- -->
                                      <!-- -------------- -->
                                      <div v-if="sendNew">
                                        <p class="p-2 bg-warninglight rounded">Sending a new offer will withdraw your
                                          existing offer. Do you still want to send a new offer?</p>
                                        <div class="flex justify-end gap-4 pt-4">
                                          <button @click="offerSent=true,sendNew=false"
                                                  class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                                            No
                                          </button>
                                          <button @click="sendNew=false,sendNewForm=true"
                                                  class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                                            Send New Offer
                                          </button>
                                        </div>
                                      </div>
                                      <!-- ---------------------- -->
                                      <!-- -------------- -->
                                      <div v-if="sendNewForm">
                                        <p class="font-bold">Send new offer</p>
                                        <div class="bg-darklight p-4">
                                          <div class="flex justify-between gap-4 pt-4">
                                            <p>How many Piece</p>
                                            <div class="flex border-smooth bg-white rounded my-2 border">
                                              <button class="w-14  text-center  p-0 border-0"><img
                                                class="w-3 h-3 mx-auto" src="~/assets/icon/plus.svg" alt=""></button>
                                              <input
                                                class="w-[102px]  p-2 border-t-0 border-b-0 rounded-none  text-center"
                                                value="1" type="text">
                                              <button class="w-14  text-center  p-0 border-0"><img
                                                class="w-3 h-1 mx-auto" src="~/assets/icon/minus.svg" alt=""></button>
                                            </div>
                                          </div>
                                          <div class="flex justify-between gap-4 pt-4">
                                            <p class="w-50">Unit target price</p>
                                            <input class="w-50 p-2 rounded" placeholder="Target price in SAR"
                                                   type="text">
                                          </div>

                                        </div>
                                        <p class="text-end font-bold py-2">Total Price excl. VAT <span
                                          class="text-primary">SAR 0</span></p>
                                        <div class="flex justify-end gap-4 pt-2">
                                          <button @click="offerSent=true,sendNewForm=false"
                                                  class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
                                            Cancel
                                          </button>
                                          <button
                                            class="border-2 border-primary px-2 h-[34px] leading-3 bg-primary text-white font-bold">
                                            Confirm
                                          </button>
                                        </div>
                                      </div>
                                      <!-- ---------------------- -->
                                    </div>
                                  </div>

                                </div>
                                <p class="text-xs text-smooth text-end px-4">****, January 15, 2024 6:48 PM</p>
                              </div>
                              <!-- -------------------message card end--------------- -->
                              <!-- -------------------message --------------- -->
                              <div class="lg:grid lg:grid-cols-2 w-full">

                                <div class="messenger m-2 bg-smooth p-4 rounded">
                                  <p>Good Morning Good Morning Good Morning Good Morning Good Morning Good Morning Good
                                    Morning Good Morning Good Morning Good Morning</p>
                                </div>
                                <p class="text-xs text-smooth py-2 text-end px-4">****, January 15, 2024 6:48 PM</p>
                              </div>
                              <!-- -------------------message card end--------------- -->
                              <!-- -------------------message --------------- -->
                              <div class="lg:grid lg:grid-cols-2 w-full">
                                <p class="text-xs text-smooth py-2 text-end px-4">****, January 15, 2024 6:48 PM</p>
                                <div class="messenger m-2 bg-smooth p-4 rounded">
                                  <p>Good Morning Good Morning Good Morning Good Morning Good Morning Good Morning Good
                                    Morning Good Morning Good Morning Good Morning</p>
                                </div>

                              </div>
                              <!-- -------------------message card end--------------- -->
                            </div>
                            <div class="p-4 border-t border-l border-smooth">

                              <div class="flex gap-4 items-center">
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
                                <input placeholder="Message...." class="w-full rounded-lg px-4" type="text">
                                <button
                                  class="bg-theem w-[100px] text-center rounded-lg font-bold text-white leading-3 flex gap-2 mx-auto justify-center items-center px-2">
                                  <span>Send</span> <img class="w-5 h-5" src="~/assets/icon/send-2.svg" alt=""></button>
                              </div>
                            </div>
                            <!-- ----------------------end--------------- -->
                          </div>
                          <div v-else-if="activeShipping === 2">
                            <!-- RFQ tab content goes here -->
                            2
                          </div>
                          <div v-else-if="activeShipping === 3">
                            <!-- RFQ tab content goes here -->
                            3
                          </div>
                          <div v-else-if="activeShipping === 4">
                            <!-- RFQ tab content goes here -->
                            4
                          </div>
                          <div v-else-if="activeInquery === 5">
                            <!-- RFQ tab content goes here -->
                            5
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InquiryTab from "@/components/message/InquiryTab.vue";
import {mapActions, mapGetters} from "vuex";
import ActiveInquiry from "@/components/message/ActiveInquiry.vue";
import RFQTab from "@/components/message/RFQTab.vue";
import ActiveRFQ from "@/components/message/ActiveRFQ.vue";
import Pusher from "pusher-js";

export default {
  name: 'MessageCenter',
  components: {ActiveRFQ, RFQTab, ActiveInquiry, InquiryTab},
  data() {
    return {
      inserFile:false,
      activeTab: 'inquiry',
      activeInquery: '',
      activeRFQ: '',
      activeShipping: '',
      offerSent: true,
      sendNew: false,
      sendNewForm: false,
      cancelOffer: false,
      cancelledOffer: false,
      activeIndex: null,


      activeInquiry: '',
      ActiveInquiryData: '',
      rfq_inquiries: '',
      activeRfq: '',
      is_active_inq: '',
      inquiries: [],
      is_loading: false,
      offer_index: false,
      activeRfqInquiry: '',
      ActiveRfqInquiryData: ''
    };
  },

  computed:{

  },

  async mounted() {

  },

  methods: {
    insertFileToggle(){
      this.inserFile = !this.inserFile
    },
    activeRfqInquiryEvent(event){

      this.activeRfqInquiry=event
    },
    ActiveRfqInquiryEventData(event){
      this.ActiveRfqInquiryData = event
      this.ActiveInquiryData = event
    },
    currentRfqInq(event){
      this.rfq_inquiries = event
      this.activeRfq = true
    },
    isActiveInq(event){
      this.is_active_inq = event
    },
    activeInquiryEvent(event) {
      this.activeInquiry = event
    },
    activeInquiryEventData(event) {
      Pusher.logToConsole = true;

      const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
        cluster: process.env.PUSHER_APP_CLUSTER
      });

      const channel = pusher.subscribe('chat');
      channel.bind('message', dataP => {
        try {
          // this.is_loading = true
          // this.fetchingData()
          // this.is_loading = false
          this.ActiveInquiryData = event
          console.log(event)

        } catch (e) {
          return this.$nuxt.error(e)
        }
      });
      this.ActiveInquiryData = event
    },
    currentInq(event) {
      this.inquiries = event
    },
    UpdateActiveInquiryData(data){
      // console.log('is_send_new_offer_customer')
      // console.log(data)
      this.ActiveInquiryData = data
    },
    isClickNewOfferIndex(data){
      this.offer_index=data
    },



    ...mapActions('common', ['getById', 'setById', 'setRequest', 'getRequest']),
  }
};
</script>
<style>
.rottet{
  transform: rotate(45deg);
}
.scrolly {
  overflow-y: scroll;
}

/* For WebKit browsers like Chrome */
.scrolly::-webkit-scrollbar {
  width: 1px; /* Set width of the scrollbar */
}

.scrolly::-webkit-scrollbar-track {
  background: #f1f1f1; /* Set background color of the track */
}

.scrolly::-webkit-scrollbar-thumb {
  background: #888; /* Set color of the scrollbar thumb */
}

.px-8 {
  padding-left: 2rem !important;
  padding-right: 2rem !important;
}

.border-t-0 {
  border-top: 0px !important
}

.border-b-0 {
  border-bottom: 0px !important;
}

.rounded-none {
  border-radius: 0px !important;
}
</style>
