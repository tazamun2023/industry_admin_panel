<template>
     <span class=" rounded-lg text-xs mt-2 p-1 text-white"
           :class="[getClassName(status)]">
                      {{status != '' ? $t('prod.' + status ?? 'incomplete') : $t('prod.incomplete')}}
                    </span>
</template>


<script>
export default {
  name: "ProductStatus",
  props: ['status'],
  methods: {
    getClassName(status) {
      switch (status) {
        case 'pending':
        case 'archived':
          return 'bg-warning';
        case 'approved':
          return 'bg-primary ';
        case 'rejected':
          return 'bg-bg-error ';
        default:
          return 'bg-smooth';

      }
    },

  }
}
</script>
