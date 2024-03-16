<template>
  <div class="orders">

    <div class="card p-4">
      <h4 class="font-bold">My Orders</h4>
      <ul class="flex mb-0 list-none flex-wrap pt-3 w-2/4 pb-4 flex-row">
        <li class="-mb-px mr-2 last:mr-0 cursor-pointer  flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-3  block leading-normal" v-on:click="toggleTabs(1)"
             v-bind:class="{'bg-white border-white border-b': openTab !== 1, 'border-b-2  border-primary text-primary': openTab === 1}">
            All Orders
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-3   block leading-normal" v-on:click="toggleTabs(2)"
             v-bind:class="{'bg-white border-white border-b': openTab !== 2, 'border-b-2  border-primary text-primary': openTab === 2}">
            Pending approval
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-3   block leading-normal" v-on:click="toggleTabs(3)"
             v-bind:class="{'bg-white border-white border-b': openTab !== 3, 'border-b-2    border-primary text-primary': openTab === 3}">
            Ready for pickup
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
          <a class="text-xs font-bold uppercase px-5 py-3   block leading-normal" v-on:click="toggleTabs(4)"
             v-bind:class="{'bg-white border-white border-b': openTab !== 4, 'border-b-2   border-primary text-primary': openTab === 4}">
            Rejected
          </a>
        </li>
      </ul>
      <div class="relative flex flex-col min-w-0 break-words  w-full mb-6 rounded">
        <div class="flex-auto ">
          <div class="tab-content input-wrapper tab-space">
            <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
              <div class="flex gap-4">
                <div class="p-2">
                  <input type="checkbox" >
                </div>
                <select class="p-2 border rounded border-smooth" name="" id="">
                  <option value="">Action</option>
                  <option value="">Pending approval</option>
                  <option value="">Ready for pickup</option>
                  <option value=""> Rejected </option>
                </select>
                <div class="relative">
                  <input
                    type="text"
                    placeholder="Order #"
                    class="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:border-primary"
                  />
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <!-- Search Icon -->
                    <svg class="w-6 h-6 text-smooth" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                    </svg>
                  </div>
                </div>
                <select class="p-2 border rounded border-smooth" name="" id="">
                  <option value="">All</option>
                  <option value="">Order Placed</option>
                  <option value="">Recived</option>
                  <option value=""> Partialy Recevied </option>
                  <option value=""> Delivered </option>
                  <option value="">Partialy Delivered </option>
                  <option value=""> Pending Cancellation </option>
                  <option value=""> Cancelled </option>
                  <option value=""> Ready to ship </option>
                  <option value=""> Pending Cancellation </option>
                </select>
                <select class="p-2 border rounded border-smooth" name="" id="">
                  <option value="">All</option>
                  <option value="">Pending upload</option>
                  <option value="">Pending Verification</option>
                  <option value=""> Paid </option>
                  <option value=""> Pending Payment </option>
                </select>
                <select class="p-2 border rounded border-smooth" name="" id="">
                  <option value="">Order Type</option>
                  <option value="">All</option>
                  <option value="">Cart Orders</option>
                  <option value=""> Negotiated Orders </option>
                </select>
                <select class="p-2 border rounded border-smooth" name="" id="">
                  <option value="">Sort By</option>
                  <option value="">Last Update (Oldest)</option>
                  <option value="">Last Update (Newest)</option>
                  <option value="">Price  (Highest)</option>
                  <option value="">Price (Lowest)</option>
                </select>
              </div>
            </div>
            <div v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}">
              <div class="flex gap-4">
                <div class="p-2">
                  <input type="checkbox" >
                </div>
                <select class="p-2 border rounded border-smooth" name="" id="">
                  <option value="">Action</option>
                  <option value="">Pending approval</option>
                  <option value="">Ready for pickup</option>
                  <option value=""> Rejected </option>
                </select>
                <div class="relative">
                  <input
                    type="text"
                    placeholder="Order #"
                    class="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:border-primary"
                  />
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <!-- Search Icon -->
                    <svg class="w-6 h-6 text-smooth" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                    </svg>
                  </div>
                </div>
                <select class="p-2 border rounded border-smooth" name="" id="">
                  <option value="">All</option>
                  <option value="">Order Placed</option>
                  <option value="">Recived</option>
                  <option value=""> Partialy Recevied </option>
                  <option value=""> Delivered </option>
                  <option value="">Partialy Delivered </option>
                  <option value=""> Pending Cancellation </option>
                  <option value=""> Cancelled </option>
                  <option value=""> Ready to ship </option>
                  <option value=""> Pending Cancellation </option>
                </select>
                <select class="p-2 border rounded border-smooth" name="" id="">
                  <option value="">All</option>
                  <option value="">Pending upload</option>
                  <option value="">Pending Verification</option>
                  <option value=""> Paid </option>
                  <option value=""> Pending Payment </option>
                </select>
                <select class="p-2 border rounded border-smooth" name="" id="">
                  <option value="">Order Type</option>
                  <option value="">All</option>
                  <option value="">Cart Orders</option>
                  <option value=""> Negotiated Orders </option>
                </select>
                <select class="p-2 border rounded border-smooth" name="" id="">
                  <option value="">Sort By</option>
                  <option value="">Last Update (Oldest)</option>
                  <option value="">Last Update (Newest)</option>
                  <option value="">Price  (Highest)</option>
                  <option value="">Price (Lowest)</option>
                </select>
              </div>

            </div>
            <div v-bind:class="{'hidden': openTab !== 3, 'block': openTab === 3}">
              <div class="flex gap-4">
                <div class="relative">
                  <input
                    type="text"
                    placeholder="Order #"
                    class="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:border-primary"
                  />
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <!-- Search Icon -->
                    <svg class="w-6 h-6 text-smooth" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                    </svg>
                  </div>
                </div>
                <select class="p-2 border rounded border-smooth" name="" id="">
                  <option value="">Ready to Ship</option>
                  <option value="">Ready to Delivery</option>
                </select>
                <select class="p-2 border rounded border-smooth" name="" id="">
                  <option value="">Invoice</option>
                  <option value="">Invoice 1</option>
                </select>
                <select class="p-2 border rounded border-smooth" name="" id="">
                  <option value="">Order Type</option>
                  <option value="">All</option>
                  <option value="">Cart Orders</option>
                  <option value=""> Negotiated Orders </option>
                </select>
                <select class="p-2 border rounded border-smooth" name="" id="">
                  <option value="">Sort By</option>
                  <option value="">Last Update (Oldest)</option>
                  <option value="">Last Update (Newest)</option>
                  <option value="">Price  (Highest)</option>
                  <option value="">Price (Lowest)</option>
                </select>
              </div>
            </div>
            <div v-bind:class="{'hidden': openTab !== 4, 'block': openTab === 4}">
              <div class="flex gap-4">
                <div class="relative">
                  <input
                    type="text"
                    placeholder="Order #"
                    class="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:border-primary"
                  />
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <!-- Search Icon -->
                    <svg class="w-6 h-6 text-smooth" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                    </svg>
                  </div>
                </div>
                <select class="p-2 border rounded border-smooth" name="" id="">
                  <option value="">Ready to Ship</option>
                  <option value="">Ready to Delivery</option>
                </select>
                <select class="p-2 border rounded border-smooth" name="" id="">
                  <option value="">Invoice</option>
                  <option value="">Invoice 1</option>
                </select>
                <select class="p-2 border rounded border-smooth" name="" id="">
                  <option value="">Order Type</option>
                  <option value="">All</option>
                  <option value="">Cart Orders</option>
                  <option value=""> Negotiated Orders </option>
                </select>
                <select class="p-2 border rounded border-smooth" name="" id="">
                  <option value="">Sort By</option>
                  <option value="">Last Update (Oldest)</option>
                  <option value="">Last Update (Newest)</option>
                  <option value="">Price  (Highest)</option>
                  <option value="">Price (Lowest)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ------------------------------------- -->
    <div class="relative flex flex-col min-w-0 break-words  w-full mb-6 rounded">
      <div class="flex-auto ">
        <div class="tab-content input-wrapper tab-space">
          <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
            <div class="card my-2 p-4">
              <div class="flex gap-4 justify-between">
                <div class="flex gap-4">
                  <div class="p-2">
                    <input type="checkbox" >
                  </div>
                  <div>
                    <p>Order</p>
                    <p class="font-bold">7te32e2387</p>
                  </div>
                  <div>
                    <p>Order Placed</p>
                    <p class="font-bold">09-nov-23</p>
                  </div>
                  <div>
                    <p>Payment Method</p>
                    <p class="font-bold">Credit Card</p>
                  </div>
                  <div>
                    <p>Payment</p>
                    <p class="font-bold"><span class="bg-primarylight px-2 text-primary rounded-3xl text-[12px]">Paid</span></p>
                  </div>
                  <div>
                    <p>Status</p>
                    <p class="font-bold"><span class="bg-theemlight px-2 text-theem rounded-3xl text-[12px]">Order Placed</span></p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div>
                    <p>Total</p>
                    <p><strong>12345,88</strong> <span>SAR</span></p>
                  </div>
                  <div>
                    <button @click="rejectModalShow()" class="border-2 mt-1 border-warning text-warning uppercase font-bold p-2 rounded leading-3">Reject Order</button>
                  </div>
                  <div>
                    <button @click="approvedModalShow()" class="border mt-1 border-primary font-bold p-2 uppercase rounded bg-primary text-white hover:text-primary leading-3">Approved Order</button>
                  </div>
                </div>
              </div>

              <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div class="overflow-hidden">
                      <table class="min-w-full text-left text-sm font-light">
                        <thead class=" font-medium ">
                        <tr>
                          <th scope="col" class="p-2 w-[50px]">#</th>
                          <th scope="col" class="p-2">Product</th>
                          <th scope="col" class="p-2">Quantity</th>
                          <th scope="col" class="p-2">Agreed Price</th>
                          <th scope="col" class="p-2">Subtotal</th>
                          <th scope="col" class="p-2">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class=" ">
                          <td class="whitespace-nowrap p-2 font-medium">1</td>
                          <td class="whitespace-nowrap p-2">
                            <div class="flex gap-4">
                              <img class="w-10 h-10" src="https://c8n.tradeling.com/img/plain/cms/rs:auto:600::0/f:webp/q:95/Apple_f92d899cac.png" alt="">
                              <div>
                                <a href="">Product name here Product name here ....</a>
                                <p>Sku:fa-01</p>
                              </div>
                            </div>

                          </td>
                          <td class="whitespace-nowrap p-2">3</td>
                          <td class="whitespace-nowrap p-2">SAR 293.66 / price</td>
                          <td class="whitespace-nowrap p-2">SAR 2963.66</td>
                          <td class="whitespace-nowrap p-2">
                            <select class="p-3 border border-smooth rounded" name="" id="">
                              <option value="">Available</option>
                              <option value="">No Available</option>
                            </select>
                          </td>
                        </tr>
                        <tr class=" ">
                          <td class="whitespace-nowrap p-2 font-medium">1</td>
                          <td class="whitespace-nowrap p-2">
                            <div class="flex gap-4">
                              <img  class="w-10 h-10" src="https://c8n.tradeling.com/img/plain/cms/rs:auto:600::0/f:webp/q:95/Apple_f92d899cac.png" alt="">
                              <div>
                                <a href="">Product name here Product name here ....</a>
                                <p>Sku:fa-01</p>
                              </div>
                            </div>

                          </td>
                          <td class="whitespace-nowrap p-2">3</td>
                          <td class="whitespace-nowrap p-2">SAR 293.66 / price</td>
                          <td class="whitespace-nowrap p-2">SAR 2963.66</td>
                          <td class="whitespace-nowrap p-2">
                            <select class="p-3 border border-smooth rounded" name="" id="">
                              <option value="">Available</option>
                              <option value="">No Available</option>
                            </select>
                          </td>
                        </tr>
                        <tr class=" ">
                          <td class="whitespace-nowrap p-2 font-medium">1</td>
                          <td class="whitespace-nowrap p-2">
                            <div class="flex gap-4">
                              <img  class="w-10 h-10" src="https://c8n.tradeling.com/img/plain/cms/rs:auto:600::0/f:webp/q:95/Apple_f92d899cac.png" alt="">
                              <div>
                                <a href="">Product name here Product name here ....</a>
                                <p>Sku:fa-01</p>
                              </div>
                            </div>

                          </td>
                          <td class="whitespace-nowrap p-2">3</td>
                          <td class="whitespace-nowrap p-2">SAR 293.66 / price</td>
                          <td class="whitespace-nowrap p-2">SAR 2963.66</td>
                          <td class="whitespace-nowrap p-2">
                            <select class="p-3 border border-smooth rounded" name="" id="">
                              <option value="">Available</option>
                              <option value="">No Available</option>
                            </select>
                          </td>
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
            <div class="card my-2 p-4">
              <div class="flex gap-4 justify-between">
                <div class="flex gap-4">
                  <div class="p-2">
                    <input type="checkbox" >
                  </div>
                  <div>
                    <p>Order</p>
                    <p class="font-bold">7te32e2387</p>
                  </div>
                  <div>
                    <p>Order Placed</p>
                    <p class="font-bold">09-nov-23</p>
                  </div>
                  <div>
                    <p>Payment Method</p>
                    <p class="font-bold">Credit Card</p>
                  </div>
                  <div>
                    <p>Payment</p>
                    <p class="font-bold"><span class="bg-primarylight px-2 text-primary rounded-3xl text-[12px]">Paid</span></p>
                  </div>
                  <div>
                    <p>Status</p>
                    <p class="font-bold"><span class="bg-theemlight px-2 text-theem rounded-3xl text-[12px]">Order Placed</span></p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div>
                    <p>Total</p>
                    <p><strong>12345,88</strong> <span>SAR</span></p>
                  </div>
                  <div>
                    <button @click="rejectModalShow()" class="border-2 mt-1 border-warning text-warning uppercase font-bold p-2 rounded leading-3">Reject Order</button>
                  </div>
                  <div>
                    <button @click="approvedModalShow()" class="border mt-1 border-primary font-bold p-2 uppercase rounded bg-primary text-white hover:text-primary leading-3">Approved Order</button>
                  </div>
                </div>
              </div>

              <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div class="overflow-hidden">
                      <table class="min-w-full text-left text-sm font-light">
                        <thead class=" font-medium ">
                        <tr>
                          <th scope="col" class="p-2 w-[50px]">#</th>
                          <th scope="col" class="p-2">Product</th>
                          <th scope="col" class="p-2">Quantity</th>
                          <th scope="col" class="p-2">Agreed Price</th>
                          <th scope="col" class="p-2">Subtotal</th>
                          <th scope="col" class="p-2">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class=" ">
                          <td class="whitespace-nowrap p-2 font-medium">1</td>
                          <td class="whitespace-nowrap p-2">
                            <div class="flex gap-4">
                              <img class="w-10 h-10" src="https://c8n.tradeling.com/img/plain/cms/rs:auto:600::0/f:webp/q:95/Apple_f92d899cac.png" alt="">
                              <div>
                                <a href="">Product name here Product name here ....</a>
                                <p>Sku:fa-01</p>
                              </div>
                            </div>

                          </td>
                          <td class="whitespace-nowrap p-2">3</td>
                          <td class="whitespace-nowrap p-2">SAR 293.66 / price</td>
                          <td class="whitespace-nowrap p-2">SAR 2963.66</td>
                          <td class="whitespace-nowrap p-2">
                            <select class="p-3 border border-smooth rounded" name="" id="">
                              <option value="">Available</option>
                              <option value="">No Available</option>
                            </select>
                          </td>
                        </tr>
                        <tr class=" ">
                          <td class="whitespace-nowrap p-2 font-medium">1</td>
                          <td class="whitespace-nowrap p-2">
                            <div class="flex gap-4">
                              <img  class="w-10 h-10" src="https://c8n.tradeling.com/img/plain/cms/rs:auto:600::0/f:webp/q:95/Apple_f92d899cac.png" alt="">
                              <div>
                                <a href="">Product name here Product name here ....</a>
                                <p>Sku:fa-01</p>
                              </div>
                            </div>

                          </td>
                          <td class="whitespace-nowrap p-2">3</td>
                          <td class="whitespace-nowrap p-2">SAR 293.66 / price</td>
                          <td class="whitespace-nowrap p-2">SAR 2963.66</td>
                          <td class="whitespace-nowrap p-2">
                            <select class="p-3 border border-smooth rounded" name="" id="">
                              <option value="">Available</option>
                              <option value="">No Available</option>
                            </select>
                          </td>
                        </tr>
                        <tr class=" ">
                          <td class="whitespace-nowrap p-2 font-medium">1</td>
                          <td class="whitespace-nowrap p-2">
                            <div class="flex gap-4">
                              <img  class="w-10 h-10" src="https://c8n.tradeling.com/img/plain/cms/rs:auto:600::0/f:webp/q:95/Apple_f92d899cac.png" alt="">
                              <div>
                                <a href="">Product name here Product name here ....</a>
                                <p>Sku:fa-01</p>
                              </div>
                            </div>

                          </td>
                          <td class="whitespace-nowrap p-2">3</td>
                          <td class="whitespace-nowrap p-2">SAR 293.66 / price</td>
                          <td class="whitespace-nowrap p-2">SAR 2963.66</td>
                          <td class="whitespace-nowrap p-2">
                            <select class="p-3 border border-smooth rounded" name="" id="">
                              <option value="">Available</option>
                              <option value="">No Available</option>
                            </select>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-bind:class="{'hidden': openTab !== 3, 'block': openTab === 3}">
            <div @click="productTableShow(1)" class="card cursor-pointer my-2 p-4">
              <div class="flex gap-4 justify-between">
                <div class="flex gap-4">
                  <div class="p-2">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
                    </svg>
                  </div>
                  <div>
                    <p>Order</p>
                    <p class="font-bold">7te32e2387</p>
                  </div>
                  <div>
                    <p>Order Placed</p>
                    <p class="font-bold">09-nov-23</p>
                  </div>
                  <div>
                    <p>Payment Method</p>
                    <p class="font-bold">Credit Card</p>
                  </div>
                  <div>
                    <p>Payment</p>
                    <p class="font-bold"><span class="bg-primarylight px-2 text-primary rounded-3xl text-[12px]">Paid</span></p>
                  </div>
                  <div>
                    <p>Status</p>
                    <p class="font-bold"><span class="bg-theemlight px-2 text-theem rounded-3xl text-[12px]">Ready to Ship</span></p>
                  </div>
                  <div>
                    <p>Pickup Date</p>
                    <p class="font-bold">10 nov 23</p>
                  </div>
                  <div>
                    <p>Pickup Location</p>
                    <p class="font-bold text-primary flex"><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.8 14h0a7 7 0 1 0-11.5 0h0l.1.3.3.3L12 21l5.1-6.2.6-.7.1-.2Z"/>
                    </svg> <span>Office</span></p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div>
                    <p>Total</p>
                    <p><strong>12345,88</strong> <span class="text-primary">SAR</span></p>
                  </div>

                  <div>
                    <button class="border-2 font-bold mt-1 border-primary p-2 uppercase  rounded text-primary hover:text-primary leading-3">View Order</button>
                  </div>
                </div>
              </div>

              <div v-if="productTable[1]" class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div class="overflow-hidden">
                      <table class="min-w-full text-left text-sm font-light">
                        <thead class=" font-medium ">
                        <tr>
                          <th scope="col" class="p-2 w-[50px]">#</th>
                          <th scope="col" class="p-2">Product</th>
                          <th scope="col" class="p-2">Quantity</th>
                          <th scope="col" class="p-2">Agreed Price</th>
                          <th scope="col" class="p-2">Subtotal</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class=" ">
                          <td class="whitespace-nowrap p-2 font-medium">1</td>
                          <td class="whitespace-nowrap p-2">
                            <div class="flex items-center gap-4">
                              <img class="h-10 w-10" src="https://c8n.tradeling.com/img/plain/cms/rs:auto:600::0/f:webp/q:95/Apple_f92d899cac.png" alt="">
                              <div>
                                <a href="">Product name here Product name here ....</a>
                                <p>Sku:fa-01</p>
                              </div>
                            </div>

                          </td>
                          <td class="whitespace-nowrap p-2">3</td>
                          <td class="whitespace-nowrap p-2">SAR 293.66 / price</td>
                          <td class="whitespace-nowrap p-2">SAR 2963.66</td>
                        </tr>
                        <tr class=" ">
                          <td class="whitespace-nowrap p-2 font-medium">1</td>
                          <td class="whitespace-nowrap p-2">
                            <div class="flex items-center gap-4">
                              <img class="h-10 w-10" src="https://c8n.tradeling.com/img/plain/cms/rs:auto:600::0/f:webp/q:95/Apple_f92d899cac.png" alt="">
                              <div>
                                <a href="">Product name here Product name here ....</a>
                                <p>Sku:fa-01</p>
                              </div>
                            </div>

                          </td>
                          <td class="whitespace-nowrap p-2">3</td>
                          <td class="whitespace-nowrap p-2">SAR 293.66 / price</td>
                          <td class="whitespace-nowrap p-2">SAR 2963.66</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div v-bind:class="{'hidden': openTab !== 4, 'block': openTab === 4}">
            <div @click="productTableShow(1)" class="card cursor-pointer my-2 p-4">
              <div class="flex gap-4 justify-between">
                <div class="flex gap-4">
                  <div class="p-2">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
                    </svg>
                  </div>
                  <div>
                    <p>Order</p>
                    <p class="font-bold">7te32e2387</p>
                  </div>
                  <div>
                    <p>Order Placed</p>
                    <p class="font-bold">09-nov-23</p>
                  </div>
                  <div>
                    <p>Payment Method</p>
                    <p class="font-bold">Credit Card</p>
                  </div>
                  <div>
                    <p>Payment</p>
                    <p class="font-bold"><span class="bg-primarylight px-2 text-primary rounded-3xl text-[12px]">Paid</span></p>
                  </div>
                  <div>
                    <p>Status</p>
                    <p class="font-bold"><span class="bg-theemlight px-2 text-warning rounded-3xl text-[12px]">Pending Cancellation</span></p>
                  </div>
                  <div>
                    <p>Pickup Date</p>
                    <p class="font-bold">10 nov 23</p>
                  </div>
                  <div>
                    <p>Pickup Location</p>
                    <p class="font-bold text-primary flex"><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.8 14h0a7 7 0 1 0-11.5 0h0l.1.3.3.3L12 21l5.1-6.2.6-.7.1-.2Z"/>
                    </svg> <span>Office</span></p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div>
                    <p>Total</p>
                    <p><strong>12345,88</strong> <span class="text-primary">SAR</span></p>
                  </div>

                  <div>
                    <button class="border-2 font-bold mt-1 border-primary p-2 uppercase  rounded text-primary hover:text-primary leading-3">View Order</button>
                  </div>
                </div>
              </div>

              <div v-if="productTable[1]" class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div class="overflow-hidden">
                      <table class="min-w-full text-left text-sm font-light">
                        <thead class=" font-medium ">
                        <tr>
                          <th scope="col" class="p-2 w-[50px]">#</th>
                          <th scope="col" class="p-2">Product</th>
                          <th scope="col" class="p-2">Quantity</th>
                          <th scope="col" class="p-2">Agreed Price</th>
                          <th scope="col" class="p-2">Subtotal</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class=" ">
                          <td class="whitespace-nowrap p-2 font-medium">1</td>
                          <td class="whitespace-nowrap p-2">
                            <div class="flex items-center gap-4">
                              <img class="w-10 h-10" src="https://c8n.tradeling.com/img/plain/cms/rs:auto:600::0/f:webp/q:95/Apple_f92d899cac.png" alt="">
                              <div>
                                <a href="">Product name here Product name here ....</a>
                                <p>Sku:fa-01</p>
                              </div>
                            </div>

                          </td>
                          <td class="whitespace-nowrap p-2">3</td>
                          <td class="whitespace-nowrap p-2">SAR 293.66 / price</td>
                          <td class="whitespace-nowrap p-2">SAR 2963.66</td>
                        </tr>
                        <tr class=" ">
                          <td class="whitespace-nowrap p-2 font-medium">1</td>
                          <td class="whitespace-nowrap p-2">
                            <div class="flex items-center gap-4">
                              <img class="w-10 h-10"  src="https://c8n.tradeling.com/img/plain/cms/rs:auto:600::0/f:webp/q:95/Apple_f92d899cac.png" alt="">
                              <div>
                                <a href="">Product name here Product name here ....</a>
                                <p>Sku:fa-01</p>
                              </div>
                            </div>

                          </td>
                          <td class="whitespace-nowrap p-2">3</td>
                          <td class="whitespace-nowrap p-2">SAR 293.66 / price</td>
                          <td class="whitespace-nowrap p-2">SAR 2963.66</td>
                        </tr>
                        <tr class=" ">
                          <td class="whitespace-nowrap p-2 font-medium">1</td>
                          <td class="whitespace-nowrap p-2">
                            <div class="flex items-center gap-4">
                              <img class="w-10 h-10"  src="https://c8n.tradeling.com/img/plain/cms/rs:auto:600::0/f:webp/q:95/Apple_f92d899cac.png" alt="">
                              <div>
                                <a href="">Product name here Product name here ....</a>
                                <p>Sku:fa-01</p>
                              </div>
                            </div>

                          </td>
                          <td class="whitespace-nowrap p-2">3</td>
                          <td class="whitespace-nowrap p-2">SAR 293.66 / price</td>
                          <td class="whitespace-nowrap p-2">SAR 2963.66</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div @click="productTableShow(1)" class="card cursor-pointer my-2 p-4">
              <div class="flex gap-4 justify-between">
                <div class="flex gap-4">
                  <div class="p-2">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
                    </svg>
                  </div>
                  <div>
                    <p>Order</p>
                    <p class="font-bold">7te32e2387</p>
                  </div>
                  <div>
                    <p>Order Placed</p>
                    <p class="font-bold">09-nov-23</p>
                  </div>
                  <div>
                    <p>Payment Method</p>
                    <p class="font-bold">Credit Card</p>
                  </div>
                  <div>
                    <p>Payment</p>
                    <p class="font-bold"><span class="bg-primarylight px-2 text-primary rounded-3xl text-[12px]">Paid</span></p>
                  </div>
                  <div>
                    <p>Status</p>
                    <p class="font-bold"><span class="bg-warning px-2 text-error rounded-3xl text-[12px]">Cancelled</span></p>
                  </div>
                  <div>
                    <p>Pickup Date</p>
                    <p class="font-bold">10 nov 23</p>
                  </div>
                  <div>
                    <p>Pickup Location</p>
                    <p class="font-bold text-primary flex"><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.8 14h0a7 7 0 1 0-11.5 0h0l.1.3.3.3L12 21l5.1-6.2.6-.7.1-.2Z"/>
                    </svg> <span>Office</span></p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div>
                    <p>Total</p>
                    <p><strong>12345,88</strong> <span class="text-primary">SAR</span></p>
                  </div>

                  <div>
                    <button class="border-2 font-bold mt-1 border-primary p-2 uppercase  rounded text-primary hover:text-primary leading-3">View Order</button>
                  </div>
                </div>
              </div>

              <div v-if="productTable[1]" class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div class="overflow-hidden">
                      <table class="min-w-full text-left text-sm font-light">
                        <thead class=" font-medium ">
                        <tr>
                          <th scope="col" class="p-2 w-[50px]" >#</th>
                          <th scope="col" class="p-2">Product</th>
                          <th scope="col" class="p-2">Quantity</th>
                          <th scope="col" class="p-2">Agreed Price</th>
                          <th scope="col" class="p-2">Subtotal</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class=" ">
                          <td class="whitespace-nowrap p-2 font-medium">1</td>
                          <td class="whitespace-nowrap p-2">
                            <div class="flex items-center gap-4">
                              <img class="w-10 h-10" src="https://c8n.tradeling.com/img/plain/cms/rs:auto:600::0/f:webp/q:95/Apple_f92d899cac.png" alt="">
                              <div>
                                <a href="">Product name here Product name here ....</a>
                                <p>Sku:fa-01</p>
                              </div>
                            </div>

                          </td>
                          <td class="whitespace-nowrap p-2">3</td>
                          <td class="whitespace-nowrap p-2">SAR 293.66 / price</td>
                          <td class="whitespace-nowrap p-2">SAR 2963.66</td>
                        </tr>
                        <tr class=" ">
                          <td class="whitespace-nowrap p-2 font-medium">1</td>
                          <td class="whitespace-nowrap p-2">
                            <div class="flex items-center gap-4">
                              <img class="w-10 h-10" src="https://c8n.tradeling.com/img/plain/cms/rs:auto:600::0/f:webp/q:95/Apple_f92d899cac.png" alt="">
                              <div>
                                <a href="">Product name here Product name here ....</a>
                                <p>Sku:fa-01</p>
                              </div>
                            </div>

                          </td>
                          <td class="whitespace-nowrap p-2">3</td>
                          <td class="whitespace-nowrap p-2">SAR 293.66 / price</td>
                          <td class="whitespace-nowrap p-2">SAR 2963.66</td>
                        </tr>
                        <tr class=" ">
                          <td class="whitespace-nowrap p-2 font-medium">1</td>
                          <td class="whitespace-nowrap p-2">
                            <div class="flex items-center gap-4">
                              <img  class="w-10 h-10" src="https://c8n.tradeling.com/img/plain/cms/rs:auto:600::0/f:webp/q:95/Apple_f92d899cac.png" alt="">
                              <div>
                                <a href="">Product name here Product name here ....</a>
                                <p>Sku:fa-01</p>
                              </div>
                            </div>

                          </td>
                          <td class="whitespace-nowrap p-2">3</td>
                          <td class="whitespace-nowrap p-2">SAR 293.66 / price</td>
                          <td class="whitespace-nowrap p-2">SAR 2963.66</td>
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
    <OrderApprovedModal v-if="approvedModal" @close="handleModalClose"/>
    <OrderReject v-if="rejectModal" @close="rejectModalClose"/>
  </div>
</template>

<script>
export default{
  data(){
    return{
      openTab:  1,
      approvedModal:false,
      rejectModal:false,
      productTable:{
        1:false,
        2:false
      }
    }
  },

  methods:{
    toggleTabs: function (tabNumber) {
      this.openTab = tabNumber
    },
    productTableShow(index){
      this.productTable[index] = !this.productTable[index]
    },
    approvedModalShow(){
      this.approvedModal = !this.approvedModal
    },
    rejectModalShow(){
      this.rejectModal = !this.rejectModal
    },
    handleModalClose() {
      this.approvedModal = false;
    },
    rejectModalClose(){
      this.rejectModal = false;
    }
  }

}
</script>
