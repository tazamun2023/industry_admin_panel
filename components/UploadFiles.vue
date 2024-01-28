<!-- MultilingualInput.vue -->
<template>

  <div class="mt-20">
    <label class="w-full" for="">({{ $t('rfq.Attachments') }}) ({{ $t('rfq.Optional') }})</label>
    <dropzone id="foo" ref="el" :options="options"
              @removeUpload="removeFile"
              v-on:vdropzone-files-added="addImage"
              :acceptedFileTypes="accept"
              v-on:vdropzone-success="showSuccess"
              v-on:vdropzone-removed-file="removeFile"></dropzone>

    <!--                <div-->
    <!--                  class="border border-dotted text-justify-center p-2 px-4 mt-10 rounded border-smooth w-100 lg:w-50">-->
    <!--                  ({{ $t('rfq.Attach File') }}) <br>-->
    <!--                  <span class="text-xs">{{ $t('rfq.Attach File Types') }}</span>-->
    <!--                </div>-->
    <!--                <p class="text-xs leading-relaxed">{{ $t('rfq.Attach File Note') }}</p>-->
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
    // hasError: {
    //   type:Boolean,
    //   required: true,
    // },
    // title: {
    //   type: String,
    //   required: true,
    // },
    accept: {
      type: String,
      default: ".jpg,.png"
    },
  },
  data() {
    return {
      attachments: [],

      options: {
        url: !process.env.apiBase.trim() ? window.location.origin + '/' : process.env.apiBase + "api/images/dz_upload",
        dictDefaultMessage: "(" + this.$t('rfq.Attach File') + ") <br>    <span class=\"text-xs\">" + this.$t('rfq.Attach File Types') + "</span>",
        // dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>UPLOAD ME",
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
          this.attachments.push({id: file.upload.uuid, file: base64Data})
          // this.$emit('updateInput',this.attachments);
          this.$emit('updateInput', this.attachments.map(obj => obj.file));
          // Now you can use the base64Data as needed
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
