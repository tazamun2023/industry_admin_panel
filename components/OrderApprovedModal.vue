<!-- components/Modal.vue -->
<template>
    <div  class="fixed bg-modal  inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black opacity-50"></div>
      
      <div class="z-50 bg-white p-6 relative rounded-md shadow w-full md:w-1/2 lg:w-2/3 xl:w-3/5">
        <svg @click="closeModal" class="w-4 h-4 text-gray-800 absolute ltr:right-3  rtl:left-3 cursor-pointer mt-[-10px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
        <!-- Modal Content -->
        <div class="mb-4">
          <h4>Approved Order: T233343r4343</h4>
          
        </div>
        <div class="flex px-20 ">
      <div class="w-full">
        <div class="flex items-center w-full">
          <div class="w-8 h-8 shrink-0 mx-[-1px] bg-primary p-1.5 flex items-center justify-center rounded-full">
            <span class="text-base text-white font-bold">1</span>
          </div>
          <div class="w-full h-1 mx-4 rounded-lg bg-primary"></div>
        </div>
        <div class="mt-2 mr-4">
          <h6 class="text-base font-bold text-blue-500">Personal Info</h6>
        </div>
      </div>
      <div class="w-full">
        <div class="flex items-center w-full">
          <div class="w-8 h-8 shrink-0 mx-[-1px] bg-primary p-1.5 flex items-center justify-center rounded-full">
            <span class="text-base text-white font-bold">2</span>
          </div>
          <div class="w-full h-1 mx-4 rounded-lg bg-primary"></div>
        </div>
        <div class="mt-2 mr-4">
          <h6 class="text-base font-bold text-blue-500">Education</h6>
        </div>
      </div>
      <div>
        <div class="flex items-center">
          <div class="w-8 h-8 shrink-0 mx-[-1px] bg-smooth p-1.5 flex items-center justify-center rounded-full">
            <span class="text-base text-white font-bold">3</span>
          </div>
        </div>
        <div class="mt-2">
          <h6 class="text-base font-bold">Review</h6>
        </div>
      </div>
    </div>
        <div class="firstStep">
          <div class="my-2 p-4">
                    <div class="flex gap-4 justify-between">
                      <div class="flex gap-4">
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
                          <p class="font-bold text-primary">Paid</p>
                        </div>
                        <div>
                          <p>Status</p>
                          <p class="font-bold">Order Placed</p>
                        </div>
                      </div>
                      <div class="flex gap-4">
                        <div>
                          <p>Total</p>
                          <p><strong>12345,88</strong></p>
                        </div>
                       
                      </div>
                    </div>
                    <!-- TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com --> 
                    <div class="flex flex-col">
                      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                          <div class="overflow-hidden">
                          <div class="overflow-y-scroll h-[250px] scroll-thin">
                            <table class="min-w-full  text-left text-sm font-light">
                              <thead class=" font-medium ">
                                <tr>
                                  <th scope="col" class="px-6 py-4">#</th>
                                  <th scope="col" class="px-6 py-4">Product</th>
                                  <th scope="col" class="px-6 py-4">Quantity</th>
                                  <th scope="col" class="px-6 py-4">Agreed Price</th>
                                  <th scope="col" class="px-6 py-4">Subtotal</th>
                                  <th scope="col" class="px-6 py-4">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr class=" ">
                                  <td class="whitespace-nowrap px-6 py-4 font-medium">1</td>
                                  <td class="whitespace-nowrap px-6 py-4">
                                    <div class="flex gap-4">
                                      <img src="https://c8n.tradeling.com/img/plain/cms/rs:auto:600::0/f:webp/q:95/Apple_f92d899cac.png" alt="">
                                      <div>
                                        <a href="">Product name here Product name here ....</a>
                                        <p>Sku:fa-01</p>
                                      </div>
                                    </div>

                                  </td>
                                  <td class="whitespace-nowrap px-6 py-4">3</td>
                                  <td class="whitespace-nowrap px-6 py-4">SAR 293.66 / price</td>
                                  <td class="whitespace-nowrap px-6 py-4">SAR 2963.66</td>
                                  <td class="whitespace-nowrap px-6 py-4">
                                    <select class="p-3 border border-smooth rounded" name="" id="">
                                      <option value="">Available</option>
                                      <option value="">No Available</option>
                                    </select>
                                  </td>
                                </tr>
                                <tr class=" ">
                                  <td class="whitespace-nowrap px-6 py-4 font-medium">1</td>
                                  <td class="whitespace-nowrap px-6 py-4">
                                    <div class="flex gap-4">
                                      <img src="https://c8n.tradeling.com/img/plain/cms/rs:auto:600::0/f:webp/q:95/Apple_f92d899cac.png" alt="">
                                      <div>
                                        <a href="">Product name here Product name here ....</a>
                                        <p>Sku:fa-01</p>
                                      </div>
                                    </div>

                                  </td>
                                  <td class="whitespace-nowrap px-6 py-4">3</td>
                                  <td class="whitespace-nowrap px-6 py-4">SAR 293.66 / price</td>
                                  <td class="whitespace-nowrap px-6 py-4">SAR 2963.66</td>
                                  <td class="whitespace-nowrap px-6 py-4">
                                    <select class="p-3 border border-smooth rounded" name="" id="">
                                      <option value="">Available</option>
                                      <option value="">No Available</option>
                                    </select>
                                  </td>
                                </tr>
                                <tr class=" ">
                                  <td class="whitespace-nowrap px-6 py-4 font-medium">1</td>
                                  <td class="whitespace-nowrap px-6 py-4">
                                    <div class="flex gap-4">
                                      <img src="https://c8n.tradeling.com/img/plain/cms/rs:auto:600::0/f:webp/q:95/Apple_f92d899cac.png" alt="">
                                      <div>
                                        <a href="">Product name here Product name here ....</a>
                                        <p>Sku:fa-01</p>
                                      </div>
                                    </div>

                                  </td>
                                  <td class="whitespace-nowrap px-6 py-4">3</td>
                                  <td class="whitespace-nowrap px-6 py-4">SAR 293.66 / price</td>
                                  <td class="whitespace-nowrap px-6 py-4">SAR 2963.66</td>
                                  <td class="whitespace-nowrap px-6 py-4">
                                    <select class="p-3 border border-smooth rounded" name="" id="">
                                      <option value="">Available</option>
                                      <option value="">No Available</option>
                                    </select>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            </div>
                            <!-- ----------------- -->
                            <div class="w-full">
                              <div class="w-2/5 ml-auto items-end border border-smooth p-4 rounded">
                              <div class="flex my-1 justify-between">
                                  <div><h5>Item(S) Subtotal</h5></div>
                                  <div><h5>SAR 123343</h5></div>
                              </div>
                              <div class="flex my-1 justify-between">
                                  <div><h5>Vat (%):</h5></div>
                                  <div><h5>SAR 123343</h5></div>
                              </div>
                              <div class="flex my-1 justify-between">
                                  <div><h5>Item(S) Total</h5></div>
                                  <div><h5>SAR 123343</h5></div>
                              </div>
                              <div class="flex my-2 justify-between">
                                  <div><h5 class="font-bold">Industry fee</h5></div>
                              </div>
                              <div class="flex my-1 justify-between">
                                  <div><h5>Commission</h5></div>
                                  <div><h5>SAR 1233</h5></div>
                              </div>
                              <div class="flex my-1 justify-between">
                                  <div><h5>VAT(S) on Comission (5%)</h5></div>
                                  <div><h5>SAR 123343</h5></div>
                              </div>
                              <div class="flex my-1 justify-between">
                                  <div><h5>Total Comission</h5></div>
                                  <div><h5>SAR 123343</h5></div>
                              </div>
                              <div class="flex border-t border-smooth pt-2 my-1 justify-between">
                                  <div><h5  class="font-bold">Total Payout</h5></div>
                                  <div><h5  class="font-bold">SAR 123343</h5></div>
                              </div>
                            </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="w-full border-t p-2 border-smooth">
                      <div class="items-end p-1 text-end absolute ltr:right-[40px] rtl:left-[40px]">
                          <button class="bg-primary px-4 w-[100px] text-white p-3 rounded leading-3">Next</button>
                      </div>
                    </div>
                  </div>
        </div>
        <!-- Close Button -->
        <div class="flex justify-end">
        <slot name="buttons">

        </slot>
      </div>

      </div>
    </div>
  </template>
<style class="scoped">
  /* For WebKit browsers (Chrome, Safari) */
  .scroll-thin::-webkit-scrollbar {
    width: 6px; /* Adjust as needed for thickness */
  }

  .scroll-thin::-webkit-scrollbar-thumb {
    background-color: gray;
  }

  .scroll-thin::-webkit-scrollbar-track {
    background-color: lightgray;
  }
</style>
  <script>
  export default {
    // props: {
    //   showModal: Boolean,
    //   is_reject_modal: String,
    //   providedId: String,
    // },
    props: ['showModal', 'is_reject_modal', 'providedId'],
    methods: {
      closeModal() {
        this.$emit('closeModal');
      },
    },
  };
  </script>
