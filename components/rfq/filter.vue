<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "rfq-filter"
})
</script>

<template>
  <div class="flex flex-wrap card  relative flex flex-col min-w-0 rounded break-words  bg-white border-1">
    <div class="md:w-full py-3">
      <div class="flex flex-wrap ">
        <div class="md:w-1/5 pr-4 pl-4">
          <div class="mb-4">
            <label for="">{{ $t("rfq.RFQ ID") }}</label>
            <input type="text" class="theme-input-style" :placeholder="$t('rfq.Search by RFQ ID or Product')">
          </div>
        </div>
        <div class="md:w-1/5 pr-4 pl-4">
          <div class="mb-4 for-lang ">
            <label for="">{{ $t("rfq.Search by Category") }}</label>
            <select
              class="bg-gray-50 border border-smooth text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              name="" id="">
              <option value="">Search by Category</option>
              <option value="">category 1</option>
              <option value="">category 1</option>
            </select>
          </div>
        </div>
        <div class="md:w-1/5 pr-4 pl-4">
          <div class="mb-4 for-lang">
            <label for=""> {{ $t("rfq.Select Sub Category") }}</label>
            <select
              class="bg-gray-50 border border-smooth text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              name="" id="">
              <option value="">Select Sub Category</option>
              <option value="">category 1</option>
              <option value="">category 1</option>
            </select>
          </div>
        </div>
        <div class="md:w-1/5 pr-4 pl-4">
          <div class="mb-4 for-lang">
            <label for="">{{ $t("rfq.Select Child Category") }} </label>
            <select
              class="bg-gray-50 border border-smooth text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              name="" id="">
              <option value="">Select Child Category</option>
              <option value="">category 1</option>
              <option value="">category 1</option>
            </select>
          </div>
        </div>
        <div class="md:w-1/5 pr-4 pl-4">
          <div class="mb-4 for-lang">
            <label for=""> {{ $t("rfq.RFQ Type") }} </label>
            <select
              class="bg-gray-50 border border-smooth text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              name="" id="">
              <option value="">Select on Option</option>
              <option value="">Single product</option>
              <option value="">Multi-product</option>
            </select>
          </div>
        </div>
        <div class="md:w-1/5 pr-4 pl-4">
          <div class="mb-4 for-lang">
            <label for=""> {{ $t("rfq.Location") }} </label>
            <select
              class="bg-gray-50 border border-smooth text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              name="" id="">
              <option value="">Select on Option</option>
              <option value="">Bangladesh</option>
              <option value="">Yemeen</option>
            </select>
          </div>
        </div>
        <div class="md:w-1/5 pr-4 pl-4">
          <div class="mb-4">
            <label for=""> {{ $t("app.from") }} </label>
            <input type="date" class="theme-input-style" placeholder="From (creation)">
          </div>
        </div>
        <div class="md:w-1/5 pr-4 pl-4">
          <div class="mb-4">
            <label for=""> {{ $t("app.to") }} </label>
            <input type="date" class="theme-input-style" placeholder="To (creation)">
          </div>
        </div>
        <div class="md:w-1/3 pr-4 pl-4">
          <div class="mb-4">
            <button type="button"
                    class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline long mt-20">
              {{ $t("app.Apply Filters") }}
            </button>
            <a
              class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-red-600 text-white hover:bg-red-700 long mb-auto mt-20 ml-4 mr-4"
              href=""> {{ $t("app.Clear Filter") }} </a>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>
