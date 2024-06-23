<!-- MultilingualInput.vue -->
<template>

  <div>
    <div :style="hasError && attachments.length===0?'border: 1px solid red':''">
      <!--    <label class="w-full" for="">({{ $t('rfq.Attachments') }}) ({{ $t('rfq.Optional') }})</label>-->
      <dropzone :id="customId" ref="el" :options="options"
                @removeUpload="removeFile"
                v-on:vdropzone-files-added="addImage"
                v-on:vdropzone-success="showSuccess"
                v-on:vdropzone-removed-file="removeFile"></dropzone>

      <!--                <div-->
      <!--                  class="border border-dotted text-justify-center p-2 px-4 mt-10 rounded border-smooth w-100 lg:w-50">-->
      <!--                  ({{ $t('rfq.Attach File') }}) <br>-->
      <!--                  <span class="text-xs">{{ $t('rfq.Attach File Types') }}</span>-->
      <!--                </div>-->
    </div>
    <span class="error" v-if="hasError && attachments.length===0">{{ $t('prod.Media list is required') }}</span>
  </div>

</template>

<script>
import Dropzone from "nuxt-dropzone";
import Service from "@/services/service";

import 'nuxt-dropzone/dropzone.css'

export default {
  components: {Dropzone},
  props: {
    // valuesOfLang: {
    //   type: Object,
    //   required: true,
    // },
    hasError: {
      type: Boolean,
      required: false,
    },
    // title: {
    //   type: String,
    //   required: true,
    // },
    accept: {
      type: String,
      default: "image/*"
    },
    maxFiles: {
      type: Number,
      default: 10
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

      options: {
        acceptedFiles: this.accept,
        maxFiles: this.maxFiles,
        // accept:this.accept,
        url: !process.env.apiBase.trim() ? window.location.origin + '/' : process.env.apiBase + "api/images/dz_upload",
        dictDefaultMessage: this.$t('Drag & Drop images or click here to upload') +
          `<br><span class="text-xs my-2">
          <svg class="mx-auto" width="44" height="43" viewBox="0 0 44 43" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.79321 35.569L13.2914 28.8709C14.8134 27.7984 17.0098 27.9198 18.3777 29.1542L19.0134 29.741C20.5162 31.0968 22.9437 31.0968 24.4465 29.741L32.4612 22.5169C33.9639 21.161 36.3915 21.161 37.8942 22.5169L41.0346 25.3499" stroke="#01A781" stroke-width="3" stroke-linecap="square" stroke-linejoin="round"/>
              <path d="M16 17.5C18.2091 17.5 20 15.7091 20 13.5C20 11.2909 18.2091 9.5 16 9.5C13.7909 9.5 12 11.2909 12 13.5C12 15.7091 13.7909 17.5 16 17.5Z" stroke="#01A781" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M24 1.5H16C6 1.5 2 5.5 2 15.5V27.5C2 37.5 6 41.5 16 41.5H28C38 41.5 42 37.5 42 27.5V17.5" stroke="#292D32" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M34 1.5V13.5L38 9.5" stroke="#01A781" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M34 13.5L30 9.5" stroke="#01A781" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
          </span>`,
        addRemoveLinks: true,
        autoProcessQueue: false,

        // url: 'https://httpbin.org/post',
        // thumbnailWidth: 150,
        // maxFilesize: 0.5,
        headers: {"Authorization": "Bearer " + this.$auth.strategy.token.get()}
      },

    };
  },
  methods: {
    removeFile(file) {
      console.log(file)
      // console.log(file.xhr)
      // console.log('remove')
      // let url = JSON.parse(file.xhr.response);
      let index = this.attachments.findIndex(e => e.id == file.upload.uuid);
      this.attachments.splice(index, 1);
      if (this.maxFiles == 1)
        this.$emit('updateInput', "");
      else
        this.$emit('updateInput', this.attachments.map(obj => obj.file));

      // //todo : change according to api of delete media
      // const {data} = Service.image_delete("id", this.$auth.strategy.token.get())

      // if(data?.status === 200){
      //
      // }else {
      //   return Promise.reject({statusCode: data?.status, message: data.message })
      // }
    },


    showSuccess(file) {
      // console.log(file)
      // console.log(file.xhr)
      // this.attachments.push(JSON.parse(file.xhr.response))
      // this.$emit('updateInput',this.attachments);
      // console.log(file.xhr.response)

    },
    addImage(file) {
      for (var i = 0; i < file.length; i++) {
        console.log(file[i])
        this.readFileAsBase64(file[i])
      }
    },
    readFileAsBase64(file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const base64Data = event.target.result;
          // console.log('Base64 data:', base64Data);
          console.log("file")
          console.log(file.upload.uuid)
          // this.$emit('updateInput',this.attachments);
          if (this.maxFiles == 1) {
            this.attachments = [{id: file.upload.uuid, file: base64Data}]

            this.$emit('updateInput', base64Data);
          } else {
            this.attachments.push({id: file.upload.uuid, file: base64Data})

            this.$emit('updateInput', this.attachments.map(obj => obj.file));
          }          // Now you can use the base64Data as needed
          // For example, you might want to store it in your component's data or perform other actions.
        } else {
          console.error('Failed to read file as base64.');
        }
      };

      reader.readAsDataURL(file);
    },

  },
};
</script>
<style>
#h230 {
  height: 230px;
}

.dropzone .dz-preview.dz-image-preview {
  background: white;
  max-height: 175px !important;
  height: 171px;
}

.vue-dropzone {
  padding: 14px !important;
  border: 2px dashed #C4CDD5;
  background: #f2f3f5;
  border-radius: 10px;
  height: 235px;
}
</style>
