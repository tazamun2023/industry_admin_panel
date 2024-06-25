<template>
  <custome-modal
    :title="` ${$t('orderReject.title')} #${selectedOrders[0]?.order_id } `"
    :show-modal="showModal"
    :sub_title="$t('orderReject.confirmation')"
    @close="closeModal"
    size="lg">

    <toast-message v-if="hasError" :is-error="hasError"
                   :message="$t('error.has error sorry please select data reject')"/>

    <div class="card p-4">
      <div class="flex border-b pb-4 border-smooth gap-4">
        <div>
          <p>{{ $t('orderReject.order') }}</p>
          <p class="text-xs">{{ selectedOrders[0]?.order_id }}</p>
        </div>
        <div>
          <p>{{ $t('orderReject.orderPlaced') }}</p>
          <p class="text-xs">{{ selectedOrders[0]?.order_placed }}</p>
        </div>
      </div>
      <div class="py-4">
        <label class="block py-2" for="">{{ $t('orderReject.selectRejectionReason') }}</label>
        <select class="p-4 w-full border border-smooth rounded" v-model="RejectionSelected">
          <template v-if="reject_reasons_types">
            <option :value="item.id" v-for="(item, index) in reject_reasons_types['RejectOrders']" :key="index">
              {{ item.description }}
            </option>
          </template>
        </select>
      </div>
    </div>
    <template v-slot:buttons>
      <ajax-button
        name="save"
        class="primary-btn"
        type="button"
        :text="$t('setting.sv')"
        @click="save"
        @clicked="save"
        :disabled="saveSata"
        :fetching-data="saveSata"
      />
    </template>
  </custome-modal>
</template>
<script>
import ToastMessage from "./ToastMessage.vue";
import AjaxButton from "./AjaxButton.vue";
import {mapActions, mapGetters} from "vuex";
import CustomeModal from "./CustomeModal.vue";

export default {
  components: {CustomeModal, AjaxButton, ToastMessage},
  props: ['selectedOrders', 'saveSata','showModal'],
  data() {
    return {
      RejectionSelected: "",

      hasError: false,
    }
  },
  computed: {
    ...mapGetters('reject-reasons', ['reject_reasons_types']),

  },
  methods: {
    ...mapActions('reject-reasons', ['getRejectReasons',]),

    closeModal() {
      this.$emit('close');
    },
    save() {
      if (this.RejectionSelected === "") {
        this.hasError = true;
      } else {
        this.hasError = false;
        let data = {
          status: "reject",
          order_id: this.selectedOrders[0]?.order_id,
          reject_reasons: this.RejectionSelected
        }
        this.$emit('save', data)
      }

    }
  },
  async mounted() {
    this.openTab = this.$route.query.tap ?? 'all'
    await this.getRejectReasons({type: "RejectOrders",groups:0})
  }
}
</script>
<script setup>
</script>
