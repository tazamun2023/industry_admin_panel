<template>
  <data-page
    ref="dataPage"
    set-api="setFooterImageLink"
    get-api="getFooterImageLink"
    set-image-api="setFooterImageLinkImage"
    route-name="footer-links"
    hash="payment-social"
    :name="$t('dataPage.fImgs')"
    :validation-keys="['title', 'link']"
    :result="result"
    gate="view_ui_settings"
    manage_gate="manage_ui_settings"
    @result="result = $event"
  >
    <template v-slot:form="{hasError}">

      <div class="input-wrapper">
        <upload-files :old_images="result.image" @updateInput="saveAttachment"></upload-files>
      </div>
      <div class="input-wrapper">
        <label>{{ $t('index.title') }}</label>
        <lang-input :hasError="hasError" type="text" :title="$t('prod.name')" :valuesOfLang="result.title"
                    @updateInput="updateInput"></lang-input>
<!--        <input-->
<!--          type="text"-->
<!--          :placeholder="$t('index.title')"-->
<!--          name="title"-->
<!--          v-model="result.title"-->
<!--          :class="{invalid: !!!result.title && hasError}"-->
<!--        >-->
<!--        <span-->
<!--          class="error"-->
<!--          v-if="!!!result.title && hasError"-->
<!--        >-->
<!--          {{ $t('category.req', { type: $t('index.title')}) }}-->
<!--        </span>-->
      </div>

      <div class="input-wrapper">
        <label>{{ $t('admin.link') }}</label>
        <input
          type="text"
          :placeholder="$t('admin.link')"
          name="link"
          v-model="result.link"
          ref="link"
          :class="{invalid: !!!result.link && hasError}"
        >
        <span
          class="error"
          v-if="!!!result.link && hasError"
        >
          {{ $t('category.req', { type: $t('admin.link')}) }}
        </span>
      </div>

      <div class="input-wrapper">
        <label class="block">{{ $t('category.status') }}</label>
        <dropdown
          :selectedKey="`${result.status}`"
          :options="statusObj"
          @clicked="dropdownSelected"
        />
      </div>

    </template>
  </data-page>
</template>

<script>

  import DataPage from "~/components/partials/DataPage"
  import util from "~/mixin/util"
  import Dropdown from "~/components/Dropdown"

  export default {
    name: "brands",
    middleware: ['common-middleware', 'auth'],
    data() {
      return {
        result: {
          id: '',
          title: {ar: '', en: ''},
          link: '',
          type: this.$route?.query?.type,
          status: 2,
          image: '',
          file: '',
        }
      }
    },
    mixins: [util],
    components: {
      Dropdown,
      DataPage
    },
    computed: {},
    methods: {
      updateInput(input, language, value) {
        this.$set(input, language, value);
      },
      saveAttachment(image) {
        this.result.image = image[0]
        this.result.file = image
      },
      dropdownSelected(data) {
        this.result.status = data.key
      }
    },
    async mounted() {
    }
  }
</script>
