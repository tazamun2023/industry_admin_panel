<template>

  <div>
    <svg v-if="type==0" stroke="currentColor" fill="red" stroke-width="0" viewBox="0 0 24 24"
         class="css-1e90oim" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path
        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
    </svg>

    <svg v-else stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"
         class="css-qz46ni" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path>
    </svg>
  </div>

</template>

<script>


export default {
  name: "check-icon",

  props: {
    type: "",

  },

}
</script>
