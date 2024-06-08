<!-- components/Modal.vue -->
<template>
  <custome-modal
    :title="` ${$t('HelpAssistants.AddHelpAssistantsGroup') } `"
    :show-modal="showModal"
    @close="closeModal" size="xl">
    <div v-if="result" class="w-full  border relative p-1 border-smooth">
      <ValidationObserver class="w-full ms-2" v-slot="{ invalid }">
        <!-- Watch for changes in `invalid` and update `isInvalid` -->
        <template v-if="invalidWatcher(invalid)"></template>

        <div class="grid grid-cols-12 gap-1 md:gap-2">
          <div class="col-span-12 lg:col-span-6 mb-2 mt-2">
            <ValidationProvider name="name_ar" class="w-full" rules="required" v-slot="{ errors }"
                                :custom-messages="{required: $t('global.req', { type: $t('index.title') + '(AR)' }) }">
              <div class="input-wrapper w-full">
                <label for="name_ar">{{ $t('index.title') + '(AR)' }}*</label>
                <input id="name_ar" type="text" v-model="result.title.ar">
                <span class="error">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </div>

          <div class="col-span-12 lg:col-span-6  mb-2 mt-2">
            <ValidationProvider name="name_en" class="w-full" rules="required" v-slot="{ errors }"
                                :custom-messages="{required: $t('global.req', { type: $t('index.title') + '(EN)' }) }">
              <div class="input-wrapper w-full">
                <label for="name_en">{{ $t('index.title') + '(EN)' }}*</label>
                <input id="name_en" type="text" v-model="result.title.en">
                <span class="error">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </div>
        </div>
        <div class=" mb-2 mt-2">
          <ValidationProvider name="description_ar" class="w-full" rules="required" v-slot="{ errors }"
                              :custom-messages="{required: $t('global.req', { type: $t('vendor.description') + '(AR)' }) }">
            <div class="input-wrapper w-full">
              <label for="description_ar">{{ $t('vendor.description') + '(AR)' }}*</label>
              <froala-wysiwyg id="description_ar"
                              :value="result.description.ar"
                              v-model="result.description.ar"
              ></froala-wysiwyg>
              <span class="error">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </div>

        <div class=" mb-2 mt-2">
          <ValidationProvider name="description_en" class="w-full" rules="required" v-slot="{ errors }"
                              :custom-messages="{required: $t('global.req', { type: $t('vendor.description') + '(EN)' }) }">
            <div class="input-wrapper w-full">
              <label for="description_en">{{ $t('vendor.description') + '(EN)' }}*</label>
              <froala-wysiwyg id="description_en"
                              :value="result.description.en"
                              v-model="result.description.en"
              ></froala-wysiwyg>
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
    </div>

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
import FroalaWysiwyg from "./FroalaWysiwyg.vue";

export default {
  components: {
    FroalaWysiwyg,
    ValidationObserver, ValidationProvider,
    AjaxButton,
    CustomeModal,
  },
  computed: {},
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
        help_assistants_group_id: this.selectedGroup?.id ?? "",
        description: {ar: "", en: ""},
        id: null,
        order: 1
      }
    }
  },

  methods: {
    ...mapActions('help-assistances', ['setHelpAssistance']),

    invalidWatcher(invalid) {
      this.isInvalid = invalid;
      return true; // Necessary to keep the template valid
    },
    async saveGroup() {
      if (!this.isInvalid) {
        this.saveSata = true
        // this.result.help_assistants_group_id = this.selectedGroup.id
        const response = await this.setHelpAssistance(this.result)

        this.saveSata = false
        this.$emit('close');
      }
    },

    closeModal() {

      this.$emit('close');
    },

  },
  watch: {
    selectedHelp: {

      deep: true,
      handler(newVal, oldVal) {
        console.log('mmiis5')
        if (this.selectedHelp && newVal !== oldVal) {
          var selectedHelp = JSON.parse(JSON.stringify(this.selectedHelp));

          this.result.title = selectedHelp.edite_title
          this.result.description = selectedHelp.edite_description
          this.result.order = selectedHelp.order
          this.result.id = selectedHelp.id
          this.result.help_assistants_group_id = this.selectedGroup.id
        }
      }
    }
  },
  mounted() {
    console.log("mounted")
    console.log(this.selectedHelp)
    // if (this.selectedHelp) {
    //   this.result.title = this.selectedHelp.edite_title
    //   this.result.order = this.selectedHelp.order
    //   this.result.id = this.selectedHelp.id
    //   this.result.help_assistants_group_id = this.selectedGroup.id
    //   this.result.description = this.selectedHelp.edite_description
    // }
  },

  props: ['showModal', 'selectedGroup', 'selectedHelp']
};
</script>
