<script>
import Modal from "~/components/Modal.vue";

export default {
  name: "show-reject-reasons",
  data() {
    return {
      modalVisible: false,
      is_reject_modal: '',
    }
  },
  props: {
    index: {
      type: Number,
      default: 0
    },
    value: {
      type: Object,
    },
  },
  components: {
    Modal,
  },
  methods: {
    translateRejectReason(text) {
      var lang = this.currentLanguage ? this.currentLanguage.code : 'en';
      return text[lang] || text['en'] || text;
    },
    openModal(index) {
      this.modalVisible = true;
      this.is_reject_modal = index;
    },
    closeModal() {
      this.modalVisible = false;
    },

  },
  mounted() {

  }
}
</script>

<template>
  <div>
<!--    <div class="flex">-->

<!--      <div class="tooltip">-->
<!--        <svg style="height: 15px; width: 15px; color: red; margin-top: 5px" viewBox="0 0 24 24"-->
<!--             focusable="false" id="popover-trigger-64" aria-haspopup="dialog" aria-expanded="false"-->
<!--             aria-controls="popover-content-64">-->
<!--          <path fill="currentColor"-->
<!--                d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z"></path>-->
<!--        </svg>-->
<!--        <span class="tooltiptext" style="width: 260px; margin-left: -100px">-->
<!--                            Click on this product to view why your product has been rejected and make edits accordingly.-->
<!--                          </span>-->
<!--      </div>-->
<!--    </div>-->
    <span class="text-error cursor-pointer underline" @click="openModal(index)">
                        {{ $t('prod.show') }}
                      </span>
    <Modal :showModal="modalVisible" :is_reject_modal="is_reject_modal" :providedId="index"
           @closeModal="closeModal" v-if="value.reject_reasons">
      <div class="flex justify-between relative">
        <h4><strong>Rejection reasons</strong></h4>
      </div>
      <div class="mb-4 mt-10">
        <slot>
          <div v-for="(reject_reason_item, index) in value.reject_reasons">
            <p class="capitalize">
              <strong>{{ (reject_reason_item.group) }}</strong></p>
            <ul>
              <li class="block py-2 mx-3">{{
                  translateRejectReason(reject_reason_item.description)
                }}
              </li>
            </ul>
          </div>
        </slot>
      </div>
    </Modal>
  </div>
</template>

<style>

</style>
