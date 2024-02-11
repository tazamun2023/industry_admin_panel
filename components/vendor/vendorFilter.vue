<template>

  <form @submit.prevent="filterData">
    <div class="flex gap-4">
      <input type="text" class="w-1/4" placeholder="Search..." v-model="result.search">
      <select class="border border-smooth p-2 rounded-lg" v-model="result.city_id">
        <option value="">Search by City</option>
        <option :value="cities.id" v-for="cities in allCitiesById">{{ cities.name }}</option>
      </select>
      <select class="border border-smooth p-2 rounded-lg" v-model="result.is_approve">
        <option value="">Search by Approval</option>
        <option value="1">Approved</option>
        <option value="2">Not Approved</option>
      </select>

      <select class="border border-smooth p-2 rounded-lg" v-model="result.status">
        <option value="">Search by Status</option>
        <option value="1">Enable</option>
        <option value="2">Disable</option>
      </select>
<!--      <input class="w-50"  type="date" placeholder="00-00-00">-->
      <button class="bg-primary text-white hover:text-primary">Filter</button>
      <button>Clear</button>
    </div>
  </form>
</template>
<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "vendor-filter",
  middleware: ['common-middleware', 'auth'],
  data(){
    return {
      result: {
        city_id: "",
        is_approve:'',
        search: '',
        status: '',
      },

    }
  },
  computed:{
    ...mapGetters('common', ['allCitiesById']),
  },
  methods:{
    ...mapActions('common', ['getCitiesById']),
    async countrySelected() {
        try {
          await  this.getCitiesById({id: 194,api: 'getAllCityById', mutation: 'SET_ALL_Cities' })
        } catch (e) {
          return this.$nuxt.error(e)
        }
    },

    filterData() {
      /*if (this.result.search !== '' || this.result.status !== '' || this.result.parentCategory !== '' || this.result.subCategory !== '' || this.result.category_id !== '' || this.result.sort_by !== '') {
        this.$emit('filter', this.result);
      }*/
      this.$emit('filter', this.result);
    },

  },
 async mounted() {
     await this.countrySelected()
  }
}
</script>
