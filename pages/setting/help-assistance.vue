<template>
  <div class="bg-pbg pb-4">
    <div class="">
      <div class="card p-4 bg-white lg:grid lg:grid-cols-4">
        <div>
          <h2 class="text-theem text-center ltr:lg:text-start rtl:lg:text-end py-2 text-[28px] font-medium">
            {{ $t('HelpAssistants.HelpAssistants') }} </h2>
        </div>
        <div class="col-span-3 py-2 flex justify-center">
          <div class="relative lg:w-2/4 w-full mx-auto">
            <label for="" class="w-6 h-6 ltr:ml-1 rtl:mr-1 mt-[12px] searchicon absolute"><img
              src="~/assets/icon/search-normal.svg" alt=""></label>
            <input class="bg-theemlight px-8 w-full" type="text" placeholder="search">
          </div>
        </div>
      </div>

      <div class="card p-4 my-4 bg-white lg:grid lg:grid-cols-4">
        <div class="side">
          <ul class="sticky top-[50px] mt-10 ">
            <template v-for="(group ,index) in groups">
              <li class="-mb-px mx-2 last:mr-0 cursor-pointer  w-full  flex justify-between items-center  flex-auto">
                <a class="text-xs   uppercase text-[20px] font-bold p-2  flex gap-2 leading-normal"
                   v-on:click="toggleTabs(group.id)"
                   v-bind:class="{' text-normal': openTab != group.id, 'text-theem': openTab == group.id}">
                  {{ (index + 1).toString().padStart(2, '0') }}. {{ group.title }}
                </a>
                <div class="flex gap-4 mx-3 px-3">
                  <img @click="selectedGroup=group, showAddGroupModals=true" class="action_img cursor-pointer"
                       src="~/assets/icon/edit-g.svg">
                  <img class="action_img  cursor-pointer" src="~/assets/icon/delete.svg">
                </div>
              </li>
            </template>

            <li class="-mb-px mr-2 last:mr-0 cursor-pointer block w-full  flex-auto">
              <button @click="showAddGroupModals=true,selectedGroup=null" v-if="$can('manage_ui_settings')"
                      class="border mt-1 border-primary  p-2  rounded bg-primary text-white hover:text-primary leading-3">
                {{ $t('HelpAssistants.AddHelpAssistantsGroup') }}
              </button>
            </li>

          </ul>
        </div>
        <div class="col-span-3">
          <div class="tab-content input-wrapper tab-space">
            <div class="mx-auto max-w-6xl">
              <div class="p-2 rounded">
                <div>
                  <div v-for="(help_assistant,sub_index) in  groups.filter(g=>g.id===openTab)[0]?.help_assistants??[]"
                       class="mb-2 border-b border-smooth w-full">
                    <div
                      class="font-medium rounded-sm text-lg  flex justify-between mt-2 cursor-pointer text-black bg-white hover:bg-white">
                      <div @click="toggleCollapse(help_assistant.id)" class="flex gap-4  font-bold uppercase"><span
                        class="font-bold text-primary text-[24px]"> {{
                          (sub_index + 1).toString().padStart(2, '0')
                        }}</span>
                        <span class="text-[16px]">{{ help_assistant.title }}</span></div>
                      <div v-if="collapsed!=help_assistant.id">
                        <img @click="toggleCollapse(help_assistant.id)" class="h-3 w-3" src="~/assets/icon/plus.svg"
                             alt="">
                      </div>
                      <div v-if="collapsed===help_assistant.id "
                           class="flex gap-4  items-center ">

                        <img class="action_img cursor-pointer"
                             @click="selectedHelp=help_assistant, showEditHelp=true"

                             src="~/assets/icon/edit-g.svg">
                        <img class="action_img  cursor-pointer" src="~/assets/icon/delete.svg">
                        <img class="h-2 w-3" src="~/assets/icon/minus.svg"
                             alt="">
                      </div>
                    </div>
                    <div v-if="collapsed===help_assistant.id"
                         class="p-2 px-10 text-justify text-left mb-5 bg-white"
                         style="">
                      <div v-html="help_assistant.description"></div>
                    </div>

                  </div>

                </div>
              </div>
              <div v-if="$can('manage_ui_settings')">
                <div v-if="!showAddHelp" class="my-2 flex justify-end">
                  <button @click="showAddHelp=true">
                    <div class="flex justify-between  items-center justify-center gap-4">
                      <span>{{ $t('HelpAssistants.AddHelpAssistants') }}</span>
                      <img class="h-3 w-3 " src="~/assets/icon/plus.svg" alt="">
                    </div>
                  </button>
                </div>
              </div>

            </div>


          </div>
        </div>
      </div>
    </div>
    <AddHelpAssistants  v-if="$can('manage_ui_settings')"
                       :selected-group="selectedGroup"
                       :selected-help="selectedHelp"
                       :show-modal="showEditHelp"
                       @close="showEditHelp=false"
    ></AddHelpAssistants>

    <AddHelpAssistantsGroupModal v-if="$can('manage_ui_settings')"
                                 :selected-group="selectedGroup"
                                 :show-modal="showAddGroupModals"
                                 @close="showAddGroupModals=false"/>

  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import AjaxButton from "~/components/AjaxButton";
import util from "~/mixin/util";
import AddHelpAssistantsGroupModal from "../../components/AddHelpAssistantsGroupModal.vue";
import AddHelpAssistants from "../../components/AddHelpAssistants.vue";

export default {
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      openTab: 1,
      collapsed: '',
      selectedGroup: null,
      selectedHelp: null,
      showAddGroupModals: false,
      showAddHelp: false,
      showEditHelp: false,
      loading: false,
      hasError: false,
    }
  },
  props: {},
  mixins: [util],
  components: {
    AddHelpAssistants,
    AddHelpAssistantsGroupModal,
    AjaxButton,
  },
  computed: {
    ...mapGetters('help-assistances', ['groups']),
  },
  methods: {
    toggleTabs: async function (tabNumber) {
      console.log(tabNumber)
      this.selectedGroup = JSON.parse(JSON.stringify(this.groups.filter(g => g.id == parseInt(tabNumber))[0]));
      this.openTab = tabNumber
      await this.$router.push({
        query: {
          tap: tabNumber,
        }
      })


      // this.selectedGroup = this.groups.filter(g => g.id === help.id)[0]

    },
    toggleCollapse(index) {
      this.collapsed = index;
      this.showEditHelp = false
    },
    ...mapActions('help-assistances', ['getHelpAssistance', 'setHelpAssistance']),
  },
  created() {
  },
  async mounted() {
    this.openTab = parseInt(this.$route.query.tap) ?? 0
    if (this.groups.length === 0) {
      this.loading = true
      await this.getHelpAssistance()
      this.loading = false
    }
    this.selectedGroup = this.groups.filter(g => g.id === this.openTab)[0] ?? null

    if (!this.selectedGroup)
      this.selectedGroup = this.groups[0] ?? null

  }
}
</script>

