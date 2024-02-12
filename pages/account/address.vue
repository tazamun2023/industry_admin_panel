<template>
    <div>
        <div class="card p-4">
           <div class="flex justify-between">
                <div>
                    <h4 class="font-bold">My address</h4>
                    <p>Provide information on your billing address and where you would like your items to be picked up from. <br> We need your stock pickup location details in order to calculate accurate shipping rates.</p>
                </div>
                <div>
                    <button @click="addressmodal=true" class="p-2 leading-3 rounded bg-primary text-white hover:text-primary">Add Address</button>
                </div>
           </div>
        </div>
        <div class="grid grid-cols-3 my-2 gap-4">
            <div class="card p-4 my-2">
                <div class="flex gap-4 py-2 justify-between">
                    <h4>Bangladesh</h4>
                    <div class="flex gap-4">
                        <button class="p-2 leading-3 rounded bg-smooth  hover:text-warning">Remove</button>
                    <button class="p-2 leading-3 rounded bg-primary text-white hover:text-primary">Edit</button>
                    </div>
                </div>
                <div class="flex gap-2">
                    <svg class="w-6 h-6 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.8 14h0a7 7 0 1 0-11.5 0h0l.1.3.3.3L12 21l5.1-6.2.6-.7.1-.2Z"/>
                            </svg>
                    <p>Mirpur, Dhaka, Dhaka Bangladesh, P.O. Box 1200, Post code 1200</p>
                </div>
                <div class="flex gap-4  justify-between">
                    <div class="flex py-2 gap-2">
                        <svg class="w-5 h-5 mt-1  text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 4a2.6 2.6 0 0 0-2 .9 6.2 6.2 0 0 0-1.8 6 12 12 0 0 0 3.4 5.5 12 12 0 0 0 5.6 3.4 6.2 6.2 0 0 0 6.6-2.7 2.6 2.6 0 0 0-.7-3L18 12.9a2.7 2.7 0 0 0-3.8 0l-.6.6a.8.8 0 0 1-1.1 0l-1.9-1.8a.8.8 0 0 1 0-1.2l.6-.6a2.7 2.7 0 0 0 0-3.8L10 4.9A2.6 2.6 0 0 0 8 4Z"/>
                        </svg>
                        <p>01907-663244</p>
                    </div>
                    <div class="flex py-2 gap-2">
                        <svg class="w-6 h-6  text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 18-7 3 7-18 7 18-7-3Zm0 0v-5"/>
                        </svg>
                        <p>Dhaka Airport</p>
                    </div>
                    <div class="flex py-2 gap-2">
                        <svg class="w-6 h-6  text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21v-9m3-4H7.5a2.5 2.5 0 1 1 0-5c1.5 0 2.9 1.3 3.9 2.5M14 21v-9m-9 0h14v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8ZM4 8h16a1 1 0 0 1 1 1v3H3V9a1 1 0 0 1 1-1Zm12.2-5c-3 0-5.5 5-5.5 5h5.5a2.5 2.5 0 0 0 0-5Z"/>
                        </svg>
                        <p>Dhaka</p>
                    </div>
                </div>
            </div>
            <div class="card p-4 my-2">
                <div class="flex gap-4 py-2 justify-between">
                    <h4>Bangladesh</h4>
                    <div class="flex gap-4">
                        <button class="p-2 leading-3 rounded bg-smooth  hover:text-warning">Remove</button>
                    <button class="p-2 leading-3 rounded bg-primary text-white hover:text-primary">Edit</button>
                    </div>
                </div>
                <div class="flex gap-2">
                    <svg class="w-6 h-6 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.8 14h0a7 7 0 1 0-11.5 0h0l.1.3.3.3L12 21l5.1-6.2.6-.7.1-.2Z"/>
                            </svg>
                    <p>Mirpur, Dhaka, Dhaka Bangladesh, P.O. Box 1200, Post code 1200</p>
                </div>
                <div class="flex gap-4  justify-between">
                    <div class="flex py-2 gap-2">
                        <svg class="w-5 h-5 mt-1  text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 4a2.6 2.6 0 0 0-2 .9 6.2 6.2 0 0 0-1.8 6 12 12 0 0 0 3.4 5.5 12 12 0 0 0 5.6 3.4 6.2 6.2 0 0 0 6.6-2.7 2.6 2.6 0 0 0-.7-3L18 12.9a2.7 2.7 0 0 0-3.8 0l-.6.6a.8.8 0 0 1-1.1 0l-1.9-1.8a.8.8 0 0 1 0-1.2l.6-.6a2.7 2.7 0 0 0 0-3.8L10 4.9A2.6 2.6 0 0 0 8 4Z"/>
                        </svg>
                        <p>01907-663244</p>
                    </div>
                    <div class="flex py-2 gap-2">
                        <svg class="w-6 h-6  text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 18-7 3 7-18 7 18-7-3Zm0 0v-5"/>
                        </svg>
                        <p>Dhaka Airport</p>
                    </div>
                    <div class="flex py-2 gap-2">
                        <svg class="w-6 h-6  text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21v-9m3-4H7.5a2.5 2.5 0 1 1 0-5c1.5 0 2.9 1.3 3.9 2.5M14 21v-9m-9 0h14v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8ZM4 8h16a1 1 0 0 1 1 1v3H3V9a1 1 0 0 1 1-1Zm12.2-5c-3 0-5.5 5-5.5 5h5.5a2.5 2.5 0 0 0 0-5Z"/>
                        </svg>
                        <p>Dhaka</p>
                    </div>
                </div>
            </div>
            <div class="card p-4 my-2">
                <div class="flex gap-4 py-2 justify-between">
                    <h4>Bangladesh</h4>
                    <div class="flex gap-4">
                        <button class="p-2 leading-3 rounded bg-smooth  hover:text-warning">Remove</button>
                    <button class="p-2 leading-3 rounded bg-primary text-white hover:text-primary">Edit</button>
                    </div>
                </div>
                <div class="flex gap-2">
                    <svg class="w-6 h-6 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.8 14h0a7 7 0 1 0-11.5 0h0l.1.3.3.3L12 21l5.1-6.2.6-.7.1-.2Z"/>
                            </svg>
                    <p>Mirpur, Dhaka, Dhaka Bangladesh, P.O. Box 1200, Post code 1200</p>
                </div>
                <div class="flex gap-4  justify-between">
                    <div class="flex py-2 gap-2">
                        <svg class="w-5 h-5 mt-1  text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 4a2.6 2.6 0 0 0-2 .9 6.2 6.2 0 0 0-1.8 6 12 12 0 0 0 3.4 5.5 12 12 0 0 0 5.6 3.4 6.2 6.2 0 0 0 6.6-2.7 2.6 2.6 0 0 0-.7-3L18 12.9a2.7 2.7 0 0 0-3.8 0l-.6.6a.8.8 0 0 1-1.1 0l-1.9-1.8a.8.8 0 0 1 0-1.2l.6-.6a2.7 2.7 0 0 0 0-3.8L10 4.9A2.6 2.6 0 0 0 8 4Z"/>
                        </svg>
                        <p>01907-663244</p>
                    </div>
                    <div class="flex py-2 gap-2">
                        <svg class="w-6 h-6  text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 18-7 3 7-18 7 18-7-3Zm0 0v-5"/>
                        </svg>
                        <p>Dhaka Airport</p>
                    </div>
                    <div class="flex py-2 gap-2">
                        <svg class="w-6 h-6  text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21v-9m3-4H7.5a2.5 2.5 0 1 1 0-5c1.5 0 2.9 1.3 3.9 2.5M14 21v-9m-9 0h14v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8ZM4 8h16a1 1 0 0 1 1 1v3H3V9a1 1 0 0 1 1-1Zm12.2-5c-3 0-5.5 5-5.5 5h5.5a2.5 2.5 0 0 0 0-5Z"/>
                        </svg>
                        <p>Dhaka</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- -----------------modal------------ -->
        <template v-if="addressmodal">
    <div class="fixed bg-modal  inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="z-50 bg-white p-6 relative rounded-md shadow w-full md:w-1/2 lg:w-2/3 xl:w-2/5">
        <svg @click="addressmodal=false" class="w-4 h-4 text-gray-800 absolute ltr:right-3  rtl:left-3 cursor-pointer mt-[-10px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
        <!-- Modal Content -->
        <div class="mb-4">
            <h4>Add Address</h4>
            <form action="">
                <div class="input-wrapper">
                    <label for="">Address name*</label>
                    <input type="text" placeholder="Enter address name (e.g. Warehouse 1, Head office)">
                </div>
                <div class="input-wrapper">
                    <label for="">Address Type*</label>
                    <div class="flex gap-4">
                        <div>
                            <input id="Shipping" type="checkbox"> <label for="Shipping">Stock Location</label>
                        </div>
                        <div>
                            <input id="Billing" type="checkbox"> <label for="Billing">Billing Location</label>
                        </div>
                    </div>
                </div>
                <div class="input-wrapper flex gap-4">
                    <div class="w-full input-wrapper">
                        <label class="w-full" for="">Country*</label>
                        <select class="p-2 border border-smooth rounded w-full">
                            <option value="">Bangladesh</option>
                            <option value="">Yameen</option>
                        </select>
                    </div>
                    <div class="w-full input-wrapper">
                        <label class="w-full" for="">City*</label>
                        <select class="p-2 border border-smooth rounded w-full">
                            <option value="">Dhaka</option>
                            <option value="">Sana</option>
                        </select>
                    </div>
                </div>
                <div class="flex gap-4">
                    <div class="input-wrapper w-full">
                        <label for="">Area/district*</label>
                        <input type="text" placeholder="Enter Area/district">
                    </div>
                    <div class="input-wrapper w-full">
                        <label for="">Building/warehouse/office*</label>
                        <input type="text" placeholder="Enter Building/warehouse/office">
                    </div>
                </div>
                <div class="flex gap-4">
                    <div class="input-wrapper w-full">
                        <label for="">Street name*</label>
                        <input type="text" placeholder="Street name">
                    </div>
                    <div class="input-wrapper w-full">
                        <label for="">Address phone number*</label>
                        <input type="text" placeholder="Enter Address phone number">
                    </div>
                </div>
                <div class="flex gap-4">
                    <div class="input-wrapper w-full">
                        <label for="">Post code*</label>
                        <input type="text" placeholder="Enter Post code">
                    </div>
                    <div class="input-wrapper w-full">
                        <label for="">PO Box (optional)</label>
                        <input type="text" placeholder="Enter PO Box (optional)">
                    </div>
                </div>
                <div class="input-wrapper w-full">
                        <label for="">Nearest landmark (optional)</label>
                        <input type="text" placeholder="Enter Post code">
                    </div>
                <div class="input-wrapper w-full">
                   
                   <div class="flex gap-1">
                    <input type="checkbox">
                    <label for="">Set as Default address</label>
                   </div>
                </div>
            </form>
        </div>
        <!-- Close Button -->
        <div class="flex justify-end gap-4">
            <button  @click="addressmodal=false" class="btn bg-smooth hover:text-primary  border-secondary mt-20">Cancel</button>
            <button class="btn bg-primary hover:text-primary text-white border-secondary mt-20">Save Change</button>
         </div>

      </div>
    </div>
  </template>
        <!-- -----------------modal end------------ -->
    </div>
</template>

<script>
export default{
    data(){
        return{
            addressmodal:false
        }
    },

}
</script>