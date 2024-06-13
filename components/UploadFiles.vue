<!-- MultilingualInput.vue -->
<template>

  <div>
    <div :style="hasError && attachments.length===0?'border: 1px solid red':''">

      <vue-upload-images :accept="accept" :old_images="old_images" :max-files="maxFiles"
                         @updateInput="saveAttachmentLargeAr">>
      </vue-upload-images>

    </div>
    <span class="error" v-if="hasError && attachments.length===0">{{ $t('prod.Media list is required') }}</span>
  </div>

</template>

<script>
import Dropzone from "nuxt-dropzone";
import Service from "@/services/service";

import 'nuxt-dropzone/dropzone.css'
import VueUploadImages from "./product/uploadImages.vue";

export default {
  components: {VueUploadImages, Dropzone},
  props: {

    hasError: {
      type: Boolean,
      required: false,
    },

    old_images: {
      type: Array,
      default: []
    },
    accept: {
      type: String,
      default: "image/*"
    },
    maxFiles: {
      type: Number,
      default: 1
    },
    customId: {
      type: String,
      required: false
    }
  },
  watch: {
    errorCheck() {
      this.hasError = this.attachments.length === 0;
    }
  },
  data() {
    return {
      attachments: [],

    };
  },
  methods: {
    saveAttachmentLargeAr(files) {
      this.attachments=files
      this.$emit('updateInput',this.attachments.map(obj => obj.url));
    },


  },
};
</script>

