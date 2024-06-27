<template>
  <data-page
    v-if="$can('view_brands') || $can('manage_brands')"
    ref="dataPage"
    set-api="setBrand"
    get-api="getBrand"
    empty-store-variable="allBrands"
    route-name="brands"
    :name="$t('prod.brand')"
    gate="view_brands"
    :manage_gate="is_show?'not_update':'manage_brands'"
    :validation-keys="['title.ar','title.en', 'image']"
    :result="result"
    @result="resultData"
  >

    <template v-slot:form="{hasError}">

      <div class="input-wrapper">
        <!--        <label>{{ $t('prod.Image') }}</label>-->

        <upload-files :is-read-only="is_show" :old_images="result.image" @updateInput="saveAttachment"
                      :max-files="1"></upload-files>
        <span
          class="error"
          v-if="!!!result.title && hasError"
        >
          {{ $t('category.req', {type: $t('index.image')}) }}
        </span>
      </div>


      <div class="input-wrapper">
        <label>{{ $t('index.title') }}</label>
        <!--        <input-->
        <!--          type="text"-->
        <!--          :placeholder="$t('index.title')"-->
        <!--          name="title"-->
        <!--          v-model="result.title"-->
        <!--          ref="title"-->
        <!--          @change="slugChange"-->
        <!--          :class="{invalid: !!!result.title && hasError}"-->
        <!--        >-->

        <lang-input :is-read-only="is_show" :hasError="hasError" type="text" :title="$t('index.title')"
                    :valuesOfLang="result.title"
                    @updateInput="updateInput"></lang-input>


        <span
          class="error"
          v-if="!!!result.title && hasError"
        >
          {{ $t('category.req', {type: $t('index.title')}) }}
        </span>
      </div>


      <!--      <div class="input-wrapper">-->
      <!--        <label>{{ $t('category.slug') }}</label>-->
      <!--        <input-->
      <!--          type="text"-->
      <!--          :placeholder="$t('category.slug')"-->
      <!--          name="slug"-->
      <!--          :disabled="is_show"-->
      <!--          v-model="result.slug"-->
      <!--          ref="slug"-->
      <!--          :class="{invalid: !!!result.slug && hasError}"-->
      <!--        >-->
      <!--        <span-->
      <!--          class="error"-->
      <!--          v-if="!!!result.slug && hasError"-->
      <!--        >-->
      <!--          {{ $t('category.req', {type: $t('category.slug')}) }}-->
      <!--        </span>-->
      <!--      </div>-->

      <!--      <div class="input-wrapper">-->
      <!--        <div class="dply-felx j-left mb-20 mb-sm-15">-->
      <!--          <span class="mr-15 w-[100px]">-->
      <!--            {{ $t('category.featured') }}-->
      <!--          </span>-->

      <!--          <dropdown-->
      <!--            :selectedKey="`${result.featured}`"-->
      <!--            :options="featuredObj"-->
      <!--            :disabled="is_show"-->
      <!--            @clicked="featuredSelected"-->
      <!--          />-->
      <!--        </div>-->
      <!--      </div>-->


      <!--      <div class="input-wrapper">-->
      <!--        <div class="dply-felx j-left mb-20 mb-sm-15">-->
      <!--          <span class="mr-15 w-[100px]">-->
      <!--            {{ $t('category.status') }}-->
      <!--          </span>-->
      <!--          <dropdown-->
      <!--            :selectedKey="`${result.status}`"-->
      <!--            :options="statusObj"-->
      <!--            :disabled="is_show"-->
      <!--            @clicked="dropdownSelected"-->
      <!--          />-->
      <!--        </div>-->
      <!--      </div>-->

    </template>
  </data-page>
</template>

<script>

import Dropdown from "~/components/Dropdown"
import DataPage from "~/components/partials/DataPage"
import util from "~/mixin/util"
import {mapGetters} from 'vuex'
import UploadFiles from "../../components/UploadFiles.vue";
import LangInput from "../../components/langInput.vue";

export default {
  name: "brands",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      result: {
        id: '',
        title: {'ar': '', 'en': ''},
        // slug: '',
        featured: 2,
        status: 2,
        image: '',
        file: '',
      }
    }
  },
  mixins: [util],
  components: {
    LangInput,
    UploadFiles,
    DataPage,
    Dropdown
  },
  computed: {
    is_show() {
      return !(this.result?.approved_status !== 'pending' && this.$can('manage_brands'));
    },
    ...mapGetters('language', ['currentLanguage']),

  },
  methods: {
    updateInput(input, language, value) {

      this.$set(input, language, value);
    },
    featuredSelected(data) {
      this.result.featured = data.key
    },
    dropdownSelected(data) {
      this.result.status = data.key
    },
    saveAttachment(image) {
      this.result.image = image[0]
      this.result.file = image
    },
    resultData(event) {
      this.result = {...event}
      if (event.data) {
        this.result = {
          id: event.data.id,
          title: event.data.title,
          slug: event.data.slug,
          featured: event.data.featured,
          status: event.data.status,
          image: event.data.image,
        }
      }

    }


  },

  async mounted() {
  }
}
</script>

<style scoped>

</style>
