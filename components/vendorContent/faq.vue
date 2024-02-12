<template>
  <div>
    <list-page
      :filter="false"
      ref="listPage"
      list-api="getVendorFaqs"
      delete-api="DeleteVendorFaqs"
      :param="param"
      route-name="vendors"
      empty-store-variable="allProducts"
      :name="$t('title.prod')"
      @list="itemList = $event"
    >
      <template v-slot:table="{list}">
    <table>
      <thead>
      <tr>
        <th>Question</th>
        <th>Answer</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(value, index) in list" :key="index">
        <td>{{ value.local_questions }}</td>
        <td>{{ value.local_answers }}</td>
        <td><div class="flex gap-4">
          <svg class="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
            <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
          </svg>
          <a href=""><svg class="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
            <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
              <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"/>
            </g>
          </svg></a>
          <button @click="$refs.listPage.deleteItem(value.id)">
          <svg class="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
          </svg>
          </button>
        </div></td>
      </tr>
      </tbody>
    </table>
      </template>
    </list-page>
  </div>
</template>
<script >
import ListPage from "@/components/partials/ListPage.vue";
import {mapGetters} from "vuex";

export default {
  components: {ListPage},
  props:{
    vendorId:{
      type:String,
      defaults:''
    }
  },
  computed:{
        ...mapGetters('language', ['langCode'])
  },
  data(){
    return {
      param:{
        "vendor_id" : this.vendorId
      }
    }
  }
}

</script>
