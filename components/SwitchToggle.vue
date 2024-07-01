<template>
  <div>
    <div class="w-full flex gap-4">
      <div class="w-full">
        <label class="relative inline-flex cursor-pointer items-center">
          <input :id="id" v-model="internalValue"
                 :readonly="IsReadOnly"
                 :disabled="IsReadOnly"
                 class="peer sr-only"
                 style="cursor: not-allowed"
                 @change="emitChange" hidden type="checkbox"/>
          <label for="switch" class="hidden"></label>
          <div
            class="peer h-6 w-11 rounded-full border border-smooth bg-smooth absolute after:absolute after:left-[2px] after:top-[1px] after:h-5 after:w-5 after:rounded-full after:border after:border-smooth after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-primary"></div>
        </label>
      </div>
    </div>
  </div>
</template>

<script>


import {mapActions} from "vuex";

export default {
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: 'switch'
    },
    setApi: {
      type: String,
      default: ''
    },
    col: {
      type: String,
      default: ''
    },
    IsReadOnly: {
      type: Boolean,
      default: false
    },
    changeInServer: {
      type: Boolean,
      default: false
    },
    params: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    value: {
      type: Boolean|Number,
      default: false
    },
  },
  data() {
    return {
      saving: false,
      internalValue: this.value
    };
  },
  watch: {
    value(newValue) {
      this.internalValue = newValue;
    }
  },
  methods: {
    ...mapActions('common', ['swetAlertFire', 'setRequest']),
    async changeData() {
      // await this.setDefaultBank({id: this.id, default: this.internalValue})
      const res = await this.swetAlertFire({
        params: {
          title: this.$i18n.t('approvedModal.sure'),
          text: this.$i18n.t('approvedModal.revert'),
        }
      });
      if (res) {
        try {
          this.saving = true
          const data = await this.setRequest({
            params: {...this.params, col: this.col, id: this.id, new_val: this.internalValue ? 1 : 0},
            api: this.setApi,
          });
          this.saving = false
          if (data) {
            this.$emit('update', data)
          }
        } catch (e) {
          console.log(e)
        }
      } else {
        // await this.setDefaultBank(v)
        this.internalValue = !this.internalValue
      }
    },
    async emitChange() {
      if (this.changeInServer)
        await this.changeData()
      this.$emit('input', this.internalValue);
    }
  }
}
</script>
