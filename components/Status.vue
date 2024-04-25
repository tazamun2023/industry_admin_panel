<template>
    <span :class="`bg-${backgroundColor} text-${color} px-2 rounded-3xl font-bold text-[13px]`">
      {{ $t(`status.${text}`) }}
    </span>
  </template>
  
  <script>
  export default {
    props: {
      backgroundColor: {
        type: String,
        default: 'primarylight'
      },
      color: {
        type: String,
        default: 'primary'
      },
      text: {
        type: String,
        default: null
      }
    }
  }
  </script>
  
  <style scoped>
  </style>