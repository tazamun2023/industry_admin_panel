<template>
  <header
    :class="{'dots-open': dotsOpen}"
  >
    <div class="dply-felx logo-wrapper">
      <button
        @click.prevent="leftMenuToggle"
        class="dply-felx j-center toggle-menu-btn"
      >
        <i
          class="ignore-click icon menu-icon mr-0"
        />
      </button>
      <nuxt-link
        to="/"
        class="logo"
      >
        <!-- <img
          v-if="storeData"
          :src="getImageURL(siteLogo)"
          alt=""
        > -->
        <div class="flex gap-2">
          <img class="w-6 h-6 mt-5" src="~/assets/icon/user.svg" alt="">
          <div>
            <p class="font-bold">{{ $store.state.admin.profile.name[currentLanguage?.code] }}</p>
            <p class="text-xs">@{{ $store.state.admin.profile.username }}</p>
          </div>
        </div>
      </nuxt-link>
    </div>

    <div class="dply-felx grow right-wrap">

      <div class="flex gap-4  m-2">
        <clear-cache-btn
        color="primary"
        class="outline-btn mt-2"
      />
      <img class="w-[228px] h-[57px]" src="~/assets/images/ar_logo_admin1.svg" alt="">
      </div>

      <div class="dply-felx w-[60%] j-left pos-rel">
        <div class="w-full relative">
          <img class="w-4 h-4 absolute ltr:ml-[14px] rtl:mr-[14px] top-[14px]" src="~/assets/icon/search-normal.svg" alt="">
        <input class="w-full px-34px" type="text" placeholder="Search">
      </div>
        <dropdown
          v-if=" Object.keys(languages).length > 1"
          :selected-key="currentLanguage.code"
          :options="languages"
          class="lang-down"
          key-name="name"
          @clicked="selectedLanguage"
        >
        <img class="w-4 h-4" src="~/assets/icon/glove.svg" alt="">
      </dropdown>

        <user-messages
          v-if="$can('view_messages')"
        />
        <button
          data-ignore="right-menu"
          @click.prevent="rightMenuToggle"
          class="dots-btn"
        >
          <i
            class="ignore-click icon more-dots"
          />
        </button>
        <div
          class="right-area"
          id="right-menu"
          v-outside-click="closeRightMenu"
        >
          <!-- <button
            v-if="$can('profile', 'view')"
            @click.prevent="goProfile"
          >
            <i
              class="icon profile"
            />
            {{ $t('error.pro') }}
          </button> -->



          <!-- <button
            @click.prevent="loggingOut"
          >
            <i
              class="icon logout"
            />
            {{ $t('error.log') }}
          </button> -->
        </div>


      </div>
    </div>
  </header>
</template>

<script>

  import outsideClick from '~/directives/outside-click'
  import util from '~/mixin/util'
  import {mapGetters, mapActions} from 'vuex'
  import InlinePopOver from "~/components/InlinePopOver"
  import Spinner from "~/components/Spinner"
  import UserMessages from "~/components/partials/UserMessages"
  import Dropdown from "~/components/Dropdown";
  import ClearCacheBtn from "~/components/partials/ClearCacheBtn";

  import * as rules from 'vee-validate/dist/rules';
  import { messages } from 'vee-validate/dist/locale/en.json';
  import { extend } from 'vee-validate';

  Object.keys(rules).forEach(rule => {
    extend(rule, {
      ...rules[rule], // copies rule configuration
      message: messages[rule] // assign message
    });
  });


  export default {
    name: 'Header',
    data() {
      return {
        dotsOpen: false
      }
    },
    mixins: [util],
    components: {ClearCacheBtn, Dropdown, UserMessages, Spinner, InlinePopOver},
    computed: {
      siteLogo() {
        return this.storeData?.image ?? this.siteSetting?.header_logo ?? this.defaultImage
      },
      ...mapGetters('site-setting', ['siteSetting']),
      ...mapGetters('setting', ['setting', 'storeData']),
      ...mapGetters('language', ['languages', 'currentLanguage']),
    },
    directives: {outsideClick},
    methods: {
      async selectedLanguage(data){
        document.cookie = 'currentLanguage=' + data.key + '; path=/; expires=' + 365 * 60 * 60 * 24

        this.$i18n.locale = data.key; // If you are using Nuxt-i18n for language switching
        document.querySelector("html").setAttribute("dir",  data.key  == "ar" ? "rtl" : "ltr");
        document.querySelector("html").setAttribute("lang",  data.key );
      this.$nuxt.context.app.head.htmlAttrs = {
          lang:  data.key ,
          dir:  data.key  == "ar" ? "rtl" : "ltr"
        }
        location.reload()
      },
      async loggingOut() {
        try {
          this.clearSetting()
          await this.$auth.logout()
          // window.location.reload()
          this.settingDashboardNotice(false)
        } catch (e) {
          return this.$nuxt.error(e)
        }
      },
      leftMenuToggle() {
        this.toggleSidebar()
      },
      rightMenuToggle() {
        this.hideSidebar()
        this.dotsOpen = !this.dotsOpen
      },
      closeRightMenu() {
        this.dotsOpen = false
      },
      goProfile() {
        this.$route.name !== 'profile' ? this.$router.push({path: '/profile'}) : false
        this.dotsOpen = false
      },
      ...mapActions('setting', ['clearSetting']),
      ...mapActions('ui', ['hideSidebar', 'toggleSidebar', 'settingDashboardNotice'])
    }
  }
</script>

<style  lang="stylus">
  @import "~/assets/styles/header.styl"
  .arrowIcon{
    display:none;
  }
  .px-34px{
    padding-left: 34px !important;
    padding-right: 34px !important;
  }
</style>
