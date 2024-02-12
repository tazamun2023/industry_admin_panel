<template>
  <data-page
    ref="dataPage"
    set-api="setCategory"
    get-api="getCategory"
    set-image-api="setCategoryImage"
    route-name="categories"
    :name="$t('category.catUp')"
    gate="category"
    :validation-keys="['title', 'slug', 'meta_title', 'meta_description']"
    :result="result"
    @result="resultData"
  >
    <template v-slot:form="{hasError}">
      <div class="input-wrapper">
        <img v-if="result.image" :src="result.image" alt="" class="w-2/5">
        <upload-files @updateInput="saveAttachment"></upload-files>
      </div>

      <div class="input-wrapper">
        <lang-input :hasError="hasError" type="text" :title="$t('prod.name')" :valuesOfLang="result.title"
                    @updateInput="updateInput"></lang-input>
      </div>

      <div class="input-wrapper">
        <div class="dply-felx j-left mb-20 mb-sm-15">
          <span class="mr-15">{{$t('title.pc')}}</span>
          <dropdown
            v-if="allCategories"
            :default-null="true"
            :selectedKey="`${result.parent}`"
            :options="allCategories"
            @clicked="categorySelected"
          />
        </div>
      </div>


      <div class="input-wrapper">

        <label>{{ $t('category.slug') }}</label>
        <input
          type="text"
          :placeholder="$t('category.slug')"
          v-model="result.slug"
          ref="title"
          :class="{invalid: !!!result.slug && hasError}"
        >
        <span
          class="error"
          v-if="!!!result.slug && hasError"
        >
          {{ $t('category.req', { type: $t('category.slug')}) }}
        </span>
      </div>


      <div class="input-wrapper">
        <label>{{ $t('category.mTitle') }}</label>

        <lang-input :hasError="hasError" type="text" :title="$t('prod.name')" :valuesOfLang="result.meta_title"
                    @updateInput="updateInput"></lang-input>
      </div>

      <div class="input-wrapper">
        <label>{{ $t('category.mDesc') }}</label>
        <lang-input :hasError="hasError" type="text" :title="$t('prod.name')"  :valuesOfLang="result.meta_description"
                    @updateInput="updateInput"></lang-input>
      </div>


      <div class="input-wrapper">
        <div class="dply-felx j-left mb-20 mb-sm-15">
            <span class="mr-15">
              {{$t('category.featured')}}
            </span>

          <dropdown
            :selectedKey="`${result.featured}`"
            :options="featuredObj"
            @clicked="featuredSelected"
          />
        </div>
      </div>


      <div class="input-wrapper">
        <div class="dply-felx j-left mb-20 mb-sm-15">
          <span class="mr-15">
            {{ $t('title.sif') }}
          </span>

          <dropdown
            :selectedKey="`${result.in_footer}`"
            :options="featuredObj"
            @clicked="inFooterSelected"
          />
        </div>
      </div>


      <div class="input-wrapper">
        <div class="dply-felx j-left mb-20 mb-sm-15">
            <span class="mr-15">
              {{ $t('category.status') }}
            </span>

          <dropdown
            :selectedKey="`${result.status}`"
            :options="statusObj"
            @clicked="dropdownSelected"
          />
        </div>
      </div>
    </template>
  </data-page>
</template>

<script>

  import DataPage from "~/components/partials/DataPage";
  import util from "~/mixin/util"
  import Dropdown from '~/components/Dropdown'
  import LangInput from "~/components/langInput.vue";
  import {mapGetters, mapActions } from 'vuex';
  import FileUpload from '~/components/FileUpload'

  export default {
    name: "categories",
    middleware: ['common-middleware', 'auth'],
    data() {
      return {
        result: {
          id: '',
          title: {ar: '', en: ''},
          status: 2,
          featured: 2,
          parent: '',
          slug: '',
          meta_description: '',
          in_footer: 2,
          meta_title: '',
          image: []
        }
      }
    },
    mixins: [util],
    components: {
      DataPage,
      Dropdown,
      LangInput,
      FileUpload
    },
    computed: {
      ...mapGetters('language', ['currentLanguage']),
      ...mapGetters('common', ['allCategories'])
    },
    methods: {
      updateInput(input, language, value) {
        this.$set(input, language, value);
      },
      saveAttachment(images) {
        this.result.image = images
      },
      resultData(evt){
        if(this.$route?.params?.id === 'add'){
          this.emptyAllList('allCategories')
        }
        this.result = evt
      },
      inFooterSelected(data) {
        this.result.in_footer = data.key
      },
      featuredSelected(data) {
        this.result.featured = data.key
      },
      categorySelected(data) {
        this.result.parent = data.key
      },
      titleChanged(){
        this.result.slug = this.convertToSlug(this.result.title)
      },
      dropdownSelected(data) {
        this.result.status = data.key
      },
      ...mapActions('common', ['getAllList', 'emptyAllList'])
    },
    async mounted() {
      if (!this.allCategories) {
        try {
          await this.getAllList({api: 'getAllCategories', mutation: 'SET_ALL_CATEGORIES'})
        } catch (e) {
          return this.$nuxt.error(e)
        }
      }
    }
  }
</script>

<style scoped>

</style>
