<template>
  <div v-if="$can(gate)"><slot></slot></div>
</template>
<script>

export default {
props: {
    gate:{
        type: String,
        default: null
    }
}
}
</script>
