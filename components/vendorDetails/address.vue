<template>
  <div>
    <list-page
      :filter="false"
      ref="listPage"
      list-api="getVendorAddress"
      delete-api="adminDeleteAddress"
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
          <th>{{ $t("vendor.name") }}</th>
          <th>{{ $t("vendor.email") }}</th>
          <th>{{ $t("vendor.mobile") }}</th>
          <th>{{ $t("vendor.country") }}</th>
          <th>{{ $t("vendor.city") }}</th>
          <th>{{ $t("vendor.street") }}</th>
          <!--          <th>{{ $t("vendor.action") }}</th>-->
        </tr>
        </thead>
        <tbody>
        <tr v-for="(value, index) in list" :key="index">
          <td>{{ value.address_name }}</td>
          <td>{{ value.email }}</td>
          <td>{{ value.phone }}</td>
          <td>{{ value.country }}</td>
          <td>{{ value.city }}</td>
          <td>{{ value.street }}</td>
          <!--          <td><div class="flex gap-4">-->
<!--            <button @click="deleteModal=true">-->
<!--            <svg class="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">-->
<!--              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>-->
<!--            </svg>-->
<!--            </button>-->
<!--          </div></td>-->
          <DeleteModal v-if="deleteModal" @closeModal="closeModal">
            <template v-slot:title>
              <h4>{{ $t('vendor.deletemessage') }}</h4>
            </template>
            <!-- -----------default slot------- -->
            <!-- -----------default slot------- -->
            <template v-slot:buttons>
              <div class="flex gap-4 justify-end">
                <button @click="deleteModal=false" class="p-2 border border-smooth rounded leading-3 w-[60px]">Quit</button>
                <button @click="$refs.listPage.deleteContentItem(value.id), deleteModal=false" class="p-2 border border-smooth bg-primary text-white  rounded leading-3 w-[60px] hover:text-primary">Agree</button>
              </div>
            </template>
          </DeleteModal>
        </tr>
        </tbody>
      </table>
      </template>
    </list-page>
  </div>
</template>
<script>
import ListPage from "@/components/partials/ListPage.vue";

export default {
  name:"address",
  components: {ListPage},
  props:{
     vendorId:{
       type:String,
       defaults:null
     }
  },
  data(){
    return {
        param:{
          "vendor_id": this.vendorId
        },
      deleteModal:false
    }
  },
  methods:{
    closeModal(){
      this.deleteModal = false
    }
  }
}
</script>
