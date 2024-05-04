<script>
import {mapActions} from "vuex";

export default {
  name: 'Keywords',
  props: {
  },
  data() {
    return {
      keywordsData:{
        keyword: '',
        allKeywords: [],
        keywords: []
      }
    }
  },

  methods: {
    async findKeyword() {
      let res = await this.getById({ id: 1, params: { keyword: this.keywordsData.keyword }, api: 'findRfqKeyword' });
      this.keywordsData.allKeywords = res; // Replace with actual fetched data
    },
    selectKeyword(selectedKeyword) {
      this.keywordsData.keywords = this.keywordsData.keywords || [];
      this.keywordsData.keywords.push(selectedKeyword);
      this.keywordsData.keyword = '';
      this.keywordsData.allKeywords = [];

      this.$emit('keywords', this.keywordsData);
    },
    addKeyword() {
      // Add your logic for adding keyword here
      this.$emit('keywordsData', this.keywordsData);
    },
    removeKeyword(index) {
      this.keywordsData.keywords.splice(index, 1);
    },


    ...mapActions('common', ['getCategoriesTree', 'getById', 'setById']),
  }

}
</script>

<template>
<div>
  <div class="row py-4 relative">
    <div v-if="keywordsData.allKeywords.length!==0" class="row absolute top-[-94px] z-50 bg-white border border-smooth w-1/2 rounded-md shadow-md gap-4 mb-2 overflow-y-scroll h-[200px]">
      <ul>
        <li v-for="(value, index) in keywordsData.allKeywords" :key="index"
            @click="selectKeyword(value)"
            class="cursor-pointer transition-colors duration-300 hover:bg-gray-100 px-4 py-2 flex items-center justify-between">
          <span>{{ value }}</span>
          <svg class="w-4 h-4 text-gray-500" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </li>
      </ul>
    </div>

<!--    <label class="w-full" for="childCategory">{{ $t('prod.Keywords') }} <span class="text-xs">(up to 15 keywords)</span></label>-->
<!--    <div class="flex flex-wrap py-4 gap-4">-->
<!--      <button-->
<!--        v-for="(keyword, index) in keywords"-->
<!--        :key="index"-->
<!--        class="hover:bg-smooth text-disabled  py-1 pl-2 pr-0 rounded inline-flex items-center"-->
<!--      >-->
<!--        {{ keyword }} <i class="icon close-icon ml-4" @click="removeKeyword(index)"></i>-->
<!--      </button>-->
<!--    </div>-->
    <div class="flex append-input pt-1">
      <input type="text" class="form-control" v-model="keywordsData.keyword" @keyup="findKeyword" :placeholder="$t('prod.Keywords')"
      >
      <button type="button" class="btn ml-2 mr-2  btn-primary" @click.prevent="addKeyword(keywordsData.keyword)">
        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
             viewBox="0 0 18 18">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 1v16M1 9h16"/>
        </svg>
      </button>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>
