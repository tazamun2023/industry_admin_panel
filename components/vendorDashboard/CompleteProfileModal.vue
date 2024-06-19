<!-- components/Modal.vue -->
<template>
  <custome-modal
    :title="` ${$t('CompanyProfiles.complete company profile') } `"
    :show-modal="showModal"
    @close="closeModal" size="md">
    <ul class="ltr:text-start rtl:text-end">
      <li class="mb-5 w-full " v-for="linkGroup in links">
        <div class="flex justify-between">
        <nuxt-link
          class="lg:ltr:rounded-tl-[12px] lg:ltr:rounded-bl-[12px] lg:ltr:ml-2  lg:rtl:rounded-tr-[12px] lg:rtl:rounded-br-[12px] lg:rtl:mr-2"
          :to="`${linkGroup.link}`"
          :event="linkGroup.children ? '' : 'click'"
          :title="linkGroup.name"
        >
          {{linkGroup.name}}
        </nuxt-link>
        <span class="mx-8">{{ linkGroup.percent }}%</span>
        </div>
        <ul >
          <li class="w-full mx-5 mb-1 flex "  v-for="link in linkGroup.children">
            <nuxt-link
              class="w-full lg:ltr:rounded-tl-[12px] lg:ltr:rounded-bl-[12px] lg:ltr:ml-2  lg:rtl:rounded-tr-[12px] lg:rtl:rounded-br-[12px] lg:rtl:mr-2"
              :to="`${link.link}`"
              :class="{' text-primary':link?.percent>=50 ,'text-prograss':link?.percent<50}"
              :event="link.children ? '' : 'click'"
              :title="link.name"
            >
              {{link.name}} <span v-if="link.percent<100" class="mx-8">({{ link.percent }}%)</span>
            </nuxt-link>

          </li>
        </ul>
      </li>
    </ul>



  </custome-modal>
</template>

<script>
import CustomeModal from "../CustomeModal.vue";

export default {
  components: {
    CustomeModal,
  },
  computed: {

  },
  data() {
    return {

    }
  },

  methods: {

    closeModal() {

      this.$emit('close');
    },

  },

  props: ['showModal', 'links']
};
</script>
