<template>
    <div>
        <!-- ---------------- -->
    <div class="row  mb-2">
        <div class="card p-20 col-md-12">
                <div class="card-body">
                    <div class="row mt-2">
                        <div class="col-md-12">
                            <h4 class="bold black">RFQ Notifications</h4>
                            <p class="font-14">Set your preferences to receive a customised list of Requests For Quotations (RFQ) periodically. Your specific preferences on categories and keywords will bring you the most recent RFQs on the marketplace.</p>
                        </div>
                    </div>
                </div>
        </div>
    </div>
    <!-- ----------email notification----------- -->
    <div class="row mb-2">
        <div class="card p-20 col-md-12">
            <h4>How do you want to receive the RFQ list?</h4>
            <div class="flex w-full my-2">
            <h4>Email notification</h4>
            <label for="toggle" class="flex ml-2 mr-2 items-center cursor-pointer">
                <input style="position: absolute !important;" type="checkbox" id="toggle" class="sr-only peer absolute">
                <div class="block relative bg-smooth w-16 h-8 p-1 rounded-full before:absolute before:bg-white before:w-6 before:h-6 before:p-1 before:rounded-full before:transition-all before:duration-500 before:left-1 peer-checked:before:left-8 peer-checked:before:bg-primary"></div>
            </label>
           
            </div>
            <p class="text-xs">Enable email notification to receive selling opportunities straight to your inbox.</p>
            <p class="my-4">Send me RFQ notifications</p>
            <div class="max-w-sm flex flex-wrap ">
                <div class="flex items-center mr-4 mb-4">
                <label for="radio1" class="flex items-center cursor-pointer">
                    <input type="radio" class="w-4 h-4 inline-block mr-1 rounded-full border border-grey" checked name="radio" id="radio1">
                    Daily</label>
                </div>

                <div class="flex items-center mr-4 mb-4">
                <label for="radio2" class="flex items-center cursor-pointer">
                <input type="radio" class="w-4 h-4 inline-block mr-1 rounded-full border border-grey" name="radio" id="radio2">
                Weekly</label>
                </div>
            </div>
        </div>
    </div>
    <!-- ------------product categories----------------- -->
    <div class="row mb-2">
        <div class="card p-20 col-md-12">
            <h4>What type of RFQs would you like to be notified of?</h4>
            <p>Select product categories and keywords that are relevant to you.</p>
            <p>Product categories <span class="text-xs">(up to 15 categories)</span></p>
            <div class="grid grid-cols-3 gap-4 py-3 w-50">
                <div>
                <label class="w-full" for="mainCategory">Main Category</label>
                <select @change="onMainCategoryChange" class="p-2 border border-smooth rounded-lg w-full" id="mainCategory">
                    <option value="">Select Category</option>
                    <option value="category1">Category 1</option>
                    <option value="category2">Category 2</option>
                    <option value="category3">Category 3</option>
                </select>
                </div>
                <div v-if="selectedMainCategory">
                <label class="w-full" for="subCategory">Sub Category</label>
                <select  @change="onSubCategoryChange" class="p-2 border border-smooth rounded-lg w-full" id="subCategory">
                    <option value="">Select Category</option>
                    <option value="subCategory1">Sub Category 1</option>
                    <option value="subCategory2">Sub Category 2</option>
                    <option value="subCategory3">Sub Category 3</option>
                </select>
                </div>
                <div v-if="selectedSubCategory">
                <label class="w-full" for="childCategory">Child Category</label>
                <select class="p-2 border border-smooth w-full rounded-lg" id="childCategory">
                    <option value="">Select Category</option>
                    <option value="childCategory1">Child Category 1</option>
                    <option value="childCategory2">Child Category 2</option>
                    <option value="childCategory3">Child Category 3</option>
                </select>
                </div>
            </div>
            <div class="flex gap-4">
                <button
                v-for="(button, index) in buttons"
                :key="index"
                v-if="!button.deleted"
                @click="deleteButton(index)"
                class="hover:bg-smooth text-disabled  py-1 pl-2 pr-0 rounded inline-flex items-center"
                >
                Cat name  <i class="icon close-icon ml-4"></i>
                </button>
            </div>
            <div class="row py-4">
                <div class="w-50">
                    <label class="w-full" for="childCategory">Keywords <span class="text-xs">(up to 15 keywords)</span></label>
                <select class="p-2 rounded-lg border border-smooth w-50" id="childCategory">
                    <option value="">Select keywords</option>
                    <option value="keywords1"> keywords 1</option>
                    <option value="keywords2"> keywords 2</option>
                    <option value="keywords3"> keywords 3</option>
                </select>
                </div>
                <div class="flex py-4 gap-4">
                <button
                v-for="(button, index) in buttons"
                :key="index"
                v-if="!button.deleted"
                @click="deleteButton(index)"
                class="hover:bg-smooth text-disabled  py-1 pl-2 pr-0 rounded inline-flex items-center"
                >
                keywords <i class="icon close-icon ml-4"></i>
                </button>
            </div>
            </div>
        </div>
    </div>
        <!-- --------end-------- -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            selectedMainCategory : false,
            selectedSubCategory : false,
            buttons: [
                { deleted: false },
                { deleted: false },
                // Add more button objects if needed
            ],
        }
    },
    methods: {
    onMainCategoryChange() {
        // alert(77);
      this.selectedMainCategory = true; // Reset subcategory when main category changes
    },
    onSubCategoryChange() {
        this.selectedSubCategory = true;
    },
    deleteButton(index) {
      this.$set(this.buttons, index, { deleted: true });
    },
  },
}
</script>