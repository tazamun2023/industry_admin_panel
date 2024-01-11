<template>
    <div>
  <!-- ---------------       -->
  <div class="row  mb-2">
    <div class="card p-20 col-md-12">
            <div class="card-body">
                <div class="row mt-2">
                    <div class="col-md-12">
                        <h4 class="bold black">{{$t('rfq.RFQ Marketplace')}}</h4>
                        <p class="font-14">{{$t('rfq.RFQ Marketplace Description')}}</p>
                    </div>
                </div>
            </div>
    </div>
</div>





<div class="flex flex-wrap card  relative flex flex-col min-w-0 rounded break-words  bg-white border-1">
    <div class="md:w-full py-3">
        <div class="flex flex-wrap ">
            <div class="md:w-1/5 pr-4 pl-4">
                <div class="mb-4">
                    <label for="">{{ $t("rfq.RFQ ID") }}</label>
                    <input type="text" class="theme-input-style" :placeholder="$t('rfq.Search by RFQ ID or Product')">
                </div>
            </div>
            <div class="md:w-1/5 pr-4 pl-4">
                <div class="mb-4 for-lang ">
                    <label for="">{{ $t("rfq.Search by Category") }}</label>
                    <select class="bg-gray-50 border border-smooth text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" name="" id="">
                        <option value="">Search by  Category</option>
                        <option value="">category 1</option>
                        <option value="">category 1</option>
                    </select>
                </div>
            </div>
            <div class="md:w-1/5 pr-4 pl-4">
                <div class="mb-4 for-lang">
                    <label for=""> {{ $t("rfq.Select Sub Category") }}</label>
                    <select class="bg-gray-50 border border-smooth text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" name="" id="">
                        <option value="">Select Sub Category</option>
                        <option value="">category 1</option>
                        <option value="">category 1</option>
                    </select>
                </div>
            </div>
            <div class="md:w-1/5 pr-4 pl-4">
                <div class="mb-4 for-lang">
                    <label for="">{{ $t("rfq.Select Child Category") }} </label>
                    <select class="bg-gray-50 border border-smooth text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" name="" id="">
                        <option value="">Select Child Category</option>
                        <option value="">category 1</option>
                        <option value="">category 1</option>
                    </select>
                </div>
            </div>
            <div class="md:w-1/5 pr-4 pl-4">
                <div class="mb-4 for-lang">
                    <label for=""> {{ $t("rfq.RFQ Type") }} </label>
                    <select class="bg-gray-50 border border-smooth text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" name="" id="">
                        <option value="">Select on Option</option>
                        <option value="">Single product</option>
                        <option value="">Multi-product</option>
                    </select>
                </div>
            </div>
            <div class="md:w-1/5 pr-4 pl-4">
                <div class="mb-4 for-lang">
                    <label for=""> {{ $t("rfq.Location") }} </label>
                    <select class="bg-gray-50 border border-smooth text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" name="" id="">
                        <option value="">Select on Option</option>
                        <option value="">Bangladesh</option>
                        <option value="">Yemeen</option>
                    </select>
                </div>
            </div>
            <div class="md:w-1/5 pr-4 pl-4">
                <div class="mb-4">
                    <label for=""> {{ $t("app.from") }} </label>
                    <input type="date" class="theme-input-style" placeholder="From (creation)">
                </div>
            </div>
            <div class="md:w-1/5 pr-4 pl-4">
                <div class="mb-4">
                    <label for=""> {{ $t("app.to") }} </label>
                    <input type="date" class="theme-input-style" placeholder="To (creation)">
                </div>
            </div>
            <div class="md:w-1/3 pr-4 pl-4">
                <div class="mb-4">
                    <button type="button" class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline long mt-20"> {{ $t("app.Apply Filters") }} </button>
                    <a class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-red-600 text-white hover:bg-red-700 long mb-auto mt-20 ml-4 mr-4" href=""> {{ $t("app.Clear Filter") }} </a>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- ========= -->
<!-- ==================tab============== -->
<div class="flex  mt-20 flex-wrap">
    <div class="w-full">
      <ul class="flex mb-0 list-none flex-wrap pt-3 w-50 pb-4 flex-row">
        <li class="-mb-px mr-2 last:mr-0   flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-on:click="toggleTabs(1)" v-bind:class="{'text-pink-600 bg-white border-white border-t-4': openTab !== 1, 'border-t-4 border-primary': openTab === 1}">

            {{ $t("app.Relevant to me") }}
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-on:click="toggleTabs(2)" v-bind:class="{'text-pink-600 bg-white border-white border-t-4': openTab !== 2, 'border-t-4 border-primary': openTab === 2}">

            {{ $t("app.All") }}
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-on:click="toggleTabs(3)" v-bind:class="{'text-pink-600 bg-white border-white border-t-4': openTab !== 3, 'border-t-4 border-primary': openTab === 3}">

            {{ $t("app.My List") }}
          </a>
        </li>
      </ul>
      <div class="relative flex flex-col min-w-0 break-words  w-full mb-6 rounded">
        <div class="flex-auto">
          <div class="tab-content tab-space">
            <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
                <div class="card mt-20 p-4 bg-white">
                        <div class="grid grid-cols-7 gap-4">
                            <div>
                                <img src="https://cdn.pixabay.com/photo/2016/10/26/09/19/arbutus-1771003__340.jpg" class="w-48 h-32 object-cover rounded" alt="...">
                        </div>
                        <div class="col-span-5">
                            <div class="flex justify-end">
                                <h5 class="mb-4 ml-4"><a href="">Dalda The Original Vegetable Ghee 16 kg</a></h5>
                                <div class="p-2 ml-auto">
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewcard="0 0 21 19">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z"/>
                                    </svg>
                                </div>
                            </div>
                            <table class="w-full">
                                <tr>
                                    <td>
                                        <p class="m-0"><strong>{{ $t("rfq.Created on") }} :</strong> 04 Jan 2024</p>
                                        <p class="m-0"><strong>{{ $t("rfq.Expires on") }}:</strong> 31 Jan 2024</p>
                                        <p class="m-0"><strong> {{ $t("rfq.RFQ ID") }}: </strong> RFQ2499137</p>
                                    </td>
                                    <td>
                                        <p class="m-0"><strong> {{ $t("rfq.Shipping country") }}:</strong> United Arab Emirates</p>
                                        <p class="m-0"><strong>{{ $t("rfq.Shipping city") }}:</strong> Dubai</p>
                                        <p  class="m-0"><strong> {{ $t("rfq.Shipping terms") }}:</strong> doorToDoor, exWorks</p>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div>
                            <div class="qoute-card text-center">
                                <p><span> {{ $t("rfq.Total target price") }}:</span> <span><strong>Negotiable</strong></span></p>
                                <p>
                                    <span>  {{ $t("rfq.Received quotes") }}: </span>
                                    <span class="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-green-500  hover:green-600 ml-2 mr-2">1</span>
                                </p>
                                <nuxt-link class="inline-block align-middle hover:bg-primary  hover:text-white   hover:border-primary shadow text-center select-none border border-smooth  font-normal whitespace-no-wrap rounded py-1 mt-3 px-3 leading-normal no-underline  mr-4 mb-3  sm:mb-0" :to="`/rfq/1`"><i class="icofont-ui-add"></i> SUBMIT QUOTE</nuxt-link>
                            </div>
                        </div>
                    </div>
                    <div class="w-100">
                        <div>
                           <button
                            @click="toggleCollapse"
                            class="flex items-center hover:text-primary bg-primary text-white font-bold py-2 px-4 rounded"
                            >
                            <svg class="w-6 h-4 mr-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewcard="0 0 20 14">
                                <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                                </svg>
                                {{ $t("rfq.View all products") }}
                            </button>
                            <div
                            v-if="isCollapsed"
                            class="mt-4 bg-gray-200 p-4 rounded"
                            >
                            <div class="table-responsive">
                                    <table class="table mb-0">
                                        <thead class="thead-light">
                                        <tr>
                                            <th>Id</th>
                                            <th>Image</th>
                                            <th>Products (3)</th>
                                            <th>Category</th>
                                            <th>Quantity</th>
                                            <th>Unit Target Price</th>
                                            <th>Total Target Price</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td><img style="width:20px;" src="https://cdn.pixabay.com/photo/2016/10/26/09/19/arbutus-1771003__340.jpg" alt="zoom" class="img-thumbnail" /></td>
                                            <td><a href="">Red Bull Energy Drink Emarat 250 Ml 4 X 6 Pack Of 24</a></td>
                                            <td>Food & Beverage</td>
                                            <td>1000 Carton</td>
                                            <td>AED 192</td>
                                            <td>AED 192,000</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td><img style="width:20px;" src="https://cdn.pixabay.com/photo/2016/10/26/09/19/arbutus-1771003__340.jpg" alt="zoom" class="img-thumbnail" /></td>
                                            <td><a href="">Red Bull Energy Drink Emarat 250 Ml 4 X 6 Pack Of 24</a></td>
                                            <td>Food & Beverage</td>
                                            <td>1000 Carton</td>
                                            <td>AED 192</td>
                                            <td>AED 192,000</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ======card2========= -->
                <div class="card mt-20 p-4 bg-white">
                        <div class="grid grid-cols-7 gap-4">
                            <div>
                                <img src="https://cdn.pixabay.com/photo/2016/10/26/09/19/arbutus-1771003__340.jpg" class="w-48 h-32 object-cover rounded" alt="...">
                        </div>
                        <div class="col-span-5">
                            <div class="flex justify-end">
                                <h5 class="mb-4 ml-4"><a href="">Dalda The Original Vegetable Ghee 16 kg</a></h5>
                                <div class="p-2 ml-auto">
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewcard="0 0 21 19">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z"/>
                                    </svg>
                                </div>
                            </div>
                            <table class="w-full">
                                <tr>
                                    <td>
                                        <p class="m-0"><strong>Created on:</strong> 04 Jan 2024</p>
                                        <p class="m-0"><strong>Expires on :</strong> 31 Jan 2024</p>
                                        <p class="m-0"><strong>RFQ ID: </strong> RFQ2499137</p>
                                    </td>
                                    <td>
                                        <p class="m-0"><strong>Shipping country:</strong> United Arab Emirates</p>
                                        <p class="m-0"><strong>Shipping city:</strong> Dubai</p>
                                        <p  class="m-0"><strong>Shipping terms:</strong> doorToDoor, exWorks</p>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div>
                            <div class="qoute-card text-center">
                                <p><span>Total target price:</span> <span><strong>Negotiable</strong></span></p>
                                <p>
                                    <span> Received quotes: </span>
                                    <span class="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-green-500  hover:green-600 ml-2 mr-2">1</span>
                                </p>
                                <nuxt-link class="inline-block align-middle hover:bg-primary  hover:text-white   hover:border-primary shadow text-center select-none border border-smooth  font-normal whitespace-no-wrap rounded py-1 mt-3 px-3 leading-normal no-underline  mr-4 mb-3  sm:mb-0" :to="`/rfq/1`"><i class="icofont-ui-add"></i> SUBMIT QUOTE</nuxt-link>
                            </div>
                        </div>
                    </div>
                    <div class="w-100">
                        <div>
                            <button
                            @click="toggleCollapse"
                            class="flex  hover:text-primary  items-center bg-primary text-white font-bold py-2 px-4 rounded"
                            >
                            <svg class="w-6 h-4 mr-4"  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewcard="0 0 20 14">
                                <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                                </svg>
                               View all products
                            </button>
                            <div
                            v-if="isCollapsed"
                            class="mt-4 bg-gray-200 p-4 rounded"
                            >
                            <div class="table-responsive">
                                    <table class="table mb-0">
                                        <thead class="thead-light">
                                        <tr>
                                            <th>Id</th>
                                            <th>Image</th>
                                            <th>Products (3)</th>
                                            <th>Category</th>
                                            <th>Quantity</th>
                                            <th>Unit Target Price</th>
                                            <th>Total Target Price</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td><img style="width:20px;" src="https://cdn.pixabay.com/photo/2016/10/26/09/19/arbutus-1771003__340.jpg" alt="zoom" class="img-thumbnail" /></td>
                                            <td><a href="">Red Bull Energy Drink Emarat 250 Ml 4 X 6 Pack Of 24</a></td>
                                            <td>Food & Beverage</td>
                                            <td>1000 Carton</td>
                                            <td>AED 192</td>
                                            <td>AED 192,000</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td><img style="width:20px;" src="https://cdn.pixabay.com/photo/2016/10/26/09/19/arbutus-1771003__340.jpg" alt="zoom" class="img-thumbnail" /></td>
                                            <td><a href="">Red Bull Energy Drink Emarat 250 Ml 4 X 6 Pack Of 24</a></td>
                                            <td>Food & Beverage</td>
                                            <td>1000 Carton</td>
                                            <td>AED 192</td>
                                            <td>AED 192,000</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}">
                <div class="card p-4 bg-white mt-20">
                        <div class="grid grid-cols-7 gap-4">
                            <div>
                                <img src="https://cdn.pixabay.com/photo/2016/10/26/09/19/arbutus-1771003__340.jpg" class="w-48 h-32 object-cover rounded" alt="...">
                        </div>
                        <div class="col-span-5">
                            <div class="flex justify-end">
                                <h5 class="mb-4 ml-4"><a href="">Dalda The Original Vegetable Ghee 16 kg</a></h5>
                                <div class="p-2 ml-auto">
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewcard="0 0 21 19">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z"/>
                                    </svg>
                                </div>
                            </div>
                            <table class="w-full">
                                <tr>
                                    <td>
                                        <p class="m-0"><strong>Created on:</strong> 04 Jan 2024</p>
                                        <p class="m-0"><strong>Expires on :</strong> 31 Jan 2024</p>
                                        <p class="m-0"><strong>RFQ ID: </strong> RFQ2499137</p>
                                    </td>
                                    <td>
                                        <p class="m-0"><strong>Shipping country:</strong> United Arab Emirates</p>
                                        <p class="m-0"><strong>Shipping city:</strong> Dubai</p>
                                        <p  class="m-0"><strong>Shipping terms:</strong> doorToDoor, exWorks</p>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div>
                            <div class="qoute-card text-center">
                                <p><span>Total target price:</span> <span><strong>Negotiable</strong></span></p>
                                <p>
                                    <span> Received quotes: </span>
                                    <span class="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-green-500  hover:green-600 ml-2 mr-2">1</span>
                                </p>
                                <nuxt-link class="inline-block align-middle hover:bg-primary  hover:text-white   hover:border-primary shadow text-center select-none border border-smooth  font-normal whitespace-no-wrap rounded py-1 mt-3 px-3 leading-normal no-underline  mr-4 mb-3  sm:mb-0" :to="`/rfq/1`"><i class="icofont-ui-add"></i> SUBMIT QUOTE</nuxt-link>
                            </div>
                        </div>
                    </div>
                    <div class="w-100">
                        <div>

                            <button
                            @click="toggleCollapse"
                            class="flex items-center  hover:text-primary  bg-primary text-white font-bold py-2 px-4 rounded"
                            >
                            <svg  class="w-6 h-4 mr-4"  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewcard="0 0 20 14">
                                <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                                </svg>
                               View all products
                            </button>
                            <div
                            v-if="isCollapsed"
                            class="mt-4 bg-gray-200 p-4 rounded"
                            >
                            <div class="table-responsive">
                                    <table class="table mb-0">
                                        <thead class="thead-light">
                                        <tr>
                                            <th>Id</th>
                                            <th>Image</th>
                                            <th>Products (3)</th>
                                            <th>Category</th>
                                            <th>Quantity</th>
                                            <th>Unit Target Price</th>
                                            <th>Total Target Price</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td><img style="width:20px;" src="https://cdn.pixabay.com/photo/2016/10/26/09/19/arbutus-1771003__340.jpg" alt="zoom" class="img-thumbnail" /></td>
                                            <td><a href="">Red Bull Energy Drink Emarat 250 Ml 4 X 6 Pack Of 24</a></td>
                                            <td>Food & Beverage</td>
                                            <td>1000 Carton</td>
                                            <td>AED 192</td>
                                            <td>AED 192,000</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td><img style="width:20px;" src="https://cdn.pixabay.com/photo/2016/10/26/09/19/arbutus-1771003__340.jpg" alt="zoom" class="img-thumbnail" /></td>
                                            <td><a href="">Red Bull Energy Drink Emarat 250 Ml 4 X 6 Pack Of 24</a></td>
                                            <td>Food & Beverage</td>
                                            <td>1000 Carton</td>
                                            <td>AED 192</td>
                                            <td>AED 192,000</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div  v-bind:class="{'hidden': openTab !== 3, 'block': openTab === 3}">
                <div class="card p-4 bg-white mt-20">
                        <div class="grid grid-cols-7 gap-4">
                            <div>
                                <img src="https://cdn.pixabay.com/photo/2016/10/26/09/19/arbutus-1771003__340.jpg" class="w-48 h-32 object-cover rounded" alt="...">
                        </div>
                        <div class="col-span-5">
                            <div class="flex justify-end">
                                <h5 class="mb-4 ml-4"><a href="">Dalda The Original Vegetable Ghee 16 kg</a></h5>
                                <div class="p-2 ml-auto">
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewcard="0 0 21 19">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z"/>
                                    </svg>
                                </div>
                            </div>
                            <table class="w-full">
                                <tr>
                                    <td>
                                        <p class="m-0"><strong>Created on:</strong> 04 Jan 2024</p>
                                        <p class="m-0"><strong>Expires on :</strong> 31 Jan 2024</p>
                                        <p class="m-0"><strong>RFQ ID: </strong> RFQ2499137</p>
                                    </td>
                                    <td>
                                        <p class="m-0"><strong>Shipping country:</strong> United Arab Emirates</p>
                                        <p class="m-0"><strong>Shipping city:</strong> Dubai</p>
                                        <p  class="m-0"><strong>Shipping terms:</strong> doorToDoor, exWorks</p>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div>
                            <div class="qoute-card text-center">
                                <p><span>Total target price:</span> <span><strong>Negotiable</strong></span></p>
                                <p>
                                    <span> Received quotes: </span>
                                    <span class="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-green-500  hover:green-600 ml-2 mr-2">1</span>
                                </p>
                                <nuxt-link class="inline-block align-middle hover:bg-primary  hover:text-white   hover:border-primary shadow text-center select-none border border-smooth  font-normal whitespace-no-wrap rounded py-1 mt-3 px-3 leading-normal no-underline  mr-4 mb-3  sm:mb-0" :to="`/rfq/1`"><i class="icofont-ui-add"></i> SUBMIT QUOTE</nuxt-link>
                            </div>
                        </div>
                    </div>
                    <div class="w-100">
                        <div>
                            <button
                            @click="toggleCollapse"
                            class="flex items-center  hover:text-primary  bg-primary text-white font-bold py-2 px-4 rounded"
                            >
                            <svg class="w-6 h-4 mr-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewcard="0 0 20 14">
                                <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                                </svg>
                               View all products
                            </button>
                            <div
                            v-if="isCollapsed"
                            class="mt-4 bg-gray-200 p-4 rounded"
                            >
                            <div class="table-responsive">
                                    <table class="table mb-0">
                                        <thead class="thead-light">
                                        <tr>
                                            <th>Id</th>
                                            <th>Image</th>
                                            <th>Products (3)</th>
                                            <th>Category</th>
                                            <th>Quantity</th>
                                            <th>Unit Target Price</th>
                                            <th>Total Target Price</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td><img style="width:20px;" src="https://cdn.pixabay.com/photo/2016/10/26/09/19/arbutus-1771003__340.jpg" alt="zoom" class="img-thumbnail w-48 h-32 object-cover rounded" /></td>
                                            <td><a href="">Red Bull Energy Drink Emarat 250 Ml 4 X 6 Pack Of 24</a></td>
                                            <td>Food & Beverage</td>
                                            <td>1000 Carton</td>
                                            <td>AED 192</td>
                                            <td>AED 192,000</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td><img style="width:20px;" src="https://cdn.pixabay.com/photo/2016/10/26/09/19/arbutus-1771003__340.jpg" alt="zoom" class="img-thumbnail w-48 h-32 object-cover rounded" /></td>
                                            <td><a href="">Red Bull Energy Drink Emarat 250 Ml 4 X 6 Pack Of 24</a></td>
                                            <td>Food & Beverage</td>
                                            <td>1000 Carton</td>
                                            <td>AED 192</td>
                                            <td>AED 192,000</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
<!-- ==================tab============== -->
  <!-- ---------------       -->
    </div>
</template>

<script>
export default {
  name: "pink-tabs",
  data() {
    return {
      openTab: 1,
      isCollapsed: false,
    }
  },
  methods: {
    toggleTabs: function(tabNumber){
      this.openTab = tabNumber
    },
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
  }
}
</script>
