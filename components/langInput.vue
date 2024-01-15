<!-- MultilingualInput.vue -->
<template>
  <div>
    <!-- Tab navigation -->
    <div class="flex space-x-10">
      <button type="button" class="w-32" v-for="(language, index) in languages" :key="index" @click="currentTab = index">
        {{ language }}
      </button>
    </div>

    <!-- Input fields for each language -->
    <div v-for="(language, index) in languages" :key="index" v-show="currentTab === index">
      <div class="input-wrapper">
        <label>{{ title }}   ({{ language }})</label>
        <input v-if="type=='text'"
          type="text"
          :placeholder="title"
          :value="valuesOfLang[language]"
          @input="updateInputValue(language, $event.target.value)"
          :class="{ invalid: !!!valuesOfLang[language] && hasError }"

        >
        <WYSIWYGEditor v-else
          :title="title"
          :description="valuesOfLang[language]"
          @change="valuesOfLang[language]= $event"
          @input="updateInputValue(language, $event.target.value)"

        />
        <span class="error" v-if="!!!valuesOfLang[language] && hasError">
          {{ $t('category.req', {type: title}) }}
        </span>
      </div>
    </div>
<!--    <span-->
<!--      class="error"-->

<!--    >-->
<!--      {{hasError}}-->
<!--      {{result.name.ar}}-->
<!--          {{ $t('category.req', { type: $t('index.title')}) }}-->
<!--        </span>-->
  </div>
</template>

<script>
export default {
  props: {
    valuesOfLang: {
      type: Object,
      required: true,
    },
    hasError: {
      type:Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default:"text"
    },
  },
  data() {
    return {
      languages: ['ar', 'en'], // Add your desired languages here
      currentTab: 0,
    };
  },
  methods: {
    updateInputValue(language, value) {
      this.$emit('updateInput',this.valuesOfLang, language, value);
    },
  },
};
</script>
