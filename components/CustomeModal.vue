<template>
  <div>
    <Modal
      v-model="showModal"
      @before-open="beforeOpen" @before-close="beforeClose"
      :title="title"
      :modal-class="`Body freeze  scrollable-modal modal modal-${size}`"
    >

      <slot name="header2"></slot>
      <div class="scrollable-content">
        <slot></slot>
      </div>
      <div class="w-full  border-t relative p-8 border-smooth">

        <div class="flex justify-between gap-4 items-end p-1 text-end absolute ltr:right-[40px] mt-[-18px] rtl:left-[40px]">
          <button @click="closeModal" class="bg-smooth px-4 w-[100px] text-primary p-3 rounded leading-3">
            {{ $t('approveModal.cancel') }}
          </button>
          <slot name="buttons"></slot>
        </div>
      </div>


    </Modal>
  </div>
</template>
<script>
import bodyScroll from 'body-scroll-freezer'

export default {
  props: ['showModal', 'size', 'title'],

  data: function () {
    return {}
  },
  mounted() {
    bodyScroll.init()
  },
  methods: {
    beforeOpen() {
      bodyScroll.freeze()
    },
    beforeClose() {
      bodyScroll.unfreeze()
      this.$emit('close');
    },
    closeModal() {
      bodyScroll.unfreeze()
      this.$emit('close');
    },

  }
}
</script>

<style>


.scrollable-modal {
  display: flex;
  flex-direction: column;
  height: auto;
  max-height: calc(100% - 50px);
}

.scrollable-modal .vm-titlebar {
  flex-shrink: 0;
}

.scrollable-modal .vm-content {
  padding: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.scrollable-modal .vm-content .scrollable-content {
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 2px 5px 0px 4px;

  flex-grow: 1;
}


.vm-title {
  html:lang(ar) & {
    float: right;
  }
;
}


.vm-btn-close {
  height: 32px;
  html:lang(ar) & {
    float: left !important;
  }

  /* line-height: 1em; */
}


.modal {
  min-width: 300px;
}
.vm-titlebar {
  padding: 10px 10px 0px;
  overflow: auto;
}

@media (min-width: 480px) {
  .modal.modal-sm {
    max-width: 300px;
  }
}

@media (min-width: 992px) {
  .modal.modal-lg,
  .modal.modal-xl {
    max-width: 800px;
  }
}

@media (min-width: 1200px) {
  .modal.modal-xl {
    max-width: 1140px;
  }
}



</style>
