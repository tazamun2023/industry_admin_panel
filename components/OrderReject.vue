<template>
    <div  class="fixed bg-modal  inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black opacity-50"></div>
      
      <div class="z-50 bg-white p-6 relative rounded-md shadow w-full md:w-1/2 lg:w-2/3 xl:w-1/4">
        <svg @click="closeModal" class="w-4 h-4 text-gray-800 absolute ltr:right-3  rtl:left-3 cursor-pointer mt-[-10px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
        <div class="p-2">
            <h4 class="font-bold">Reject Order #572168327328</h4>
            <p class="text-xs">You are about to reject following order. Please select  rejection reason.</p>
        </div>
        <div class="card p-4">
            <div class="flex border-b pb-2 border-smooth gap-4">
                <div>
                    <p>Order</p>
                    <p class="text-xs">T298479387r439</p>
                </div>
                <div>
                    <p>Order Placed</p>
                    <p class="text-xs">03 Aug 23</p>
                </div>
            </div>
            <div class="py-2">
                <label for="">Select  rejection reason</label>
                <select class="p-2 border border-smooth rounded">
                    <option value="">Please Select</option>
                    <option value="">Out of Stock</option>
                    <option value="">Product Near Expiry</option>
                    <option value="">Pricing Error</option>
                    <option value="">No Document for Internation Shipping</option>
                </select>
            </div>
            <div class="w-full p-2 ">
                      <div class="items-end p-1 text-end  ltr:right-[40px] rtl:left-[40px]">
                          <button @click="closeModal" class="bg-smooth px-4 w-[100px] text-primary p-3 rounded leading-3">Cancel</button>
                          <button  class="bg-primary px-4 w-[100px] text-white p-3 rounded leading-3">Save</button>
                      </div>
                    </div>
        </div>
      </div>
    </div>
</template>
<script>
    export default{
        methods:{
            closeModal() {
            this.$emit('close');
            }
        }
    }
</script>