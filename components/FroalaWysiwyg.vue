<template>

  <froala :tag="'textarea'" @input="emitChange" :config="config" v-model="internalValue"></froala>
</template>


<script>
export default {
  props: {
    value: {
      type: String,
      default: " "
    },
  },
  data() {
    return {
      base_url: `${process.env.apiBase.trim()}api/admin/editor-images`,
      config: {
        events: {
          'froalaEditor.initialized': function () {
            console.log('initialized')
          },
        },
        key: 'mPD4tB1A2F1A1H1C2se1dpA-9H-9bB1tweF5C4C3E3E2C2C4D6B3C2==',
        placeholderText: 'write your description',
        heightMin: 345,
        attribution: false,
        enter: 1,

        requestHeaders: {
          Authorization: `${this.$auth.strategy.token.get()}`,
        },
        imagePaste: true,
        imageUploadURL: `${process.env.apiBase.trim()}api/admin/editor-images/upload`,
        // imageDeleteURL: `${this.base_url}/delete`,
        imageUploadParam: 'file',
        //Buttons for the popup menu which appears on imageReplace button click
        // imageEditButtons: ['imageReplace', 'imageRemove'],
        imageInsertButtons: ['imageBack', '|', 'imageUpload', 'imageByURL', 'imageManager'],
        imageDefaultWidth: 350,
        imageManagerDeleteURL: `${process.env.apiBase.trim()}api/admin/editor-images/delete`,
        //Validation
        imageAllowedTypes: ['jpeg', 'jpg', 'png'],
        // Set max image size to 2MB.
        imageMaxSize: 1024 * 1024 * 2,
        imageManagerLoadURL: `${process.env.apiBase.trim()}api/admin/editor-images/all`,
      },
      model: 'Edit Your Content Here!',
      hasError: false,
      internalValue: this.value
    };
  },
  watch: {
    value(newValue) {
      this.internalValue = newValue;
    }
  },
  methods: {
    emitChange() {
      this.$emit('input', this.internalValue);
    }
  }
}
</script>

