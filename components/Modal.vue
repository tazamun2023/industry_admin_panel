<!-- components/Modal.vue -->
<template>
    <div v-if="showModal && is_reject_modal === providedId" class="fixed bg-modal  inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="z-50 bg-white p-6 relative rounded-md shadow w-full md:w-1/2 lg:w-2/3 xl:w-1/4">
        <svg @click="closeModal" class="w-4 h-4 text-gray-800 absolute ltr:right-3  rtl:left-3 cursor-pointer mt-[-10px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
        <!-- Modal Content -->
        <div class="mb-4">
          <slot></slot>
        </div>
        <!-- Close Button -->
        <div class="flex justify-end">
        <slot name="buttons">

        </slot>
      </div>

      </div>
    </div>
  </template>

  <script>
  export default {
    // props: {
    //   showModal: Boolean,
    //   is_reject_modal: String,
    //   providedId: String,
    // },
    props: ['showModal', 'is_reject_modal', 'providedId'],
    methods: {
      closeModal() {
        this.$emit('closeModal');
      },
    },
  };
  </script>
