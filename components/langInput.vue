<!-- MultilingualInput.vue -->
<template>
  <div>
    <!-- Tab navigation -->
    <div class="flex space-x-10">
      <button class="w-32" v-for="(language, index) in languages" :key="index" @click="currentTab = index">
        {{ language }}
      </button>
    </div>

    <!-- Input fields for each language -->
    <div v-for="(language, index) in languages" :key="index" v-show="currentTab === index">
      <div class="input-wrapper">
        <label>{{ title }}</label>
        <input
          type="text"
          :placeholder="$t('country.name', { lang: language })"
          :value="valuesOfLang[language]"
          @input="updateInputValue(language, $event.target.value)"
          :class="{ invalid: !!!valuesOfLang[language] && hasError }"
        >
        <span class="error" v-if="!!!valuesOfLang[language] && hasError">
          {{ $t('category.req', {type: $t('index.title')}) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    valuesOfLang: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      languages: ['ar', 'en'], // Add your desired languages here
      currentTab: 0,
      hasError: false,
    };
  },
  methods: {
    updateInputValue(language, value) {
      this.$emit('updateInput', language, value);
    },
  },
};
</script>
