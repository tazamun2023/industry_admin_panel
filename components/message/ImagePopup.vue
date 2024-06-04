<template>
  <div class="w-full">
    <div id="modal" class="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-50">
  <div class="bg-white rounded-lg shadow-lg overflow-hidden w-1/3">
    <img :src="imageUrl" :alt="imageAlt" class="rounded-[10px] mx-auto" />
    <div class="px-6 py-4 bg-gray-100 text-right">

        <svg  @click="$emit('closePopup')" class="w-10 h-10 absolute ltr:right-1 rtl:left-1 top-0 cursor-pointer text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
</svg>

    </div>
  </div>
</div>
  </div>
</template>
<script>
export default {
  props: {
    imageUrl: String, // Pass image URL from parent component
    imageAlt: String,  // Pass image alt text from parent component
  },
  data() {
    return {
      showPopup: false, // Flag to control popup visibility
    };
  },
  methods: {
    closePopup() {
      this.showPopup = false; // Hide popup on close button click
    },
  },
};
</script>
