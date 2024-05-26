<template>
  <div>
    <div class="px-[10em] py-4">
          <div class="py-2">
          <h3 class="uppercase">Page Heading</h3>
        </div>
          <div class="w-full flex gap-4 items-center">
            <nuxt-link :to="route">
              <button  class="flex w-[156px] hover:bg-primary gap-4 bg-primary text-white px-4 items-center">
              <img class="w-7 h-7" src="~/assets/icon/add-square.svg" alt="">
              New
            </button>
            </nuxt-link>
            <div class="related w-full">
              <img src="~/assets/icon/search-normal.svg" alt="" class="w-4 h-4 absolute ltr:ml-[14px] rtl:mr-[14px] mt-[13px]">
                 <input type="text" placeholder="Search" class="w-full px-34px">
            </div>
            <div class="w-[300px] flex gap-4 items-center">
              <img   @click="rotateImage"
              :class="{ 'rotate-180': isRotated }"
              class="w-7 h-7 transition-transform duration-300"  src="~/assets/icon/frame.svg" alt="">
             <!-- <img  class="w-7 h-7 rotate-180" src="~/assets/icon/frame.svg" alt=""> -->
             <div class="relative inline-block text-left">
            <div class="min-w-[156px]">
              <button @click="shortDropdown" type="button"
                      class="inline-flex w-full justify-between  capitalize items-center text-[13px] gap-4 px-1 rounded-[10px] bg-white p-1  text-sm font-semibold text-primary shadow-sm"
                      id="menu-button" aria-expanded="true" aria-haspopup="true">
                <img style="background: #01A78133;" class="w-8 h-8 bg-primary p-2 rounded"
                     src="~/assets/icon/setting-5.svg" alt="">
                {{ btnText }}
                <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clip-rule="evenodd"/>
                </svg>
              </button>
            </div>

            <div v-if="dropDown"
                 class="absolute right-0 z-10 mt-2 w-[156px] origin-top-right rounded-md bg-white shadow-lg   focus:outline-none"
                 role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
              <div class="py-1 px-2" role="none">
                <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                     <span @click="selectOption('name')"
                      :class="{'bg-primarylight text-primary': btnText === 'name'}"
                      class="hover:bg-primarylight block rounded-[7px] cursor-pointer my-1 px-4 py-2 text-sm " role="menuitem"
                      tabindex="-1" id="menu-item-0">Name</span>
                      <span @click="selectOption('name 2')"
                      :class="{'bg-primarylight text-primary': btnText === 'name 2'}"
                      class="hover:bg-primarylight block rounded-[7px] cursor-pointer my-1 px-4 py-2 text-sm " role="menuitem"
                      tabindex="-1" id="menu-item-0">Name 2</span>
                      <span @click="selectOption('name 3')"
                      :class="{'bg-primarylight text-primary': btnText === 'name 3'}"
                      class="hover:bg-primarylight block rounded-[7px] cursor-pointer my-1 px-4 py-2 text-sm " role="menuitem"
                      tabindex="-1" id="menu-item-0">Name 3</span>
              </div>
            </div>
          </div>

            </div>
        </div>
        </div>
  </div>
</template>
<script>
export default{
  props: {
    route: {
      type: String,
      default: '/'
    },

  },
  data(){
    return{
      btnText:'name',
      dropDown:false,
      isRotated: false,
    }
  },
  methods:{
    shortDropdown(){
      this.dropDown = !this.dropDown
    },
    rotateImage() {
      this.isRotated = !this.isRotated;
    },
    selectOption(option) {
      this.btnText = option;
      this.dropDown = false; // Close dropdown after selection
    },
  }
}
</script>
