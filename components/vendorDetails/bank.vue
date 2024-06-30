<template>
  <div>
    <list-page
      :filter="false"
      ref="listPage"
      list-api="getVendorBank"
      delete-api="DeleteVendorBank"
      :param="param"
      route-name="vendors"
      empty-store-variable="allProducts"
      :name="$t('title.prod')"
      @list="itemList = $event"
    >
      <template v-slot:table="{list}">
    <table>
      <thead>
      <tr class="lite-bold">
        <th class="bg-lightdeep">
          <div class="flex gap-4 items-center">
            <!-- <input type="checkbox"> -->
            {{ $t('global.name') }}
          </div>
        </th>
        <th class="bg-lightdeep">
          {{ $t('bank.iban') }}
        </th>
        <th class="bg-lightdeep">{{ $t('bank.swift_code') }}</th>
        <th class="bg-lightdeep">{{ $t('bank.holder_name') }}</th>
        <th class="bg-lightdeep">{{ $t('bank.bank_name') }}</th>
        <th class="bg-lightdeep text-center">
          <div class="flex gap-2 justify-center items-center">
            <!-- <input type="checkbox"> -->
            {{ $t('bank.set_default') }}
          </div>
        </th>
        <th class="bg-lightdeep"></th>
      </tr>

      </thead>
      <tbody>
      <tr class="border-t border-pb" v-for="(value, index) in list" :key="index">
        <td>
          <div class="flex font-bold capitalize gap-4 items-center">
            <!-- <input type="checkbox"> -->
            {{ value.name }}
          </div>
        </td>
        <td class="text-primary">
          {{ value.iban_number }}
        </td>
        <td class="text-primary">
          {{ value.swift_code }}
        </td>
        <td class="font-bold capitalize">{{ value.holder_name }}</td>
        <td>{{ value.bank_name }}</td>
        <td class="text-center">
          <input :disabled="true"
                 :checked="value.is_default"
                 :value="value.is_default"
                 type="checkbox">
        </td>

      </tr>

      </tbody>
    </table>
      </template>
    </list-page>
  </div>
</template>
<script >
import ListPage from "@/components/partials/ListPage.vue";
import DeleteButtonIcon from "../partials/DeleteButtonIcon.vue";

export default {
  name:"bank",
  components: {DeleteButtonIcon, ListPage},
  props:{
    vendorId:{
      type:String,
      defaults:''
    }
  },
  data(){
    return {
        param:{
             "vendor_id" : this.vendorId
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
