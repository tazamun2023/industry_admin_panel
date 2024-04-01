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

      <li
        v-for="(value, index) in sidebarsArr"
        :key="index"
        :class="[{'child-open': value.open}, {'child-active': value.childActive}, {active: isCurrentRoute(value)}]"
      >


        <nuxt-link
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
          <img v-if="value.is_image" class="h-4 w-4" :src="getImgUrl(value.icon)" alt="">
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
              v-if="hasPermission(child)"
              :event="child.children ? '' : 'click'"
              :to="`/${child.path}`"
              @click.native="clicked(child)"
              :title="child.title"
            >
              <i
                class="icon"
                :class="child.icon"
              />
              <span class="">{{ child.title }}</span>
            </nuxt-link>
          </li>
        </ul>
      </li>

    </ul>
    <div class="absolute bottom-0 w-full bg-white py-4 ">
        <button class="w-full border-0 flex gap-4 hover:bg-white" @click.prevent="loggingOut">
        <img src="~/assets/icon/logout.svg" class="h-4 w-4 mt-3" alt="">
            <span>{{ $t('error.log') }}</span>
       </button>
    </div>
    <button
      class="minimize-btn centered-flex"
      @click.prevent="toggleSidebar"
    />

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
          icon: 'home-2.svg',
          is_image:true,
          gate: 'dashboard'
        },
        {
          path: 'product',
          title: this.$t('fSale.product'),
          icon: 'box.svg',
          is_image:true,
          open: false,
          children: [
            {
              path: 'brands',
              title: this.$t('error.brands'),
              icon: 'brands',
              gate: 'view_brands'
            },
            {
              path: 'categories',
              title: this.$t('error.cat'),
              icon: 'categories',
              gate: 'manage_categories'
            },
            {
              path: 'products',
              title: this.$t('error.prod'),
              icon: 'products',
              form: ['product', 'ratingReviews'],
              gate: 'view_products'
            },
            {
              path: 'bulk-upload',
              title: this.$t('title.bu'),
              icon: 'bulk-upload',
              form: ['bulk-upload'],
              gate: 'bulk_upload'
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
          icon: 'clipboard-text.svg',
          is_image:true,
          form: ['order'],
          gate: 'view_main_orders'
        },
        {
          path: 'orders',
          title: this.$t('error.orders'),
          icon: 'clipboard-text.svg',
          is_image:true,
          form: ['order'],
          gate: 'view_orders'
        },

        {
          path: 'rfq',
          title: this.$t('rfq.RFQ_Market'),
          icon: 'document-text.svg',
          is_image:true,
          open: false,
          // gate: 'user',
          children: [
            {
              path: 'rfq',
              title: this.$t('rfq.RFQ'),
              icon: 'registered',
              gate: 'view_RFQ'
            },
            {
              path: 'rfq/notification',
              title: this.$t('rfq.notification'),
              icon: 'flash-notification',
              gate: 'notification_RFQ'
            },
            {
              path: 'rfq/manage-quotes',
              title: this.$t('rfq.manage_quotations'),
              icon: 'flash-sales',
              gate: 'view_quotation'
            }
          ]
        },
        {
          path: 'flash-sales',
          title: this.$t('error.message'),
          icon: 'sms.svg',
          is_image:true,
          form: ['flash-sales'],
          gate: 'view_flash_sales'
        },
        {
          path: 'flash-sales',
          title: this.$t('error.fs'),
          icon: 'receipt-disscount.svg',
          is_image:true,
          form: ['flash-sales'],
          gate: 'view_flash_sales'
        },
        {
          path: 'store',
          title: this.$t('profile.content'),
          icon: 'dd.svg',
          is_image:true,
          open: false,
          children: [
            {
              path: 'buisness-news',
              title: this.$t('profile.news'),
              icon: 'profile',
              gate: 'store'
            },
            {
              path: 'video',
              title: this.$t('profile.video'),
              icon: 'video',
              gate: 'store'
            },
            {
              path: 'certificate',
              title: this.$t('profile.certificate'),
              icon: 'video',
              gate: 'store'
            },
            {
              path: 'faq',
              title: this.$t('profile.faq'),
              icon: 'faq',
              gate: 'store'
            }
          ]
        },
        {
          path: 'rating-reviews',
          title: this.$t('error.rr'),
          icon: 'star.svg',
          is_image:true,
          form: ['rating-reviews'],
          gate: 'rating_review'
        },
        {
          path: 'subscription',
          title: this.$t('error.subs'),
          icon: 'verify.svg',
          is_image:true,
          open: false,
          children: [
            {
              path: 'subscribers',
              title: this.$t('error.subCrbs'),
              icon: 'subscribers',
              form: ['subscriber'],
              gate: 'subscriber'
            },
            {
              path: 'subscription-email-formats',
              title: this.$t('error.ef'),
              icon: 'subscription-email-formats',
              form: ['subscription-email-format'],
              gate: 'subscription_email_format'
            },
          ]
        },
        {
          path: 'withdrawal',
          title: this.$t('error.wth'),
          icon: 'wallet-add.svg',
          is_image:true,
          open: false,
          children: [
            {
              path: 'withdrawal-requests',
              title: this.$t('error.req'),
              icon: 'withdrawal-requests',
              gate: 'withdrawal_request'
            },
            {
              path: 'withdrawal-accounts',
              title: this.$t('error.acc'),
              icon: 'withdrawal-accounts',
              gate: 'withdrawal_account'
            }
          ]
        },
        {
          path: 'ui',
          title: 'UI',
          icon: 'brush.svg',
          is_image:true,
          open: false,
          children: [
            {
              path: 'pages',
              title: this.$t('error.pages'),
              icon: 'pages',
              form: ['customPage'],
              gate: 'view_ui_settings'
            },
            {
              path: 'home-slider',
              title: this.$t('admin.hSlid'),
              icon: 'home-slider',
              gate: 'view_ui_settings'
            },
            {
              path: 'banners',
              title: this.$t('admin.banners'),
              icon: 'banners',
              gate: 'view_ui_settings'
            },
            {
              path: 'footer-links',
              title: this.$t('error.fl'),
              icon: 'footer',
              gate: 'view_ui_settings'
            },
            {
              path: 'header-links',
              title: this.$t('dataPage.hl'),
              icon: 'header-links',
              gate: 'view_ui_settings'
            },
            {
              path: 'site-features',
              title: this.$t('title.sf'),
              icon: 'site-features',
              gate: 'view_ui_settings'
            },
            {
              path: 'site-setting',
              title: this.$t('admin.site'),
              icon: 'site-setting',
              gate: 'view_ui_settings'
            },
            {
              path: 'custom-scripts',
              title: this.$t('title.cs'),
              icon: 'custom-scripts',
              gate: 'view_ui_settings'
            },
          ]
        },

        {
          path: 'account',
          title: this.$t('account.account'),
          icon: 'profile.svg',
          is_image:true,
          open: false,
          children: [
            {
              // dont have permission
              path: 'account/company-profile',
              title: this.$t('account.company-profile'),
              icon: 'building-4.svg',
              is_image:true,
              gate: 'user'
            },
            {
              path: 'account/address',
              title: this.$t('account.address'),
              icon: 'location.svg',
              is_image:true,
              gate: 'view_addresses'
            },
            {
              path: 'account/payment',
              title: this.$t('account.payment'),
              icon: 'dollar',
              gate: 'view_financial'
            },
            {
              // dont have permission
              path: 'vendors',
              title: this.$t('account.vendors'),
              icon: 'user-octagon.svg',
              is_image:true,
              gate: 'user'
            },
            {
              // dont have permission
              path: 'customer',
              title: this.$t('account.customers'),
              icon: 'emoji-happy.svg',
              is_image:true,
              gate: 'view_users'
            },
          ]
        },

        {
          path: 'users',
          title: this.$t('error.access'),
          icon: 'security-safe.svg',
          is_image:true,
          open: false,
          // gate: 'user',
          children: [
            {
              path: 'registered-users',
              title: this.$t('profile.registered'),
              icon: 'registered',
              gate: 'view_users'
            },
            {
              path: 'guest-users',
              title: this.$t('profile.guest'),
              icon: 'guest',
              gate: 'view_users'
            },
            {
              path: 'roles-permissions',
              title: this.$t('error.rp'),
              icon: 'roles-permissions',
              form: ['roles-permissions'],
              gate: 'manage_roles'
            },
            {
              path: 'admins-vendors',
              title: this.$t('error.av'),
              icon: 'admins-vendors',
              form: ['admins-vendors'],
              gate: 'view_users'
            },
          ]
        },


        {
          path: 'setting',
          title: this.$t('list.set'),
          icon: 'setting-2.svg',
          is_image:true,
          open: false,
          children: [
            {
              path: 'countries',
              title: this.$t('setting.countries'),
              icon: 'flash-sales',
              gate: 'manage_shipment_setting',
            },
            {
              path: 'cities',
              title: this.$t('setting.cities'),
              icon: 'flash-sales',
              gate: 'manage_shipment_setting',
            },
            {
              path: 'ports',
              title: this.$t('setting.ports'),
              icon: 'flash-sales',
              gate: 'manage_shipment_setting',
            },

            {
              path: 'shipping-rules',
              title: this.$t('brand.shipRules'),
              icon: 'shipping-rules',
              gate: 'manage_shipment_setting'
            },
            {
              path: 'transportation-modes',
              title: this.$t('setting.transportation'),
              icon: 'flash-sales',
              gate: 'manage_shipment_setting',
            },
            {
              path: 'colors',
              title: this.$t('setting.colors'),
              icon: 'flash-sales',
              gate: 'manage_initial_setting',
            },
            {
              path: 'units',
              title: this.$t('setting.units'),
              icon: 'flash-sales',
              gate: 'manage_initial_setting',
            },
            {
              path: 'storage-temperatures',
              title: this.$t('setting.temperatures'),
              icon: 'flash-sales',
              gate: 'manage_initial_setting',
            },

            {
              path: 'barcodes',
              title: this.$t('setting.barcodes'),
              icon: 'flash-sales',
              gate: 'manage_initial_setting',
            },
            {
              path: 'tax-rules',
              title: this.$t('error.tr'),
              icon: 'tax-rules',
              gate: 'manage_initial_setting'
            },
            {
              path: 'product-collections',
              title: this.$t('error.col'),
              icon: 'product-collections',
              gate: 'manage_initial_setting'
            },
            {
              path: 'bundle-deals',
              title: this.$t('error.bd'),
              icon: 'bundle-deals',
              gate: 'manage_initial_setting'
            },
            {
              path: 'attributes',
              title: this.$t('list.attr'),
              icon: 'attributes',
              gate: 'manage_initial_setting'
            },

            {
              path: 'setting/currency',
              title: 'More Setting',
              icon: 'setting',
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
      return (this.sidebarPermissions &&
        (
          this.sidebarPermissions[`${item?.gate}`] !== undefined
           || this.sidebarPermissions[`${item?.gate}.view`] !== undefined
        || this.sidebarPermissions[`${item?.gate}.create`] !== undefined
        )
      )
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
