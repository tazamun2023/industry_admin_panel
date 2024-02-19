<script>
import ProductSearch from "@/components/partials/ProductSearch.vue";
import ProductSearch2 from "@/components/partials/ProductSearch2.vue";

export default {
  name: 'SearchFlashProduct',
  components: {ProductSearch2, ProductSearch},
  props:{
    close: {
      type: Boolean,
    },
  },

  data(){
    return{

    }
  },

  methods:{
    closeModal() {
      this.$emit('close');
    },
  }
}
</script>

<template>
  <div class="fixed bg-modal  inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <div class="z-50 bg-white p-6 relative rounded-md shadow w-full md:w-1/2 lg:w-2/3 xl:w-2/5">
      <svg @click="closeModal"
           class="w-4 h-4 text-gray-800 absolute ltr:right-3  rtl:left-3 cursor-pointer mt-[-10px]"
           aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
      </svg>
      <h4>Select products</h4>
      <!-- Modal Content -->
      <div class="mb-4">
        <p>Search or select the product eligible for the promotion from the list below</p>
        <div>
          <div class="flex gap-1">
            <product-search2
              ref="productSearch"
              @product-clicked="addFlashProduct"
            />
<!--            <input placeholder="Search products" type="text">-->
<!--            <button class="p-2 justify-end leading-3 rounded bg-primary text-white ">Search</button>-->
          </div>
        </div>
<!--        <div class="flex py-2 gap-4">-->
<!--          <select class="p-3 w-full border border-smooth rounded" name="" id="">-->
<!--            <option value="">Cat 1</option>-->
<!--            <option value="">Cat 2</option>-->
<!--          </select>-->
<!--          <select class="p-3 w-full border border-smooth rounded" name="" id="">-->
<!--            <option value="">Sub Cat 1</option>-->
<!--            <option value="">Sub Cat 2</option>-->
<!--          </select>-->
<!--          <select class="p-3 w-full border border-smooth rounded" name="" id="">-->
<!--            <option value="">Sub sub Cat 1</option>-->
<!--            <option value="">Sub sub Cat 2</option>-->
<!--          </select>-->
<!--        </div>-->
<!--        <div class="h-[300px] scrolbar overflow-y-scroll">-->
<!--          <table>-->
<!--            <tr>-->
<!--              <td><input style="width:20px" type="checkbox"></td>-->
<!--              <td>Qty: 1223</td>-->
<!--              <td>lorem ipsum lorem ipsum lorem ipsum</td>-->
<!--              <td>Discount:122</td>-->
<!--            </tr>-->
<!--            <tr>-->
<!--              <td><input style="width:20px" type="checkbox"></td>-->
<!--              <td>Qty: 1223</td>-->
<!--              <td>lorem ipsum lorem ipsum lorem ipsum</td>-->
<!--              <td>Discount:122</td>-->
<!--            </tr>-->
<!--          </table>-->
<!--        </div>-->
      </div>
      <!-- Close Button -->
      <div class="flex gap-4 justify-end">
        <button @click="closeModal" class="p-2 justify-end leading-3 rounded bg-smooth text-primary ">
          Cancel
        </button>
        <button class="p-2 justify-end leading-3 rounded bg-primary text-white ">Submit</button>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>
