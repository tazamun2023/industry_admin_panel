<!-- MultilingualInput.vue -->
<template>
  <div>
    <!--    <ul class="flex mb-0 list-none flex-wrap  w-50 shadow mt-10 flex-row">-->
    <!--      <li  v-for="(language, index) in languages" :key="index" @click="currentTab = index" class="-mb-px mr-2 last:mr-0 cursor-pointer  flex-auto text-center">-->
    <!--        <a class="text-xs font-bold uppercase px-5 py-3  block leading-normal"  v-bind:class="{'bg-white border-white border-b-2': currentTab != index, 'border-b-2 border-primary':currentTab == index}">-->
    <!--          {{ language }}-->
    <!--        </a>-->
    <!--      </li>-->
    <!--    </ul>-->
    <!-- Input fields for each language -->
    <ValidationObserver class="w-full" v-slot="{ invalid }">
      <template v-if="invalidWatcher(invalid)"></template>
      <div class="grid grid-cols-12 gap-1 md:gap-2">
        <div v-for="(language, index) in languages" class="col-span-12" :key="index"
             :class="{'col-span-12 lg:col-span-6':(width50 && type=='text')}">
          <ValidationProvider :name="'Title '+language" :rules="{min:min,required: isRequired}" v-slot="{ errors }"
                              :custom-messages="{required: $t('global.req', { type: title}) }" class="w-full">
            <div class="input-wrapper">
              <label class="font-bold">{{ title }} ({{ language }}) <strong
                class="text-error">*</strong></label>
              <input
                v-if="type=='text'"
                type="text"
                :placeholder="title"
                :value="valuesOfLang[language]"
                @input="updateInputValue(language, $event.target.value)"
                :class="{ invalid: !!!valuesOfLang[language] , 'cursor-not-allowed': isVariant }"
                :readonly="IsReadOnly"
              >

              <froala-wysiwyg v-else
                              :description="valuesOfLang[language]"
                              :value="valuesOfLang[language]"
                              @change="valuesOfLang[language]= $event"
                              :IsReadOnly="IsReadOnly"

                              @input="updateInputValue(language, $event)"
              ></froala-wysiwyg>
              <!--          <WYSIWYGEditor v-else-->
              <!--                         :title="` ${title}  ( ${language} ) `"-->
              <!--                         @file="editorOverviewFile"-->
              <!--                         :description="valuesOfLang[language]"-->
              <!--                         @change="valuesOfLang[language]= $event"-->
              <!--                         :disabled="true"-->
              <!--                         @input="updateInputValue(language, $event.target.value)"-->
              <!--          />-->
              <span class="error" v-if="errors[0]">{{ errors[0] }}</span>
              <!--          <span class="error" v-if="!!!valuesOfLang[language] && hasError">-->
              <!--          {{ $t('category.req', {type: title}) }}-->
              <!--        </span>-->

            </div>
          </ValidationProvider>
        </div>
        <!--      <div class="h-10 w-10 md:w-16 self-center mt-3 ">-->
        <!--        <select v-model="currentTab"-->
        <!--          class="peer h-full w-full rounded-[7px]  transition-all uppercase focus:outline-none focus:ring">-->
        <!--                    <option v-for="(language, index) in languages" :value="index" :key="index" @click="currentTab = index">{{ language }}</option>-->
        <!--        </select>-->
        <!--        <label-->
        <!--          class="before:content[''] after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-sm before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-sm after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent">-->
        <!--         {{$t('app.lang')}}-->
        <!--        </label>-->
        <!--      </div>-->

      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import {validate, ValidationObserver, ValidationProvider} from 'vee-validate';
import FroalaWysiwyg from "./FroalaWysiwyg.vue";

export default {
  props: {
    valuesOfLang: {
      type: Object,
      required: true,
    },
    isRequired: {
      type: Boolean,
      default: true,
    },
    min: {
      type: Number,
      default: 3,
    },
    width50: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text"
    },
    isVariant: {
      type: Boolean,
      default: false
    },
    IsReadOnly: {
      type: Boolean,
      default: false
    },

  },
  components: {
    FroalaWysiwyg,
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      languages: ['ar', 'en'], // Add your desired languages here
      currentTab: 0,
      invalidData: false
    };
  },
  methods: {
    updateInputValue(language, value) {
      this.$emit('updateInput', this.valuesOfLang, language, value);
    },
    invalidWatcher(invalid) {
      console.log('unvaild', invalid)
      this.invalidData = invalid
      if (invalid != undefined)
        this.$emit('checkLangError', this.invalidData)
      return true; // Necessary to keep the template valid
    },

  },
};
</script>
