<template>
  <div>
    <img v-tippy="title" class="w-5 cursor-pointer" src="~/assets/icon/ask.svg" alt="">
  </div>
</template>

<script>

export default {
  props: ['title'],

}
</script>
