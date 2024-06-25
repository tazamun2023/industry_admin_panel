<template>
  <div class="input-container">
    <label :for="selectId" class="text-[16px] capitalize">{{ label }}</label>
    <div class="relative">
      <select v-model="selectedGroup"
              :id="selectId"
              class="w-full border border-smooth focus:outline-none focus:border-primary ring-primary p-2 rounded-[10px]">
        <option v-if="non_select_option!=''" disabled value="">{{ non_select_option }}</option>
        <option v-for="option in options" :selected="option[value_key]==value" :key="option[value_key]" :value="option[value_key]">
          {{ option[value_text] }}
        </option>
      </select>
      <label class="absolute mt-[11px] ltr:right-1 rtl:left-1">
        <img class="w-4" :src="selectIcon" alt="Select Icon">
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'Custom Select'
    },
    non_select_option: {
      type: String,
      default:""
    },
    value_key: {
      type: String,
      default: 'id'
    },
    value_text: {
      type: String,
      default: 'title'
    },
    options: {
      type: Array,
      default: () => [
        { id: '', title: 'Select an option' }
      ]
    },
    selectIcon: {
      type: String,
      default: require('@/assets/icon/select.svg')
    },
    selectId: {
      type: String,
      default: 'groupSelect'
    }
  },
  data() {
    return {
      selectedGroup: this.value
    };
  },
  watch: {
    value(newValue, oldValue) {
      if (this.value) {
        this.selectedGroup = this.value;
      }
    },
    selectedGroup(newValue) {
      this.$emit('input', newValue);
    }
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
