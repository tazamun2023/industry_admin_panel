<template>
  <div>
    <!-- ---------------- -->
    <div class="row  mb-2">
      <div class="card p-20 col-md-12">
        <div class="card-body">
          <div class="row mt-2">
            <div class="col-md-12">
              <h4 class="bold black">{{ $t('rfq.RFQ Notifications') }}</h4>
              <p class="font-14">{{ $t('rfq.RFQ Notifications Desc') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ----------email notification----------- -->
    <div class="row mb-2">
      <div class="card p-20 col-md-12">
        <h4>{{ $t('rfq.How do you want to receive the RFQ list') }}?</h4>
        <div class="flex w-full my-2">
          <h4>{{ $t('rfq.Email notification') }}</h4>
          <label for="toggle" class="flex ml-2 mr-2 items-center cursor-pointer">
            <input style="position: absolute !important;" type="checkbox" id="toggle" class="sr-only peer absolute"
                   :checked="is_check" @click="isNotification">
            <div
              class="block relative bg-smooth w-16 h-8 p-1 rounded-full before:absolute before:bg-white before:w-6 before:h-6 before:p-1 before:rounded-full before:transition-all before:duration-500 before:left-1 peer-checked:before:left-8 peer-checked:before:bg-primary"></div>
          </label>

        </div>
        <p class="text-xs">
          {{ $t('rfq.Enable email notification to receive selling opportunities straight to your inbox') }}.</p>
        <p class="my-4">{{ $t('rfq.Send me RFQ notifications') }}</p>
        <div class="max-w-sm flex flex-wrap ">
          <div class="flex items-center mr-4 mb-4">
            <label for="radio1" class="flex items-center cursor-pointer">
              <input type="radio" class="w-4 h-4 inline-block mr-1 rounded-full border border-grey"
                     v-model="fromData.notification_schedule"
                     value="daily"
                     :checked="fromData.notification_schedule==='daily'" name="radio"
                     id="radio1">
              {{ $t('rfq.Daily') }}
            </label>
          </div>

          <div class="flex items-center mr-4 mb-4">
            <label for="radio2" class="flex items-center cursor-pointer">
              <input type="radio" class="w-4 h-4 inline-block mr-1 rounded-full border border-grey" name="radio"
                     v-model="fromData.notification_schedule"
                     value="weekly"
                     :checked="fromData.notification_schedule==='weekly'"
                     id="radio2">
              {{ $t('rfq.Weekly') }}
            </label>
          </div>
        </div>
      </div>
    </div>
    <!-- ------------product categories----------------- -->
    <div class="row mb-2">
      <div class="card p-20 col-md-12">
        <h4>{{ $t('rfq.What type of RFQs would you like to be notified of') }}?</h4>
        <p>{{ $t('rfq.Select product categories and keywords that are relevant to you') }}.</p>
        <p>{{ $t('rfq.Product categories') }} <span class="text-xs">({{ $t('rfq.up to 15 categories') }})</span></p>
        <div class="grid grid-cols-3 gap-4 py-3 w-50">
          <div class="ppppp">
            <div class="flex">
              <label class="w-full" for="mainCategory">Main Category</label>
              <button v-if="fromData.parentCategory" @click="confirmMainCategory" class="confirm-button">Confirm
                Selection
              </button>
            </div>
            <v-select
              :dir="$t('app.dir')"
              v-model="fromData.parentCategory"
              :options="allCategoriesTree"
              label="title"
              :reduce="cat => cat.id"
              :placeholder="$t('rfq.Search by Category')"
              @input="updateLevel2"
              class="custom-select"
            >
            </v-select>
          </div>
          <div v-if="fromData.parentCategory">
            <div class="flex">
              <label class="w-full" for="mainCategory">Sub Category</label>
              <button v-if="fromData.subCategory" @click="confirmParentCategory" class="confirm-button">Confirm
                Selection
              </button>
            </div>
            <v-select
              :dir="$t('app.dir')"
              v-model="fromData.subCategory"
              :options="selectedLevel1?.child"
              label="title"
              :reduce="cat => cat.id"
              class="custom-select"
              :placeholder="$t('rfq.Select Sub Category')"
              @input="updateLevel3"
            ></v-select>
          </div>
          <div v-if="fromData.subCategory">
            <div class="flex">
              <label class="w-full" for="mainCategory">Child Category</label>
              <button v-if="fromData.childCategory" @click="confirmSubCategory" class="confirm-button">Confirm
                Selection
              </button>
            </div>
            <v-select
              :dir="$t('app.dir')"
              v-model="fromData.childCategory"
              :options="selectedLevel2?.child"
              :reduce="cat => cat.id"
              label="title"
              class="custom-select"
              @input="updateLevel4"
              :placeholder="$t('rfq.Select Child Category')"
            ></v-select>
          </div>
        </div>
        <div class="flex gap-4">
          <button
            v-for="(catItem, index) in fromData.category"
            :key="index"
            class="hover:bg-smooth text-disabled  py-1 pl-2 pr-0 rounded inline-flex items-center"
          >
            {{ catItem.title }} <i class="icon close-icon ml-4" @click="removeCategory(index)"></i>
          </button>
        </div>

        <div class="row py-4 relative">
          <label class="w-full" for="childCategory">Keywords <span class="text-xs">(up to 15 keywords)</span></label>
          <div class="flex py-4 gap-4">
            <button
              v-for="(keyword, index) in fromData.keywords"
              :key="index"
              class="hover:bg-smooth text-disabled  py-1 pl-2 pr-0 rounded inline-flex items-center"
            >
              {{ keyword }} <i class="icon close-icon ml-4" @click="removeKeyword(index)"></i>
            </button>
          </div>
          <div class="flex append-input pt-1">
            <input type="text" class="form-control" v-model="keyword" @keyup="findKeyword" placeholder="Keywords"
            >
            <button type="button" class="btn ml-2 mr-2  btn-primary" @click.prevent="addKeyword(keyword)">
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 18 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 1v16M1 9h16"/>
              </svg>
            </button>
          </div>

          <div v-if="allKeywords.length!==0" class="row absolute mt-[-40px] bg-white border border-gray-300 w-1/2 rounded-md shadow-md gap-4 mb-2 overflow-y-scroll h-[200px]">
            <ul>
              <li v-for="(value, index) in allKeywords" :key="index"
                  @click="selectKeyword(value.basic_keyword_en)"
                  class="cursor-pointer transition-colors duration-300 hover:bg-gray-100 px-4 py-2 flex items-center justify-between">
                <span>{{ value.basic_keyword_en }}</span>
                <svg class="w-4 h-4 text-gray-500" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </li>
            </ul>
          </div>

        </div>
        <div>
          <button class="bg-primary  text-white px-16 hover:text-primary  font-semiboldv border rounded shadow" @click="submitApply">
            {{ $t('rfq.Apply') }}
          </button>
        </div>
      </div>
    </div>
    <!-- --------end-------- -->
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'RfqNotification',
  data() {
    return {
      is_check: true,
      allKeywords: [],
      selectedMainCategory: false,
      selectedSubCategory: false,
      selectedLevel1: null,
      selectedLevel2: null,
      selectedLevel3: null,
      categoryItems: [],
      keyword: '',
      category_item: {
        id: '',
        title: ''
      },
      fromData: {
        vendor_id: '',
        delivery_channel: 'email',
        notification_schedule: 'daily',
        parentCategory: '',
        subCategory: '',
        childCategory: '',
        category: [],

        keywords: []
      },
      buttons: [
        {deleted: false},
        {deleted: false},
      ],
    }
  },
  computed: {
    ...mapGetters('admin', ['profile']),
    ...mapGetters('language', ['langCode']),
    ...mapGetters('rfqnotification', ['notificationList']),
    ...mapGetters('common', ['allCategoriesTree'])

  },
  watch: {
    // notificationList() {
    //   this.fromData.vendor_id = this.notificationList?.data.vendor_id
    //   this.fromData.delivery_channel = this.notificationList?.data.delivery_channel
    //   this.fromData.category = this.notificationList?.data.categories
    //   this.fromData.keywords = this.notificationList?.data.keywords
    // }
  },
  async mounted() {
    if (this.allCategoriesTree.length === 0) {
      try {
        await this.getCategoriesTree()
      } catch (e) {
        return this.$nuxt.error(e)
      }
    }

    try {
      // await this.fetchingData(this.$store.getters["admin/profile"].vendor_id)
      await this.fetchingData(this.$store.getters["admin/profile"].vendor_id??1)
      // await this.getRfqNotificationData({id: 1, params: '', api: 'RfqNotificationData'})
    } catch (e) {
      return this.$nuxt.error(e)
    }

  },
  methods: {
    async submitApply(){
      try {
        const data = await this.setById({id: this.$store.getters["admin/profile"].vendor_id??1, params: {result: this.fromData}, api: 'RfqNotificationData'})
        // this.$router.push({path: `/${this.routeName}${this.redirect ? '' : '/rfq/notification'}`})
        if (data) {
          this.fromData = Object.assign({}, data)
          this.fromData.category = data.categories
          this.$router.push({path: `/rfq/notification`})
        }
      }catch (e) {
        return this.$nuxt.error(e)
      }
    },
    async fetchingData(id) {
      try {
        this.loading = true
        let res = Object.assign({}, await this.getById({id: this.profile.vendor_id, params: {}, api: 'RfqNotificationDataGet'}))
        this.fromData ={
          vendor_id: res.vendor_id,
          delivery_channel: res.delivery_channel,
          notification_schedule: res.notification_schedule,
          category: res.categories,
          keywords: res.keywords,
        }
      }catch (e) {
        return this.$nuxt.error(e)
      }
    },
    selectKeyword(selectedKeyword) {
      this.fromData.keywords = this.fromData.keywords || [];
      // Add the selected keyword to the list of keywords
      this.fromData.keywords.push(selectedKeyword);
      // Clear the input field
      this.keyword = '';
      // Clear the list of allKeywords
      this.allKeywords = [];
    },
    async findKeyword(){
      let res = Object.assign({}, await this.getById({id: 1, params: {keyword: this.keyword}, api: 'findRfqKeyword'}))


      this.allKeywords = res; // Replace with actual fetched data
    },
    addKeyword(keyword) {
      console.log(keyword)
      // this.fromData.keywords = this.fromData.keywords || [];
      // this.fromData.keywords.push(keyword)
      // this.keyword = ''
    },
    removeKeyword(index) {
      this.fromData.keywords.splice(index, 1);
    },
    removeCategory(index) {
      this.fromData.category.splice(index, 1);
    },
    categoryItemPush(category, id) {
      // Ensure that this.fromData.category is initialized as an array
      this.fromData.category = this.fromData.category || [];
      // Check if there is no item in this.fromData.category with the same id
      const isDuplicateId = this.fromData.category.some(item => item.id === id);

      // If it's not a duplicate, push the new item
      if (!isDuplicateId) {
        // this.$store.commit('addItemToCategory', { title: category, id: id });
        this.fromData.category.push({ title: category, id: id });
        // this.$store.state.rfqnotification.notificationList.data.categories.push({ title: category, id: id });
      }

    },
    confirmMainCategory() {
      this.categoryItemPush(this.selectedLevel1.title, this.fromData.parentCategory)
    },
    confirmParentCategory() {
      this.categoryItemPush(this.selectedLevel2.title, this.fromData.subCategory)
    },
    confirmSubCategory() {
      this.categoryItemPush(this.selectedLevel3.title, this.fromData.childCategory)
    },
    updateLevel2() {
      this.fromData.subCategory = "";  // Reset Level 2 selection
      this.fromData.category_id = "";  // Reset Level 2 selection
      this.selectedLevel1 = this.allCategoriesTree.find(c => c.id === (this.fromData.parentCategory));
      this.selectedLevel2 = null;  // Reset Level 2 selection
    },
    updateLevel3() {
      this.fromData.category_id = "";
      this.selectedLevel2 = this.selectedLevel1.child.find(c => c.id === parseInt(this.fromData.subCategory));
    },
    updateLevel4() {
      this.fromData.category_id = "";
      this.selectedLevel3 = this.selectedLevel2.child.find(c => c.id === parseInt(this.fromData.childCategory));
    },
    isNotification() {
      this.is_check = !this.is_check
    },
    onMainCategoryChange() {
      // alert(77);
      this.selectedMainCategory = true; // Reset subcategory when main category changes
    },
    onSubCategoryChange() {
      this.selectedSubCategory = true;
    },
    deleteButton(index) {
      this.$set(this.buttons, index, {deleted: true});
    },


    ...mapActions('rfqnotification', ['submitData', 'getRfqNotificationData']),
    ...mapActions('common', ['getCategoriesTree', 'getById', 'setById']),
  },
}
</script>

<style scoped>
.custom-select svg{
  height: 34px !important;
}
</style>
