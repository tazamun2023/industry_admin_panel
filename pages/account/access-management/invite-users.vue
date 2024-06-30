<template>
  <list-page
    v-if="$can('invite')"
    :param="vendor_id"
    ref="listPage"
    :addButton="false"
    :modalButton="true"
    list-api="getVendorInvitation"
    delete-api="deleteVendors"
    route-name="vendor-users"
    :order-options="orderOptions"
    gate="invite"
    manage_gate="invite"
    @open-modal="openModal"
    @list="listChange($event)"
    @list-invite-user="listChange($event)"
  >

    <template v-slot:tab-access-managment>
      <div>
        <div class="flex  items-center  justify-between">
          <h3 class="font-bold   text-[18px]  " for="card">{{ $t('vendor.invite_users') }}</h3>

        </div>
        <div class="my-2">
          <div class="lg:flex   justify-between">
            <label class="font-medium text-theem lg:text-[14px] text-[11px]" for="card">
              {{ $t('roles.LearnMoreMessage') }}
            </label>
            <div class="flex gap-2">
              <nuxt-link
                class="text-lg font-bold bg-theemlight lg:text-[14px] text-[12px] uppercase rounded-[10px] px-2 text-theem"
                :to="('/account/access-management/roles')">{{ $t('roles.LearnMore') }}
              </nuxt-link>

            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-slot:table="{list}">
      <tr class="lite-bold">
        <th>{{ $t('fSale.email') }}</th>
        <th>{{ $t('user.role') }}</th>
        <!--        <th>{{ $t('user.verified') }}</th>-->
        <th>{{ $t('category.created') }}</th>
        <th>{{ $t('title.act') }}</th>
      </tr>

      <tr v-for="(value, index) in Pagelist" :key="index">
        <td>{{ value.email }}</td>
        <td>{{ $t('roles.' + value.roles) }}</td>

        <td>{{ value.created }}</td>
        <td>
          <button v-if="$can('invite')" @click.prevent="$refs.listPage.deleteItemInv(value.id,'deleteInvitations')"
                  class="border-0">
            <DeleteButtonIcon/>
          </button>
        </td>
      </tr>

      <custome-modal :title=" $t('vendor.invite_user')"
                     :show-modal="deleteModal"
                     v-if="deleteModal"
                     @close="deleteModal=false"
                     size="md">
        <ValidationObserver class="w-full " v-slot="{ invalid }">
          <template v-if="invalidWatcher(invalid)"></template>
          <form @submit.prevent="formSubmit">
            <transition
              name="fade"
              mode="out-in"
            >
              <div
                class="spinner-wrapper flex layer-white"
                v-if="loading"
              >
                <spinner
                  :radius="100"
                />
              </div>
            </transition>

            <div class="card p-4" v-if="errors?.length">
              <ul
                class="error-list mb-15"
              >
                <li
                  class="mb-10"
                >
                  {{ $t('forgotPassword.errorOccurred') }}
                </li>
                <li
                  v-for="(value, index) in errors"
                  :key="index"
                >
                  {{ value }}
                </li>
              </ul>
            </div>
            <div class="input-wrapper">
              <ValidationProvider class="w-full" name="email" rules="required|email" v-slot="{ errors }"
                                  :custom-messages="{required: $t('category.req', {type: $t('fSale.email')})}">
                <label for="">{{ $t('fSale.email') }}</label>
                <input type="email" :placeholder="$t('fSale.email')" v-model="userInfo.email">
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="input-wrapper" v-if="$can('assign_roles')">
              <ValidationProvider class="w-full" name="roles" rules="required" v-slot="{ errors }"
                                  :custom-messages="{required: $t('category.req', {type: $t('user.role')})}">
                <label class="w-full" for="">{{ $t('user.role') }}</label>
                <select class="w-full p-2 border border-smooth rounded" v-model="userInfo.roles">
                  <option value="">{{ $t('roles.Select role') }}</option>
                  <!--                        <option value="vendor">Vendor</option>-->
                  <option v-for="ro in AllRole" :value="ro.name">

                    {{ $t('roles.' + ro.name) }}
                  </option>
                </select>
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

          </form>
        </ValidationObserver>

        <template v-slot:buttons>
          <button type="button" class="btn bg-primary hover:text-primary text-white border-secondary"
                  @click="formSubmit"
                  :disabled="isInvalid">
            {{ $t('profile.submit') }}
          </button>
        </template>
      </custome-modal>
    </template>
  </list-page>
</template>

<script>
import ListPage from "~/components/partials/ListPage";
import util from '~/mixin/util'
import EditButtonIcon from "../../../components/partials/EditButtonIcon.vue";
import DeleteButtonIcon from "../../../components/partials/DeleteButtonIcon.vue";
import {mapActions, mapGetters} from "vuex";
import {ValidationObserver, ValidationProvider} from "vee-validate";
import CustomeModal from "../../../components/CustomeModal.vue";

export default {
  name: "vendor-users",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      isInvalid: false,
      orderOptions: {
        name: {title: this.$t('user.name')},
        email: {title: this.$t('fSale.email')},
        username: {title: this.$t('user.uName')},
        created_at: {title: this.$t('category.date')},
      },
      vendor_id: {
        vendor_id: 1
      },
      Pagelist: [],
      deleteModal: false,
      userInfo: {
        email: '',
        roles: '',
        isVerified: '',
        vendor_id: '',
        type: 'vendor',
      },
      errors: [],
      loading: false
    }
  },
  components: {
    CustomeModal,
    ListPage,
    EditButtonIcon,
    DeleteButtonIcon,
    ValidationObserver,
    ValidationProvider
  },
  mixins: [util],
  computed: {
    ...mapGetters('admin', ['profile']),
    ...mapGetters('vendor', ['AllRole']),
    ...mapGetters('language', ['currentLanguage']),
  },
  watch: {
    profile() {
      this.userInfo.vendor_id = this.profile?.vendor_id
    }
  },
  methods: {
    invalidWatcher(invalid) {
      this.isInvalid = invalid;
      return true; // Necessary to keep the template valid
    },
    ...mapActions('vendor', ['sentInvitation', 'getAllRoles']),
    ...mapActions('ui', ['setToastMessage', 'setToastError']),
    ...mapActions('common', ['getRequest']),
    listChange(v) {
      console.log('value list', v)
      this.Pagelist = v
    },
    async fetchingData() {
      try {
        this.loading = true
        this.result = await this.getRequest({
          params: null,
          api: "getVendorInvitation"
        })
        this.loading = false
      } catch (e) {
        return this.$nuxt.error(e)
      }
    },
    async formSubmit() {
      this.loading = true
      const data = await this.sentInvitation({
        params: {
          ...this.userInfo
        },
        api: "sentInvitation"
      })
      this.loading = false
      if (data.status === 200) {
        console.log(data)
        this.deleteModal = false
        this.errors = []
        this.Pagelist.unshift(data.data)
        // this.$router.go('/invite-users')
        this.setToastMessage(data.message)
      } else {
        this.errors = data.data.form
        this.setToastError("Solve The Error")
      }
    },

    openModal() {
      this.deleteModal = true
    },

    closeModal() {
      this.userInfo.email = ''
      this.userInfo.roles = ''
      this.userInfo.isVerified = ''
      this.userInfo.vendor_id = ''
      this.errors = []
      this.deleteModal = false
    }

  },
  async mounted() {
    this.userInfo.vendor_id = this.profile?.vendor_id
    try {
      await this.getAllRoles({
        params: {
          "type": "vendor"
        },
        api: "getRoleByType"
      })
    } catch (e) {
      return this.$nuxt.error(e)
    }

  }
}
</script>

<style scoped>

</style>
