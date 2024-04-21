<script>
import VueDraggable from "vue-draggable";
import UploadImageIcon from "../partials/uploadImageIcon.vue";

export default {
  name: "VueUploadImages", // vue component name
  components: {
    UploadImageIcon,
    DraggableContainer: VueDraggable,
  },
  data() {
    return {
      dragOptions: {
        model: this.images,
        group: 'bag-images',
        dropzoneSelector: 'ul',
        draggableSelector: 'li',
        handlerSelector: null,
        reactivityEnabled: true,
        multipleDropzonesItemsDraggingEnabled: true,
        showDropzoneAreas: true,
        onDrop: this.handleDrop,
        onDragstart: function (event) {
          // Add any necessary logic for drag start event
        },
        onDragenter: function (event) {
          // Add any necessary logic for drag enter event
        },
        onDragover: function (event) {
          // Add any necessary logic for drag over event
        },
        onDragend: function (event) {
          // Add any necessary logic for drag end event
        }
      },
      error: "",
      files: [],
      dropped: 0,
      Imgs: [],
    };
  },
  props: {
    accept: {
      type: String,
      default: "image/*"
    },
    maxFiles: {
      type: Number,
      default: 1
    },
    old_images: [],

    uploadMsg: String,
    maxError: String,
    fileError: String,
    clearAll: String,
  },
  mounted() {
    for (var i=0;i<this.old_images.length;i++)
    this.Imgs.push({id:this.old_images[i].file_name,url:this.old_images[i].url});
    this.updateInputEvntData()
  },
  methods: {
    dragOver() {
      this.dropped = 2;
    },
    dragLeave() {
    },
    drop(e) {
      let status = true;
      let files = Array.from(e.dataTransfer.files)
      if (e && files) {
        files.forEach((file) => {
          if (file.type.startsWith("image") === false) status = false;
        });
        if (status == true) {
          if (
            this.$props.maxFiles &&
            files.length + this.files.length > this.$props.maxFiles
          ) {
            this.error = this.$props.maxError
              ? this.$props.maxError
              : `Maximum files is` + this.$props.maxFiles;
          } else {


            this.files.push(...files);
            this.previewImgs();
          }
        } else {
          this.error = this.$props.fileError
            ? this.$props.fileError
            : `Unsupported file type`;
        }
      }
      this.dropped = 0;
    },
    append() {
      this.files=[]
      this.$refs.uploadInput.click();
    },
    readAsDataURL(file) {
      return new Promise(function (resolve, reject) {
        let fr = new FileReader();
        fr.onload = function () {
          resolve(fr.result);
        };
        fr.onerror = function () {
          reject(fr);
        };
        fr.readAsDataURL(file);
      });
    },
    deleteImg(index) {
      this.Imgs.splice(index, 1);
      this.files.splice(index, 1);
      this.$emit("changed", this.files);
      this.$refs.uploadInput.value = null;
    },
    previewImgs(event) {
      if (
        this.$props.maxFiles &&
        event &&
        event.currentTarget.files.length + this.files.length > this.$props.maxFiles
      ) {
        this.error = this.$props.maxError
          ? this.$props.maxError
          : `Maximum files is` + this.$props.maxFiles;
        return;
      }
      if (this.dropped == 0) this.files.push(...event.currentTarget.files);

      this.error = "";
      this.$emit("changed", this.files);
      let readers = [];
      if (!this.files.length) return;
      for (let i = 0; i < this.files.length; i++) {

        readers.push(this.readAsDataURL(this.files[i]));
      }

     var temp=[];
      Promise.all(readers).then((values) => {
        temp = values;
        console.log("values");
        console.log(values);
        for (let i = 0; i < values.length; i++) {
          this.Imgs.push({id:"",url:values[i]})
        }
      })

      console.log(readers);

      console.log(this.Imgs)

      this.updateInputEvntData()


    },
    updateInputEvntData()
    {

      this.$emit('updateInput',this.Imgs);
      // this.$emit('updateInput', this.attachments.map(obj => obj.file));
    },
    reordered(event, dropped) {

      this.dropped =0
        console.log(this.Imgs)
      console.log(event)
      console.log(dropped)

      var old_index = parseInt(event.detail.ids[0]);
      if (old_index === -1)
        return
      var new_index = parseInt(event.detail.index);
      let temp = this.Imgs[old_index];
      this.Imgs.splice(old_index, 1);

      // Move the item to the first position
      // this.files.splice(new_index, 0, temp);
      this.Imgs.splice(new_index, 0, temp);
      //   if (!dropped || !dropped.element) {
      //     return; // Handle the case where "dropped" is undefined or missing "element"
      //   }
      //
      //   // Optional: Handle the drop event to update image order or provide feedback
      //   const draggedIndex = this.images.indexOf(dropped.element);
      //   const newIndex = this.images.indexOf(dropped.related);
      //
      //   if (draggedIndex !== -1 && draggedIndex !== newIndex) {
      //     const [removedImage] = this.images.splice(draggedIndex, 1);
      //     this.images.splice(newIndex, 0, removedImage);
      //   }
      //
      //   console.log('Images dropped (updated order):', this.images);
      // },

      this.updateInputEvntData()
    },
    reset() {
      this.$refs.uploadInput.value = null;
      this.Imgs = [];
      this.files = [];
      this.$emit("changed", this.files);
      this.updateInputEvntData()
    },
  },

};
</script>

<template>
  <!--  @drop.prevent="drop($event)"-->

  <div>
    <div
      class="container"
      @dragover.prevent="dragOver"
      @dragleave.prevent="dragLeave"


    >
      <div class="drop" v-show="dropped == 2"></div>
      <!-- Error Message -->


      <!-- To inform user how to upload image -->
      <div v-show="Imgs.length == 0" class="beforeUpload">
        <input
          type="file"
          style="z-index: 1"
          :accept="accept"
          ref="uploadInput"
          @change="previewImgs"
          multiple
        />
        <div class="text-center"></div>
        <upload-image-icon></upload-image-icon>
        <p class="mainMessage">
          {{ uploadMsg ? uploadMsg : "Click to upload or drop your images here" }}
        </p>
      </div>
      <div class="imgsPreview" v-show="Imgs.length > 0">
        <button type="button" class="clearButton" @click="reset">
          {{ clearAll ? clearAll : "clear All" }}
        </button>
        <div v-drag-and-drop:options="dragOptions">
          <ul

            @reordered="reordered">
            <li class="imageHolder" v-for="(img, i) in Imgs" :data-id="i" :key="i">
              <img :src="img.url"/>
              <span class="delete" style="color: white" @click="deleteImg(i)">
          <svg
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </span>

            </li>

            <li class="absolute bottom-[4rem] ms-5" :data-id="-1">
              <div class="plus" @click="append">
                <upload-image-icon></upload-image-icon>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-show="error" class="error">
      {{ error }}
    </div>
  </div>

</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  background: #f7fafc;
  border: 0.5px solid #a3a8b1;
  border-radius: 10px;
  padding: 30px;
  position: relative;
}

.drop {
  width: 100%;
  height: 100%;
  top: 0;
  border-radius: 10px;
  position: absolute;
  background-color: #f4f6ff;
  left: 0;
  border: 3px dashed #a3a8b1;
}

.error {
  text-align: center;
  color: red;
  font-size: 15px;
}

.beforeUpload {
  position: relative;
  text-align: center;
}

.beforeUpload input {
  width: 100%;
  margin: auto;
  height: 100%;
  opacity: 0;
  position: absolute;
  background: red;
  display: block;
}

.beforeUpload input:hover {
  cursor: pointer;
}

.beforeUpload .icon {
  width: 150px;
  margin: auto;
  display: block;
}

.imgsPreview .imageHolder {
  width: 150px;
  height: 150px;
  background: #fff;
  position: relative;
  border-radius: 10px;
  margin: 5px 5px;
  display: inline-block;
}

.imgsPreview .imageHolder img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.imgsPreview .imageHolder .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 29px;
  height: 29px;
  color: #fff;
  background: red;
  border-radius: 50%;
}

.imgsPreview .imageHolder .delete:hover {
  cursor: pointer;
}

.imgsPreview .imageHolder .delete .icon {
  width: 66%;
  height: 66%;
  display: block;
  margin: 4px auto;
}

.imgsPreview .imageHolder .plus {
  color: #2d3748;
  background: #f7fafc;
  border-radius: 50%;
  font-size: 21pt;
  height: 30px;
  width: 30px;
  text-align: center;
  border: 1px dashed;
  line-height: 23px;
  position: absolute;
  right: -42px;
  bottom: 43%;
}

.plus:hover {
  cursor: pointer;
}

.clearButton {
  color: #2d3748;
  position: absolute;
  top: 7px;
  right: 7px;
  background: none;
  border: none;
  cursor: pointer;
}
</style>
