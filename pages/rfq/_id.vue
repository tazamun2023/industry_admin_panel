<template>
<div>
    <!-- =============start=========== -->
    <div class="flex flex-wrap ">
    <div class="md:w-full pr-4 pl-4">
        <div class="relative flex flex-col min-w-0 rounded break-words card  bg-white border-1 ">
            <div class="py-3 px-6 mb-0 bg-gray-200  text-gray-900 sm:flex justify-between items-center  py-3">
                <h4 class="font-20">RFQ details</h4>
                <h4 class="font-20 ">
                    <nuxt-link class="flex" :to="`/rfq`">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white mr-2 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                    </svg>
                     QUOTE</nuxt-link></h4>
            </div>
            <div class="flex-auto p-6"> 
            <div class="flex flex-wrap ">
                <div class="md:w-1/4 pr-4 pl-4 mb-10">
                    <label class="font-14 bold black">RFQ ID</label><br>
                    <label><a href="">RFQb8931339</a></label>
                </div>
                <div class="md:w-1/4 pr-4 pl-4  mb-10">
                    <label class="font-14 bold black">Submitted on</label><br>
                    <label>04 Jan 2024 11:57 AM</label>
                </div>
                <div class="md:w-1/4 pr-4 pl-4  mb-10">
                    <label class="font-14 bold black">Ends in</label><br>
                    <label>	31 Jan 2024</label>
                </div>
                <div class="md:w-1/4 pr-4 pl-4  mb-10">
                    <label class="font-14 bold black">	Received quotes</label><br>
                    <label>	2</label>
                </div>
                <div class="md:w-1/4 pr-4 pl-4  mb-10">
                    <label class="font-14 bold black">Shipping country</label><br>
                    <label><a href=""><img style="width:20labelx;" src="httlabels://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/ae.svg" alt=""> United Arab Emirates</a></label>
                </div>
                <div class="md:w-1/4 pr-4 pl-4  mb-10">
                    <label class="font-14 bold black">Shipping city</label><br>
                    <label>Dubai</label>
                </div>
                <div class="md:w-1/4 pr-4 pl-4  mb-10">
                    <label class="font-14 bold black">Shipping terms</label><br>
                    <label>doorToDoor, exWorks</label>
                </div>
                <div class="md:w-1/4 pr-4 pl-4  mb-10">
                    <label class="font-14 bold black">Created on</label><br>
                    <label>04 Jan 2024</label>
                </div>
            </div>
            </div>
        </div>
    </div>
</div>

<!-- ========================== -->
<div class="flex flex-wrap  mt-20">
    <div class="xl:w-full pr-4 pl-4 lg:w-full pr-4 pl-4">
        <!-- Card -->
        <div class="relative flex flex-col min-w-0  break-words card mb-20">
            <div class="py-4 px-6 mb-0">
                <h4>Top Products</h4>
            </div>
            <div class="flex-auto p-6 pb-2">
                <div class="product-list">
                    <div class="block w-full overflow-auto scrolling-touch">
                        <table id="conditionTable" class="hoverable whitespace-no-wrap">
                            <thead>
                                <tr>
                                    <th>
                                        #
                                    </th>
                                    <th>Image</th>
                                    <th>Products (1)</th>
                                    <th>Category</th>
                                    <th>Quantity</th>
                                    <th>Unit Target Price</th>
                                    <th>Total target price</th>
        
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                               <td>1</td> 
                               <td><img style="width:30px;height:30px" src="https://cfn-catalog-prod.tradeling.com/up/5fba0c6142480f001bed85d4/83eda791eabaefc1e9d70923dcea5b9f.jpg" alt=""></td> 
                               <td><a href="">Red Bull Energy Drink Emarat 250 ml 4 X</a></td> 
                               <td><span>Energy Drinks</span></td> 
                               <td><span>1000 Carton</span></td> 
                               <td><span>AED 192</span></td> 
                               <td><span>AED 192,000</span></td> 
                               <td><button href="" target="_blank"  @click="toggleCollapse" id="addToQuote" :disabled="isDisable" class="inline-block align-middle text-center bg-primary text-white select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline long  mt-20">Add to quote</button></td> 
                             </tr> 
                             <tr  v-if="isCollapsed" id="add_form">
                                <td colspan="8">
                                    <form action="">
                                        <div class="grid grid-cols-5 gap-4">
                                            <div class="col-span-2">
                                                <label for="">Product name*</label>
                                                <div class="flex border rounded p-1 border-smooth bg-white">
                                                    <button type="button" @click="addProduct" class="inline-block bg-primary w-50  align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline  text-white hover:text-primary" data-toggle="modal" data-target="#staticBackdrop">
                                                        Add product
                                                      </button>
                                                <input name="productName" disabled="" required="" aria-required="true" class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded no-radius border-none">
                                                </div>
                                            </div>
                                            <div>
                                                <label for="">Quantity*</label>
                                                <div class="flex border rounded p-1 border-smooth bg-white">
                                                 <input name="quantity" placeholder="qty" disabled="" required="" aria-required="true" class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded no-radius border-none">
                                                 <select class="border-none w-50" name="" id="">
                                                    <option value="">KG</option>
                                                    <option value="">LG</option>
                                                    <option value="">LTR</option>
                                                 </select>
                                               </div>
                                            </div>
                                            <div>
                                                <label for="">Unit offer price*</label>
                                                <div class="flex border rounded p-1 border-smooth bg-white">
                                                    <label class="p-3" for="">AED</label>
                                                    <input name="quantity" placeholder="0"  class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded no-radius border-none">
                                                </div>
                                            </div>
                                            <div>
                                                <label for="">Total target price*</label>
                                                <div class="flex border rounded p-1 border-smooth bg-white">
                                                    <label class="p-3" for="">AED</label>
                                                    <input name="quantity" placeholder="0"  class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded no-radius border-none">
                                                  </div>
                                                  <div class="mb-4 text-right">
                                                    <button id="add_form_cancel"  @click="toggleCollapse" class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline  long mb-auto mt-20 ml-4 mr-4" href="">Cancel</button>
                                                    <button type="button" class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-red-600 text-white  bg-primary  hover:text-primary long mt-20">Save</button>
                                                </div>
                                            </div>
                                        </div>   
                                    </form>    
                                </td> 
                              </tr>                    
                            </tbody>
                        </table>
                    </div>
                 </div>
            </div>
        </div>
        <!-- End Card -->
    </div>
</div>
<!-- ================= -->
<div class="flex flex-wrap mt-20">
    <div class="xl:w-full pr-4 pl-4 lg:w-full pr-4 pl-4">
        <!-- Card -->
        <div class="relative flex flex-col min-w-0 rounded break-words card mb-20">
            <div class="py-3 px-6 mb-0 bg-gray-200  text-gray-900  py-3">
                <h4>Additional information</h4>
            </div>
           <div class="flex-auto p-4">
           
            <div class="flex flex-wrap ">
                <div class="md:w-1/3 pr-4 pl-4">
                    <div class="mb-4">
                        <label  for="">All prices mentioned are only valid until*</label>
                        <input type="date" placeholder="Select Date" class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded">
                    </div>
                </div>
                <div class="md:w-full pr-4 pl-4">
                    <div class="mb-4">
                        <label for="">Additional Details</label>
                        <textarea name=""  class="theme-input-style" id="" placeholder="Provide any additional information relevant to your quote." cols="30" rows="10"></textarea>
                    </div>
                </div>
                <div class="md:w-full pr-4 pl-4">
                    <div class="mb-4 text-right">
                        <button id="add_form_cancel" class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline long mb-auto  ml-4 mr-4">Discard Draft</button>
                        <button type="button" disabled class="inline-block align-middle text-center select-none border bg-primary font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline  text-white   long lg">Done</button>
                    </div>
                </div>
            </div>
           </div>
        </div>
    </div>
</div>
<!-- ================= -->
<!-- ==========modal============= -->
<div v-if="open" class="relative z-10"  aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  -->
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

  <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->
      <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
        <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 w-full">
            <div class="grid grid-cols-1 gap-4">
                    <div class="flex justify-between items-center">
                        <h4 class="font-14 bold black pb-2  pt-2">How would you like to add a product</h4>
                <svg  @click="cancel" class="cursor-pointer w-4 h-4 text-gray-800 dark:text-white font-14" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                    </div>
                </div>
          <div class="sm:flex sm:items-start">
                
            <div class="modal-body">

         <div class="relative flex flex-col min-w-0 rounded break-words bg-white p-2">
               <div class="grid grid-cols-3 gap-4">
                <div class="relative block mb-2 inline-block p-1">
                    <input class="absolute mt-1 -ml-4 existing" type="radio" name="inlineRadioOptions" id="productLog" @click="productTableShow">
                    <label class="text-gray-700  mb-0 font-14 bold black pb-2" for="productLog">Select from my catalogue</label>
                  </div>
                  <div class="relative block mb-2 inline-block p-1">
                    <input class="absolute mt-1 -ml-4 existing" type="radio" name="inlineRadioOptions" id="allproductLog" @click="productTableShow">
                    <label class="text-gray-700  mb-0 font-14 bold black pb-2" for="allproductLog">Copy from website catalogue</label>
                  </div>
                  <div class="relative block mb-2 inline-block p-1">
                    <input class="absolute mt-1 -ml-4 " type="radio" name="inlineRadioOptions" @click="tableNotShow" id="upload_new" value="option3">
                    <label class="text-gray-700  mb-0 font-14 bold black pb-2" for="upload_new">Upload a new product</label>
                  </div>
               </div>
             <div v-if="tableShow" class="relative flex flex-col min-w-0 rounded break-words  appendTable">
             <div  class="flex-auto">
             <div class="flex flex-wrap  relative flex flex-col min-w-0 rounded break-words">
                <div class="md:w-full pr-4 pl-4">
                    <div class="flex mb-2">
                        <input type="text" placeholder="Try a product name or SKU" class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded">
                        <button  class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded ml-2 mr-2 py-1 px-3 leading-normal no-underline bg-primary text-white hover:text-primary"><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg></button>
                    </div>
                </div>
                <div class="md:w-full pr-4 pl-4">
                    <div class="block w-full overflow-auto scrolling-touch">
                        <table id="conditionTable" class="hoverable whitespace-no-wrap">
                            <thead>
                                <tr>
                                    <th style="width:2%" ></th>
                                    <th style="width:5%">Image</th>
                                    <th style="width:15%">Product name</th>
                                    <th style="width:5%">SKU</th>
                                    <th style="width:5%">Unit Price</th>
                                    <th style="width:5%">Status</th>
                                    <th style="width:10%">Availability</th>     
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><input name="selectProduct" type="radio" id="1"  value="0"></td>
                               <td><img style="width:30px;height:30px" src="https://cfn-catalog-prod.tradeling.com/up/5fba0c6142480f001bed85d4/83eda791eabaefc1e9d70923dcea5b9f.jpg" alt=""></td> 
                               <td><a href="">Red Bull Energy Drink Emarat 250 ml 4 X</a></td> 
                               <td><span>34333</span></td> 
                               <td><span>191 AED</span></td> 
                               <td><span>Online</span></td> 
                               <td><span>-</span></td> 
                             </tr>  
                             <tr>
                                <td><input   name="selectProduct" type="radio" id="2"   value="0"></td>
                               <td><img style="width:30px;height:30px" src="https://cfn-catalog-prod.tradeling.com/up/5fba0c6142480f001bed85d4/83eda791eabaefc1e9d70923dcea5b9f.jpg" alt=""></td> 
                               <td><a href="">Red Bull Energy Drink Emarat 250 ml 4 X</a></td> 
                               <td><span>34343re</span></td> 
                               <td><span>191 AED</span></td> 
                               <td><span>Online</span></td> 
                               <td><span>-</span></td> 
                             </tr>                    
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="md:w-full pr-4 pl-4">
                    <div class="modal-footer sm:flex float-right sm:px-6">
                        <button type="button" class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded m-2 py-1 px-3 leading-normal no-underline  text-black" data-dismiss="modal">Close</button>
                        <button type="button"  class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded  m-2 py-1 px-3 leading-normal no-underline bg-primary text-white hover:text-primary">Add</button>
                      </div> 
                </div>
             </div>
             </div>
             </div>
             <div v-if="uploadNewText" class="relative flex flex-col min-w-0 rounded break-words for_upload_message">
                <p>Please be aware this product will be added to your quote only. You may also publish this to the marketplace later on from your Catalog.</p>
             </div>
         </div>
        </div>
          </div>
        </div>
        <div class="bg-smooth px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button type="button"  class="leading-6 inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:text-primary sm:ml-3 sm:w-auto">Save</button>
          <button type="button" @click="cancel" class="leading-6 mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- ==========modal end============= -->
<!-- ====================end========== -->
</div>
</template>
<script>
export default {
  data() {
    return {
      isCollapsed: false,
      isDisable: false,
      open:false,
      tableShow:false,
      uploadNewText:false,
    }
  },
  
  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
      this.isDisable = !this.isDisable;
    },
    addProduct(){
        this.open = true;
    },
    cancel(){
        this.open=false
    },
    tableNotShow(){
        this.tableShow = false;  
        this.uploadNewText = true;  
    },
    productTableShow(){
        this.tableShow = true;  
        this.uploadNewText = false;  
    }
  }
}
</script>
<style>
    .both-border{
        border:1px solid #ced4da;
        border-radius: 7px !important; 
        background: #e9ecef;
        padding: 2px;
    }
    .border-none{
        border:0px !important;
    }
    .no-radius{
        border-radius: 0px !important;
    }
</style>