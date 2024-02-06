<!-- MultilingualInput.vue -->
<template>
  <div>
    <ul class="flex mb-0 list-none flex-wrap  w-50 shadow mt-10 flex-row">
      <li  v-for="(language, index) in languages" key="index" @click="currentTab = index" class="-mb-px mr-2 last:mr-0 cursor-pointer  flex-auto text-center">
        <a class="text-xs font-bold uppercase px-5 py-3  block leading-normal"  v-bind:class="{'bg-white border-white border-b-2': currentTab != index, 'border-b-2 border-primary':currentTab == index}">
          {{ language }}
        </a>
      </li>
    </ul>
    <!-- Input fields for each language -->
    <div v-for="(language, index) in languages" :key="language" v-show="currentTab === index">
      <div class="input-wrapper">
        <label>{{ title }}   ({{ language }})</label>
        <input v-if="type=='text'"
          type="text"
          :placeholder="title"
          :value="valuesOfLang[language]"
          @input="updateInputValue(language, $event.target.value)"
               :class="{ invalid: !!!valuesOfLang[language] && hasError, 'cursor-not-allowed': isVariant }"
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
    isVariant:{
      type:Boolean,
      default: false
    }
  },
  data() {
    return {
      languages: ['ar', 'en'], // Add your desired languages here
      currentTab: 0,
    };
  },
  methods: {
    updateInputValue(language, value) {
      console.log(0)
      this.$emit('updateInput',this.valuesOfLang, language, value);
    },
  },
};
</script>
