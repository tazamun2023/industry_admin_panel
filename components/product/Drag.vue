<template>
  <div v-drag-and-drop:options="dragOptions">
    <ul

      @reordered="reordered"
      class="image-uploader">
      <li v-for="(image,index) in images"  :data-id="index" :key="image.id" class="image-container">
        <img :src="image.url" alt="Image"/>
        <button @click="removeImage(image)">Remove</button>
      </li>
    </ul>
    <input type="file" class="vue-dropzone dropzone dz-clickable" @change="handleImageUpload" multiple accept="image/*">
  </div>
</template>

<script>
import VueDraggable from 'vue-draggable';

export default {
  components: {
    DraggableContainer: VueDraggable,
  },
  data() {
    return {
      images: [],
      bag: 'bag-images',
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
      }
    };
  },
  methods: {
    handleImageUpload(event) {
      const files = event.target.files;
      for (const file of files) {
        this.readAndAddImage(file);
      }
    },
    readAndAddImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.images.push({id: Date.now(), url: e.target.result});
      };
      reader.readAsDataURL(file);
    },
    removeImage(image) {
      const index = this.images.indexOf(image);
      if (index > -1) {
        this.images.splice(index, 1);
      }
    },
    handleDrop(event, dropped) {
      // console.log(this.images)
      // console.log(event)
      // console.log(dropped)
      // if (!dropped || !dropped.element) {
      //   return; // Handle the case where "dropped" is undefined or missing "element"
      // }
      //
      // // Optional: Handle the drop event to update image order or provide feedback
      // const draggedIndex = this.images.indexOf(dropped.element);
      // const newIndex = this.images.indexOf(dropped.related);
      //
      // if (draggedIndex !== -1 && draggedIndex !== newIndex) {
      //   const [removedImage] = this.images.splice(draggedIndex, 1);
      //   this.images.splice(newIndex, 0, removedImage);
      // }
      //
      // console.log('Images dropped (updated order):', this.images);
    },
    reordered(event, dropped) {
      console.log(this.images)
      console.log(event)
      console.log(dropped)

      var old_index=parseInt(event.detail.ids[0]);
      var new_index=parseInt(event.detail.index);
      let temp=this.images[old_index];
      this.images.splice(old_index, 1);

      // Move the item to the first position
      this.images.splice(new_index, 0, temp);
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
  },
  },
};
</script>

<style scoped>
.image-uploader {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
}

.image-container {
  margin: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
}

.image-container img {
  max-width: 200px;
  max-height: 200px;
  object-fit: cover;
}

.image-container button {
  margin-top: 10px;
}
</style>
