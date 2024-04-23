<!-- MultilingualInput.vue -->
<template>

  <div>
    <div class="mt-20 " :style="hasError && attachments.length===0?'border: 1px solid red':''">
      <!--    <label class="w-full" for="">({{ $t('rfq.Attachments') }}) ({{ $t('rfq.Optional') }})</label>-->
      <dropzone id="foo" ref="el" :options="options"
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
      type:Boolean,
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
        dictDefaultMessage: "" + this.$t('prod.Drag & Drop images here to upload') + " <br> <span class=\"text-xs\">" + "<svg class=\"w-6 h-6 mx-auto text-gray-800 \" aria-hidden=\"true\"\n" +
          "                       xmlns=\"http://www.w3.org/2000/svg\" fill=\"currentColor\" viewBox=\"0 0 20 18\">\n" +
          "                    <path\n" +
          "                      d=\"M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z\"/>\n" +
          "                  </svg>" + "</span>",
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
