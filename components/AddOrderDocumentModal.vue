<!-- components/Modal.vue -->
<template >
  <custome-modal
    :title="` ${$t('approveModal.add_document_for_order') }  ${selectedOrder.order_id }`"
    :show-modal="showModal"
    @close="closeModal" size="xl">

    <vue-upload-images
      :old_images="[]"
      accept="image/*,application/pdf"
      :max-files="4"
      @updateInput="saveAttachment">

    </vue-upload-images>

    <template v-slot:buttons>
      <ajax-button
        name="save"
        another_class="primary-btn"
        type="button"
        :text="$t('setting.sv')"
        @click="uploadFiles"
        @clicked="uploadFiles"
        :fetching-data="saveSata"
      />
    </template>

  </custome-modal>
</template>

<script>
import LazyImage from "./LazyImage.vue";
import {mapGetters, mapActions} from "vuex";
import CustomeModal from "./CustomeModal.vue";
import AjaxButton from "./AjaxButton.vue";
import VueUploadImages from "./product/uploadImages.vue";

export default {
  components: {
    VueUploadImages,
    AjaxButton,
    CustomeModal,
    LazyImage
  },
  computed: {
    ...mapGetters('order', ['selectedOrdersall']),
    ...mapGetters('address', ['addressList']),
  },
  data() {
    return {
      files: [],
      saveSata: false,
      firstBox: true,
    }
  },
  methods: {
    ...mapActions('common', ['getRequest']),
    ...mapActions('order', ['addOrderFiles']),

    saveAttachment(images) {
      this.files = images
    },

    async uploadFiles(data) {
      this.saveSata=true
      const response = await this.addOrderFiles({
        payload: {
          order_id:this.selectedOrder.order_id,
          documents:this.files
        }
      })
      // const index = this.orders.data.findIndex(order => order.order_id === response.data.order_id);
      // if (index !== -1) {
      //   this.$set(this.orders.data, index, Object.assign({}, this.orders.data[index], {status: response.data.status}));
      // }
      this.saveSata=false
      this.$emit('close');
    },

    closeModal() {

      this.$emit('close');
    },

  },
  mounted() {

  },
  props: ['showModal', 'selectedOrder']
};
</script>
