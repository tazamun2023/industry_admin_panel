<template>
  <list-page
    v-if="$can('invite')"
    :param="vendor_id"
    ref="listPage"
    :addButton="false"
    :modalButton="true"
    list-api="getVendorUsers"
    delete-api="deleteVendors"
    route-name="vendor-users"
    :name="$t('user.users')"
    :order-options="orderOptions"
    gate="invite"
    manage_gate="invite"
    @open-modal="openModal"
  >
    <template v-slot:table="{list}">
      <tr class="lite-bold">
        <th>{{ $t('user.name') }}</th>
        <th>{{ $t('user.uName') }}</th>
        <th>{{ $t('fSale.email') }}</th>
        <th>{{ $t('user.role') }}</th>
        <th>{{ $t('user.verified') }}</th>
        <th>{{ $t('title.ac') }}</th>
        <th>{{ $t('category.created') }}</th>
        <th>{{ $t('title.act') }}</th>
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
        <td>{{ value.username }}</td>
        <td>{{ value.email }}</td>
<!--        <td>
          <span
            v-for="(i, n) in value.role"
            :key="n"
          >
            {{ i.name }}
          </span>
        </td>-->

        <td>{{ value.role[0] }}</td>

        <td>
          <span v-if="value.verified">{{ $t('user.verified') }}</span>
          <span v-else>{{ $t('user.verified') }}</span>
        </td>

        <td>
          <span v-if="value.active">{{ $t('prod.yes') }}</span>
          <span v-else>{{ $t('prod.no') }}</span>
        </td>

        <td>{{ value.created }}</td>
        <td>
          <button
            v-if="$can('invite')"
            @click.prevent="$refs.listPage.deleteItem(value.id)"
            class="border-0"
          >
            <DeleteButtonIcon/>
          </button>
          <button
            v-if="$can('invite')"
            @click.prevent="$refs.listPage.editItem(value.id)"
            class="border-0"
          >
            <EditButtonIcon/>
          </button>

        </td>
      </tr>
      <DeleteModal  v-if="deleteModal" @closeModal="closeModal">
        <template v-slot:title>
            <div class="flex mb-2 justify-between">
              <h3>Add {{ $t('user.users') }}</h3>
            </div>
            <div>
              <ValidationObserver  class="w-full"  v-slot="{ invalid }">
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
                    <ValidationProvider class="w-full" name="email" rules="required|email" v-slot="{ errors }" :custom-messages="{required: $t('category.req', {type: $t('fSale.email')})}">
                      <label for="">{{ $t('fSale.email') }}</label>
                      <input type="email" :placeholder="$t('fSale.email')" v-model="userInfo.email">
                      <span class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>

                  <div class="input-wrapper" v-if="$can('assign_roles')">

                    <ValidationProvider  class="w-full"  name="roles" rules="required" v-slot="{ errors }" :custom-messages="{required: $t('category.req', {type: $t('user.role')})}">
                      <label class="w-full" for="">{{ $t('user.role') }}</label>
                      <select class="w-full p-2 border border-smooth rounded" v-model="userInfo.roles">
                        <option value="">Select role</option>
                        <option value="vendor">Vendor</option>
                        <option value="vendor_admin">Vendor Admin</option>
                        <option value="vendor_supervisor">Vendor Supervisor</option>
                        <option value="vendor_user">Vendor User</option>
                      </select>
                      <span class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="input-wrapper">
                    <label for="verified"><input type="checkbox" v-model="userInfo.isVerified"> {{ $t('user.verified') }}</label>
                  </div>
                  <div class="input-wrapper mb-0 text-end">
                    <button class="bg-primary leading-3 w-[100px] p-2 rounded text-white" :disabled="invalid">Submit</button>
                  </div>
                </form>
              </ValidationObserver>
            </div>
        </template>
        <!-- -----------default slot------- -->
      </DeleteModal>
    </template>
  </list-page>
</template>

<script>
  import ListPage from "~/components/partials/ListPage";
  import util from '~/mixin/util'
import EditButtonIcon from "../../components/partials/EditButtonIcon.vue";
import DeleteButtonIcon from "../../components/partials/DeleteButtonIcon.vue";
  import {mapActions, mapGetters} from "vuex";
  import {ValidationObserver, ValidationProvider} from "vee-validate";

  export default {
    name: "vendor-users",
    middleware: ['common-middleware', 'auth'],
    data() {
      return {
        orderOptions: {
          name: { title: this.$t('user.name') },
          email: { title: this.$t('fSale.email') },
          username: { title: this.$t('user.uName') },
          created_at: { title: this.$t('category.date') },
        },
        vendor_id: {
          vendor_id: 1
        },
        deleteModal:false,
        userInfo: {
          email:'',
          roles: '',
          isVerified:'',
          vendor_id: '',
          type:'admin',
        },
        errors:[],
        loading:false
      }
    },
    components: {
    ListPage,
    EditButtonIcon,
    DeleteButtonIcon,
      ValidationObserver,
      ValidationProvider
   },
    mixins: [util],
    computed: {
      ...mapGetters('admin', ['profile']),
    },
    watch:{
      profile(){
        this.userInfo.vendor_id = this.profile?.vendor_id
      }
    },
    methods: {
      ...mapActions('vendor', ['sentInvitation']),
      ...mapActions('ui', ['setToastMessage', 'setToastError']),
      async formSubmit(){
        this.loading  = true
        const data = await this.sentInvitation({
          params:{
            ...this.userInfo
          },
          api:"sentInvitation"
        })
        this.loading = false
        if(data.status === 200){
          this.deleteModal = false
          this.errors = []
          this.setToastMessage(data.message)
        }else{
          this.errors = data.data.form
          this.setToastError("Solve The Error")
        }
      },

      openModal(){
        this.deleteModal = true
      },

      closeModal(){
          this.userInfo.email = ''
          this.userInfo.roles = ''
          this.userInfo.isVerified = ''
          this.userInfo.vendor_id = ''
         this.errors = []
        this.deleteModal = false
      }

    },
    mounted() {
      this.userInfo.vendor_id = this.profile?.vendor_id
    }
  }
</script>

<style scoped>

</style>
