<template>

      <div class="container">
        <template>
          <div class="relative text-center mt-[100px]" v-if="rolesAndPermissions.length==0">
            <div
              class="spinner-wrapper mx-auto"
            >
              <spinner
                :radius="60"
                color="primary"
              />
            </div>
          </div>
          <div v-else>
            <div class="card my-4 p-4">
              <h3 class="semi-bold">{{ $t('roles.roles_and_permissions') }}
              </h3>
              <p>{{$t('roles.message')}} </p>
            </div>

            <div class="card my-4 p-4">
              <!-- component -->

              <div class=" my-2 overflow-x-auto" v-for="group in rolesAndPermissions">
                <h4 class="font-bold my-2">{{$t('roles.'+ group.group) }}</h4>

                <table class="min-w-full bg-white shadow-md rounded-xl">
                  <thead class="bg-smooth">
                  <tr class="">

                    <td class="py-3 px-4 w-5/12">{{ $t('roles.Permissions') }}</td>
                    <td class="py-3 px-4">{{ $t('roles.Admin') }}</td>
                    <td class="py-3 px-4">{{ $t('roles.Supervisor') }}</td>
                    <td class="py-3 px-4">{{ $t('roles.User') }}</td>


                  </tr>
                  </thead>
                  <tbody class="text-blue-gray-900">
                  <tr class="border-b border-smooth" v-for="permission in group.permissions">

                    <td class="py-3 sm-px-2 px-4">{{ permission?.name }}</td>

                    <td class="py-3 px-4 text-center  text-primary">
                      <check-icon :type="permission.admin"/>
                    </td>
                    <td class="py-3 px-4  text-center  text-primary">
                      <check-icon :type="permission.supervisor"/>
                    </td>
                    <td class="py-3 px-4 text-center text-primary ">
                      <check-icon :type="permission.user"/>
                    </td>
                  </tr>


                  </tbody>
                </table>
              </div>


            </div>
          </div>
        </template>

      </div>


</template>

<style>

</style>

<script>
import {mapActions, mapGetters} from "vuex";

import Spinner from "@/components/Spinner.vue";
import CheckIcon from "../../../components/roles/check-icon.vue";

export default {
  components: {CheckIcon, Spinner},
  middleware: ['common-middleware', 'auth'],
  data() {
    return {}
  },

  computed: {
    ...mapGetters('vendor', ['rolesAndPermissions',]),

  },
  methods: {
    ...mapActions('vendor', ['getRolesAndPermissions',]),
  },

  mounted() {
    if (this.rolesAndPermissions.length == 0)
      this.getRolesAndPermissions({})

  }
}
</script>
<script setup>
</script>
