<template>
  <check-validity :gate="'manage_users'">
    <div class="card p-4">
      <div class="p-2">
        <h4>{{ $t('customer.All Customer Information') }}</h4>
      </div>
      <div class="w-full">
        <div class="w-50 mb-4">
          <ul class="lg:flex mb-0 list-none rounded shadow flex-wrap mb-4 flex-row">
            <li class="-mb-px mr-2 last:mr-0   flex-auto text-center">
              <a class="font-bold uppercase px-2 py-1   block cursor-pointer leading-normal" @click="toggleTabs('all')"
                 v-bind:class="{'text-pink-600 bg-white border-white border-b-2': openTab !== 'all', 'border-b-2 border-primary': openTab === 'all'}">
                {{ $t('customer.All') }}
              </a>
            </li>
            <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a class="font-bold uppercase px-2 py-1   block cursor-pointer leading-normal"
                 @click="toggleTabs('verified')"
                 v-bind:class="{'text-pink-600 bg-white border-white border-b-2': openTab !== 'verified', 'border-b-2 border-primary': openTab === 'verified'}">
                {{ $t('customer.Verified') }}
              </a>
            </li>
            <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a class="font-bold uppercase px-2 py-1   block cursor-pointer leading-normal"
                 @click="toggleTabs('not_verified')"
                 v-bind:class="{'text-pink-600 bg-white border-white border-b-2': openTab !== 'not_verified', 'border-b-2 border-primary': openTab === 'not_verified'}">
                {{ $t('customer.Not Verified') }}
              </a>
            </li>

          </ul>
        </div>
      </div>
      <div :class="{'hidden': openTab !== 'all', 'block': openTab === 'all'}">
          <all-customer></all-customer>
      </div>
      <div :class="{'hidden': openTab !== 'verified', 'block': openTab === 'verified'}">
          <verified-customer></verified-customer>
      </div>
      <div :class="{'hidden': openTab !== 'not_verified', 'block': openTab === 'not_verified'}">
          <not-verified-customer></not-verified-customer>
      </div>
    </div>
  </check-validity>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import AllCustomer from "@/components/customer/AllCustomer.vue";
import VerifiedCustomer from "@/components/customer/VerifiedCustomer.vue";
import NotVerifiedCustomer from "@/components/customer/NotVerifiedCustomer.vue";

export default {
  components: {NotVerifiedCustomer, VerifiedCustomer, AllCustomer},
  data() {
    return {
      openTab: 'all',
    }
  },
  computed: {
    ...mapGetters('customer', ['customerList'])
  },
  methods: {
    toggleTabs: function (tab) {
      this.openTab = tab
      this.$router.push({
        query: {
          ...this.$route.query,
          tap:this.openTab
          // filter: this.checkedFilter.join(','),
        }
      })
    },


    ...mapActions('customer', ['getAllCustomer']),
  },
  mounted() {
    this.openTab = this.$route.query.tap??'all'
  }
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
