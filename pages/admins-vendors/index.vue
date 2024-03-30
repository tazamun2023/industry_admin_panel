<template>
  <div>
  <list-page

    ref="listPage"
    :addButton="false"
    :modalButton="true"
    list-api="getAdmins"
    delete-api="deleteAdmin"
    route-name="admins-vendors"
    :name="$t('user.admVendUp')"
    :order-options="orderOptions"
    gate="admin"
    @open-modal="openModalItem"
  >
    <template v-slot:table="{list}">
      <tr class="lite-bold">
        <th>{{ $t('user.name') }}</th>
        <th>{{ $t('fSale.email') }}</th>
        <th>{{ $t('user.role') }}</th>
        <th>{{ $t('user.verified') }}</th>
        <th>{{ $t('title.ac') }}</th>
        <th>{{ $t('category.created') }}</th>
        <th>&nbsp;</th>
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
          <span
            v-for="(i, n) in value.roles"
            :key="n"
          >
            {{ i.name }}
          </span>
        </td>

        <td> <span>{{ getVerificationStatus(value.verified) }}</span></td>

        <td>{{ getBoolean(value.active) }}</td>
        <td>{{ value.created }}</td>
        <td>
          <button
            v-if="$can('admin', 'delete')"
            @click.prevent="$refs.listPage.deleteItem(value.id)"
            class="border-0"
          >
            <DeleteButtonIcon/>
          </button>
          <button
            v-if="$can('admin', 'edit')"
            @click.prevent="$refs.listPage.editItem(value.id)"
            class="border-0"
          >
            <EditButtonIcon/>
          </button>

        </td>
      </tr>
    </template>
  </list-page>
   <template v-if="openModal">
     <Modal :showModal="openModal"  @closeModal="closeModal">
      <div>
        <ValidationObserver v-slot="{ invalid }">
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
              <ValidationProvider name="email" rules="required|email" v-slot="{ errors }" :custom-messages="{required: $t('category.req', {type: $t('fSale.email')})}">
                <label for="">{{ $t('fSale.email') }}</label>
                <input type="email" :placeholder="$t('fSale.email')" v-model="userInfo.email">
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="input-wrapper">
              <ValidationProvider name="roles" rules="required" v-slot="{ errors }" :custom-messages="{required: $t('category.req', {type: $t('user.role')})}">
                <label class="w-full" for="">{{ $t('user.role') }}</label>
                <select class="w-50 p-2 border border-smooth rounded" v-model="userInfo.roles">
                  <option value="">Select role</option>
                  <option value="superadmin">Admin</option>
                </select>
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="input-wrapper mb-0 text-end">
              <button @click="closeModal" class="bg-primary leading-3 w-[100px] p-2 rounded text-white">Close</button>
              <button class="bg-primary leading-3 w-[100px] p-2 rounded text-white" :disabled="invalid">Submit</button>
            </div>
          </form>
        </ValidationObserver>
      </div>

     </Modal>

   </template>
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
    name: "roles-permissions",
    middleware: ['common-middleware', 'auth'],
    data() {
      return {
        orderOptions: {
          name: { title: this.$t('user.name') },
          email: { title: this.$t('fSale.email') },
          username: { title: this.$t('user.uName') },
          created_at: { title: this.$t('category.date') },
        },
        userInfo: {
          email:'',
          roles: '',
          vendor_id: '',
          type:'admin',
        },
        errors:[],
        loading:false,
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
    },
    watch:{
      profile(){
        this.userInfo.vendor_id = this.profile?.vendor_id
      }
    },
    methods: {
      openModalItem(){
        this.openModal = true
      },
      closeModal(){
        this.openModal = false
      },
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
          this.errors = []
          this.setToastMessage(data.message)
        }else{
          this.errors = data.data.form
          this.setToastError("", 'Solve the Error')
        }
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
<script setup>
</script>
