<!-- components/Modal.vue -->
<template>
  <custome-modal
    :title="` ${$t('orderDetails.add_document_for_order') }  ${selectedOrder.order_id }`"
    :show-modal="showModal"
    @close="closeModal" size="xl">

    <div class="md:w-1/2 mb-8 mt-2">
      <custom-select :options="filters.order_document_types"
                     value_key="id"
                     v-model="document_type"
                     :non_select_option="$t('orderDetails.select_document_type')"
                     value_text="name"
                     :label="$t('orderDetails.document_type')"
      ></custom-select>

    </div>

    <vue-upload-images
      :old_images="[]"
      accept="image/*,application/pdf"
      :max-files="4"
      :update-watch="false"
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
import CustomSelect from "./CustomSelect.vue";

export default {
  components: {
    CustomSelect,
    VueUploadImages,
    AjaxButton,
    CustomeModal,
    LazyImage
  },
  computed: {
    ...mapGetters('order', ['selectedOrdersall']),
    ...mapGetters('address', ['addressList']),
    ...mapGetters('common', ['filters']),
  },
  data() {
    return {
      files: [],
      saveSata: false,
      document_type: "",
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
      if (this.files.length > 0 && this.document_type != "") {
        this.saveSata = true
        const response = await this.addOrderFiles({
          payload: {
            order_id: this.selectedOrder.order_id,
            documents: this.files,
            document_type: this.document_type,
          }
        })

        // const index = this.orders.data.findIndex(order => order.order_id === response.data.order_id);
        // if (index !== -1) {
        //   this.$set(this.orders.data, index, Object.assign({}, this.orders.data[index], {status: response.data.status}));
        // }
        this.saveSata = false
        this.$emit('close');
      }
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
