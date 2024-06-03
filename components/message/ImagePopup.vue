<template>
  <div>
    <div id="modal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
  <div class="bg-white rounded-lg shadow-lg overflow-hidden w-1/3">
    <slot></slot>
    <div class="px-6 py-4 bg-gray-100 text-right">
      <button id="closeModal" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Close</button>
    </div>
  </div>
</div>
  </div>
</template>
