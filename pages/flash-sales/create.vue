<template>
   <div class="tab-sidebar p-4">
        <h4 class="title">
         Create  flash sale 
        </h4>
        <form class="p-4" action="">
            <div class="input-wrapper">
                <h5>Promotion Name</h5>
                <input type="text" placeholder="e.g. July 20% electronics discount">
                <label class="text-xs" for="">This helps you keep track of your promotions; customers won’t be able to see this name</label>
            </div>
            <div class="input-wrapper">               
               <div class="flex gap-4">
                <div>
                    <label for="">Start date</label>
                    <input type="date">
                </div>
                <div>
                    <label for="">End date</label>
                    <input type="date">
                </div>
               </div>
            </div>
            <div class="input-wrapper">
                <label for="">Type of promotion you would like to offer</label>
                <div class="flex gap-4">
                    <div class="flex gap-4"><input name="type" id="percentage" v-model="promotionType" type="radio" value="percentage" checked> <label for="percentage">Apply % off your product</label></div>
                    <div class="flex gap-4"><input name="type" type="radio" v-model="promotionType" id="gift" value="gift"> <label for="gift">Free gift</label></div>
                </div>
            </div>
            <div class="input-wrapper">
                <p>Choose one product you would like to assign a free product to.</p>
                <table>
                   <thead>
                    <tr>
                        <th>Quantity</th>
                        <th>Product</th>
                        <th class="percent" v-show="promotionType !== 'gift'">Discount per unit</th>
                    </tr>
                   </thead>
                    <tr>
                        <td>121</td>
                        <td>lorem ipsum lorem ipsum lorem ipsum</td>
                        <td class="percent" v-show="promotionType !== 'gift'">10%</td>
                    </tr>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td><span @click="productSearch=true" class="p-4 bg-primary text-white leading-3 cursor-pointer rounded">Add product</span></td>
                            <td v-show="promotionType !== 'gift'"></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div class="text-end m-0">
                <button class="p-2 justify-end leading-3 rounded bg-primary text-white ">Submit</button>
            </div>
        </form>
            <template v-if="productSearch">
    <div class="fixed bg-modal  inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="z-50 bg-white p-6 relative rounded-md shadow w-full md:w-1/2 lg:w-2/3 xl:w-2/5">
        <svg @click="productSearch=false" class="w-4 h-4 text-gray-800 absolute ltr:right-3  rtl:left-3 cursor-pointer mt-[-10px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
        <h4>Select products</h4>
        <!-- Modal Content -->
        <div class="mb-4">
            <p>Search or select the product eligible for the promotion from the list below</p>
           <div>
                <div class="flex gap-1">
                    <input placeholder="Search products" type="text">
                    <button class="p-2 justify-end leading-3 rounded bg-primary text-white ">Search</button>
                </div>
           </div>
           <div class="flex py-2 gap-4">
            <select class="p-3 w-full border border-smooth rounded" name="" id="">
                <option value="">Cat 1</option>
                <option value="">Cat 2</option>
            </select>
            <select  class="p-3 w-full border border-smooth rounded"  name="" id="">
                <option value="">Sub Cat 1</option>
                <option value="">Sub Cat 2</option>
            </select>
            <select  class="p-3 w-full border border-smooth rounded" name="" id="">
                <option value="">Sub sub Cat 1</option>
                <option value="">Sub sub Cat 2</option>
            </select>
           </div>
           <div class="h-[300px] scrolbar overflow-y-scroll">
            <table>
                <tr>
                    <td><input style="width:20px" type="checkbox"></td>
                    <td>Qty: 1223</td>
                    <td>lorem ipsum lorem ipsum lorem ipsum</td>
                    <td>Discount:122</td>
                </tr>
                <tr>
                    <td><input  style="width:20px"  type="checkbox"></td>
                    <td>Qty: 1223</td>
                    <td>lorem ipsum lorem ipsum lorem ipsum</td>
                    <td>Discount:122</td>
                </tr>
                </table>
           </div>
        </div>
        <!-- Close Button -->
        <div class="flex gap-4 justify-end">
            <button @click="productSearch=false" class="p-2 justify-end leading-3 rounded bg-smooth text-primary ">Cancel</button>
            <button class="p-2 justify-end leading-3 rounded bg-primary text-white ">Submit</button>
      </div>

      </div>
    </div>

        </template>
   </div> 
</template>

<script>
export default{
    data(){
        return{
            productSearch:false,
            promotionType: 'percentage'
        }
    },

}
</script>
<style>
.scrolbar::-webkit-scrollbar {
  width: 3px; /* Set width of the scrollbar */
}

.scrolbar::-webkit-scrollbar-thumb {
  background-color: #888; /* Color of the thumb */
  border-radius: 6px; /* Rounded corners of the thumb */
}

.scrolbar::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* Color of the track */
}
</style>