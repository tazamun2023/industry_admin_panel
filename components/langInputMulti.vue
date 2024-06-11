<!-- MultilingualInput.vue -->
<template>
  <div>
    <!-- Tab navigation -->
    <!--    <ul class="flex mb-0 list-none flex-wrap  w-50 shadow mt-10 flex-row">-->
    <!--      <li  v-for="(language, lindex) in languages" key="index" @click="currentTab = lindex" class="-mb-px mr-2 last:mr-0 cursor-pointer  flex-auto text-center">-->
    <!--        <a class="text-xs font-bold uppercase px-5 py-3  block leading-normal"  v-bind:class="{'bg-white border-white border-b-2': currentTab !== lindex, 'border-b-2 border-primary':currentTab === lindex}">-->
    <!--          {{ language }}-->
    <!--        </a>-->
    <!--      </li>-->
    <!--    </ul>-->

    <!-- Input fields for each language -->
    <ValidationObserver class="w-full" v-slot="{ invalid }">
      <template v-if="invalidWatcher(invalid)"></template>
      <div class="grid grid-cols-11 gap-1 md:gap-2">
        <div v-for="(language, key) in languages" :key="'label_key_features'+key"
             :class="{'col-span-12 lg:col-span-5':(width50 )}">
          <label>{{ $t('prod.key_features') }} ({{ language }})</label>
        </div>
      </div>
      <div class="grid grid-cols-11 gap-1 md:gap-2">
        <template v-for="(row,index) in  valuesOfLang">

          <div v-for="(language, key) in languages" :key="'key_features'+key"
               :class="{'col-span-12 lg:col-span-5':(width50 )}">
            <ValidationProvider :name="'features_'+index+'_'+language" :rules="{required: isRequired}"
                                v-slot="{ errors }"
                                :custom-messages="{required: $t('global.req', { type: $t('prod.features_placeholder')}) }"
                                class="w-full">
              <input class="form-control" :placeholder="$t('prod.features_placeholder')"
                     v-model="valuesOfLang[index][language]"
                     @input="updateInputValue(language, $event.target.value)"
                     :readonly="IsReadOnly"
              >
              <span class="error" v-if="errors[0]">{{ errors[0] }}</span>

            </ValidationProvider>
          </div>
          <div v-if="!IsReadOnly" class="col-span-12 lg:col-span-1 flex justify-between">


            <button type="button" class="btn  btn-danger " v-if="index !== 0"
                    @click.prevent="removeRow(index)">
              <svg class="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                   fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M1 1h16"/>
              </svg>
            </button>

            <button v-if="( index+1===valuesOfLang.length)" type="button" class="btn   btn-primary"
                    @click.prevent="addRow()">
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 18 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 1v16M1 9h16"/>
              </svg>
            </button>
          </div>

        </template>
      </div>

    </ValidationObserver>

  </div>
</template>

<script>
import {validate, ValidationObserver, ValidationProvider} from 'vee-validate';

export default {
  props: {
    width50: {
      type: Boolean,
      default: true
    },
    valuesOfLang: {
      type: Array,
      required: true,
    },
    hasError: {
      type: Boolean,
      default: true,
    },
    isRequired: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text"
    },
    IsReadOnly: {
      type: Boolean,
      default: false
    },
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      languages: ['ar', 'en'], // Add your desired languages here
      currentTab: 0,
    };
  },
  methods: {
    addRow() {
      localStorage.setItem('formValues', JSON.stringify(this.valuesOfLang));
      this.valuesOfLang.push({"ar": "", "en": ""})
    },
    removeRow(index) {
      if (index != 0) {
        this.valuesOfLang.splice(index, 1);
      }
    },
    invalidWatcher(invalid) {
      // this.invalidData=invalid
      if (invalid != undefined)
        this.$emit('checkLangError', invalid)
      return true; // Necessary to keep the template valid
    },
    updateInputValue(language, value) {
      console.log(0)
      this.$emit('updateInput', this.valuesOfLang, language, value);
    },
  },
};
</script>
