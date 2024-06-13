<script>
import {ValidationObserver, ValidationProvider} from 'vee-validate';
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ReplyNewOffer",
  props: {
    is_send_new_offer_customer: {},
    InqOffer: {},
  },
  components: {ValidationObserver, ValidationProvider},
  data() {
    return {
      formSubmitting: false,
      is_after_send: true,

      formData: {
        type: 'offer',
        unit_target_price: '',
        total_tax: 0,
        expired_at: '',
        quantity: 1
      }
    }
  },
  created() {
    // this.initializeQuantity();
  },
  mounted() {
    // this.formData.quantity = this.activeInquiryData?.offer?.quantity
  },
  computed:{
    ...mapGetters('rfq', ['activeRfqInquiries', 'activeInquiryData']),
  },
  methods: {
    initializeQuantity() {
      const inquiryOffers = this.ActiveInquiryData?.inquiryOffers;
      this.formData.quantity = inquiryOffers?.[this.offer_index]?.offer?.quantity;
    },
    async Confirm() {
      try {
        this.formSubmitting = true
        await this.setRequest({
          params: {
            inquiry_id: this.activeInquiryData.id,
            inquiry_offer_id: this.InqOffer.id,
            status: 'pending_response',
            is_reply: 1,
            type: this.formData.type,
            price: this.formData.unit_target_price,
            quantity: this.formData.quantity,
            expired_at: this.formData.expired_at
          },
          api: 'inquiriesOfferStore'
        }).then(data => {
          // this.InqOffer = null;
          // this.setToastMessage(this.$t('products.success_inquires_send_msg'))
          this.$emit('is_send_new_offer', false);
          this.$emit('is_send_new_offer_vendor', false);
          this.is_after_send = false
          this.setIsFetchingRfq();
        })
        this.formSubmitting = false

      } catch (e) {
        return this.$nuxt.error(e)
      }
    },


    Cancel() {
      this.$emit('is_cancel', true);
    },
    increment() {
      this.formData.quantity++; // Increment the quantity
    },
    decrement() {
      if (this.formData.quantity > 1) { // Ensure quantity is not negative
        this.formData.quantity--; // Decrement the quantity
      }
    },
    calculateTotalPrice() {
      const total = this.formData.quantity * this.formData.unit_target_price;
      return isNaN(total) ? 0 : total;
    },
    getTodayFormattedDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    onlyNumber($event) {
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
        $event.preventDefault();
      }
    },

    ...mapActions('common', ['getById', 'setById', 'setRequest', 'getRequest']),
    ...mapActions('rfq', ['setActiveInquiriesOffer', 'setIsFetchingRfq']),
  }
}
</script>

<template>
  <div v-if="InqOffer">
    <p class="font-bold">{{ $t('products.Send new offer') }}</p>
    <ValidationObserver v-slot="{ invalid }">
      <div class="bg-darklight p-4">
        <ValidationProvider name="quantity price" :rules="{required: true, min_value: 1, max_value: 99999999}"
                            v-slot="{ errors }"
                            :custom-messages="{required: `${$t('products.Unit target price')} is Required`}">
          <div class="flex justify-between gap-4 pt-4">
            <p>{{ $t('products.How many Piece') }}</p>
            <div class="flex border-smooth bg-white rounded my-2 border">
              <button @click="decrement" class="w-14  text-center  p-0 border-0"><img class="w-3 h-1 mx-auto"
                                                                                      src="~/assets/icon/minus.svg"
                                                                                      alt=""></button>
              <input class="w-[102px]  p-2 border-t-0 border-b-0 rounded-none  text-center" type="text"
                     v-model="formData.quantity">
              <button @click="increment" class="w-14  text-center  p-0 border-0"><img class="w-3 h-3 mx-auto"
                                                                                      src="~/assets/icon/plus.svg"
                                                                                      alt="">
              </button>
            </div>
          </div>
          <span class="error">{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider name="Target price" :rules="{required: true, min_value: 1, max_value: 99999999}"
                            v-slot="{ errors }"
                            :custom-messages="{required: `${$t('products.Unit target price')} is Required`}">
          <div class="flex justify-between gap-4 pt-4">
            <p class="w-50">{{ $t('products.Unit target price') }}</p>
            <input
              class="w-50 p-2 rounded"
              :placeholder="$t('products.Unit target price')"
              type="text"
              v-model="formData.unit_target_price"
              @keypress="onlyNumber"
            >
          </div>
          <span class="error">{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider name="expired date" rules="required" v-slot="{ errors }"
                            :custom-messages="{required: `${$t('prod.Validate until')} is Required`}">
          <div class="flex justify-between gap-4 pt-4">
            <p class="w-50">{{ $t('prod.Validate until') }}</p>
            <input
              class="p-2 rounded"
              :placeholder="$t('prod.Validate until')"
              type="date"
              :min="getTodayFormattedDate()"
              v-model="formData.expired_at"
            >
          </div>
          <span class="error">{{ errors[0] }}</span>
        </ValidationProvider>

      </div>

      <p class="text-end font-bold py-1 px-4">{{ $t('products.Total Price excl VAT') }} <span class="text-primary">{{
          $t('app.SAR')
        }} {{ calculateTotalPrice() }}</span>
      </p>
      <div class="flex justify-end gap-4 pt-2" v-if="is_after_send">
        <button @click="Cancel"
                class="border-2 border-primary px-2 h-[34px] leading-3 text-primary font-bold">
          {{ $t('products.Cancel') }}
        </button>
        <button
          :disabled="!formData.expired_at"
          @click="Confirm"
          class="border-2 border-primary px-2 h-[34px] leading-3 bg-primary text-white font-bold">
          {{ $t('products.Confirm') }}
        </button>
      </div>
    </ValidationObserver>
  </div>
</template>

<style scoped>

</style>
