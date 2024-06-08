<!-- components/Modal.vue -->
<template>
  <custome-modal
    :title="` ${$t('HelpAssistants.AddHelpAssistantsGroup') } `"
    :show-modal="showModal"
    @close="closeModal" size="md">
    <ValidationObserver class="w-full ms-2" v-slot="{ invalid }">
      <!-- Watch for changes in `invalid` and update `isInvalid` -->
      <template v-if="invalidWatcher(invalid)"></template>

      <div class=" mb-2 mt-2">
        <ValidationProvider name="name_ar" class="w-full" rules="required" v-slot="{ errors }"
                            :custom-messages="{required: $t('global.req', { type: $t('index.title') + '(AR)' }) }">
          <div class="input-wrapper w-full">
            <label for="name_ar">{{ $t('index.title') + '(AR)' }}*</label>
            <input id="name_ar" type="text" v-model="result.title.ar">
            <span class="error">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>
      </div>

      <div class=" mb-2 mt-2">
        <ValidationProvider name="name_en" class="w-full" rules="required" v-slot="{ errors }"
                            :custom-messages="{required: $t('global.req', { type: $t('index.title') + '(EN)' }) }">
          <div class="input-wrapper w-full">
            <label for="name_en">{{ $t('index.title') + '(EN)' }}*</label>
            <input id="name_en" type="text" v-model="result.title.en">
            <span class="error">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>
      </div>

      <div class=" mb-8 mt-2">
        <ValidationProvider name="Building" class="w-full" rules="required|numeric" v-slot="{ errors }"
                            :custom-messages="{required: `Enter  ${$t('HelpAssistants.order')}`, numeric: 'Enter Number'}">
          <div class="input-wrapper w-full">
            <label for="order">{{ $t('HelpAssistants.order') }}*</label>
            <input id="=order" type="number" v-model="result.order">
            <span class="error">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

      </div>
    </ValidationObserver>


    <template v-slot:buttons>
      <ajax-button
        name="save"
        another_class="primary-btn"
        type="button"
        :disabled="isInvalid"
        :text="$t('setting.sv')"
        @clicked="saveGroup"
        :fetching-data="saveSata"
      />
    </template>

  </custome-modal>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import CustomeModal from "./CustomeModal.vue";
import AjaxButton from "./AjaxButton.vue";
import {ValidationObserver, ValidationProvider} from "vee-validate";

export default {
  components: {
    ValidationObserver, ValidationProvider,
    AjaxButton,
    CustomeModal,
  },
  computed: {
    ...mapGetters('address', ['addressList']),
    ...mapGetters('common', ['filters']),
  },
  data() {
    return {
      files: [],
      saveSata: false,
      document_type: "",
      firstBox: true,
      hasError: false,
      isInvalid: false,
      result: {
        title: {ar: "", en: ""},
        id: null,
        order: 1
      }
    }
  },

  methods: {
    ...mapActions('help-assistances', ['setGroup']),

    invalidWatcher(invalid) {
      this.isInvalid = invalid;
      return true; // Necessary to keep the template valid
    },
    async saveGroup() {
      if (!this.isInvalid) {
        this.saveSata = true
        const response = await this.setGroup(this.result)

        this.saveSata = false
        this.$emit('close');
      }
    },

    closeModal() {

      this.$emit('close');
    },

  },
  watch: {
    selectedGroup: {
      deep: true,
      handler(newVal, oldVal) {
        if (this.selectedGroup && newVal !== oldVal) {
          this.result.title = this.selectedGroup.edite_title
          this.result.order = this.selectedGroup.order
          this.result.id = this.selectedGroup.id
        }
      }
    }
  },
  mounted() {
    console.log('mmmmmmmmmmon')


  },
  props: ['showModal', 'selectedGroup']
};
</script>
