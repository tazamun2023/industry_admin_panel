<script>
export default {
  name: "BasicInformationChild",
  middleware: ['common-middleware', 'auth'],
  props: {
    result: {}
  },
  data() {
    return {
      hasError: false,
    }
  },

  methods: {
    updateInput(input, language, value) {
      this.$set(input, language, value);
      this.basicInfoChildPass()
    },

    basicInfoChildPass() {
      this.$emit('basicInfoChild', this.result);
    }

  }
}
</script>

<template>
  <div class="tab-sidebar p-3">
    <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Basic Information') }} </h4>
    <div class="card-body">
      <div class="input-wrapper mb-10">
        <label for="">{{ $t('prod.Key features - English') }} ?</label>

        <lang-input-multi :hasError="hasError" type="text" :title="$t('city.name')"
                          :valuesOfLang="result.features"
                          @updateInput="updateInput"></lang-input-multi>
      </div>

      <div class="input-wrapper mb-10">
        <label for="">{{ $t('prod.Keywords - English') }} ?</label>
        <v-select
          :dir="$t('app.dir')"
          v-model="result.basic_keyword_en"
          :options="['sea','air','land']"
          taggable
          multiple
          :placeholder="$t('title.select_type')"
          @input="basicInfoChildPass"
          class="custom-select"
        ></v-select>
      </div>
      <div class="input-wrapper mb-10">
        <label for="">{{ $t('prod.Keywords - Arabic') }} ?</label>
        <v-select
          :dir="$t('app.dir')"
          v-model="result.basic_keyword_ar"
          :options="['sea','air','land']"
          taggable
          multiple
          @input="basicInfoChildPass"
          :placeholder="$t('title.select_type')"
          class="custom-select"
        ></v-select>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
