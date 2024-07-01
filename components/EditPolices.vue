<!-- components/Modal.vue -->
<template>

  <custome-modal
    :title="` ${$t('polices.edit') } :  ${$t('polices.' + type) }  `"
    :show-modal="showModal"
    @close="closeModal" size="xl">
    <div v-if="result" class="w-full  border relative p-1 border-smooth">
      <ValidationObserver class="w-full ms-2" v-slot="{ invalid }">
        <!-- Watch for changes in `invalid` and update `isInvalid` -->
        <template v-if="invalidWatcher(invalid)"></template>
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
      </ValidationObserver>
    </div>
    <template v-slot:buttons>
      <ajax-button
        name="save"
        another_class="primary-btn"
        type="button"
        :disabled="isInvalid"
        :text="$t('setting.sv')"
        @clicked="savePolice"
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
    CustomeModal
  },

  data() {
    return {
      saveSata: false,
      hasError: false,

      isInvalid: false,
      result: {
        description: {ar: "", en: ""},
        type: this.type,

      }
    }
  },
  computed: {
    ...mapGetters('site-setting', ['siteSetting']),
    ...mapGetters('admin', ['return_polices']),
  },
  methods: {
    ...mapActions('site-setting', ['setPolice']),

    invalidWatcher(invalid) {
      this.isInvalid = invalid;
      return true; // Necessary to keep the template valid
    },
    async savePolice() {
      if (!this.isInvalid) {
        this.saveSata = true
        // this.result.help_assistants_group_id = this.selectedGroup.id
        const response = await this.setPolice({result:this.result,'type':this.policeType,api:this.api})

        this.saveSata = false
        this.$emit('close');
      }
    },

    closeModal() {

      this.$emit('close');
    },

  },
  watch: {
    type: {

      deep: true,
      handler(newVal, oldVal) {
        console.log('mmiis5')

        this.result.type = newVal
        if (this.policeType === 'vendor' && this.return_polices) {
          this.result.description =JSON.parse(JSON.stringify( this.return_polices.police));
        } else if (this.siteSetting) {
          var siteSetting = JSON.parse(JSON.stringify(this.siteSetting));
          this.result.description.ar = siteSetting['edit_' + this.type]?.ar;
          this.result.description.en = siteSetting['edit_' + this.type]?.en;
        }
        // this.result.description = selectedHelp.edite_description
        // this.result.order = selectedHelp.order
        // this.result.id = selectedHelp.id
        // this.result.help_assistants_group_id = this.selectedGroup.id
      }

    }
  },
  mounted() {
    console.log("mounted")
    if (this.siteSetting && this.policeType === 'system') {
      var siteSetting = JSON.parse(JSON.stringify(this.siteSetting));
      this.result.description.ar = siteSetting['edit_' + this.type]?.ar;
      this.result.description.en = siteSetting['edit_' + this.type]?.en;
    }
    if (this.policeType === 'vendor' && this.return_polices) {
      this.result.description =JSON.parse(JSON.stringify( this.return_polices.police));
    }

  },

  props: ['showModal', 'type', 'policeType','api']
};
</script>
