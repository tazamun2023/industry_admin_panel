<template>
  <div>
    <list-page
      v-if="$can('view_brands')"
      ref="listPage"
      :addButton="false"
      :modalButton="true"
      list-api="getAdmins"
      delete-api="deleteAdmin"
      route-name="admins-vendors"
      :name="$t('user.users')"
      :order-options="orderOptions"
      gate="view_users"
      manage_gate="manage_users"
      @open-modal="openModalItem"
    >
      <template v-slot:table="{list}">
        <tr class="lite-bold">
          <th>{{ $t('user.name') }}</th>
          <th>{{ $t('fSale.email') }}</th>
          <th>{{ $t('user.role') }}</th>
          <th>{{ $t('global.type') }}</th>
          <th>{{ $t('user.verified') }}</th>
          <th>{{ $t('title.ac') }}</th>
          <th>{{ $t('category.created') }}</th>
          <th>{{ $t('global.action') }}</th>
        </tr>

        <tr
          v-for="(value, index) in list"
          :key="index"
          :class="{'new-data': !parseInt(value.viewed)}"
        >
          <td class="">
            <nuxt-link
              class="link"
              :to="`/admins-vendors/${value.id}`"
            >
              <h5 class="mx-w-300x">{{ value.name }}</h5>

            </nuxt-link>

          </td>

          <td>{{ value.email }}</td>
          <td>
            <span class="badge bg-secondary" v-for="ro in value.role">{{ ro }}</span>
          </td>
          <td>{{ value.type }}</td>

          <td>
            <span v-if="value.verified">{{ $t('user.uv') }}</span>
            <span v-else>{{ $t('user.verified') }}</span>
          </td>
          <td>
            <switch-toggle :id="value.id"
                           :is-read-only="!($can('manage_users'))"
                           col="active"
                           set-api="toggleAdmin"
                           :change-in-server="true"
                           :value="value.active"/>

            <!--            <span v-if="value.active">{{ $t('util.active') }}</span>-->
            <!--            <span v-else>{{ $t('util.deactive') }}</span>-->
          </td>

          <td>{{ value.created }}</td>
          <td v-if="$can('manage_users') ">
            <button v-if=" value.id!=profile.id"

                    @click.prevent="$refs.listPage.deleteItem(value.id)"
                    class="border-0"
            >
              <DeleteButtonIcon/>
            </button>
            <button
              @click.prevent="openEditModalItem(value)"
              class="border-0"
            >
              <EditButtonIcon/>
            </button>

          </td>
        </tr>
      </template>
    </list-page>

    <custome-modal :show-modal="openModal" v-if="openModal"
                   :title="$t('user.addUser')"
                   size="lg"
                   @close="closeModal"
    >
      <div class="mx-2">
        <ValidationObserver class="w-full" v-slot="{ invalid }">
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
            <div class="card p-4" v-if="errors">
              <ul
                class="error-list mb-15"
              >
                <li
                  v-for="(value, index) in errors.form"
                  :key="index"
                >
                  {{ value }}
                </li>
              </ul>
            </div>

            <div class="input-wrapper">
              <lang-input :hasError="hasError" type="text" :title="$t('global.name')" :valuesOfLang="userInfo.name"
                          @updateInput="updateInput">
              </lang-input>
            </div>

            <div class="input-wrapper">
              <ValidationProvider class="w-full" name="email" rules="required|email" v-slot="{ errors }"
                                  :custom-messages="{required: $t('category.req', {type: $t('fSale.email')})}">
                <label for="">{{ $t('fSale.email') }}</label>
                <input type="email" :placeholder="$t('fSale.email')" v-model="userInfo.email">
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>


            <div class="input-wrapper">
              <div class="relative">
                <ValidationProvider class="w-full" name="password"
                                    :rules="userInfo.id>0?'':'required|min:8|confirmed:confirmation'"
                                    v-slot="{ errors }"
                                    :custom-messages="{required:  `${$t('user.new_password')} is required` }">
                  <label class="w-full" for="">{{ $t('user.new_password') }}*</label>
                  <input :type="passwordFieldType" class="rounded w-full px-2" :placeholder="$t('user.new_password')"
                         v-model="userInfo.password" @keyup="checkPassword()">
                  <i
                    class="icon absolute mt-[7px] ltr:right-1 rtl:left:right-1"
                    :class="!isPasswordTypePassword ? 'eye-icon' : 'eye-close-icon'"
                    @click="passwordFieldToggle"
                  />
                  <span class="error">{{ errors[0] }} </span>
                </ValidationProvider>
              </div>

              <div class="grid grid-cols-2 gap-1 md:gap-2">
                <p class="text-xs" :class="{'text-smooth': passwordCon.containsNumber}">{{ $t('user.one_numeric') }}</p>
                <p class="text-xs" :class="{'text-smooth': passwordCon.containsUppercase}">
                  {{ $t('user.alphabetic_uppercase') }}</p>
                <p class="text-xs" :class="{'text-smooth': passwordCon.containsLowercase}">
                  {{ $t('user.alphabetic _lowercase') }}</p>
                <p class="text-xs" :class="{'text-smooth': passwordCon.containsSpecial}">{{
                    $t('user.one_special')
                  }}</p>
              </div>
            </div>


            <div class="relative">
              <ValidationProvider class="w-full" name="Confirm_password" :rules="{ required: userInfo.id=='' }"
                                  v-slot="{ errors }"
                                  vid="confirmation"
                                  :custom-messages="{required: `${$t('user.confirm_password')} is Required` }">
                <label class="w-full" for="">{{ $t('user.confirm_password') }}*</label>
                <input :type="passwordFieldType" class="rounded w-full px-2" :placeholder="$t('user.confirm_password')"
                       v-model="confirmation">
                <i
                  class="icon icon absolute mt-[7px] ltr:right-1 rtl:left:right-1"
                  :class="!isPasswordTypePassword ? 'eye-icon' : 'eye-close-icon'"
                  @click="passwordFieldToggle()"
                />
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="grid grid-cols-2 gap-1 md:gap-2">
              <div class="input-wrapper w-full">
                <ValidationProvider class="w-full" name="roles" rules="required" v-slot="{ errors }"
                                    :custom-messages="{required: $t('category.req', {type: $t('user.role')})}">
                  <label class="w-full" for="">{{ $t('user.role') }}</label>
                  <select class="w-full p-3 border border-smooth rounded-lg" v-model="userInfo.roles">
                    <option value="">{{ $t('roles.Select role') }}</option>
                    <option v-for="ro in AllRole" :value="ro.name">{{ ro.name }}</option>
                  </select>
                  <span class="error">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <div class="input-wrapper w-full">
                <ValidationProvider class="w-full" name="status" rules="required" v-slot="{ errors }"
                                    :custom-messages="{required: $t('category.req', {type: $t('title.ac')})}">
                  <label class="w-full" for="">{{ $t('title.ac') }}</label>
                  <select class="w-full p-3 border border-smooth rounded-lg" v-model="userInfo.active">
                    <option value="">Select Status</option>
                    <option value="1">{{ $t('util.active') }}</option>
                    <option value="0">{{ $t('util.deactive') }}</option>
                  </select>
                  <span class="error">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>


            <!--            <div class="input-wrapper mb-0 text-end">-->
            <!--              <button @click="closeModal" class="bg-primary leading-3 w-[100px] p-2 rounded text-white">Close</button>-->
            <!--              <button class="bg-primary leading-3 w-[100px] p-2 rounded text-white" :disabled="invalid">Submit</button>-->
            <!--            </div>-->
          </form>
        </ValidationObserver>
      </div>

      <template v-slot:buttons>
        <button type="button" class="btn bg-primary hover:text-primary text-white border-secondary"
                @click="formSubmit"
                :disabled="isInvalid">
          {{ $t('app.Save') }}
        </button>
      </template>

    </custome-modal>

  </div>
</template>

<script>
import ListPage from "~/components/partials/ListPage";
import util from '~/mixin/util'
import EditButtonIcon from "../../components/partials/EditButtonIcon.vue";
import DeleteButtonIcon from "../../components/partials/DeleteButtonIcon.vue";
import Modal from "@/components/Modal.vue";
import {ValidationObserver, ValidationProvider} from "vee-validate";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "admin-Users",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      orderOptions: {
        name: {title: this.$t('user.name')},
        email: {title: this.$t('fSale.email')},
        username: {title: this.$t('user.uName')},
        created_at: {title: this.$t('category.date')},
      },
      userInfo: {
        name: {'ar': '', 'en': ''},
        email: '',
        password: '',
        id: '',
        roles: '',
        active: 1,
        verified: 1,
        type: 'admin'
      },
      confirmation: '',
      passwordFieldType: 'password',
      passwordCon: {
        containsUppercase: false,
        containsLowercase: false,
        containsNumber: false,
        containsSpecial: false,
        checkLicence: false
      },
      isInvalid: false,
      loading: false,
      hasError: false,
      openModal: false
    }
  },
  components: {
    ListPage,
    ValidationObserver,
    ValidationProvider,
    EditButtonIcon,
    DeleteButtonIcon,
    Modal
  },
  mixins: [util],
  computed: {
    ...mapGetters('admin', ['profile']),
    ...mapGetters('language', ['langCode', 'currentLanguage']),
    ...mapGetters('vendor', ['AllRole']),
    ...mapGetters('ui', ['errors']),
    isPasswordTypePassword() {
      return this.passwordFieldType === 'password'
    },
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
    updateInput(input, language, value) {
      this.$set(input, language, value);
    },
    openEditModalItem(value) {
      this.userInfo.name.ar = value.name
      this.userInfo.name.en = value.name
      this.userInfo.email = value.email
      this.userInfo.roles = value.role[0]
      this.userInfo.active = value.active ? 1 : 0
      this.userInfo.id = value.id
      this.userInfo.password = ''
      this.openModal = true
    },
    openModalItem() {
      this.openModal = true
    },
    closeModal() {
      this.userInfo.id = ''
      this.userInfo.name.ar = ''
      this.userInfo.name.en = ''
      this.userInfo.email = ''
      this.userInfo.roles = ''
      this.userInfo.active = ''
      this.userInfo.password = ''
      this.openModal = false
    },
    ...mapActions('vendor', ['registerUser', 'getAllRoles']),
    ...mapActions('ui', ['setToastMessage', 'setToastError']),
    ...mapActions('common', ['setRequest']),
    passwordFieldToggle() {
      if (this.isPasswordTypePassword) {
        this.passwordFieldType = 'text'
      } else {
        this.passwordFieldType = 'password'
      }
    },
    checkPassword() {
      this.passwordCon.containsUppercase = /[A-Z]/.test(this.userInfo.password)
      this.passwordCon.containsLowercase = /[a-z]/.test(this.userInfo.password)
      this.passwordCon.containsNumber = /[0-9]/.test(this.userInfo.password)
      this.passwordCon.containsSpecial = /[#?!@$%^&*-]/.test(this.userInfo.password)
    },

    async formSubmit() {

      if (this.userInfo.name.ar == '' || this.userInfo.name.en == '') {
        this.hasError = true
      } else {
        try {
          this.loading = true
          const data = await this.setRequest({
            params: {...this.userInfo},
            lang: this.langCode,
            api: 'setAdmin'
          })
          // const data = await this.registerUser({
          //   params: {...this.userInfo},
          //   lang: this.langCode,
          //   api:'addAdminUser'
          // })
          this.loading = false
          console.log('data99999999999', data)

          if (data) {
            console.log("data 200", data)
            this.openModal = false
            this.$router.push('/admins-vendors')

          }
        } catch (e) {
          return this.$nuxt.error(e)
        }
      }


    },

  },
  async mounted() {
    try {
      if (!this.AllRole)
        await this.getAllRoles({
          params: {
            "type": "admin"
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
<script setup>
import CustomeModal from "../../components/CustomeModal.vue";
import SwitchToggle from "../../components/SwitchToggle.vue";
</script>
