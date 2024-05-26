<template>
 <div>
  <div class="w-full flex gap-4">
    <div class="w-full">
      <label class="relative inline-flex cursor-pointer items-center">
      <input :id="id" :checked="checked" hidden type="checkbox" class="peer sr-only" />
      <label for="switch" class="hidden"></label>
      <div class="peer h-6 w-11 rounded-full border border-smooth bg-smooth absolute after:absolute after:left-[2px] after:top-[1px] after:h-5 after:w-5 after:rounded-full after:border after:border-primary after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-primary"></div>
     </label>
    </div>
  </div>
 </div>
</template>

<script>
export default {
  props: {
    checked: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: 'switch'
    },
  }
}
</script>
