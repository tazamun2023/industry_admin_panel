<template>
  <header
    :class="{'dots-open': dotsOpen}"
  >
    <div class="flex items-center logo-wrapper">
      <button
        @click.prevent="leftMenuToggle"
        class="dply-felx j-center bgnone toggle-menu-btn"
      >
        <svg class="ignore-click  menu-icon mr-0 h-[20px] w-[20px] lg:h-[30px] lg:w-[30px] text-primary lg:text-black" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.5 5.83325H17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
<path d="M2.5 10H17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
<path d="M2.5 14.1667H17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>

      </button>
      <nuxt-link
        to="/"
        class="logo hidden  lg:block"
      >
        <!-- <img
          v-if="storeData"
          :src="getImageURL(siteLogo)"
          alt=""
        > -->
        <div class="flex items-center gap-2">
          <img class="w-6 h-6 mt-5" src="~/assets/icon/user.svg" alt="">
          <div v-if="$store.state.admin.profile">
            <p class="font-bold">{{ $store.state.admin.profile.name[$t('app.local')] }}</p>
            <p class="text-xs">@{{ $store.state.admin.profile.username }}</p>
          </div>
        </div>
      </nuxt-link>
    </div>

    <div class="flex items-center grow right-wrap">

      <div class="flex items-center gap-4  m-2">
        <clear-cache-btn
        color="primary"
        class="outline-btn hidden lg:block mt-2"
      />
      <!--  -------------------mobile view-------------- -->
      <div class="flex lg:hidden xl:hidden items-center gap-4">
          <dropdown
          v-if=" Object.keys(languages).length > 1"
          :selected-key="currentLanguage.code"
          :options="languages"
          key-name="name"
          mblangName="hidden"
          class="lang-down lg:hidden xl:hidden   mobile-lang"
          @clicked="selectedLanguage"
        >
        <img class="w-[20px] h-[20px]" src="~/assets/icon/glove.svg" alt="">
      </dropdown>
      <div>
        <svg class="w-[20px] h-[20px] text-primary lg:hidden xl:hidden" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.16669 16.6665C13.3088 16.6665 16.6667 13.3086 16.6667 9.1665C16.6667 5.02437 13.3088 1.6665 9.16669 1.6665C5.02455 1.6665 1.66669 5.02437 1.66669 9.1665C1.66669 13.3086 5.02455 16.6665 9.16669 16.6665Z" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M15.775 17.2413C16.2166 18.5747 17.225 18.708 18 17.5413C18.7083 16.4747 18.2416 15.5997 16.9583 15.5997C16.0083 15.5913 15.475 16.333 15.775 17.2413Z" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      </div>
      <img class="lg:w-[228px] lg:h-[57px] w-[170px] h-[42px]" src="~/assets/images/ar_logo_admin1.svg" alt="">
      <user-messages
          v-if="$can('view_messages')"
        />
        <img class="w-[40px] h-[40px] mt-5" src="~/assets/icon/user.svg" alt="">
        </div>

      </div>
      <div class="hidden  w-full lg:block xl:block">

      <div class="flex justify-between items-center gap-4 w-full">
        <img class="lg:w-[228px] lg:h-[57px] w-[170px] h-[42px]" src="~/assets/images/ar_logo_admin1.svg" alt="">
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
<style>
@media only screen and (max-width: 992px) {
  .mobile-lang span{
  padding:0px !important;
  height:auto !important;
  width: auto !important;
  gap:0px !important;
  min-width: 20px !important;
}
.main{
  background: none;
}
header{
  background: #fff;
  box-shadow: 0px 2px 20px 0px #0000001A;
  height: 84px;
  z-index: 9999;
}
.bgnone{
  background: none !important;
}
header .right-wrap{
  padding: 0px;
}
}


</style>
