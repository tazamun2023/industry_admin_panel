<template>
  <div
    v-if="sidebarPermissions"
    class="sidebar"
  >
    <div
      v-if="childrenOpened"
      class="child-layer"
      @click="closeChild"
    />

    <ul class="sb sb-2">
      <div class="lg:hidden xl:hidden" :class="{'hidden':!sidebarOpen}">
        <nuxt-link
        to="/"
        class="logo w-full"
      >
        <!-- <img
          v-if="storeData"
          :src="getImageURL(siteLogo)"
          alt=""
        > -->
        <div class="flex gap-4 px-[15px] justify-between items-center">
          <div class="flex items-center gap-2">
          <img class="w-[51px] h-[51px] mt-5" src="~/assets/icon/user.svg" alt="">
          <div v-if="$store.state.admin.profile">
            <p class="font-bold">{{ $store.state.admin.profile.name[currentLanguage?.code] }}</p>
            <p class="text-[16px] font-bold capitalize">{{ $store.state.admin.profile.username }}</p>
            <p class="text-xs text-primary">{{ $store.state.admin.profile.email }}</p>
          </div>
        </div>
        <img @click.prevent="leftMenuToggle" class="w-[12px] h-[12px]" src="~/assets/icon/cros-g.svg" alt="cros">
        </div>
      </nuxt-link>
    </div>
      <li
        v-for="(value, index) in sidebarsArr"
        :key="index"
        :class="[{'child-open': value.open}, {'child-active': value.childActive}, {active: isCurrentRoute(value)}]"
      >


        <nuxt-link
          class="lg:ltr:rounded-tl-[12px] lg:ltr:rounded-bl-[12px] lg:ltr:ml-2  lg:rtl:rounded-tr-[12px] lg:rtl:rounded-br-[12px] lg:rtl:mr-2"
          v-if="hasParentPermission(value)"
          :event="value.children ? '' : 'click'"
          :to="`/${value.path}`"
          :title="value.title"
          @click.native="clicked(value)"
        >
          <!-- <i
            class="icon"
            :class="value.icon"
          /> -->
          <span  v-if="value.is_image" v-html="value.icon" ></span>
          <!-- <img v-if="value.is_image" class="h-4 w-4" :src="getImgUrl(value.icon)" alt=""> -->
          <i v-else class="icon text-primary"  :class="value.icon"/>
          <span class="dply-felx grow">
            <span>
               {{ value.title }}
            </span>

            <i
              v-if="value.children"
              class="icon arrow-down"
            />
          </span>
        </nuxt-link>

        <ul
          v-if="value.children && value.open"
          class="child"
        >
          <li
            v-for="(child, i) in value.children"
            :key="i"
            :class="{active: isCurrentRoute(child)}"
          >
            <nuxt-link
              class="lg:ltr:rounded-tl-[12px] lg:ltr:rounded-bl-[12px] lg:ltr:ml-4  lg:rtl:rounded-tr-[12px] lg:rtl:rounded-br-[12px] lg:rtl:mr-4"
              v-if="hasPermission(child)"
              :event="child.children ? '' : 'click'"
              :to="`/${child.path}`"
              @click.native="clicked(child)"
              :title="child.title"
            >
              <!-- <i
                class="icon"
                :class="child.icon"
              /> -->
              <span v-if="child.is_image" v-html="child.icon"></span>
              <!-- <img v-if="child.is_image" class="h-4 w-4" :src="getImgUrl(child.icon)" alt=""> -->
              <span class="">{{ child.title }}</span>
            </nuxt-link>
          </li>
        </ul>
      </li>

    </ul>
    <div class="absolute bottom-0 w-full bg-white lg:py-4 pt-[4em]">
        <button class="w-full border-0 flex gap-4 overflow-hidden hover:bg-white" @click.prevent="loggingOut">
        <img src="~/assets/icon/logout.svg" class="h-4 w-4 mt-3" alt="">
            <span>{{ $t('error.log') }}</span>
       </button>
    </div>
    <!-- <button
      class="minimize-btn centered-flex"
      @click.prevent="toggleSidebar"
    /> -->

    <transition name="fade" mode="out-in">
      <div
        v-if="sidebarOpen"
        class="layer"
        @click.prevent="hideSidebar"
      />
    </transition>

  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import outsideClick from "~/directives/outside-click";
import util from "~/mixin/util";

export default {
  name: 'Sidebar',
  data() {
    return {
      sidebarsArr: [
        {
          path: '',
          title: this.$t('error.das'),
          icon: `<svg width="20" height="20" class="text-primary h-4 w-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.51663 2.36664L3.02496 5.86664C2.27496 6.44997 1.66663 7.69164 1.66663 8.63331V14.8083C1.66663 16.7416 3.24163 18.325 5.17496 18.325H14.825C16.7583 18.325 18.3333 16.7416 18.3333 14.8166V8.74997C18.3333 7.74164 17.6583 6.44997 16.8333 5.87497L11.6833 2.26664C10.5166 1.44997 8.64163 1.49164 7.51663 2.36664Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10 14.9917V12.4917" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`,
          is_image:true,
          // gate: 'dashboard'
        },
        {
          path: 'product',
          title: this.$t('fSale.product'),
          icon: `<svg width="20" height="20" class="text-primary h-4 w-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.64172 6.19971L10 10.458L17.3084 6.22468" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 18.008V10.4497" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8.27501 2.0665L3.82502 4.54153C2.81668 5.09986 1.9917 6.49985 1.9917 7.64985V12.3582C1.9917 13.5082 2.81668 14.9082 3.82502 15.4665L8.27501 17.9415C9.22501 18.4665 10.7833 18.4665 11.7333 17.9415L16.1834 15.4665C17.1917 14.9082 18.0167 13.5082 18.0167 12.3582V7.64985C18.0167 6.49985 17.1917 5.09986 16.1834 4.54153L11.7333 2.0665C10.775 1.53317 9.22501 1.53317 8.27501 2.0665Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14.1666 11.0332V7.98321L6.2583 3.4165" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`,
          is_image:true,
          open: false,
          children: [
            {
              path: 'brands',
              title: this.$t('error.brands'),
              icon: `<svg width="20"  height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.8337 7.49984C15.8337 8.70817 15.4753 9.81652 14.8587 10.7415C13.9587 12.0748 12.5337 13.0165 10.8753 13.2582C10.592 13.3082 10.3003 13.3332 10.0003 13.3332C9.70033 13.3332 9.40866 13.3082 9.12533 13.2582C7.46699 13.0165 6.04199 12.0748 5.14199 10.7415C4.52533 9.81652 4.16699 8.70817 4.16699 7.49984C4.16699 4.27484 6.77533 1.6665 10.0003 1.6665C13.2253 1.6665 15.8337 4.27484 15.8337 7.49984Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M17.7082 15.3917L16.3332 15.7167C16.0249 15.7917 15.7832 16.025 15.7166 16.3333L15.4249 17.5583C15.2666 18.225 14.4166 18.425 13.9749 17.9L9.9999 13.3333L6.0249 17.9083C5.58324 18.4333 4.73324 18.2333 4.5749 17.5667L4.28324 16.3417C4.20824 16.0333 3.96657 15.7917 3.66657 15.725L2.29157 15.4C1.65824 15.25 1.43324 14.4583 1.89157 14L5.14157 10.75C6.04157 12.0833 7.46657 13.025 9.1249 13.2667C9.40824 13.3167 9.6999 13.3417 9.9999 13.3417C10.2999 13.3417 10.5916 13.3167 10.8749 13.2667C12.5332 13.025 13.9582 12.0833 14.8582 10.75L18.1082 14C18.5666 14.45 18.3416 15.2417 17.7082 15.3917Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10.4836 4.9835L10.9753 5.96682C11.042 6.10016 11.217 6.2335 11.3753 6.2585L12.267 6.40849C12.8336 6.50016 12.967 6.91683 12.5586 7.32516L11.867 8.01682C11.7503 8.13348 11.6836 8.3585 11.7253 8.52516L11.9253 9.38349C12.0836 10.0585 11.7253 10.3251 11.1253 9.96681L10.292 9.47515C10.142 9.38348 9.89197 9.38348 9.74197 9.47515L8.90864 9.96681C8.30864 10.3168 7.9503 10.0585 8.10864 9.38349L8.30864 8.52516C8.34197 8.36683 8.28364 8.13348 8.16697 8.01682L7.4753 7.32516C7.06697 6.91683 7.2003 6.50849 7.76697 6.40849L8.65864 6.2585C8.80864 6.2335 8.98364 6.10016 9.0503 5.96682L9.54197 4.9835C9.78364 4.45016 10.217 4.45016 10.4836 4.9835Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`,
              is_image:true,
              gate: 'view_brands'

            },
            {
              path: 'categories',
              title: this.$t('error.cat'),
              icon: `<svg width="20" class="text-primary h-4 w-4" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.3333 7.09984V3.3165C18.3333 2.1415 17.8 1.6665 16.475 1.6665H13.1083C11.7833 1.6665 11.25 2.1415 11.25 3.3165V7.0915C11.25 8.27484 11.7833 8.7415 13.1083 8.7415H16.475C17.8 8.74984 18.3333 8.27484 18.3333 7.09984Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M18.3333 16.475V13.1083C18.3333 11.7833 17.8 11.25 16.475 11.25H13.1083C11.7833 11.25 11.25 11.7833 11.25 13.1083V16.475C11.25 17.8 11.7833 18.3333 13.1083 18.3333H16.475C17.8 18.3333 18.3333 17.8 18.3333 16.475Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8.75033 7.09984V3.3165C8.75033 2.1415 8.21699 1.6665 6.89199 1.6665H3.52533C2.20033 1.6665 1.66699 2.1415 1.66699 3.3165V7.0915C1.66699 8.27484 2.20033 8.7415 3.52533 8.7415H6.89199C8.21699 8.74984 8.75033 8.27484 8.75033 7.09984Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8.75033 16.475V13.1083C8.75033 11.7833 8.21699 11.25 6.89199 11.25H3.52533C2.20033 11.25 1.66699 11.7833 1.66699 13.1083V16.475C1.66699 17.8 2.20033 18.3333 3.52533 18.3333H6.89199C8.21699 18.3333 8.75033 17.8 8.75033 16.475Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              `,
              is_image:true,
              gate: 'manage_categories'
            },
            // {
            //   path: 'products',
            //   title: this.$t('error.prod'),
            //   icon: `<svg width="20" class="text-primary h-4 w-4" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            //   <path d="M2.64172 6.19971L10 10.458L17.3084 6.22468" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            //   <path d="M10 18.008V10.4497" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            //   <path d="M8.27501 2.0665L3.82502 4.54153C2.81668 5.09986 1.9917 6.49985 1.9917 7.64985V12.3582C1.9917 13.5082 2.81668 14.9082 3.82502 15.4665L8.27501 17.9415C9.22501 18.4665 10.7833 18.4665 11.7333 17.9415L16.1834 15.4665C17.1917 14.9082 18.0167 13.5082 18.0167 12.3582V7.64985C18.0167 6.49985 17.1917 5.09986 16.1834 4.54153L11.7333 2.0665C10.775 1.53317 9.22501 1.53317 8.27501 2.0665Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            //   <path d="M14.1666 11.0332V7.98321L6.2583 3.4165" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            //   </svg>`,
            //   is_image:true,
            //   form: ['product', 'ratingReviews'],
            //   gate: 'view_products'
            // },
            {
              path: 'bulk-upload',
              title: this.$t('title.bu'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.99967 7.49984V1.6665L8.33301 3.33317" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 1.6665L11.6667 3.33317" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M1.65039 10.8335H5.32539C5.64206 10.8335 5.92539 11.0085 6.06706 11.2918L7.04206 13.2418C7.32539 13.8085 7.90039 14.1668 8.53372 14.1668H11.4754C12.1087 14.1668 12.6837 13.8085 12.9671 13.2418L13.9421 11.2918C14.0837 11.0085 14.3754 10.8335 14.6837 10.8335H18.3171" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5.83366 4.2749C2.88366 4.70824 1.66699 6.44157 1.66699 9.9999V12.4999C1.66699 16.6666 3.33366 18.3332 7.50033 18.3332H12.5003C16.667 18.3332 18.3337 16.6666 18.3337 12.4999V9.9999C18.3337 6.44157 17.117 4.70824 14.167 4.2749" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`,
              form: ['bulk-upload'],
              is_image:true,
              gate: 'manage_products'
            },

            /* {
               path: 'vouchers',
               title: this.$t('error.vou'),
               icon: 'vouchers',
               gate: 'voucher'
             },*/
            // {
            //   path: 'products/create',
            //   title: 'Create',
            //   icon: 'products',
            //   gate: 'product'
            // },
            // {
            //   path: 'products/list',
            //   title: 'Product-list',
            //   icon: 'products',
            //   gate: 'product'
            // }
          ]
        },
        {
          path: 'admin-orders',
          title:  this.$t('rfq.admin_order'),
          icon: `<svg width="20" height="20" class="text-primary h-4 w-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.66663 10.166H12.5" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6.66663 13.4995H10.3166" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8.33329 4.99935H11.6666C13.3333 4.99935 13.3333 4.16602 13.3333 3.33268C13.3333 1.66602 12.5 1.66602 11.6666 1.66602H8.33329C7.49996 1.66602 6.66663 1.66602 6.66663 3.33268C6.66663 4.99935 7.49996 4.99935 8.33329 4.99935Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M13.3333 3.34961C16.1083 3.49961 17.5 4.52461 17.5 8.33294V13.3329C17.5 16.6663 16.6667 18.3329 12.5 18.3329H7.5C3.33333 18.3329 2.5 16.6663 2.5 13.3329V8.33294C2.5 4.53294 3.89167 3.49961 6.66667 3.34961" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`,
          is_image:true,
          form: ['order'],
          gate: 'view_main_orders'
        },
        {
          path: 'orders',
          title: this.$t('error.orders'),
          icon: `<svg width="20" height="20"  class="text-primary h-4 w-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.66663 10.166H12.5" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6.66663 13.4995H10.3166" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8.33329 4.99935H11.6666C13.3333 4.99935 13.3333 4.16602 13.3333 3.33268C13.3333 1.66602 12.5 1.66602 11.6666 1.66602H8.33329C7.49996 1.66602 6.66663 1.66602 6.66663 3.33268C6.66663 4.99935 7.49996 4.99935 8.33329 4.99935Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M13.3333 3.34961C16.1083 3.49961 17.5 4.52461 17.5 8.33294V13.3329C17.5 16.6663 16.6667 18.3329 12.5 18.3329H7.5C3.33333 18.3329 2.5 16.6663 2.5 13.3329V8.33294C2.5 4.53294 3.89167 3.49961 6.66667 3.34961" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`,
          is_image:true,
          form: ['order'],
          gate: 'view_orders'
        },

        {
          path: 'rfq',
          title: this.$t('rfq.RFQ_Market'),
          icon: `<svg width="20" height="20" class="text-primary h-4 w-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5 5.83317V14.1665C17.5 16.6665 16.25 18.3332 13.3333 18.3332H6.66667C3.75 18.3332 2.5 16.6665 2.5 14.1665V5.83317C2.5 3.33317 3.75 1.6665 6.66667 1.6665H13.3333C16.25 1.6665 17.5 3.33317 17.5 5.83317Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.0834 3.75V5.41667C12.0834 6.33333 12.8334 7.08333 13.75 7.08333H15.4167" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6.66663 10.8335H9.99996" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6.66663 14.1665H13.3333" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            `,
          is_image:true,
          open: false,
          // gate: 'user',
          children: [
            {
              path: 'rfq',
              title: this.$t('rfq.RFQ'),
              icon: `<svg width="20"  height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5 5.83317V14.1665C17.5 16.6665 16.25 18.3332 13.3333 18.3332H6.66667C3.75 18.3332 2.5 16.6665 2.5 14.1665V5.83317C2.5 3.33317 3.75 1.6665 6.66667 1.6665H13.3333C16.25 1.6665 17.5 3.33317 17.5 5.83317Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12.0834 3.75V5.41667C12.0834 6.33333 12.8334 7.08333 13.75 7.08333H15.4167" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6.66663 10.8335H9.99996" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6.66663 14.1665H13.3333" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              `,
              is_image:true,
              gate: 'view_RFQ'
            },
            {
              path: 'rfq/notification',
              title: this.$t('rfq.notification'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 5.3667V8.1417" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
              <path d="M10.0167 1.6665C6.95001 1.6665 4.46667 4.14984 4.46667 7.2165V8.9665C4.46667 9.53317 4.23334 10.3832 3.94167 10.8665L2.88334 12.6332C2.23334 13.7248 2.68334 14.9415 3.88334 15.3415C7.86667 16.6665 12.175 16.6665 16.1583 15.3415C17.2833 14.9665 17.7667 13.6498 17.1583 12.6332L16.1 10.8665C15.8083 10.3832 15.575 9.52484 15.575 8.9665V7.2165C15.5667 4.1665 13.0667 1.6665 10.0167 1.6665Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
              <path d="M12.775 15.6831C12.775 17.2081 11.525 18.4581 10 18.4581C9.24167 18.4581 8.54167 18.1414 8.04167 17.6414C7.54167 17.1414 7.22501 16.4414 7.22501 15.6831" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10"/>
              </svg>`,
              is_image:true,
              gate: 'notification_RFQ'
            },
            {
              path: 'rfq/manage-quotes',
              title: this.$t('rfq.manage_quotations'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.66663 10.166H12.5" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6.66663 13.4995H10.3166" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8.33329 4.99935H11.6666C13.3333 4.99935 13.3333 4.16602 13.3333 3.33268C13.3333 1.66602 12.5 1.66602 11.6666 1.66602H8.33329C7.49996 1.66602 6.66663 1.66602 6.66663 3.33268C6.66663 4.99935 7.49996 4.99935 8.33329 4.99935Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M13.3333 3.34961C16.1083 3.49961 17.5 4.52461 17.5 8.33294V13.3329C17.5 16.6663 16.6667 18.3329 12.5 18.3329H7.5C3.33333 18.3329 2.5 16.6663 2.5 13.3329V8.33294C2.5 4.53294 3.89167 3.49961 6.66667 3.34961" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`,
              is_image:true,
              gate: 'view_quotation'
            }
          ]
        },
        {
          path: 'message-center',
          title: this.$t('error.message'),
          icon: `<svg width="20" class="text-primary h-4 w-4" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.1666 17.0832H5.83329C3.33329 17.0832 1.66663 15.8332 1.66663 12.9165V7.08317C1.66663 4.1665 3.33329 2.9165 5.83329 2.9165H14.1666C16.6666 2.9165 18.3333 4.1665 18.3333 7.08317V12.9165C18.3333 15.8332 16.6666 17.0832 14.1666 17.0832Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14.1667 7.5L11.5584 9.58333C10.7 10.2667 9.2917 10.2667 8.43337 9.58333L5.83337 7.5" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`,
          is_image:true,
          form: ['flash-sales'],

          gate: 'view_flash_sales'
        },
        {
          path: 'flash-sales',
          title: this.$t('error.fs'),
          icon: `<svg width="20" class="text-primary h-4 w-4" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.60829 16.417C6.29163 15.6837 7.33329 15.742 7.93329 16.542L8.77496 17.667C9.44996 18.5587 10.5416 18.5587 11.2166 17.667L12.0583 16.542C12.6583 15.742 13.7 15.6837 14.3833 16.417C15.8666 18.0003 17.075 17.4753 17.075 15.2587V5.86699C17.0833 2.50866 16.3 1.66699 13.15 1.66699H6.84996C3.69996 1.66699 2.91663 2.50866 2.91663 5.86699V15.2503C2.91663 17.4753 4.13329 17.992 5.60829 16.417Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7.5 10.834L12.5 5.83398" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12.4955 10.8337H12.5029" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7.49546 6.25065H7.50295" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          `,
          is_image:true,
          form: ['flash-sales'],
          gate: 'view_flash_sales'
        },
        {
          path: 'store',
          title: this.$t('profile.content'),
          icon: `<svg width="20" height="20" class="text-primary h-4 w-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.3333 8.33415V12.5008C18.3333 16.6675 16.6666 18.3341 12.5 18.3341H7.49996C3.33329 18.3341 1.66663 16.6675 1.66663 12.5008V7.50081C1.66663 3.33415 3.33329 1.66748 7.49996 1.66748H11.6666" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M18.3333 8.33415H15C12.5 8.33415 11.6666 7.50081 11.6666 5.00081V1.66748L18.3333 8.33415Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M5.83337 10.8345H10.8334" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M5.83337 14.1675H9.16671" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`,
          is_image:true,
          open: false,
          children: [
            {
              path: 'buisness-news',
              title: this.$t('profile.news'),
              icon: `<svg width="24" height="24" class="text-primary h-4 w-4"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 16.7399V4.66994C22 3.46994 21.02 2.57994 19.83 2.67994H19.77C17.67 2.85994 14.48 3.92994 12.7 5.04994L12.53 5.15994C12.24 5.33994 11.76 5.33994 11.47 5.15994L11.22 5.00994C9.44 3.89994 6.26 2.83994 4.16 2.66994C2.97 2.56994 2 3.46994 2 4.65994V16.7399C2 17.6999 2.78 18.5999 3.74 18.7199L4.03 18.7599C6.2 19.0499 9.55 20.1499 11.47 21.1999L11.51 21.2199C11.78 21.3699 12.21 21.3699 12.47 21.2199C14.39 20.1599 17.75 19.0499 19.93 18.7599L20.26 18.7199C21.22 18.5999 22 17.6999 22 16.7399Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 5.48999V20.49" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7.75 8.48999H5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8.5 11.49H5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              `,
              gate: 'view_content',
              is_image:true
            },
            {
              path: 'video',
              title: this.$t('profile.video'),
              icon: `<svg width="18" height="20" class="text-primary h-4 w-4"  viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 9.9999V6.43989C1 2.01989 4.13 0.209895 7.96 2.4199L11.05 4.1999L14.14 5.9799C17.97 8.1899 17.97 11.8099 14.14 14.0199L11.05 15.7999L7.96 17.5799C4.13 19.7899 1 17.9799 1 13.5599V9.9999Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`,
              is_image:true,
              gate: 'view_content'
            },
            {
              path: 'certificate',
              title: this.$t('profile.certificate'),
              icon: `<svg width="24" height="24" class="text-primary h-4 w-4"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15C15.7279 15 18.75 12.0899 18.75 8.5C18.75 4.91015 15.7279 2 12 2C8.27208 2 5.25 4.91015 5.25 8.5C5.25 12.0899 8.27208 15 12 15Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7.51999 13.5201L7.51001 20.9001C7.51001 21.8001 8.14001 22.2401 8.92001 21.8701L11.6 20.6001C11.82 20.4901 12.19 20.4901 12.41 20.6001L15.1 21.8701C15.87 22.2301 16.51 21.8001 16.51 20.9001V13.3401" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              `,
              is_image:true,
              gate: 'view_content'
            },
            {
              path: 'faq',
              title: this.$t('profile.faq'),
              icon: `<svg width="22" height="22" class="text-primary h-4 w-4"  viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 17.43H12L7.54999 20.39C6.88999 20.83 6 20.36 6 19.56V17.43C3 17.43 1 15.43 1 12.43V6.42993C1 3.42993 3 1.42993 6 1.42993H16C19 1.42993 21 3.42993 21 6.42993V12.43C21 15.43 19 17.43 16 17.43Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`,
              gate: 'view_content',
              is_image:true
            }
          ]
        },
        // {
        //   path: 'rating-reviews',
        //   title: this.$t('error.rr'),
        //   icon: `<svg width="20" height="20" class="text-primary h-4 w-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        //   <path d="M11.4417 2.92617L12.9084 5.85951C13.1084 6.26784 13.6417 6.65951 14.0917 6.73451L16.75 7.17617C18.45 7.4595 18.85 8.69284 17.625 9.90951L15.5584 11.9762C15.2084 12.3262 15.0167 13.0012 15.125 13.4845L15.7167 16.0428C16.1834 18.0678 15.1084 18.8512 13.3167 17.7928L10.825 16.3178C10.375 16.0512 9.63338 16.0512 9.17505 16.3178L6.68338 17.7928C4.90005 18.8512 3.81671 18.0595 4.28338 16.0428L4.87505 13.4845C4.98338 13.0012 4.79171 12.3262 4.44171 11.9762L2.37505 9.90951C1.15838 8.69284 1.55005 7.4595 3.25005 7.17617L5.90838 6.73451C6.35005 6.65951 6.88338 6.26784 7.08338 5.85951L8.55005 2.92617C9.35005 1.33451 10.65 1.33451 11.4417 2.92617Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
        //   </svg>
        //   `,
        //   is_image:true,
        //   form: ['rating-reviews'],
        //   gate: 'view_product_review'
        // },
        {
          path: 'subscription',
          title: this.$t('error.subs'),
          icon: `<svg width="20" height="20" class="text-primary h-4 w-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.98328 10.002L8.99161 12.0187L13.0166 7.98535" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8.95828 2.04355C9.53328 1.55189 10.4749 1.55189 11.0583 2.04355L12.3749 3.17689C12.6249 3.39355 13.0916 3.56855 13.4249 3.56855H14.8416C15.7249 3.56855 16.4499 4.29355 16.4499 5.17689V6.59355C16.4499 6.91855 16.6249 7.39355 16.8416 7.64355L17.9749 8.96022C18.4666 9.53522 18.4666 10.4769 17.9749 11.0602L16.8416 12.3769C16.6249 12.6269 16.4499 13.0936 16.4499 13.4269V14.8436C16.4499 15.7269 15.7249 16.4519 14.8416 16.4519H13.4249C13.0999 16.4519 12.6249 16.6269 12.3749 16.8436L11.0583 17.9769C10.4833 18.4686 9.54161 18.4686 8.95828 17.9769L7.64161 16.8436C7.39161 16.6269 6.92494 16.4519 6.59161 16.4519H5.14994C4.26661 16.4519 3.54161 15.7269 3.54161 14.8436V13.4186C3.54161 13.0936 3.36661 12.6269 3.15828 12.3769L2.03328 11.0519C1.54994 10.4769 1.54994 9.54356 2.03328 8.96856L3.15828 7.64355C3.36661 7.39355 3.54161 6.92689 3.54161 6.60189V5.16855C3.54161 4.28522 4.26661 3.56022 5.14994 3.56022H6.59161C6.91661 3.56022 7.39161 3.38522 7.64161 3.16855L8.95828 2.04355Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`,
          is_image:true,
          open: false,
          children: [
            {
              path: 'subscribers',
              title: this.$t('error.subCrbs'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.98328 10.002L8.99161 12.0187L13.0166 7.98535" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8.95828 2.04355C9.53328 1.55189 10.4749 1.55189 11.0583 2.04355L12.3749 3.17689C12.6249 3.39355 13.0916 3.56855 13.4249 3.56855H14.8416C15.7249 3.56855 16.4499 4.29355 16.4499 5.17689V6.59355C16.4499 6.91855 16.6249 7.39355 16.8416 7.64355L17.9749 8.96022C18.4666 9.53522 18.4666 10.4769 17.9749 11.0602L16.8416 12.3769C16.6249 12.6269 16.4499 13.0936 16.4499 13.4269V14.8436C16.4499 15.7269 15.7249 16.4519 14.8416 16.4519H13.4249C13.0999 16.4519 12.6249 16.6269 12.3749 16.8436L11.0583 17.9769C10.4833 18.4686 9.54161 18.4686 8.95828 17.9769L7.64161 16.8436C7.39161 16.6269 6.92494 16.4519 6.59161 16.4519H5.14994C4.26661 16.4519 3.54161 15.7269 3.54161 14.8436V13.4186C3.54161 13.0936 3.36661 12.6269 3.15828 12.3769L2.03328 11.0519C1.54994 10.4769 1.54994 9.54356 2.03328 8.96856L3.15828 7.64355C3.36661 7.39355 3.54161 6.92689 3.54161 6.60189V5.16855C3.54161 4.28522 4.26661 3.56022 5.14994 3.56022H6.59161C6.91661 3.56022 7.39161 3.38522 7.64161 3.16855L8.95828 2.04355Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`,
              form: ['subscriber'],
              gate: 'manage_subscriber',
              is_image:true,
            },
            {
              path: 'subscription-email-formats',
              title: this.$t('error.ef'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.1666 17.0832H5.83329C3.33329 17.0832 1.66663 15.8332 1.66663 12.9165V7.08317C1.66663 4.1665 3.33329 2.9165 5.83329 2.9165H14.1666C16.6666 2.9165 18.3333 4.1665 18.3333 7.08317V12.9165C18.3333 15.8332 16.6666 17.0832 14.1666 17.0832Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14.1667 7.5L11.5584 9.58333C10.7 10.2667 9.2917 10.2667 8.43337 9.58333L5.83337 7.5" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`,
              form: ['subscription-email-format'],
              gate: 'subscription_email_format',
              is_image:true,
            },
          ]
        },
        {
          path: 'withdrawal',
          title: this.$t('error.wth'),
          icon: `<svg width="20" height="20" class="text-primary h-4 w-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.7929 5.87676C14.5929 5.84343 14.3845 5.83511 14.1679 5.83511H5.83455C5.60121 5.83511 5.37621 5.85177 5.15955 5.88511C5.27621 5.65177 5.44288 5.43513 5.64288 5.23513L8.35121 2.51846C9.49288 1.38512 11.3429 1.38512 12.4845 2.51846L13.9429 3.99342C14.4762 4.51842 14.7595 5.1851 14.7929 5.87676Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.50004 15.8353C7.50004 16.4603 7.32504 17.052 7.01671 17.552C6.44171 18.5186 5.38337 19.1686 4.16671 19.1686C2.95004 19.1686 1.89171 18.5186 1.31671 17.552C1.00837 17.052 0.833374 16.4603 0.833374 15.8353C0.833374 13.9936 2.32504 12.502 4.16671 12.502C6.00837 12.502 7.50004 13.9936 7.50004 15.8353Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5.40985 15.8184H2.92651" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.16675 14.6016V17.0932" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18.3333 10.0021V14.1688C18.3333 16.6688 16.6666 18.3354 14.1666 18.3354H6.35829C6.61663 18.1188 6.84163 17.8521 7.01663 17.5521C7.32496 17.0521 7.49996 16.4604 7.49996 15.8354C7.49996 13.9938 6.00829 12.5021 4.16663 12.5021C3.16663 12.5021 2.27496 12.9438 1.66663 13.6354V10.0021C1.66663 7.73545 3.03329 6.15211 5.15829 5.88545C5.37496 5.85211 5.59996 5.83545 5.83329 5.83545H14.1666C14.3833 5.83545 14.5916 5.84377 14.7916 5.87711C16.9416 6.12711 18.3333 7.71878 18.3333 10.0021Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18.3333 10.4185H15.8333C14.9166 10.4185 14.1666 11.1685 14.1666 12.0851C14.1666 13.0018 14.9166 13.7518 15.8333 13.7518H18.3333" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            `,
          is_image:true,
          open: false,
          children: [
            {
              path: 'withdrawal-requests',
              title: this.$t('error.req'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.66699 7.08317C1.66699 4.1665 3.33366 2.9165 5.83366 2.9165H14.167C16.667 2.9165 18.3337 4.1665 18.3337 7.08317V12.9165C18.3337 15.8332 16.667 17.0832 14.167 17.0832H5.83366" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14.1663 7.5L11.558 9.58333C10.6997 10.2667 9.29134 10.2667 8.433 9.58333L5.83301 7.5" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M1.66699 13.75H6.66699" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M1.66699 10.4165H4.16699" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              `,
              is_image:true,
              gate: 'withdrawal_request'
            },
            {
              path: 'withdrawal-accounts',
              title: this.$t('error.acc'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.167 17.5H5.83366C2.50033 17.5 1.66699 16.6667 1.66699 13.3333V6.66667C1.66699 3.33333 2.50033 2.5 5.83366 2.5H14.167C17.5003 2.5 18.3337 3.33333 18.3337 6.66667V13.3333C18.3337 16.6667 17.5003 17.5 14.167 17.5Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M11.667 6.6665H15.8337" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12.5 10H15.8333" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14.167 13.3335H15.8337" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7.08353 9.40827C7.91656 9.40827 8.59186 8.73296 8.59186 7.89993C8.59186 7.0669 7.91656 6.3916 7.08353 6.3916C6.2505 6.3916 5.5752 7.0669 5.5752 7.89993C5.5752 8.73296 6.2505 9.40827 7.08353 9.40827Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10.0003 13.6085C9.88366 12.4001 8.92533 11.4501 7.71699 11.3418C7.30033 11.3001 6.87533 11.3001 6.45033 11.3418C5.24199 11.4585 4.28366 12.4001 4.16699 13.6085" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`,
              is_image:true,
              gate: 'withdrawal_account'
            }
          ]
        },
        {
          path: 'ui',
          title: 'UI',
          icon: `<svg width="20" height="20" class="text-primary h-4 w-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.33337 13.3341C8.33337 11.9508 8.33337 10.8341 10.8334 10.8341H14.1667C16.6667 10.8341 16.6667 10.0008 16.6667 8.33415V6.66748C16.6667 5.00081 16.6667 4.16748 14.1667 4.16748H13.3334" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9.99996 1.66748H6.66663C6.12496 3.29248 6.12496 5.04248 6.66663 6.66748H9.99996C10.5416 5.04248 10.5416 3.29248 9.99996 1.66748Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6.66671 1.66748H5.83337C4.16671 1.66748 3.33337 2.50081 3.33337 4.16748C3.33337 5.83415 4.16671 6.66748 5.83337 6.66748H6.66671C5.83337 5.00081 5.83337 3.33415 6.66671 1.66748Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10.8333 1.66748H10C10.8333 3.33415 10.8333 5.00081 10 6.66748H10.8333C12.5 6.66748 13.3333 5.83415 13.3333 4.16748C13.3333 2.50081 12.5 1.66748 10.8333 1.66748Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.91663 18.3345H8.74996C9.99996 18.3345 9.99996 17.5011 9.99996 17.0845V14.5845C9.99996 14.1678 9.99996 13.3345 8.74996 13.3345H7.91663C6.66663 13.3345 6.66663 14.1678 6.66663 14.5845V17.0845C6.66663 17.5011 6.66663 18.3345 7.91663 18.3345Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`,
          is_image:true,
          open: false,
          children: [
            {
              path: 'pages',
              title: this.$t('error.pages'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.0505 8.69992L17.2338 12.1833C16.5338 15.1916 15.1505 16.4083 12.5505 16.1583C12.1338 16.1249 11.6838 16.0499 11.2005 15.9333L9.80048 15.5999C6.32548 14.7749 5.25048 13.0583 6.06714 9.57493L6.88381 6.08326C7.05048 5.37493 7.25048 4.75826 7.50048 4.24993C8.47548 2.23326 10.1338 1.69159 12.9171 2.34993L14.3088 2.67493C17.8005 3.49159 18.8671 5.21659 18.0505 8.69992Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12.5503 16.1583C12.0336 16.5083 11.3836 16.8 10.592 17.0583L9.27528 17.4917C5.96695 18.5583 4.22528 17.6667 3.15028 14.3583L2.08362 11.0667C1.01695 7.75833 1.90028 6.00833 5.20862 4.94167L6.52528 4.50833C6.86695 4.4 7.19195 4.30833 7.50028 4.25C7.25028 4.75833 7.05028 5.375 6.88362 6.08333L6.06695 9.575C5.25028 13.0583 6.32528 14.775 9.80029 15.6L11.2003 15.9333C11.6836 16.05 12.1336 16.125 12.5503 16.1583Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10.5332 7.1084L14.5749 8.1334" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9.7168 10.3335L12.1335 10.9502" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`,
              is_image:true,
              form: ['customPage'],
              gate: 'view_ui_settings'
            },
            {
              path: 'home-slider',
              title: this.$t('admin.hSlid'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.8416 2.43311L15.7583 4.61644C17.1749 5.24144 17.1749 6.27477 15.7583 6.89977L10.8416 9.08311C10.2833 9.33311 9.3666 9.33311 8.80827 9.08311L3.8916 6.89977C2.47493 6.27477 2.47493 5.24144 3.8916 4.61644L8.80827 2.43311C9.3666 2.18311 10.2833 2.18311 10.8416 2.43311Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2.5 9.1665C2.5 9.8665 3.025 10.6748 3.66667 10.9582L9.325 13.4748C9.75833 13.6665 10.25 13.6665 10.675 13.4748L16.3333 10.9582C16.975 10.6748 17.5 9.8665 17.5 9.1665" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2.5 13.3335C2.5 14.1085 2.95833 14.8085 3.66667 15.1252L9.325 17.6418C9.75833 17.8335 10.25 17.8335 10.675 17.6418L16.3333 15.1252C17.0417 14.8085 17.5 14.1085 17.5 13.3335" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`,
              is_image:true,
              gate: 'view_ui_settings'
            },
            {
              path: 'banners',
              title: this.$t('admin.banners'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_2212_9254)">
                <path d="M4.16699 14.1668H15.8337C17.5003 14.1668 18.3337 13.3335 18.3337 11.6668V8.3335C18.3337 6.66683 17.5003 5.8335 15.8337 5.8335H4.16699C2.50033 5.8335 1.66699 6.66683 1.66699 8.3335V11.6668C1.66699 13.3335 2.50033 14.1668 4.16699 14.1668Z" stroke="currentColor" stroke-linecap="round"/>
                <path d="M15 5.8335V10.0002" stroke="currentColor" stroke-linecap="round"/>
                <path d="M5 5.8335V9.16683" stroke="currentColor" stroke-linecap="round"/>
                <path d="M8.37467 5.8335L8.33301 10.0002" stroke="currentColor" stroke-linecap="round"/>
                <path d="M11.667 5.8335V8.3335" stroke="currentColor" stroke-linecap="round"/>
                </g>
                <defs>
                <clipPath id="clip0_2212_9254">
                <rect width="20" height="20" fill="white"/>
                </clipPath>
                </defs>
                </svg>
                `,
              is_image:true,
              gate: 'view_ui_settings'
            },
            {
              path: 'footer-links',
              title: this.$t('error.fl'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.72532 10C2.06699 9.20833 1.66699 8.19167 1.66699 7.08333C1.66699 4.56667 3.72533 2.5 6.25033 2.5H10.417C12.9337 2.5 15.0003 4.56667 15.0003 7.08333C15.0003 9.6 12.942 11.6667 10.417 11.6667H8.33366" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M17.275 10.0002C17.9333 10.7918 18.3333 11.8085 18.3333 12.9168C18.3333 15.4335 16.275 17.5002 13.75 17.5002H9.58333C7.06667 17.5002 5 15.4335 5 12.9168C5 10.4002 7.05833 8.3335 9.58333 8.3335H11.6667" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              `,
              is_image:true,
              gate: 'view_ui_settings'
            },
            {
              path: 'header-links',
              title: this.$t('dataPage.hl'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.72532 10C2.06699 9.20833 1.66699 8.19167 1.66699 7.08333C1.66699 4.56667 3.72533 2.5 6.25033 2.5H10.417C12.9337 2.5 15.0003 4.56667 15.0003 7.08333C15.0003 9.6 12.942 11.6667 10.417 11.6667H8.33366" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M17.275 10.0002C17.9333 10.7918 18.3333 11.8085 18.3333 12.9168C18.3333 15.4335 16.275 17.5002 13.75 17.5002H9.58333C7.06667 17.5002 5 15.4335 5 12.9168C5 10.4002 7.05833 8.3335 9.58333 8.3335H11.6667" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              `,
              is_image:true,
              gate: 'view_ui_settings'
            },
            {
              path: 'site-features',
              title: this.$t('title.sf'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.8255 4.3415L14.0004 6.6915C14.1588 7.0165 14.5838 7.32483 14.9421 7.39149L17.0671 7.74149C18.4255 7.96649 18.7421 8.94983 17.7671 9.93316L16.1088 11.5915C15.8338 11.8665 15.6755 12.4082 15.7671 12.7998L16.2421 14.8498C16.6171 16.4665 15.7504 17.0998 14.3254 16.2498L12.3338 15.0665C11.9754 14.8498 11.3754 14.8498 11.0171 15.0665L9.02544 16.2498C7.60044 17.0915 6.73378 16.4665 7.10878 14.8498L7.58379 12.7998C7.67545 12.4165 7.51712 11.8748 7.24212 11.5915L5.58379 9.93316C4.60879 8.95816 4.92545 7.97483 6.28379 7.74149L8.40878 7.39149C8.76711 7.33316 9.19211 7.0165 9.35045 6.6915L10.5255 4.3415C11.1505 3.0665 12.1838 3.0665 12.8255 4.3415Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6.66699 4.1665H1.66699" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M4.16699 15.8335H1.66699" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2.50033 10H1.66699" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`,
              is_image:true,
              gate: 'view_ui_settings'
            },
            {
              path: 'site-setting',
              title: this.$t('admin.site'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M1.66663 10.7334V9.2667C1.66663 8.40003 2.37496 7.68336 3.24996 7.68336C4.75829 7.68336 5.37496 6.6167 4.61663 5.30836C4.18329 4.55836 4.44163 3.58336 5.19996 3.15003L6.64163 2.32503C7.29996 1.93336 8.14996 2.1667 8.54163 2.82503L8.63329 2.98336C9.38329 4.2917 10.6166 4.2917 11.375 2.98336L11.4666 2.82503C11.8583 2.1667 12.7083 1.93336 13.3666 2.32503L14.8083 3.15003C15.5666 3.58336 15.825 4.55836 15.3916 5.30836C14.6333 6.6167 15.25 7.68336 16.7583 7.68336C17.625 7.68336 18.3416 8.3917 18.3416 9.2667V10.7334C18.3416 11.6 17.6333 12.3167 16.7583 12.3167C15.25 12.3167 14.6333 13.3834 15.3916 14.6917C15.825 15.45 15.5666 16.4167 14.8083 16.85L13.3666 17.675C12.7083 18.0667 11.8583 17.8334 11.4666 17.175L11.375 17.0167C10.625 15.7084 9.39163 15.7084 8.63329 17.0167L8.54163 17.175C8.14996 17.8334 7.29996 18.0667 6.64163 17.675L5.19996 16.85C4.44163 16.4167 4.18329 15.4417 4.61663 14.6917C5.37496 13.3834 4.75829 12.3167 3.24996 12.3167C2.37496 12.3167 1.66663 11.6 1.66663 10.7334Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`,
              is_image:true,
              gate: 'view_ui_settings'
            },
            {
              path: 'setting/help-assistance',
              title: this.$t('HelpAssistants.HelpAssistants'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M1.66663 10.7334V9.2667C1.66663 8.40003 2.37496 7.68336 3.24996 7.68336C4.75829 7.68336 5.37496 6.6167 4.61663 5.30836C4.18329 4.55836 4.44163 3.58336 5.19996 3.15003L6.64163 2.32503C7.29996 1.93336 8.14996 2.1667 8.54163 2.82503L8.63329 2.98336C9.38329 4.2917 10.6166 4.2917 11.375 2.98336L11.4666 2.82503C11.8583 2.1667 12.7083 1.93336 13.3666 2.32503L14.8083 3.15003C15.5666 3.58336 15.825 4.55836 15.3916 5.30836C14.6333 6.6167 15.25 7.68336 16.7583 7.68336C17.625 7.68336 18.3416 8.3917 18.3416 9.2667V10.7334C18.3416 11.6 17.6333 12.3167 16.7583 12.3167C15.25 12.3167 14.6333 13.3834 15.3916 14.6917C15.825 15.45 15.5666 16.4167 14.8083 16.85L13.3666 17.675C12.7083 18.0667 11.8583 17.8334 11.4666 17.175L11.375 17.0167C10.625 15.7084 9.39163 15.7084 8.63329 17.0167L8.54163 17.175C8.14996 17.8334 7.29996 18.0667 6.64163 17.675L5.19996 16.85C4.44163 16.4167 4.18329 15.4417 4.61663 14.6917C5.37496 13.3834 4.75829 12.3167 3.24996 12.3167C2.37496 12.3167 1.66663 11.6 1.66663 10.7334Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`,
              is_image:true,
              gate: 'view_ui_settings'
            },
            {
              path: 'setting/polices',
              title: this.$t('polices.polices'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M1.66663 10.7334V9.2667C1.66663 8.40003 2.37496 7.68336 3.24996 7.68336C4.75829 7.68336 5.37496 6.6167 4.61663 5.30836C4.18329 4.55836 4.44163 3.58336 5.19996 3.15003L6.64163 2.32503C7.29996 1.93336 8.14996 2.1667 8.54163 2.82503L8.63329 2.98336C9.38329 4.2917 10.6166 4.2917 11.375 2.98336L11.4666 2.82503C11.8583 2.1667 12.7083 1.93336 13.3666 2.32503L14.8083 3.15003C15.5666 3.58336 15.825 4.55836 15.3916 5.30836C14.6333 6.6167 15.25 7.68336 16.7583 7.68336C17.625 7.68336 18.3416 8.3917 18.3416 9.2667V10.7334C18.3416 11.6 17.6333 12.3167 16.7583 12.3167C15.25 12.3167 14.6333 13.3834 15.3916 14.6917C15.825 15.45 15.5666 16.4167 14.8083 16.85L13.3666 17.675C12.7083 18.0667 11.8583 17.8334 11.4666 17.175L11.375 17.0167C10.625 15.7084 9.39163 15.7084 8.63329 17.0167L8.54163 17.175C8.14996 17.8334 7.29996 18.0667 6.64163 17.675L5.19996 16.85C4.44163 16.4167 4.18329 15.4417 4.61663 14.6917C5.37496 13.3834 4.75829 12.3167 3.24996 12.3167C2.37496 12.3167 1.66663 11.6 1.66663 10.7334Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`,
              is_image:true,
              gate: 'view_ui_settings'
            },
            {
              path: 'custom-scripts',
              title: this.$t('title.cs'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.66667 8.3335L5 10.0002L6.66667 11.6668" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13.333 8.3335L14.9997 10.0002L13.333 11.6668" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10.0003 18.3332C14.6027 18.3332 18.3337 14.6022 18.3337 9.99984C18.3337 5.39746 14.6027 1.6665 10.0003 1.6665C5.39795 1.6665 1.66699 5.39746 1.66699 9.99984C1.66699 14.6022 5.39795 18.3332 10.0003 18.3332Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10.8337 8.05811L9.16699 11.9415" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`,
              is_image:true,
              gate: 'view_ui_settings'
            },
          ]
        },

        {
          path: 'account',
          title: this.$t('account.account'),
          icon: `<svg width="20" height="20" class="text-primary h-4 w-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.1334 9.06012C10.05 9.05179 9.95005 9.05179 9.85838 9.06012C7.87505 8.99346 6.30005 7.36846 6.30005 5.36846C6.30005 3.32679 7.95005 1.66846 10 1.66846C12.0417 1.66846 13.7 3.32679 13.7 5.36846C13.6917 7.36846 12.1167 8.99346 10.1334 9.06012Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5.96672 12.1354C3.95006 13.4854 3.95006 15.6854 5.96672 17.0271C8.25839 18.5604 12.0167 18.5604 14.3084 17.0271C16.3251 15.6771 16.3251 13.4771 14.3084 12.1354C12.0251 10.6104 8.26672 10.6104 5.96672 12.1354Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`,
          is_image:true,
          open: false,
          children: [
            {
              // dont have permission
              path: 'account/company-profile',
              title: this.$t('account.company-profile'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.833374 18.3359H19.1667" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16.4834 18.3441V14.6274" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16.5 9.07764C15.4833 9.07764 14.6666 9.89431 14.6666 10.911V12.8026C14.6666 13.8193 15.4833 14.636 16.5 14.636C17.5166 14.636 18.3333 13.8193 18.3333 12.8026V10.911C18.3333 9.89431 17.5166 9.07764 16.5 9.07764Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1.75 18.3357V5.02743C1.75 3.35243 2.58338 2.51074 4.24171 2.51074H9.43336C11.0917 2.51074 11.9167 3.35243 11.9167 5.02743V18.3357" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4.83337 6.87744H8.95838" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4.83337 10.0024H8.95838" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.875 18.3359V15.2109" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`,
              is_image:true,
              gate: 'edit_company'
            },
            {
              path: 'account/address',
              title: this.$t('account.address'),
              icon: `<svg width="24" height="24" class="text-primary h-4 w-4"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 13.4299C13.7231 13.4299 15.12 12.0331 15.12 10.3099C15.12 8.58681 13.7231 7.18994 12 7.18994C10.2769 7.18994 8.88 8.58681 8.88 10.3099C8.88 12.0331 10.2769 13.4299 12 13.4299Z" stroke="currentColor" stroke-width="1.5"/>
              <path d="M3.62 8.49C5.59 -0.169998 18.42 -0.159997 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.39 20.54C5.63 17.88 2.47 13.57 3.62 8.49Z" stroke="currentColor" stroke-width="1.5"/>
              </svg>`,
              is_image:true,
              gate: 'view_addresses'
            },
            {
              path: 'account/payment',
              title: this.$t('account.payment'),
              icon: `<svg width="15" height="15" class="text-primary h-4 w-4"  viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.275 8.46874C11.0125 8.72499 10.8625 9.09375 10.9 9.4875C10.9563 10.1625 11.575 10.6562 12.25 10.6562H13.4375V11.4C13.4375 12.6937 12.3812 13.75 11.0875 13.75H3.9125C2.61875 13.75 1.5625 12.6937 1.5625 11.4V7.19376C1.5625 5.90001 2.61875 4.84375 3.9125 4.84375H11.0875C12.3812 4.84375 13.4375 5.90001 13.4375 7.19376V8.09376H12.175C11.825 8.09376 11.5063 8.23124 11.275 8.46874Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M1.5625 7.75607V4.89985C1.5625 4.1561 2.01875 3.49357 2.7125 3.23107L7.675 1.35607C8.45 1.06232 9.28125 1.63734 9.28125 2.46859V4.84358" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14.0993 8.73122V10.0188C14.0993 10.3625 13.8243 10.6437 13.4743 10.6562H12.2493C11.5743 10.6562 10.9555 10.1625 10.8993 9.48749C10.8618 9.09374 11.0118 8.72498 11.2743 8.46873C11.5055 8.23123 11.8243 8.09375 12.1743 8.09375H13.4743C13.8243 8.10625 14.0993 8.38747 14.0993 8.73122Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M4.375 7.5H8.75" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              `,
              gate: 'view_financial',
              is_image:true,
            },
            {
              path: 'shipping',
              title: this.$t('account.shipping'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.0001 11.6665H10.8335C11.7501 11.6665 12.5001 10.9165 12.5001 9.99984V1.6665H5.00012C3.75012 1.6665 2.65846 2.35816 2.0918 3.37483" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M1.66699 14.1665C1.66699 15.5498 2.78366 16.6665 4.16699 16.6665H5.00033C5.00033 15.7498 5.75033 14.9998 6.66699 14.9998C7.58366 14.9998 8.33366 15.7498 8.33366 16.6665H11.667C11.667 15.7498 12.417 14.9998 13.3337 14.9998C14.2503 14.9998 15.0003 15.7498 15.0003 16.6665H15.8337C17.217 16.6665 18.3337 15.5498 18.3337 14.1665V11.6665H15.8337C15.3753 11.6665 15.0003 11.2915 15.0003 10.8332V8.33317C15.0003 7.87484 15.3753 7.49984 15.8337 7.49984H16.9086L15.4837 5.00818C15.1837 4.49151 14.6337 4.1665 14.0337 4.1665H12.5003V9.99984C12.5003 10.9165 11.7503 11.6665 10.8337 11.6665H10.0003" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M6.66667 18.3333C7.58714 18.3333 8.33333 17.5871 8.33333 16.6667C8.33333 15.7462 7.58714 15 6.66667 15C5.74619 15 5 15.7462 5 16.6667C5 17.5871 5.74619 18.3333 6.66667 18.3333Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M13.3337 18.3333C14.2541 18.3333 15.0003 17.5871 15.0003 16.6667C15.0003 15.7462 14.2541 15 13.3337 15C12.4132 15 11.667 15.7462 11.667 16.6667C11.667 17.5871 12.4132 18.3333 13.3337 18.3333Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M18.3333 10V11.6667H15.8333C15.375 11.6667 15 11.2917 15 10.8333V8.33333C15 7.875 15.375 7.5 15.8333 7.5H16.9083L18.3333 10Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M1.66699 6.6665H6.66699" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M1.66699 9.1665H5.00033" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M1.66699 11.6665H3.33366" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  `,
              is_image:true,
              gate: 'update_shipping_favorite'
            },

            {
              // dont have permission
              path: 'vendors',
              title: this.$t('account.vendors'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5667 7.15231V12.8523C17.5667 13.7856 17.0667 14.6523 16.2584 15.1273L11.3084 17.9856C10.5 18.4523 9.50005 18.4523 8.68338 17.9856L3.73338 15.1273C2.92505 14.6606 2.42505 13.7939 2.42505 12.8523V7.15231C2.42505 6.21897 2.92505 5.35227 3.73338 4.87727L8.68338 2.01895C9.49172 1.55228 10.4917 1.55228 11.3084 2.01895L16.2584 4.87727C17.0667 5.35227 17.5667 6.21064 17.5667 7.15231Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 9.16896C11.0724 9.16896 11.9417 8.29963 11.9417 7.22727C11.9417 6.15492 11.0724 5.28564 10 5.28564C8.92766 5.28564 8.05835 6.15492 8.05835 7.22727C8.05835 8.29963 8.92766 9.16896 10 9.16896Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M13.3333 13.8856C13.3333 12.3856 11.8416 11.1689 9.99996 11.1689C8.15829 11.1689 6.66663 12.3856 6.66663 13.8856" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`,
              is_image:true,
              gate: 'view_users'
            },
            {
              // dont have permission
              path: 'customer',
              title: this.$t('account.customers'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.49996 18.3356H12.5C16.6666 18.3356 18.3333 16.6689 18.3333 12.5023V7.50228C18.3333 3.33561 16.6666 1.66895 12.5 1.66895H7.49996C3.33329 1.66895 1.66663 3.33561 1.66663 7.50228V12.5023C1.66663 16.6689 3.33329 18.3356 7.49996 18.3356Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12.9166 8.12744C13.607 8.12744 14.1666 7.5678 14.1666 6.87744C14.1666 6.18709 13.607 5.62744 12.9166 5.62744C12.2263 5.62744 11.6666 6.18709 11.6666 6.87744C11.6666 7.5678 12.2263 8.12744 12.9166 8.12744Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7.08337 8.12744C7.77373 8.12744 8.33337 7.5678 8.33337 6.87744C8.33337 6.18709 7.77373 5.62744 7.08337 5.62744C6.39302 5.62744 5.83337 6.18709 5.83337 6.87744C5.83337 7.5678 6.39302 8.12744 7.08337 8.12744Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7 11.0859H13C13.4167 11.0859 13.75 11.4193 13.75 11.8359C13.75 13.9109 12.075 15.5859 10 15.5859C7.925 15.5859 6.25 13.9109 6.25 11.8359C6.25 11.4193 6.58333 11.0859 7 11.0859Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`,
              is_image:true,
              gate: 'view_users'
            },
          ]
        },

        {
          path: 'users',
          title: this.$t('error.access'),
          icon: `<svg width="20" height="20" class="text-primary h-4 w-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.425 9.26903C17.425 13.344 14.4666 17.1607 10.425 18.2774C10.15 18.3524 9.84995 18.3524 9.57495 18.2774C5.53328 17.1607 2.57495 13.344 2.57495 9.26903V5.61068C2.57495 4.92735 3.09163 4.15235 3.7333 3.89402L8.37494 1.99404C9.41661 1.56904 10.5916 1.56904 11.6333 1.99404L16.275 3.89402C16.9083 4.15235 17.4333 4.92735 17.4333 5.61068L17.425 9.26903Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 10.4193C10.9205 10.4193 11.6667 9.67308 11.6667 8.7526C11.6667 7.83213 10.9205 7.08594 10 7.08594C9.07957 7.08594 8.33337 7.83213 8.33337 8.7526C8.33337 9.67308 9.07957 10.4193 10 10.4193Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 10.4194V12.9194" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`,
          is_image:true,
          open: false,

          children: [
            // {
            //   path: 'registered-users',
            //   title: this.$t('profile.registered'),
            //   icon: 'registered',
            //   gate: 'view_users'
            // },
            // {
            //   path: 'guest-users',
            //   title: this.$t('profile.guest'),
            //   icon: 'guest',
            //   gate: 'view_users'
            // },
            // {
            //   path: 'admins-vendors',
            //   title: this.$t('error.av'),
            //   icon: 'profile.svg',
            //   is_image:true,
            //   form: ['admins-vendors'],
            //   gate: 'view_users'

            // },
            {
              path: 'roles-permissions',
              title: this.$t('error.rp'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.4252 9.26658C17.4252 13.3416 14.4669 17.1582 10.4252 18.2749C10.1502 18.3499 9.85019 18.3499 9.57519 18.2749C5.53352 17.1582 2.5752 13.3416 2.5752 9.26658V5.60824C2.5752 4.92491 3.09187 4.14991 3.73354 3.89158L8.37519 1.9916C9.41686 1.5666 10.5919 1.5666 11.6335 1.9916L16.2752 3.89158C16.9085 4.14991 17.4335 4.92491 17.4335 5.60824L17.4252 9.26658Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9.99967 10.4168C10.9201 10.4168 11.6663 9.67064 11.6663 8.75016C11.6663 7.82969 10.9201 7.0835 9.99967 7.0835C9.0792 7.0835 8.33301 7.82969 8.33301 8.75016C8.33301 9.67064 9.0792 10.4168 9.99967 10.4168Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 10.417V12.917" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`,
              is_image:true,
              form: ['roles-permissions'],
              gate: 'manage_roles'
            },
            {
              path: 'admins-vendors',
              title: this.$t('error.av'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.1334 9.06012C10.05 9.05179 9.95005 9.05179 9.85838 9.06012C7.87505 8.99346 6.30005 7.36846 6.30005 5.36846C6.30005 3.32679 7.95005 1.66846 10 1.66846C12.0417 1.66846 13.7 3.32679 13.7 5.36846C13.6917 7.36846 12.1167 8.99346 10.1334 9.06012Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5.96672 12.1354C3.95006 13.4854 3.95006 15.6854 5.96672 17.0271C8.25839 18.5604 12.0167 18.5604 14.3084 17.0271C16.3251 15.6771 16.3251 13.4771 14.3084 12.1354C12.0251 10.6104 8.26672 10.6104 5.96672 12.1354Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`,
              is_image:true,
              form: ['admins-vendors'],
              gate: 'view_users'

            },

            {
              path: 'vendor-users',
              title: this.$t('error.vendor_users'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.1334 9.06012C10.05 9.05179 9.95005 9.05179 9.85838 9.06012C7.87505 8.99346 6.30005 7.36846 6.30005 5.36846C6.30005 3.32679 7.95005 1.66846 10 1.66846C12.0417 1.66846 13.7 3.32679 13.7 5.36846C13.6917 7.36846 12.1167 8.99346 10.1334 9.06012Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5.96672 12.1354C3.95006 13.4854 3.95006 15.6854 5.96672 17.0271C8.25839 18.5604 12.0167 18.5604 14.3084 17.0271C16.3251 15.6771 16.3251 13.4771 14.3084 12.1354C12.0251 10.6104 8.26672 10.6104 5.96672 12.1354Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`,
              is_image:true,
              form: ['vendor-users'],
              gate: 'invite'
            },

            {
              path: 'invite-users',
              title: this.$t('error.invite_users'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.1334 9.06012C10.05 9.05179 9.95005 9.05179 9.85838 9.06012C7.87505 8.99346 6.30005 7.36846 6.30005 5.36846C6.30005 3.32679 7.95005 1.66846 10 1.66846C12.0417 1.66846 13.7 3.32679 13.7 5.36846C13.6917 7.36846 12.1167 8.99346 10.1334 9.06012Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5.96672 12.1354C3.95006 13.4854 3.95006 15.6854 5.96672 17.0271C8.25839 18.5604 12.0167 18.5604 14.3084 17.0271C16.3251 15.6771 16.3251 13.4771 14.3084 12.1354C12.0251 10.6104 8.26672 10.6104 5.96672 12.1354Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`,
              is_image:true,
              form: ['vendor-users'],
              gate: 'invite'
            },


          ]
        },


        {
          path: 'setting',
          title: this.$t('list.set'),
          icon: `<svg width="20" height="20" class="text-primary h-4 w-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1.66663 10.7334V9.2667C1.66663 8.40003 2.37496 7.68336 3.24996 7.68336C4.75829 7.68336 5.37496 6.6167 4.61663 5.30836C4.18329 4.55836 4.44163 3.58336 5.19996 3.15003L6.64163 2.32503C7.29996 1.93336 8.14996 2.1667 8.54163 2.82503L8.63329 2.98336C9.38329 4.2917 10.6166 4.2917 11.375 2.98336L11.4666 2.82503C11.8583 2.1667 12.7083 1.93336 13.3666 2.32503L14.8083 3.15003C15.5666 3.58336 15.825 4.55836 15.3916 5.30836C14.6333 6.6167 15.25 7.68336 16.7583 7.68336C17.625 7.68336 18.3416 8.3917 18.3416 9.2667V10.7334C18.3416 11.6 17.6333 12.3167 16.7583 12.3167C15.25 12.3167 14.6333 13.3834 15.3916 14.6917C15.825 15.45 15.5666 16.4167 14.8083 16.85L13.3666 17.675C12.7083 18.0667 11.8583 17.8334 11.4666 17.175L11.375 17.0167C10.625 15.7084 9.39163 15.7084 8.63329 17.0167L8.54163 17.175C8.14996 17.8334 7.29996 18.0667 6.64163 17.675L5.19996 16.85C4.44163 16.4167 4.18329 15.4417 4.61663 14.6917C5.37496 13.3834 4.75829 12.3167 3.24996 12.3167C2.37496 12.3167 1.66663 11.6 1.66663 10.7334Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`,
          is_image:true,
          open: false,
          children: [
            {
              path: 'countries',
              title: this.$t('setting.countries'),
              icon: `<svg width="14" height="14" class="text-primary h-4 w-4"  viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.00417 1.1665V12.8332" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3.00417 2.3335H9.5375C11.1125 2.3335 11.4625 3.2085 10.3542 4.31683L9.65417 5.01683C9.1875 5.4835 9.1875 6.24183 9.65417 6.65016L10.3542 7.35016C11.4625 8.4585 11.0542 9.3335 9.5375 9.3335H3.00417" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`,
              is_image:true,
              gate: 'manage_shipment_setting',
            },
            {
              path: 'cities',
              title: this.$t('setting.cities'),
              icon: `<svg width="24" height="24" class="text-primary h-4 w-4"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 13.4299C13.7231 13.4299 15.12 12.0331 15.12 10.3099C15.12 8.58681 13.7231 7.18994 12 7.18994C10.2769 7.18994 8.88 8.58681 8.88 10.3099C8.88 12.0331 10.2769 13.4299 12 13.4299Z" stroke="currentColor" stroke-width="1.5"/>
              <path d="M3.62 8.49C5.59 -0.169998 18.42 -0.159997 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.39 20.54C5.63 17.88 2.47 13.57 3.62 8.49Z" stroke="currentColor" stroke-width="1.5"/>
              </svg>`,
              is_image:true,
              gate: 'manage_shipment_setting',
            },
            {
              path: 'ports',
              title: this.$t('setting.ports'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6667 11.6668C17.5871 11.6668 18.3333 10.9206 18.3333 10.0002C18.3333 9.07969 17.5871 8.3335 16.6667 8.3335C15.7462 8.3335 15 9.07969 15 10.0002C15 10.9206 15.7462 11.6668 16.6667 11.6668Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16.6667 4.99984C17.5871 4.99984 18.3333 4.25365 18.3333 3.33317C18.3333 2.4127 17.5871 1.6665 16.6667 1.6665C15.7462 1.6665 15 2.4127 15 3.33317C15 4.25365 15.7462 4.99984 16.6667 4.99984Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16.6667 18.3333C17.5871 18.3333 18.3333 17.5871 18.3333 16.6667C18.3333 15.7462 17.5871 15 16.6667 15C15.7462 15 15 15.7462 15 16.6667C15 17.5871 15.7462 18.3333 16.6667 18.3333Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3.33366 11.6668C4.25413 11.6668 5.00033 10.9206 5.00033 10.0002C5.00033 9.07969 4.25413 8.3335 3.33366 8.3335C2.41318 8.3335 1.66699 9.07969 1.66699 10.0002C1.66699 10.9206 2.41318 11.6668 3.33366 11.6668Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5 10H15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15.0003 3.3335H11.667C10.0003 3.3335 9.16699 4.16683 9.16699 5.8335V14.1668C9.16699 15.8335 10.0003 16.6668 11.667 16.6668H15.0003" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`,
              is_image:true,
              gate: 'manage_shipment_setting',

            },
            {
              path: 'colors',
              title: this.$t('setting.colors'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_2212_9255)">
                <path d="M7.91634 16.2498V14.9998H3.74967C3.29134 14.9998 2.87467 14.8165 2.57467 14.5082C2.26634 14.2082 2.08301 13.7915 2.08301 13.3332C2.08301 12.4748 2.74967 11.7582 3.59134 11.6748C3.64134 11.6665 3.69134 11.6665 3.74967 11.6665H16.2497C16.308 11.6665 16.358 11.6665 16.408 11.6748C16.808 11.7082 17.158 11.8832 17.4247 12.1582C17.7663 12.4915 17.9497 12.9665 17.908 13.4832C17.833 14.3582 17.0413 14.9998 16.158 14.9998H12.083V16.2498C12.083 17.3998 11.1497 18.3332 9.99967 18.3332C8.84967 18.3332 7.91634 17.3998 7.91634 16.2498Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16.8085 4.4165L16.4085 11.6748C16.3585 11.6665 16.3085 11.6665 16.2501 11.6665H3.75014C3.6918 11.6665 3.6418 11.6665 3.5918 11.6748L3.1918 4.4165C3.0418 2.9415 4.20014 1.6665 5.67514 1.6665H14.3251C15.8001 1.6665 16.9585 2.9415 16.8085 4.4165Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.6582 1.6665V5.83317" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 1.6665V3.33317" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_2212_9255">
                <rect width="20" height="20" fill="white"/>
                </clipPath>
                </defs>
                </svg>`,
              is_image:true,
              gate: 'manage_initial_setting',

            },

            {
              path: 'shipping-rules',
              title: this.$t('brand.shipRules'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.0001 11.6665H10.8335C11.7501 11.6665 12.5001 10.9165 12.5001 9.99984V1.6665H5.00012C3.75012 1.6665 2.65846 2.35816 2.0918 3.37483" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M1.66699 14.1665C1.66699 15.5498 2.78366 16.6665 4.16699 16.6665H5.00033C5.00033 15.7498 5.75033 14.9998 6.66699 14.9998C7.58366 14.9998 8.33366 15.7498 8.33366 16.6665H11.667C11.667 15.7498 12.417 14.9998 13.3337 14.9998C14.2503 14.9998 15.0003 15.7498 15.0003 16.6665H15.8337C17.217 16.6665 18.3337 15.5498 18.3337 14.1665V11.6665H15.8337C15.3753 11.6665 15.0003 11.2915 15.0003 10.8332V8.33317C15.0003 7.87484 15.3753 7.49984 15.8337 7.49984H16.9086L15.4837 5.00818C15.1837 4.49151 14.6337 4.1665 14.0337 4.1665H12.5003V9.99984C12.5003 10.9165 11.7503 11.6665 10.8337 11.6665H10.0003" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M6.66667 18.3333C7.58714 18.3333 8.33333 17.5871 8.33333 16.6667C8.33333 15.7462 7.58714 15 6.66667 15C5.74619 15 5 15.7462 5 16.6667C5 17.5871 5.74619 18.3333 6.66667 18.3333Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M13.3337 18.3333C14.2541 18.3333 15.0003 17.5871 15.0003 16.6667C15.0003 15.7462 14.2541 15 13.3337 15C12.4132 15 11.667 15.7462 11.667 16.6667C11.667 17.5871 12.4132 18.3333 13.3337 18.3333Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M18.3333 10V11.6667H15.8333C15.375 11.6667 15 11.2917 15 10.8333V8.33333C15 7.875 15.375 7.5 15.8333 7.5H16.9083L18.3333 10Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M1.66699 6.6665H6.66699" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M1.66699 9.1665H5.00033" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M1.66699 11.6665H3.33366" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  `,
              is_image:true,
              gate: 'manage_shipment_setting'
            },
            {
              path: 'transportation-modes',
              title: this.$t('setting.transportation'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.0001 11.6665H10.8335C11.7501 11.6665 12.5001 10.9165 12.5001 9.99984V1.6665H5.00012C3.75012 1.6665 2.65846 2.35816 2.0918 3.37483" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1.66699 14.1665C1.66699 15.5498 2.78366 16.6665 4.16699 16.6665H5.00033C5.00033 15.7498 5.75033 14.9998 6.66699 14.9998C7.58366 14.9998 8.33366 15.7498 8.33366 16.6665H11.667C11.667 15.7498 12.417 14.9998 13.3337 14.9998C14.2503 14.9998 15.0003 15.7498 15.0003 16.6665H15.8337C17.217 16.6665 18.3337 15.5498 18.3337 14.1665V11.6665H15.8337C15.3753 11.6665 15.0003 11.2915 15.0003 10.8332V8.33317C15.0003 7.87484 15.3753 7.49984 15.8337 7.49984H16.9086L15.4837 5.00818C15.1837 4.49151 14.6337 4.1665 14.0337 4.1665H12.5003V9.99984C12.5003 10.9165 11.7503 11.6665 10.8337 11.6665H10.0003" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.66667 18.3333C7.58714 18.3333 8.33333 17.5871 8.33333 16.6667C8.33333 15.7462 7.58714 15 6.66667 15C5.74619 15 5 15.7462 5 16.6667C5 17.5871 5.74619 18.3333 6.66667 18.3333Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13.3337 18.3333C14.2541 18.3333 15.0003 17.5871 15.0003 16.6667C15.0003 15.7462 14.2541 15 13.3337 15C12.4132 15 11.667 15.7462 11.667 16.6667C11.667 17.5871 12.4132 18.3333 13.3337 18.3333Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M18.3333 10V11.6667H15.8333C15.375 11.6667 15 11.2917 15 10.8333V8.33333C15 7.875 15.375 7.5 15.8333 7.5H16.9083L18.3333 10Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1.66699 6.6665H6.66699" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1.66699 9.1665H5.00033" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1.66699 11.6665H3.33366" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                `,
              is_image:true,
              gate: 'manage_shipment_setting',
            },
            {
              path: 'rejection-reasons',
              title: this.$t('setting.rejection-reasons'),
              icon: `<svg class="text-primary h-4 w-4" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.4167 1.66699H7.58342C7.01675 1.66699 6.21674 2.00033 5.81674 2.40033L2.40009 5.817C2.00009 6.217 1.66675 7.017 1.66675 7.58366V12.417C1.66675 12.9837 2.00009 13.7836 2.40009 14.1836L5.81674 17.6003C6.21674 18.0003 7.01675 18.3337 7.58342 18.3337H12.4167C12.9834 18.3337 13.7834 18.0003 14.1834 17.6003L17.6001 14.1836C18.0001 13.7836 18.3334 12.9837 18.3334 12.417V7.58366C18.3334 7.017 18.0001 6.217 17.6001 5.817L14.1834 2.40033C13.7834 2.00033 12.9834 1.66699 12.4167 1.66699Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M4.1167 15.8995L15.9 4.11621" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              `,
              is_image:true,
              gate: 'manage_shipment_setting',
            },
            {
              path: 'units',
              title: this.$t('setting.units'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_2212_9254)">
                <path d="M4.16699 14.1668H15.8337C17.5003 14.1668 18.3337 13.3335 18.3337 11.6668V8.3335C18.3337 6.66683 17.5003 5.8335 15.8337 5.8335H4.16699C2.50033 5.8335 1.66699 6.66683 1.66699 8.3335V11.6668C1.66699 13.3335 2.50033 14.1668 4.16699 14.1668Z" stroke="currentColor" stroke-linecap="round"/>
                <path d="M15 5.8335V10.0002" stroke="currentColor" stroke-linecap="round"/>
                <path d="M5 5.8335V9.16683" stroke="currentColor" stroke-linecap="round"/>
                <path d="M8.37467 5.8335L8.33301 10.0002" stroke="currentColor" stroke-linecap="round"/>
                <path d="M11.667 5.8335V8.3335" stroke="currentColor" stroke-linecap="round"/>
                </g>
                <defs>
                <clipPath id="clip0_2212_9254">
                <rect width="20" height="20" fill="white"/>
                </clipPath>
                </defs>
                </svg>
                `,
              is_image:true,
              gate: 'manage_initial_setting',
            },
            {
              path: 'storage-temperatures',
              title: this.$t('setting.temperatures'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.99967 15.4168C12.9912 15.4168 15.4163 12.9917 15.4163 10.0002C15.4163 7.00862 12.9912 4.5835 9.99967 4.5835C7.00813 4.5835 4.58301 7.00862 4.58301 10.0002C4.58301 12.9917 7.00813 15.4168 9.99967 15.4168Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15.842 4.15817L15.9503 4.04984M4.05033 15.9498L4.15866 15.8415M10.0003 1.73317V1.6665M10.0003 18.3332V18.2665M1.73366 9.99984H1.66699M18.3337 9.99984H18.267M4.15866 4.15817L4.05033 4.04984M15.9503 15.9498L15.842 15.8415" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`,
              is_image:true,
              gate: 'manage_initial_setting',
            },

            {
              path: 'barcodes',
              title: this.$t('setting.barcodes'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.167 17.0832H5.83366C3.33366 17.0832 1.66699 15.8332 1.66699 12.9165V7.08317C1.66699 4.1665 3.33366 2.9165 5.83366 2.9165H14.167C16.667 2.9165 18.3337 4.1665 18.3337 7.08317V12.9165C18.3337 15.8332 16.667 17.0832 14.167 17.0832Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5 6.6665V13.3332" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7.5 6.6665V9.99984" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7.5 12.5V13.3333" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12.5 6.6665V7.49984" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 6.6665V13.3332" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12.5 10V13.3333" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15 6.6665V13.3332" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                `,
              is_image:true,
              gate: 'manage_initial_setting',
            },
            {
              path: 'tax-rules',
              title: this.$t('error.tr'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.60866 16.4165C6.29199 15.6832 7.33366 15.7415 7.93366 16.5415L8.77533 17.6665C9.45033 18.5582 10.542 18.5582 11.217 17.6665L12.0587 16.5415C12.6587 15.7415 13.7003 15.6832 14.3837 16.4165C15.867 17.9998 17.0753 17.4748 17.0753 15.2582V5.8665C17.0837 2.50817 16.3003 1.6665 13.1503 1.6665H6.85033C3.70033 1.6665 2.91699 2.50817 2.91699 5.8665V15.2498C2.91699 17.4748 4.13366 17.9915 5.60866 16.4165Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.74705 9.16667H6.75454" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.08203 9.1665H13.6654" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.74705 5.83317H6.75454" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.08203 5.8335H13.6654" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`,
              is_image:true,
              gate: 'manage_shipment_setting'

            },
            {
              path: 'product-collections',
              title: this.$t('error.col'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.667 13.3333C11.667 14.8083 11.0253 16.1416 10.0003 17.05C9.11699 17.85 7.95033 18.3333 6.66699 18.3333C3.90866 18.3333 1.66699 16.0916 1.66699 13.3333C1.66699 11.0333 3.23366 9.0833 5.35033 8.5083C5.92533 9.9583 7.15866 11.075 8.68366 11.4916C9.10033 11.6083 9.54199 11.6666 10.0003 11.6666C10.4587 11.6666 10.9003 11.6083 11.317 11.4916C11.542 12.0583 11.667 12.6833 11.667 13.3333Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M15 6.6665C15 7.3165 14.875 7.9415 14.65 8.50817C14.075 9.95817 12.8417 11.0748 11.3167 11.4915C10.9 11.6082 10.4583 11.6665 10 11.6665C9.54167 11.6665 9.1 11.6082 8.68333 11.4915C7.15833 11.0748 5.925 9.95817 5.35 8.50817C5.125 7.9415 5 7.3165 5 6.6665C5 3.90817 7.24167 1.6665 10 1.6665C12.7583 1.6665 15 3.90817 15 6.6665Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M18.3333 13.3333C18.3333 16.0916 16.0917 18.3333 13.3333 18.3333C12.05 18.3333 10.8833 17.85 10 17.05C11.025 16.1416 11.6667 14.8083 11.6667 13.3333C11.6667 12.6833 11.5417 12.0583 11.3167 11.4916C12.8417 11.075 14.075 9.9583 14.65 8.5083C16.7667 9.0833 18.3333 11.0333 18.3333 13.3333Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              `,
              is_image:true,
              gate: 'manage_initial_setting'
            },
            {
              path: 'bundle-deals',
              title: this.$t('error.bd'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.58398 7.7168L10.0006 10.2751L14.384 7.73346" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10.001 14.8083V10.2666" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8.96688 5.24187L6.3002 6.72521C5.7002 7.05854 5.2002 7.9002 5.2002 8.59187V11.4169C5.2002 12.1085 5.69187 12.9502 6.3002 13.2835L8.96688 14.7669C9.53355 15.0835 10.4669 15.0835 11.0419 14.7669L13.7085 13.2835C14.3085 12.9502 14.8085 12.1085 14.8085 11.4169V8.58354C14.8085 7.89187 14.3169 7.0502 13.7085 6.71687L11.0419 5.23354C10.4669 4.91687 9.53355 4.91687 8.96688 5.24187Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M18.3333 12.5C18.3333 15.725 15.725 18.3333 12.5 18.3333L13.375 16.875" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1.66699 7.49984C1.66699 4.27484 4.27533 1.6665 7.50033 1.6665L6.62534 3.12484" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`,
              is_image:true,
              gate: 'manage_initial_setting'
            },
            {
              path: 'attributes',
              title: this.$t('list.attr'),
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.50033 18.3332H12.5003C16.667 18.3332 18.3337 16.6665 18.3337 12.4998V7.49984C18.3337 3.33317 16.667 1.6665 12.5003 1.6665H7.50033C3.33366 1.6665 1.66699 3.33317 1.66699 7.49984V12.4998C1.66699 16.6665 3.33366 18.3332 7.50033 18.3332Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12.9746 15.4165V12.1665" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12.9746 6.2085V4.5835" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12.9753 10.5418C14.1719 10.5418 15.1419 9.57178 15.1419 8.37516C15.1419 7.17855 14.1719 6.2085 12.9753 6.2085C11.7786 6.2085 10.8086 7.17855 10.8086 8.37516C10.8086 9.57178 11.7786 10.5418 12.9753 10.5418Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7.02539 15.4165V13.7915" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7.02539 7.8335V4.5835" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7.02507 13.7918C8.22168 13.7918 9.19173 12.8218 9.19173 11.6252C9.19173 10.4285 8.22168 9.4585 7.02507 9.4585C5.82845 9.4585 4.8584 10.4285 4.8584 11.6252C4.8584 12.8218 5.82845 13.7918 7.02507 13.7918Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`,
              is_image:true,
              gate: 'manage_initial_setting'
            },

            {
              path: 'setting/currency',
              title: 'More Setting',
              icon: `<svg width="20" height="20" class="text-primary h-4 w-4"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M1.66663 10.7334V9.2667C1.66663 8.40003 2.37496 7.68336 3.24996 7.68336C4.75829 7.68336 5.37496 6.6167 4.61663 5.30836C4.18329 4.55836 4.44163 3.58336 5.19996 3.15003L6.64163 2.32503C7.29996 1.93336 8.14996 2.1667 8.54163 2.82503L8.63329 2.98336C9.38329 4.2917 10.6166 4.2917 11.375 2.98336L11.4666 2.82503C11.8583 2.1667 12.7083 1.93336 13.3666 2.32503L14.8083 3.15003C15.5666 3.58336 15.825 4.55836 15.3916 5.30836C14.6333 6.6167 15.25 7.68336 16.7583 7.68336C17.625 7.68336 18.3416 8.3917 18.3416 9.2667V10.7334C18.3416 11.6 17.6333 12.3167 16.7583 12.3167C15.25 12.3167 14.6333 13.3834 15.3916 14.6917C15.825 15.45 15.5666 16.4167 14.8083 16.85L13.3666 17.675C12.7083 18.0667 11.8583 17.8334 11.4666 17.175L11.375 17.0167C10.625 15.7084 9.39163 15.7084 8.63329 17.0167L8.54163 17.175C8.14996 17.8334 7.29996 18.0667 6.64163 17.675L5.19996 16.85C4.44163 16.4167 4.18329 15.4417 4.61663 14.6917C5.37496 13.3834 4.75829 12.3167 3.24996 12.3167C2.37496 12.3167 1.66663 11.6 1.66663 10.7334Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`,
              is_image:true,
              gate: 'manage_initial_setting',
            },

          ]
        },
      ],
      childrenOpened: false
    }
  },
  mixins: [util],
  directives: {outsideClick},
  components: {},
  computed: {


    sidebarCollapsable() {
      const data = {}
      this.sidebarsArr.forEach(i => {
        if (!i.gate) {
          data[i.path] = i?.children?.map(j => {
            return j.gate
          })
        }
      })
      return data
    },
    ...mapGetters('admin', ['sidebarPermissions', 'isVendor']),
    ...mapGetters('ui', ['sidebarOpen'])
  },
  watch: {
    sidebarOpen() {
      this.closeChild()
    }
  },
  methods: {
    leftMenuToggle() {
        this.toggleSidebar()
      },
    getImgUrl(pic) {
      return require('~/assets/icon/' + pic)
    },
    hasParentPermission(item) {
      if (!item?.gate && !item.children) {
        return true
      }
      if (!item?.gate) {
        // Checking if any child has permission
        return !!this.sidebarCollapsable[item.path]?.find(i => {
          return this.hasPermission({gate: i})
        })
      }
      return this.hasPermission(item)
    },


    hasPermission(item) {

      return (this.sidebarPermissions && (item?.gate===true || this.sidebarPermissions[item?.gate] !== undefined))

    },
    isCurrentRoute(val) {
      let check = val.path
      if (val?.active) {
        check = val?.active
      }
      return `${this.$route.path}/`.includes(`/${check}/`)
    },
    closeChild() {
      const findI = this.sidebarsArr.findIndex((o) => {
        return o.open === true
      })

      if (findI > -1) {
        this.sidebarsArr[findI].open = this.childrenOpened = false
      }
    },
    clicked(value) {
      if (value.children) {
        if (!this.sidebarOpen) {
          const findI = this.sidebarsArr.findIndex((o) => {
            return o.open === true
          })
          if (findI > -1 && this.sidebarsArr[findI].path !== value.path) {
            this.sidebarsArr[findI].open = this.childrenOpened = false
          }
        }
        value.open = !value.open
        this.childrenOpened = !this.sidebarOpen && value.open
      } else {
        if (!this.sidebarOpen) {
          this.closeChild()
        }

        this.reRenderActiveChild()
        if (window.innerWidth < 992) {
          this.hideSidebar()
        }
      }
    },
    reRenderActiveChild() {
      const sidbearI = this.sidebarsArr.findIndex((o) => {
        return o.childActive === true
      })
      if (sidbearI > -1) {
        this.sidebarsArr.splice(sidbearI, 1, {...this.sidebarsArr[sidbearI], ...{childActive: false}})
      }
      this.sidebarsArr.forEach((value, index) => {
        if (this.isCurrentRoute(value)) {
          return false
        } else {
          return value?.children?.forEach((v, i) => {
            if (this.isCurrentRoute(v)) {
              this.sidebarsArr[index].childActive = true
              return false
            }
          })
        }
      })
    },
    async loggingOut() {
        try {
          this.clearSetting()
          await this.$auth.logout()
          // window.location.reload()
          this.settingDashboardNotice(false)
          location.replace(process.env.frontBase)
        } catch (e) {
          return this.$nuxt.error(e)
        }
      },
    ...mapActions('ui', ['toggleSidebar', 'hideSidebar',]),
    ...mapActions('setting', ['clearSetting']),
      ...mapActions('ui', ['hideSidebar', 'toggleSidebar', 'settingDashboardNotice'])
  },
  mounted() {

    if (window.innerWidth < 778) {
      this.hideSidebar()
    }

    if (this.sidebarOpen) {
      this.sidebarsArr.forEach((value, index) => {
        if (this.isCurrentRoute(value)) {
          return false
        } else {
          return value?.children?.forEach((v, i) => {
            if (this.isCurrentRoute(v)) {
              this.sidebarsArr[index].open = true
              this.sidebarsArr[index].childActive = true
              return false
            }
          })
        }
      })
    } else {
      this.sidebarsArr.forEach((value, index) => {
        if (this.isCurrentRoute(value)) {
          return false
        } else {
          return value?.children?.forEach((v, i) => {
            if (this.isCurrentRoute(v)) {
              this.sidebarsArr[index].childActive = true
              return false
            }
          })
        }
      })

    }


  }
}
</script>

<style lang="stylus">
@import "~/assets/styles/sidebar.styl"
</style>
<style>
.child li.active > a {
  background:#01A781;
  color:#fff;
}
.child li.active > a span svg {
  color:#fff;
}
.child li.active > a:hover {
  background:#01A781;
  color:#fff;
}
.sidebar ul .child-active > a{
  background:#01A781 !important;
  color:#fff !important;
}
.sidebar ul li a:hover {
  background:#01A781 !important;
  color:#fff !important;
}
.sidebar ul li a:hover span svg {
  color:#fff !important;
}
.sidebar ul .active > a {
  background:#01A781 !important;
  color:#fff !important;
}

.sidebar ul .child-open > a {
  /* background:#01A781 !important; */
  color:#01A781 !important;
}
.sidebar ul .child-open > a span svg{
  color:#01A781 !important;
}
.sidebar ul li{
  margin-top:2px  !important;
  margin-bottom:2px  !important;
}
.sidebar ul .active > a span svg{
  color:#fff !important;
}
.sidebar ul .child-active > a {
  background:#01A781 !important;
  color:#fff !important;
}
.sidebar ul .child-active > a span svg{
  color:#fff !important;
}
.sidebar ul .active > a {
  background:#01A781 !important;
  color:#fff !important;
}
@media only screen and (max-width: 992px) {
.sidebar-opened .sidebar{
        width: 100%;
        top: 0;
        z-index: 9999;
}
}
</style>
