<template>
  <div>
      <div class="p-4">
       <div class="py-4">
        <h1 class="text-[35px] uppercase text-[#3E3E3E]">New Rejection Reason</h1>
       </div>
      <div class="w-2/4">
        <form class="" action="">
         <div class="py-2 input-container">
          <label class="text-[16px] order-1 capitalize" for="reject">Rejection Reason</label>
          <input for="reject" type="text" placeholder="Here you can put the reason of reject">
         </div>
          <div  class="py-2 input-container">
            <label  class="text-[16px] capitalize" for="">Rejection Type</label>
            <div class="relative">
      <select v-model="selectedType" class="w-full border focus:outline-none focus:border-primary ring-primary border-smooth p-2 rounded-[10px]">
        <option value="">Select Type</option>
        <option value="products">Products</option>
        <option value="rfqs">RFqs</option>
      </select>
      <label class="absolute mt-[-25px] ltr:right-1 rtl:left-1">
        <img class="w-4" src="~/assets/icon/select.svg" alt="Select Icon">
      </label>
    </div>
</div>
    <div v-if="selectedType === 'products'" class="py-2 input-container">
      <label class="text-[16px] capitalize" for="groupSelect">Rejection Groups</label>
      <div class="relative">
        <select class="w-full border border-smooth focus:outline-none focus:border-primary ring-primary p-2 rounded-[10px]" id="groupSelect">
          <option value="">Group Name</option>
          <option value="">Group Name 2</option>
        </select>
        <label class="absolute mt-[-25px] ltr:right-1 rtl:left-1">
          <img class="w-4" src="~/assets/icon/select.svg" alt="Select Icon">
        </label>
      </div>
    </div>
          <div class="flex  items-center  gap-4 py-2">
            <label  class="text-[16px] mt-[7px] capitalize" for="active">Active</label>
            <SwitchToggle id="active" checked="checked"/>
          </div>
          <div class="flex justify-end items-center mt-[50px] gap-4">
            <button class="h-[41px] w-[195px] uppercase px-6 py-2 leading-3">cancel</button>
            <button class="h-[41px]  w-[195px] border border-smooth uppercase hover:text-primary hover:border-primary text-white px-6 py-2 bg-primary leading-3">Save</button>
          </div>
        </form>
      </div>
      </div>
  </div>
</template>
<script>
export default{
  data(){
    return{
      selectedType: ''
    }
  }
}
</script>
<style scoped>
.input-container input:focus label {
    color:#01a781; /* Change this color to whatever you prefer */
  }
  .input-container label {
  display: block;
  transition: color 0.3s ease;
}

.input-container:focus-within label {
  color: #01a781; /* Change this color to whatever you prefer */
}
</style>
