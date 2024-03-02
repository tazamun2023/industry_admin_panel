<template>
  <div class="mx-w-600x mlr-auto">

    <div class="grid grid-cols-3 gap-4">
      <!-- Main Category Dropdown -->
      <ValidationProvider name="email" rules="required" v-slot="{ errors }" :custom-messages="{required: $t('global.req', { type: $t('prod.required_main_category')}) }">
        <div class="form-group input-wrapper for-lang ar-lang">
          <label class="w-full" for="mainCategory">{{ $t("rfq.Search by Category") }}</label>
          <!--              :class="{invalid: !is_draft && !result.selectedMainCategory && hasError}"-->
          <v-select
            :dir="$t('app.dir')"
            v-model="result.parentCategory"
            :options="allCategoriesTree"
            label="title"
            :reduce="cat => cat.id"
            :placeholder="$t('rfq.Search by Category')"
            @input="updateLevel2"
            class="custom-select"
          ></v-select>
          <span class="error">{{ errors[0] }}</span>
        </div>
      </ValidationProvider>

      <!-- Sub Category Dropdown -->
      <ValidationProvider name="email" rules="required" v-slot="{ errors }" :custom-messages="{required: $t('global.req', { type: $t('prod.required_sub_category')}) }">
        <div class="form-group input-wrapper for-lang ar-lang">
          <label class="w-full" for="subCategory">{{ $t("rfq.Select Sub Category") }}</label>
          <v-select
            :dir="$t('app.dir')"
            v-model="result.subCategory"
            :options="selectedLevel1?.child"
            label="title"
            :reduce="cat => cat.id"
            class="custom-select"
            :placeholder="$t('rfq.Select Sub Category')"
            @input="updateLevel3"
          ></v-select>
          <span class="error">{{ errors[0] }}</span>
        </div>
      </ValidationProvider>

      <!-- Child Category Dropdown -->
      <ValidationProvider name="email" rules="required" v-slot="{ errors }" :custom-messages="{required: $t('global.req', { type: $t('prod.required_child_category')}) }">
        <div class="form-group input-wrapper for-lang ar-lang">
          <label class="w-full" for="childCategory">{{ $t("rfq.Select Child Category") }}</label>
          <v-select
            :dir="$t('app.dir')"
            v-model="result.childCategory"
            :options="selectedLevel2?.child"
            :reduce="cat => cat.id"
            @input="updateLevel4"
            label="title"
            class="custom-select"
            :placeholder="$t('rfq.Select Child Category')"
          ></v-select>

          <button v-if="result.childCategory" @click="confirmCategory" class="confirm-button rounded font-12px my-2 text-primary  h-auto w-2/4">Confirm
            Selection
          </button>
          <span class="error">{{ errors[0] }}</span>
        </div>
      </ValidationProvider>
    </div>


    <div class="flex flex-wrap gap-4">
      <button
        v-for="(catItem, index) in result.category_names"
        :key="index"
        class="hover:bg-smooth text-disabled  py-1 pl-2 pr-0 rounded flex gap-2 justify-between"
      >
        <span class="leading-7">{{ catItem }}</span> <i class="icon close-icon  ltr:ml-4 rtl:mr-4 mt-1" @click="removeCategory(index)"></i>
      </button>
    </div>

    <div class="mb-20 card p-20">
      <h4>{{ $t('title.epd') }}</h4>
      <p class="info-msg mtb-15">{{ $t('title.csvDn') }}</p>
      <ajax-button
        :disabled="result.category.length===0"
        class="primary-btn"
        type="button"
        :text="$t('title.ex')"
        loading-text=""
        :fetching-data="exporting"
        @clicked="exportData"
      />
    </div>


    <error-formatter/>

    <div class="mb-20 card p-20 file-wrap"
         :class="{'has-error': uploadMessage}"
    >
      <h4>{{ $t('title.fti') }}</h4>
      <p class="info-msg mtb-15">{{ $t('title.csvUp') }}</p>
      <p class="info-msg mb-15">{{ $t('title.upHelp') }} {{ $t('title.lngHelp') }}</p>

      <input
        class="mb-15 file-input"
        type="file"
        accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ref="fileInput"
        @change="fileChanged"
      >

      <span
        v-if="uploadMessage"
        class="error mb-15"
      >
        {{ uploadMessage }}
      </span>

      <ajax-button
        class="primary-btn"
        type="button"
        :text="$t('title.im')"
        loading-text=""
        :fetching-data="importing"
        @clicked="importData"
      />
    </div>


    <div class="mb-20 card p-20">
      <div class="dply-felx gap-15 sided">

        <h4>{{ $t('title.bulkImg') }}</h4>

        <nuxt-link to="/images" target="_blank" class="link">{{ $t('title.vi') }}</nuxt-link>
      </div>
      <p class="info-msg mtb-15">{{ $t('title.imgMsg') }}</p>

      <error-formatter
        type="multiple_image"
      />

      <input
        class="mb-15 file-input"
        type="file"
        accept="image/*"
        ref="fileInput"
        multiple
        @change="imageChanged"
      >
      <ajax-button
        class="primary-btn"
        type="button"
        :text="$t('title.bulkImgBtn')"
        loading-text=""
        :fetching-data="uploading"
        @clicked="bulkImage"
      />
    </div>

  </div>
</template>

<script>


  import AjaxButton from "~/components/AjaxButton";
  import FileUpload from "~/components/FileUpload";
  import {mapActions, mapGetters} from 'vuex'
  import validation from "~/mixin/validation"
  import ErrorFormatter from "~/components/ErrorFormatter";
  import {ValidationObserver, ValidationProvider} from 'vee-validate';

  export default {
    name: "bulk-upload",
    middleware: ['common-middleware', 'auth'],
    data() {
      return {
        hasError: null,
        params: null,
        uploadMessage: null,
        file: null,
        uploading: false,
        importing: false,
        exporting: false,

        selectedLevel1: null,
        selectedLevel2: null,
        selectedLevel3: null,

        result:{
          parentCategory: '',
          subCategory: '',
          childCategory: '',
          category: [],
          category_names: [],
        }
      }
    },
    components: {
      ErrorFormatter,
      FileUpload,
      ValidationProvider,
      ValidationObserver,
      AjaxButton
    },
    mixins: [validation],
    computed: {
      ...mapGetters('common', ['allCategories', 'allCategoriesTree'])
    },
    methods: {
      updateLevel2() {
        this.result.subCategory = "";  // Reset Level 2 selection
        // this.result.category_id = "";  // Reset Level 2 selection
        this.selectedLevel1 = this.allCategoriesTree.find(c => c.id == (this.result.parentCategory));
        this.selectedLevel2 = null;  // Reset Level 2 selection
        this.result.mainCategorySlug = this.selectedLevel1.slug
      },
      updateLevel3() {
        this.result.category_id = "";
        this.selectedLevel2 = this.selectedLevel1.child.find(c => c.id === parseInt(this.result.subCategory));
        this.result.subCategorySlug = this.selectedLevel2.slug
      },
      categoryItemPush(category, id) {
        // Ensure that this.fromData.category is initialized as an array
        this.result.category = this.result.category || [];
        // Check if there is no item in this.fromData.category with the same id
        const isDuplicateId = this.result.category.some(item => item.id === id);

        // If it's not a duplicate, push the new item
        if (!isDuplicateId) {
          // this.$store.commit('addItemToCategory', { title: category, id: id });
          this.result.category_names.push( category );
          this.result.category.push( id );
          // this.$store.state.rfqnotification.notificationList.data.categories.push({ title: category, id: id });
        }

      },
      updateLevel4() {
        // this.result.category_id = "";
        this.selectedLevel3 = this.selectedLevel2.child.find(c => c.id === parseInt(this.result.childCategory));
      },


      confirmCategory(){
        this.categoryItemPush(this.selectedLevel3.title, this.result.childCategory)
      },
      removeCategory(index) {
        this.result.category_names.splice(index, 1);
        this.result.category.splice(index, 1);
      },
      async exportData() {
        this.exporting = true
        try {
          // await this.downloadRequest({params: {}, api: 'bulkExport'})
          await this.downloadRequest({params: {categoreis: this.result.category}, api: 'exportTemplate'})
        } catch (e) {
          return this.$nuxt.error(e)
        }
        this.exporting = false
      },
      async imageChanged(event) {
        this.setErrors()
        const files = event.target.files
        let errors = [];
        const fd = new FormData()
        Object.values(files).forEach((item) => {

          const error = this.isValidImage(item)
          if(error){
            errors.push(error)
            return false
          } else{
            fd.append('images[]', item)
          }

        })



        if(!errors.length){
          this.params = fd
        } else {

          this.setErrors({multiple_image: errors})
        }




      },
      fileChanged(event) {

        const file = event.target.files[0]
        if (file) {
          this.uploadMessage = this.isValidExcel(file)
          if (!this.uploadMessage) {
            this.file = file
          }
        }
      },
      async bulkImage() {
        if (this.params) {
          this.setErrors()

          try {
            this.uploading = true

            await this.setRequest({
              params: this.params,
              api: 'imgUpload'
            })

            this.params = null

            this.uploading = false
          } catch (e) {
            return this.$nuxt.error(e)
          }
        }

      },
      async importData() {


        if (this.file) {
          this.setErrors()

          const fd = new FormData()
          fd.append('file', this.file)
          this.importing = true
          try {
            const data = await this.setRequest({params: fd, api: 'bulkImport'})

            this.file = null

          } catch (e) {
            return this.$nuxt.error(e)
          }
          this.importing = false
        }
      },
      ...mapActions('common', ['downloadRequest', 'setRequest', 'getCategoriesTree']),
      ...mapActions('ui', ['setErrors'])
    },
    async mounted() {
      if (this.allCategoriesTree.length == 0) {
        try {
          await this.getCategoriesTree()
        } catch (e) {
          return this.$nuxt.error(e)
        }
      }
    }
  }
</script>

<style scoped>

</style>
